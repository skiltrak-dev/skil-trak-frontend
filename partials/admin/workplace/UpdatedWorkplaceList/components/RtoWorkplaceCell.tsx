import { HideRestrictedData, Typography } from '@components'
import { UserRoles } from '@constants'
import { Rto } from '@types'
import React from 'react'

export const RtoWorkplaceCell = ({ rto }: { rto: Rto }) => {
    return (
        <>
            <Typography variant="small" semibold>
                {rto?.user?.name ?? 'N/A'}
            </Typography>
            <HideRestrictedData type={UserRoles.RTO}>
                <Typography variant="small" color="text-gray-500">
                    {rto?.user?.email ?? 'N/A'}
                </Typography>
            </HideRestrictedData>
        </>
    )
}
