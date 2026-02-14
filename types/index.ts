import { Document, Types } from "mongoose";

// ─── User ───────────────────────────────────────────────
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Item ───────────────────────────────────────────────
export interface IItem extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  images: string[];
  owner: Types.ObjectId;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Booking ────────────────────────────────────────────
export type BookingStatus = "pending" | "approved" | "returned" | "rejected";

export interface IBooking extends Document {
  item: Types.ObjectId;
  borrower: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Review ─────────────────────────────────────────────
export interface IReview extends Document {
  item: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── User Review ────────────────────────────────────────
export interface IUserReview extends Document {
  reviewer: Types.ObjectId;
  targetUser: Types.ObjectId;
  booking?: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Global Mongoose Cache (for hot-reload safety) ─────
export interface MongooseCache {
  conn: typeof import("mongoose") | null;
  promise: Promise<typeof import("mongoose")> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}
