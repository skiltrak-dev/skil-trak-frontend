import { Star } from 'lucide-react'

interface DisplayRatingProps {
    rating: number
    showValue?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export const DisplayIndustryRating = ({
    rating,
    showValue = true,
    size = 'md',
    className = '',
}: DisplayRatingProps) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    }

    const starClass = sizeClasses[size]

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${starClass} ${
                            star <= rating
                                ? 'fill-orange-400 text-orange-400'
                                : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
            {showValue && (
                <span className="text-sm text-gray-600">
                    {rating?.toFixed(1)}/5
                </span>
            )}
        </div>
    )
}
