"use client";

import { useState } from "react";
import { submitUserReview } from "@/actions/user-review";
import StarRating from "./ui/StarRating";
import Button from "./ui/Button";

interface UserReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  targetUserId: string; // The borrower
  targetUserName: string;
}

export default function UserReviewModal({
  isOpen,
  onClose,
  bookingId,
  targetUserId,
  targetUserName,
}: UserReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("rating", rating.toString());
    formData.append("comment", comment);
    formData.append("bookingId", bookingId);
    formData.append("targetUserId", targetUserId); // Rating the borrower

    const result = await submitUserReview(formData);

    setIsSubmitting(false);
    if (result.success) {
      onClose();
      // Ideally trigger a refresh or toast
      window.location.reload();
    } else {
      alert(result.error || "Failed to submit review");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          Rate Borrower: {targetUserName}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-2 h-24 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="How was your experience with this borrower?"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || rating === 0}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
