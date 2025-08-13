import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    return (
        <div className="flex gap-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className="p-2 rounded-lg transition-all hover:bg-accent hover:scale-110"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => onRatingChange(star)}
                >
                    <Star
                        className={`h-8 w-8 transition-all ${star <= (hoveredRating || rating)
                                ? "fill-[#F7A619] text-[#F7A619] scale-110"
                                : "text-gray-300 hover:text-gray-400"
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}