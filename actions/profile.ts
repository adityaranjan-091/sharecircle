"use server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Booking from "@/models/Booking";
import Item from "@/models/Item";
import { auth } from "@/auth";

export async function getUserProfile(userId: string) {
  try {
    await connectDB();
    const user = await User.findById(userId).select("-password -email"); // Hide email for public profile? Or maybe show it.
    if (!user) return null;

    // Fetch stats
    // Borrowing history (count)
    // Lending history (count)

    const items = await Item.find({ owner: userId });
    const itemIds = items.map((i) => i._id);

    // Lending count (times their items were booked and approved/returned)
    const lendingCount = await Booking.countDocuments({
      item: { $in: itemIds },
      status: { $in: ["approved", "returned"] },
    });

    // Borrowing count
    const borrowingCount = await Booking.countDocuments({
      borrower: userId,
      status: { $in: ["approved", "returned"] },
    });

    return {
      user: JSON.parse(JSON.stringify(user)),
      stats: {
        lendingCount,
        borrowingCount,
        itemsCount: items.length,
      },
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

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
    // First find my items
    const myItems = await Item.find({ owner: userId });
    const myItemIds = myItems.map((i) => i._id);

    const lentBookings = await Booking.find({ item: { $in: myItemIds } })
      .populate("item")
      .populate("borrower", "name image") // We need borrower info to rate them
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
