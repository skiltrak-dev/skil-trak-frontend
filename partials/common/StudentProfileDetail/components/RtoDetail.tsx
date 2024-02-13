import { Typography } from '@components'
import { Rto } from '@types'
import Link from 'next/link'
import React from 'react'

export const RtoDetail = ({ rto }: { rto: Rto }) => {
    return (
        <div className="my-3">
            <div>
                <Typography variant="small" medium>
                    RTO
                </Typography>
                <Link
                    href={`/portals/sub-admin/users/rtos/${rto?.id}?tab=overview`}
                >
                    <Typography variant="xs" color="text-info" medium>
                        All Details
                    </Typography>
                </Link>
            </div>
        </div>
    )
}
