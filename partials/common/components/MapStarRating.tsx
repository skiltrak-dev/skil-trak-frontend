import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number
    maxRating?: number
    size?: 'xs' | 'sm' | 'md' | 'lg'
    showRating?: boolean
}

export const MapStarRating = ({
    rating,
    maxRating = 5,
    size = 'md',
    showRating = true,
}: StarRatingProps) => {
    const sizeClasses = {
        xs: 'w-4 h-4',
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    }

    const textSizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    }

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center">
                {[...Array(maxRating)].map((_, index) => {
                    const isFilled = index < Math.floor(rating)
                    const isHalfFilled =
                        index < rating && index >= Math.floor(rating)

                    return (
                        <div key={index} className="relative">
                            <Star
                                className={`${sizeClasses[size]} ${
                                    isFilled
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                            />
                            {isHalfFilled && (
                                <Star
                                    className={`${sizeClasses[size]} absolute top-0 left-0 fill-yellow-400 text-yellow-400`}
                                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            {showRating && (
                <span className={`${textSizeClasses[size]} text-gray-600 ml-1`}>
                    {rating?.toFixed(1)}
                </span>
            )}
        </div>
    )
}
