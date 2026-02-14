import mongoose, { Schema, models } from "mongoose";
import { IUserReview } from "@/types";

const UserReviewSchema = new Schema<IUserReview>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reviewer is required"],
    },
    targetUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Target user is required"],
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true },
);

// Prevent multiple reviews for the same booking
UserReviewSchema.index({ booking: 1, reviewer: 1 }, { unique: true });

const UserReview =
  models.UserReview ||
  mongoose.model<IUserReview>("UserReview", UserReviewSchema);
export default UserReview;
