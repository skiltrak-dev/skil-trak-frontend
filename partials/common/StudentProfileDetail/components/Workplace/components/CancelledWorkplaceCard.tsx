import React from 'react'
import { Card, Typography } from '@components'
import { CircleOff, User, Calendar, BookOpen, Factory } from 'lucide-react'

export const CancelledWorkplaceCard = ({ cancelledWp }: any) => {
    return (
        <Card noPadding>
            <div className="flex gap-x-2 items-center border-b py-3 px-5">
                <CircleOff className="mr-2 text-red-500" size={20} />
                <Typography variant="subtitle" bold color="text-slate-600">
                    Cancelled Workplace
                </Typography>
            </div>

            <div className="flex items-center justify-between p-5">
                <div className="flex flex-col gap-y-4">
                    <div className="flex">
                        <User className="mr-3 text-orange-500" size={20} />
                        <div>
                            <Typography
                                variant="small"
                                color="text-gray-700"
                                semibold
                            >
                                Cancelled By
                            </Typography>
                            <Typography variant="muted" color="text-gray-500">
                                {cancelledWp?.cancelledBy ?? 'N/A'}
                            </Typography>
                        </div>
                    </div>

                    <div className="flex">
                        <Factory className="mr-3 text-teal-500" size={20} />
                        <div>
                            <Typography
                                variant="small"
                                color="text-gray-700"
                                semibold
                            >
                                Industry Details
                            </Typography>
                            <div className="flex items-center gap-x-2">
                                <Typography
                                    variant="muted"
                                    color="text-gray-500"
                                >
                                    Name:
                                </Typography>
                                <Typography
                                    variant="muted"
                                    color="text-gray-500"
                                >
                                    {cancelledWp?.industries?.[0]?.industry
                                        ?.user?.name ?? 'N/A'}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Typography
                                    variant="muted"
                                    color="text-gray-500"
                                >
                                    Email:
                                </Typography>
                                <Typography
                                    variant="muted"
                                    color="text-gray-500"
                                >
                                    {cancelledWp?.industries?.[0]?.industry
                                        ?.user?.email ?? 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-y-4">
                    <div className="flex">
                        <BookOpen className="mr-3 text-indigo-500" size={20} />
                        <div>
                            <Typography
                                variant="small"
                                color="text-gray-700 "
                                semibold
                            >
                                Course Information
                            </Typography>
                            <Typography variant="muted" color="text-gray-500">
                                {cancelledWp?.courses?.[0]?.code ?? 'N/A'} -{' '}
                                {cancelledWp?.courses?.[0]?.title ?? 'N/A'}
                            </Typography>
                        </div>
                    </div>

                    <div className="flex">
                        <Calendar className="mr-3 text-red-500" size={20} />
                        <div>
                            <Typography
                                variant="small"
                                color="text-gray-700"
                                semibold
                            >
                                Cancellation Timeline
                            </Typography>
                            <div className="flex space-x-4">
                                <div>
                                    <Typography
                                        variant="muted"
                                        color="text-gray-500"
                                    >
                                        Created:{' '}
                                        {cancelledWp?.createdAt?.slice(0, 10) ??
                                            'N/A'}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        variant="muted"
                                        color="text-red-500"
                                    >
                                        Cancelled:{' '}
                                        {cancelledWp?.cancelledAt?.slice(
                                            0,
                                            10
                                        ) ?? 'N/A'}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
