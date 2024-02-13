import { Typography } from '@components'
import { Rto } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const RtoDetail = ({ rto }: { rto: Rto }) => {
    return (
        <div className="my-3">
            <div className="flex items-center justify-between">
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

            {/*  */}
            <div className="border border-[#6B728050] rounded-md mt-2 px-3.5 py-4">
                <Image
                    src={rto?.user?.avatar || '/images/avatar.png'}
                    alt={rto?.user?.name}
                    width={60}
                    height={60}
                    className="rounded-full overflow-hidden border"
                />

                <div className="my-2.5">
                    <Typography variant="small" semibold>
                        {rto?.user?.name}
                    </Typography>
                    <Typography variant="xs" normal>
                        {rto?.user?.email}
                    </Typography>
                </div>

                {/*  */}
                <div className="grid grid-cols-2">
                    <div>
                        <Typography variant="xxs" color="text-[#979797]">
                            RTO Phone Number
                        </Typography>
                        <Typography variant="xs" normal>
                            {rto?.phone}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="xxs" color="text-[#979797]">
                            Contact Person Number
                        </Typography>
                        <Typography variant="xs" normal>
                            {rto?.phone}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
