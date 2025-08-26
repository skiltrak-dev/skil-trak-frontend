import { useState } from 'react'
import { Star, User, ThumbsUp, MessageSquare, X } from 'lucide-react'
import { DisplayIndustryRating } from './DisplayIndustryRating'
import { Badge, GlobalModal, LoadingAnimation, NoData } from '@components'
import { CommonApi } from '@queries'

interface IndustryRatingListProps {
    industry: any
    onClose: any
    isFetching: boolean
    isLoading: boolean
    data: any
    isError: boolean

    setPage: any
}

export const IndustryRatingList = ({
    industry,
    onClose,
    data,
    isFetching,
    isError,
    isLoading,
    setPage,
}: IndustryRatingListProps) => {
    const [expandedReviews, setExpandedReviews] = useState<Set<number>>(
        new Set()
    )
    const CHARACTER_LIMIT = 200

    const reviews = data?.data || []
    const totalReviews = reviews?.length
    const averageRating =
        totalReviews > 0
            ? reviews.reduce(
                  (sum: number, r: any) => sum + (r.overAllRating || 0),
                  0
              ) / totalReviews
            : 0

    const getRecommendationColor = (recommendation: string) => {
        switch (recommendation) {
            case 'yes':
                return 'bg-green-100 text-green-800'
            case 'maybe':
                return 'bg-yellow-100 text-yellow-800'
            case 'no':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getRecommendationText = (recommendation: string) => {
        switch (recommendation) {
            case 'yes':
                return 'Recommended'
            case 'maybe':
                return 'Maybe'
            case 'no':
                return 'Not Recommended'
            default:
                return 'Unknown'
        }
    }

    const toggleExpandReview = (reviewId: number) => {
        setExpandedReviews((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(reviewId)) newSet.delete(reviewId)
            else newSet.add(reviewId)
            return newSet
        })
    }

    const truncateText = (text: string, limit: number) => {
        if (!text) return ''
        if (text.length <= limit) return text
        return text.substring(0, limit).trim() + '...'
    }

    return (
        <GlobalModal>
            <div className="p-4">
                <div className="flex justify-end pb-2">
                    <X onClick={onClose} className="cursor-pointer" />
                </div>
                {isError && <NoData isError text="Something went wrong" />}
                <div className="overflow-auto max-h-[32rem] w-[60rem] remove-scrollbar">
                    {isLoading ? (
                        <LoadingAnimation />
                    ) : reviews && reviews?.length > 0 ? (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl text-gray-900 mb-2">
                                        All Reviews for{' '}
                                        {industry?.user?.name || 'Industry'}
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        <DisplayIndustryRating
                                            rating={averageRating}
                                            size="md"
                                        />
                                        <span className="text-gray-600">
                                            Based on {totalReviews} reviews
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl text-orange-400 mb-1">
                                        {averageRating.toFixed(1)}/5
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Overall Rating
                                    </div>
                                </div>
                            </div>
                            {/* Reviews List */}
                            <div className="space-y-4">
                                {reviews.map((review: any) => (
                                    <div
                                        key={review.id}
                                        className="border border-gray-100 rounded-lg bg-white shadow-sm"
                                    >
                                        {/* Header */}
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-900 font-medium">
                                                                {review?.student
                                                                    .user
                                                                    ?.name ||
                                                                    'Anonymous'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <DisplayIndustryRating
                                                                rating={
                                                                    review.overAllRating
                                                                }
                                                                showValue={
                                                                    false
                                                                }
                                                                size="sm"
                                                            />
                                                            <span className="text-sm text-gray-500">
                                                                {new Date(
                                                                    review.createdAt
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(
                                                        review.recommendation
                                                    )}`}
                                                >
                                                    {getRecommendationText(
                                                        review.recommendation
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <div className="mb-3">
                                                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                                    {expandedReviews.has(
                                                        review.id
                                                    )
                                                        ? review.comment
                                                        : truncateText(
                                                              review.comment,
                                                              CHARACTER_LIMIT
                                                          )}
                                                </p>
                                                {review.comment?.length >
                                                    CHARACTER_LIMIT && (
                                                    <button
                                                        onClick={() =>
                                                            toggleExpandReview(
                                                                review.id
                                                            )
                                                        }
                                                        className="text-blue-600 hover:text-blue-700 text-sm mt-2 hover:underline transition-colors"
                                                    >
                                                        {expandedReviews.has(
                                                            review.id
                                                        )
                                                            ? 'View less'
                                                            : 'View more'}
                                                    </button>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-end pt-3 border-t border-gray-100">
                                                {/* <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                                        <ThumbsUp className="w-4 h-4" />
                                                        Helpful (
                                                        {review.helpfulCount ||
                                                            0}
                                                        )
                                                    </button>
                                                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                                        <MessageSquare className="w-4 h-4" />
                                                        Reply
                                                    </button>
                                                </div> */}
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {review.overAllRating?.toFixed(
                                                            1
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {data?.pagination?.hasNext && (
                                <div className="flex justify-center py-1.5">
                                    <Badge
                                        variant="info"
                                        text="Load more"
                                        onClick={() => {
                                            setPage((prev: any) => prev + 1)
                                            // setShowLoader(false)
                                        }}
                                        loading={isFetching || isLoading}
                                        disabled={
                                            !data?.pagination?.hasNext ||
                                            isLoading ||
                                            isFetching
                                        }
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        !isError && <NoData text="No reviews found" />
                    )}
                </div>
            </div>
        </GlobalModal>
    )
}
