import { Button, LoadingAnimation, NoData, Typography } from '@components'
import { MapStarRating } from '@partials/common'
import { AdminApi } from '@queries'
import { SeparatorHorizontal } from 'lucide-react'
import React, { useState } from 'react'

interface Review {
    id: string
    studentName: string
    rating: number
    comment: string
    date: string
    course: string
}

export const CoordinatorReviewsListModal = ({ user }: any) => {
    const [expandedReviews, setExpandedReviews] = useState<Set<string>>(
        new Set()
    )
    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const CHARACTER_LIMIT = 150 // Character limit for truncating reviews
    const { data, isLoading, isFetching, isError } =
        AdminApi.SubAdmins.useCoordinatorRatingsList(
            {
                id: user?.id,
                params: {
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !user?.id,
            }
        )

    const averageRating =
        data?.data?.length > 0
            ? data?.data?.reduce(
                  (sum: any, review: any) => sum + review.rating,
                  0
              ) / data?.data?.length
            : 0

    const toggleReviewExpansion = (reviewId: string) => {
        const newExpanded = new Set(expandedReviews)
        if (newExpanded.has(reviewId)) {
            newExpanded.delete(reviewId)
        } else {
            newExpanded.add(reviewId)
        }
        setExpandedReviews(newExpanded)
    }

    const renderReviewComment = (review: any) => {
        const isExpanded = expandedReviews.has(review?.id)
        const shouldTruncate = review?.review.length > CHARACTER_LIMIT

        if (!shouldTruncate) {
            return (
                <p className="text-gray-700 leading-relaxed">
                    {review?.review}
                </p>
            )
        }

        return (
            <div>
                <p className="text-gray-700 leading-relaxed text-xs">
                    {isExpanded
                        ? review?.review
                        : `${review?.review.substring(0, CHARACTER_LIMIT)}...`}
                </p>
                <button
                    onClick={() => toggleReviewExpansion(review?.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-1 hover:underline"
                >
                    {isExpanded ? 'View Less' : 'View More'}
                </button>
            </div>
        )
    }
    return (
        <div className="min-w-[32rem]">
            <div className="flex items-center gap-x-5 mb-5">
                <Typography variant="title">
                    Reviews for {user?.name}
                </Typography>
                <div className="flex gap-x-2 items-center">
                    <MapStarRating rating={averageRating} size="sm" />
                    <span className="text-sm text-gray-500">
                        ({data?.data?.length} reviews)
                    </span>
                </div>
            </div>
            <div className="max-h-[60vh] pr-4 overflow-auto">
                <div className="space-y-4">
                    {isLoading ? (
                        <LoadingAnimation height="18px" />
                    ) : data?.data && data?.data?.length > 0 ? (
                        data?.data?.map((review: any, index: number) => (
                            <div key={review.id}>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                                                {review?.reviewBy?.name?.charAt(
                                                    0
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {review?.reviewBy?.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {review?.reviewBy?.role ===
                                                    'industry'
                                                        ? 'Industry'
                                                        : 'Student'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <MapStarRating
                                                rating={review?.rating}
                                                size="sm"
                                            />
                                            <p className="text-xs text-gray-500">
                                                {review?.createdAt.slice(0, 10)}
                                            </p>
                                        </div>
                                    </div>
                                    {renderReviewComment(review)}
                                </div>
                                {index < data?.data?.length - 1 && (
                                    <div className="my-4 h-[1px] w-full bg-gray-200" />
                                )}
                            </div>
                        ))
                    ) : (
                        !isError && (
                            <NoData text="No reviews yet for this coordinator." />
                        )
                    )}
                </div>
            </div>
            <div className="flex items-center gap-x-2 justify-center">
                {data?.pagination?.hasPrevious && (
                    <div className="flex justify-center py-4">
                        <Button
                            text="Load previous"
                            variant="info"
                            outline
                            onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                            }
                            loading={isFetching || isLoading}
                            disabled={
                                !data?.pagination?.hasPrevious ||
                                isLoading ||
                                isFetching
                            }
                        />
                    </div>
                )}
                {data?.pagination?.hasNext && (
                    <div className="flex justify-center py-4">
                        <Button
                            text="Load more"
                            variant={'secondary'}
                            outline
                            onClick={() => setPage((prev) => prev + 1)}
                            loading={isFetching || isLoading}
                            disabled={
                                !data?.pagination?.hasNext ||
                                isLoading ||
                                isFetching
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
