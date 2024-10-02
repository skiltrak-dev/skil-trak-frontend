import React from 'react'

export const SkeletonLoader = ({
    width = 'w-full',
    height = 'h-4',
    className = '',
}: any) => (
    <div
        className={`bg-gray-200 rounded ${className} ${width} ${height} animate-pulse`}
    ></div>
)
