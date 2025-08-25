import { useState } from 'react'
import { Star } from 'lucide-react'

interface IndustryFeedbackStarRatingProps {
    rating: number
    onRatingChange: (rating: number) => void
    label?: string
    description?: string
}

export const IndustryFeedbackStarRating = ({
    rating,
    onRatingChange,
    label,
    description,
}: IndustryFeedbackStarRatingProps) => {
    const [hoverRating, setHoverRating] = useState(0)

    const getRatingText = (stars: number) => {
        switch (stars) {
            case 1:
                return 'Poor'
            case 2:
                return 'Fair'
            case 3:
                return 'Good'
            case 4:
                return 'Very Good'
            case 5:
                return 'Excellent'
            default:
                return ''
        }
    }

    return (
        <div className="space-y-2">
            {label && (
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                    <h3 className="text-blue-600 font-medium">{label}</h3>
                </div>
            )}
            {description && (
                <p className="text-gray-600 text-sm">{description}</p>
            )}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none"
                            onClick={() => onRatingChange(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <Star
                                className={`w-8 h-8 transition-colors ${
                                    star <= (hoverRating || rating)
                                        ? 'fill-orange-400 text-orange-400'
                                        : 'text-gray-300'
                                }`}
                            />
                        </button>
                    ))}
                </div>
                {rating > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-teal-600">
                            {getRatingText(rating)}
                        </span>
                        <span className="text-orange-400">{rating}/5</span>
                    </div>
                )}
            </div>
        </div>
    )
}
