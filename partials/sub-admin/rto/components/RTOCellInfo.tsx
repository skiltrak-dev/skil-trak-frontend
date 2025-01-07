import { useIsRestricted, useRestrictedData } from '@components'
import { InitialAvatar } from '@components/InitialAvatar'
import { Rto } from '@types'
import { setLink } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const RTOCellInfo = ({ rto }: { rto: Rto }) => {
    const router = useRouter()
    const canAccessRtoProfile = useIsRestricted('canAccessRtoProfile', false)

    return (
        <Link
            legacyBehavior
            href={
                canAccessRtoProfile
                    ? `/portals/sub-admin/users/rtos/${rto?.id}?tab=overview`
                    : '#'
            }
        >
            <a
                className="flex items-center gap-x-2 relative z-10"
                onClick={() => {
                    setLink('subadmin-rtos', router)
                }}
            >
                <div className="shadow-inner-image rounded-full">
                    {rto?.user?.name && (
                        <InitialAvatar
                            name={rto?.user?.name}
                            imageUrl={rto?.user?.avatar}
                        />
                    )}
                </div>
                <div>
                    <p className={'font-semibold'}>{rto?.user?.name}</p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {rto?.user?.email}
                        </p>
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhoneIphone />
                            </span>
                            {rto?.phone}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
