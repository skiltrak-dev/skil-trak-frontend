import React from 'react'
import { RADIUS_BUCKETS } from './constants/sectors'
import { Typography } from '@components'

export const RadiusBuckets = () => {
    return (
        <div className="w-full flex flex-col space-y-1">
            <Typography variant="label">Radius Buckets (predefined)</Typography>
            <div className="w-full bg-gray-50 p-2 rounded-lg">
                <div className="grid grid-cols-6 lg:grid-cols-12 gap-1">
                    {RADIUS_BUCKETS.map((radius) => (
                        <div
                            key={radius}
                            className="p-1 bg-white rounded border text-center"
                        >
                            <Typography variant="xs" color="text-gray-600">
                                {radius}
                            </Typography>
                        </div>
                    ))}
                </div>
                <div className="mt-1">
                    <Typography variant="xs" color="text-gray-500">
                        For grouping results only
                    </Typography>
                </div>
            </div>
        </div>
    )
}
