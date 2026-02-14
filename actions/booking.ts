"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Booking from "@/models/Booking";
import Item from "@/models/Item";
import { auth } from "@/auth";
import type { BookingStatus } from "@/types";

// ─── Create Booking ─────────────────────────────────────
export async function createBooking(formData: FormData) {
    try {
        await connectDB();

        const itemId = formData.get("itemId") as string | null;
        const borrower = formData.get("borrower") as string | null;
        const startDate = formData.get("startDate") as string | null;
        const endDate = formData.get("endDate") as string | null;

        if (!itemId || !borrower || !startDate || !endDate) {
            return { success: false, error: "Missing required booking fields" };
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end <= start) {
            return { success: false, error: "End date must be after start date" };
        }

        // Check the item exists and is available
        const item = await Item.findById(itemId);
        if (!item) return { success: false, error: "Item not found" };
        if (!item.available) return { success: false, error: "Item is not available" };

        // Prevent owner from borrowing their own item
        if (item.owner.toString() === borrower) {
            return { success: false, error: "You cannot borrow your own item" };
        }

        // Calculate total price
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Ensure at least 1 day if start and end are same (or relying on UI to prevent same-day start/end with 0 duration)
        // Check if duration is 0? If start == end, duration is 0?
        // Logic: if start = today, end = tomorrow, duration is 1 day.
        // If start = today, end = today, duration is 0? 
        // User input ensures end > start (line 26).
        // Let's assume minimum 1 day if diff is small, but calc should work.

        const totalPrice = durationDays * item.price;

        // Check borrower credits
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = await User.findById(borrower) as any;
        if (!user) return { success: false, error: "Borrower not found" };

        if (user.credits < totalPrice) {
            return {
                success: false,
                error: `Insufficient credits. You need ${totalPrice} credits but have ${user.credits}.`
            };
        }

        // Deduct credits
        user.credits -= totalPrice;
        await user.save();

        await Booking.create({
            item: itemId,
            borrower,
            startDate: start,
            endDate: end,
            totalPrice,
            status: "pending",
        });

        // Mark item as unavailable
        await Item.findByIdAndUpdate(itemId, { available: false });

        revalidatePath("/");
        revalidatePath("/bookings");
        return { success: true };
    } catch (error) {
        console.error("createBooking error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create booking",
        };
    }
}

// ─── Update Booking Status ──────────────────────────────
export async function updateBookingStatus(
    bookingId: string,
    status: BookingStatus
) {
    try {
        await connectDB();

        const booking = await Booking.findById(bookingId).populate("item");
        if (!booking) return { success: false, error: "Booking not found" };

        // Handle Status Changes & Credits
        const price = booking.totalPrice || 0;

        if (booking.status === "pending") {
            if (status === "rejected") {
                // Refund borrower
                await User.findByIdAndUpdate(booking.borrower, {
                    $inc: { credits: price }
                });
            }
        }

        if (booking.status === "approved" && status === "returned") {
            // Transfer credits to owner on return
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const item = booking.item as any;
            await User.findByIdAndUpdate(item.owner, {
                $inc: { credits: price }
            });
        }

        // Ensure totalPrice exists to satisfy schema validation for legacy bookings
        if (booking.totalPrice === undefined) {
            booking.totalPrice = 0;
        }

        booking.status = status;
        await booking.save();

        // If returned or rejected, make the item available again
        if (status === "returned" || status === "rejected") {
            await Item.findByIdAndUpdate(booking.item._id, { available: true });
        }

        revalidatePath("/");
        revalidatePath("/bookings");
        return { success: true };
    } catch (error) {
        console.error("updateBookingStatus error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update booking",
        };
    }
}

// ─── Get Bookings for a User ────────────────────────────
export async function getBookingsByUser(userId: string) {
    try {
        await connectDB();

        // Bookings where user is the borrower
        const borrowedBookings = await Booking.find({ borrower: userId })
            .populate({
                path: "item",
                populate: { path: "owner", select: "name email" },
            })
            .sort({ createdAt: -1 })
            .lean();

        // Bookings where user owns the item (lent out)
        const items = await Item.find({ owner: userId }).select("_id");
        const itemIds = items.map((i) => i._id);

        const lentBookings = await Booking.find({ item: { $in: itemIds } })
            .populate("item")
            .populate("borrower", "name email")
            .sort({ createdAt: -1 })
            .lean();

        return {
            borrowed: JSON.parse(JSON.stringify(borrowedBookings)),
            lent: JSON.parse(JSON.stringify(lentBookings)),
        };
    } catch (error) {
        console.error("getBookingsByUser error:", error);
        return { borrowed: [], lent: [] };
    }
}

// ─── Get Pending Count for Lender ───────────────────────
export async function getPendingLenderCount(userId: string) {
    try {
        await connectDB();
        const items = await Item.find({ owner: userId }).select("_id");
        const itemIds = items.map((i) => i._id);

        const count = await Booking.countDocuments({
            item: { $in: itemIds },
            status: "pending",
        });

        return count;
    } catch (error) {
        console.error("getPendingLenderCount error:", error);
        return 0;
    }
}

// ─── Get User History ───────────────────────────────────
export async function getUserHistory() {
    try {
        const session = await auth();
        if (!session?.user) return null;

        await connectDB();
        const userId = session.user.id;

        // 1. Items I borrowed
        const borrowedBookings = await Booking.find({ borrower: userId })
            .populate("item")
            .populate({
                path: "item",
                populate: { path: "owner", select: "name image" },
            })
            .sort({ createdAt: -1 });

        // 2. Items I lent (My items that are booked)
        const myItems = await Item.find({ owner: userId });
        const myItemIds = myItems.map((i) => i._id);

        const lentBookings = await Booking.find({ item: { $in: myItemIds } })
            .populate("item")
            .populate("borrower", "name image")
            .sort({ createdAt: -1 });

        return {
            borrowed: JSON.parse(JSON.stringify(borrowedBookings)),
            lent: JSON.parse(JSON.stringify(lentBookings)),
        };
    } catch (error) {
        console.error("Error fetching user history:", error);
        return null;
    }
}
