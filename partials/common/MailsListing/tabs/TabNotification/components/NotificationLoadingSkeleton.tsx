import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const NotificationLoadingSkeleton = () => {
    return (
        <Skeleton
            containerClassName={'mb-0 pb-0 h-16'}
            className="w-full h-[60px] block mb-0 pb-0 "
            baseColor={'#00000005'}
        />
    )
}
