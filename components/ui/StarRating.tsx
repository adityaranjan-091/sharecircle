import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  readonly?: boolean;
}

export default function StarRating({
  rating,
  setRating,
  readonly = false,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && setRating && setRating(star)}
          className={`${readonly ? "cursor-default" : "cursor-pointer"} transition-colors duration-200`}
          disabled={readonly}
        >
          <FaStar
            className={star <= rating ? "text-yellow-400" : "text-gray-300"}
            size={20}
          />
        </button>
      ))}
    </div>
  );
}
