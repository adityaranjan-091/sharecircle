"use client";

import { useEffect, useState } from "react";
import { X, Star, User } from "lucide-react";
import { getUserReviews } from "@/actions/user-review";
import { format } from "date-fns";

interface UserReviewsModalProps {
    userId: string;
    userName: string;
    onClose: () => void;
}

export default function UserReviewsModal({
    userId,
    userName,
    onClose,
}: UserReviewsModalProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        async function loadReviews() {
            const data = await getUserReviews(userId);
            setReviews(data.reviews);
            setAverageRating(Number(data.averageRating));
            setTotalReviews(data.totalReviews);
            setLoading(false);
        }
        loadReviews();
    }, [userId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl dark:bg-zinc-900 animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    <div>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Reviews for {userName}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                                {averageRating}
                            </span>
                            <span className="text-sm text-zinc-500">
                                ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors dark:hover:bg-zinc-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
                        </div>
                    ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
                                            {review.reviewer?.image ? (
                                                <img
                                                    src={review.reviewer.image}
                                                    alt={review.reviewer.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-4 w-4 text-zinc-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                {review.reviewer?.name || "Unknown User"}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {format(new Date(review.createdAt), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-3 h-3 ${star <= review.rating
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "text-zinc-300 dark:text-zinc-700"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {review.comment && (
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                                        {review.comment}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-zinc-500">
                            No reviews yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
