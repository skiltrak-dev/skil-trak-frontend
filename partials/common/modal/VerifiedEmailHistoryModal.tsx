import React from 'react'
import { Typography } from '@components'
import { commonApi } from '@queries'
import { format } from 'date-fns'
import { FaArrowRightLong } from 'react-icons/fa6'

export const VerifiedEmailHistoryModal = ({ userId }: { userId: number }) => {
    const { data, isLoading, error } = commonApi.useGetVerifyEmailHistoryQuery(
        userId,
        {
            skip: !userId,
        }
    )

    const formatDate = (dateString: any) => {
        try {
            return format(new Date(dateString), 'MMM dd, yyyy • h:mm a')
        } catch (e) {
            return dateString
        }
    }

    return (
        <div className="mt-8 min-w-[32rem]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
                <Typography variant="title">
                    Email Verification History
                </Typography>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center py-4">
                    Failed to load verification history
                </div>
            ) : !data ? (
                <div className="text-gray-500 text-center py-4">
                    No verification history found
                </div>
            ) : (
                <div>
                    {/* User Information */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="mb-1">
                            <Typography variant="subtitle">User:</Typography>
                            <Typography color="text-gray-700">
                                {data?.user?.name || 'N/A'}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle" semibold>
                                Email:
                            </Typography>
                            <Typography color="text-gray-700">
                                {data?.user?.email || 'N/A'}
                            </Typography>
                        </div>
                    </div>

                    {/* Status Change Information */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <Typography variant="subtitle" semibold>
                                Status Change:
                            </Typography>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    data.current === 'true'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {data.current === 'true'
                                    ? 'Verified'
                                    : 'Unverified'}
                            </span>
                        </div>

                        <div className="flex items-center mb-2">
                            <div className="flex-1 text-center">
                                <Typography color="text-sm text-gray-500">
                                    Previous
                                </Typography>
                                <div
                                    className={`mt-1 font-medium ${
                                        data.previous === 'true'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {data.previous === 'true'
                                        ? 'Verified'
                                        : 'Unverified'}
                                </div>
                            </div>
                            <div className="mx-4">
                                <FaArrowRightLong
                                    size={25}
                                    className="text-gray-400"
                                />
                            </div>
                            <div className="flex-1 text-center">
                                <Typography color="text-sm text-gray-500">
                                    Current
                                </Typography>
                                <div
                                    className={`mt-1 font-medium ${
                                        data.current === 'true'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {data.current === 'true'
                                        ? 'Verified'
                                        : 'Unverified'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verification Details */}
                    <div className="mb-6">
                        <Typography variant="subtitle" semibold>
                            Verification Details:
                        </Typography>

                        <div className="space-y-2">
                            <div>
                                <Typography color="text-sm text-gray-500">
                                    Date & Time
                                </Typography>
                                <Typography color="text-gray-700">
                                    {formatDate(data.createdAt)}
                                </Typography>
                            </div>

                            <div>
                                <Typography color="text-sm text-gray-500">
                                    Verified By
                                </Typography>
                                <Typography color="text-gray-700">
                                    {data.updatedBy?.name || 'N/A'}
                                </Typography>
                            </div>

                            <div>
                                <Typography color="text-sm text-gray-500">
                                    Sub Admin Email
                                </Typography>
                                <Typography color="text-gray-700">
                                    {data.updatedBy?.email || 'N/A'}
                                </Typography>
                            </div>

                            {data.note && (
                                <div>
                                    <Typography color="text-sm text-gray-500">
                                        Note
                                    </Typography>
                                    <Typography color="text-gray-700 italic">
                                        {data.note}
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                </div>
            )}
        </div>
    )
}
