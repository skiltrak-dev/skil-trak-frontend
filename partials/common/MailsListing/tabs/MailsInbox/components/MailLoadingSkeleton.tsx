import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const MailLoadingSkeleton = () => {
    return (
        <Skeleton
            containerClassName={'mb-0 pb-0 h-11'}
            className="w-full h-10 block mb-0 pb-0 "
            baseColor={'#00000005'}
        />
    )
}
