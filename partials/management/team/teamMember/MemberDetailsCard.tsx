import React from 'react'
import { KpiTypeCard } from './components'

export const MemberDetailsCard = () => {
    return (
        <div className='grid grid-cols-4 gap-5'>
            <KpiTypeCard />
            <KpiTypeCard />
            <KpiTypeCard />
            <KpiTypeCard />
        </div>
    )
}
