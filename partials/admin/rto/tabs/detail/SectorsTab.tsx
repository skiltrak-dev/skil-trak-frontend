import React from 'react'

// hooks
import { useContextBar } from 'hooks'

// components
import { EmptyData } from '@components'
import { SectorCard } from '@partials/admin/components'

// hooks
import { useGetSectors } from '@hooks'

export const SectorsTab = ({ rto }: any) => {
    const { isVisible } = useContextBar()
    const sectors = useGetSectors({
        data: rto?.data?.courses,
        isSuccess: rto?.isSuccess,
    })
    console.log('sectors', sectors)
    return sectors && sectors.length > 0 ? (
        <div
            className={`grid ${
                isVisible ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            } grid-cols-1 sm:grid-cols-2 gap-3`}
        >
            {sectors.map((sector, i) => (
                <SectorCard key={i} sector={sector} index={i} />
            ))}
        </div>
    ) : (
        <EmptyData />
    )
}
