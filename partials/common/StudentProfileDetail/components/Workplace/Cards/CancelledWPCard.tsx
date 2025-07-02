import { Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const CancelledWPCard = ({ workplace }: { workplace: any }) => {
    return (
        <div className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <Typography
                                color="text-gray-900"
                                medium
                                variant="small"
                            >
                                {workplace?.course?.code}
                            </Typography>

                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                CANCELLED
                            </span>
                        </div>
                        <Typography color="text-gray-600" variant="small">
                            {workplace?.course?.title}
                        </Typography>
                    </div>
                </div>

                <div>
                    <Typography color="text-gray-500" center variant="small">
                        Industry
                    </Typography>
                    <Typography
                        color="text-gray-600"
                        center
                        variant="small"
                        bold
                    >
                        {workplace?.industry?.user?.name}
                    </Typography>
                </div>

                <div className="text-right">
                    <Typography color="text-gray-500" variant="small">
                        by {workplace?.type}
                    </Typography>
                    <Typography variant={'xxs'} color={'text-gray-700'} medium>
                        <span className="whitespace-pre">
                            {moment(workplace?.createdAt).format('Do MMM YYYY')}
                        </span>
                    </Typography>
                </div>
            </div>
        </div>
    )
}
