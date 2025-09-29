import { Badge, Card, Typography } from '@components'
import React from 'react'

export const IndustryProgressBar = ({
    percentage,
    showPercentage,
    height,
    missingAttributes,
}: {
    missingAttributes?: string[]
    height?: number
    percentage: number
    showPercentage?: boolean
}) => {
    return (
        <div className="relative group">
            <div
                className="w-full bg-gray-200 rounded-full  overflow-hidden relative"
                style={{
                    height: `${height || 6}px`,
                }}
            >
                <div
                    className={`${
                        missingAttributes && missingAttributes?.length > 0
                            ? 'bg-red-600'
                            : 'bg-green-500'
                    } h-full rounded-full transition-all duration-300 ease-out relative`}
                    style={{
                        width: percentage ? `${Number(percentage)}%` : 0,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white opacity-30 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    {showPercentage && (
                        <span
                            className={`text-[11px] font-semibold ${
                                percentage > 50 ? 'text-white' : 'text-black'
                            } drop-shadow-sm`}
                        >
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            </div>

            {/*  */}
            {missingAttributes && missingAttributes?.length > 0 && (
                <div className="absolute top-full hidden group-hover:block w-full z-20 ">
                    <Card>
                        <div className="space-y-1.5">
                            <Typography variant="label" medium>
                                Missing Attributes
                            </Typography>
                            {missingAttributes?.map((ma) => (
                                <Badge text={ma} variant="error" />
                            ))}
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300 ease-out relative"
                style={{
                    width: `${Number(percentage)}%`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white  opacity-30 animate-pulse"></div>
            </div>
        </div>
    )
}
