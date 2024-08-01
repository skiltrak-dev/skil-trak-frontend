import { TruncatedTextWithTooltip } from '@components'
import React from 'react'
import { CopyData } from './CopyData'

export const AddressCell = ({ address }: { address: string }) => {
    return (
        <div className="group flex items-center gap-x-1">
            <TruncatedTextWithTooltip text={address} />
            <CopyData text={address} type={'Address'} />
        </div>
    )
}
