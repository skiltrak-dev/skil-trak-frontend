import {
    InitialAvatar,
    Tooltip,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import Image from 'next/image'
import { PiPhoneCallDuotone } from 'react-icons/pi'
import { CopyData } from './CopyData'
import Link from 'next/link'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { SubAdminApi } from '@queries'
import { useMemo } from 'react'

export const IndustryListingCellInfo = ({
    industryListing,
    isDuplicated,
}: {
    isDuplicated: boolean
    industryListing: any
}) => {
    const { role } = useMemo(() => getUserCredentials(), [])
    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        // refetchOnMountOrArgChange: true,
    })
    const checkCanAdmin = subadmin?.data?.canAdmin

    const basePath =
        role === UserRoles.ADMIN || (checkCanAdmin && subadmin?.data?.isAdmin)
            ? `/portals/admin/future-industries`
            : role === UserRoles.SUBADMIN
            ? `/portals/sub-admin/tasks/industry-listing`
            : '#'

    return (
        <div className={`flex items-center gap-x-1.5`}>
            <Link
                href={`${basePath}/${industryListing?.id}`}
                className="flex items-center gap-x-1.5"
            >
                {industryListing?.businessName && (
                    <InitialAvatar name={industryListing?.businessName} />
                )}

                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <div className="group flex items-center gap-x-1">
                            <Typography variant={'label'}>
                                {industryListing?.businessName}
                            </Typography>
                            <CopyData
                                text={industryListing?.businessName}
                                type={'Industry Name'}
                            />
                        </div>
                        {industryListing?.signedUp && (
                            <div className="relative group">
                                <Image
                                    src={'/images/signup.png'}
                                    alt={''}
                                    width={30}
                                    height={30}
                                />
                                <Tooltip>Signed Up</Tooltip>
                            </div>
                        )}
                        {industryListing?.isContacted && (
                            <div className="relative group">
                                <PiPhoneCallDuotone
                                    size={20}
                                    className="text-success-dark"
                                />
                                <Tooltip>Called</Tooltip>
                            </div>
                        )}
                    </div>
                    <div
                        className={` relative group ${
                            isDuplicated ? 'bg-gray-300' : ''
                        } px-1.5 rounded-md`}
                    >
                        <TruncatedTextWithTooltip
                            text={industryListing?.email}
                            maxLength={20}
                        />

                        {isDuplicated ? (
                            <Tooltip>Duplicated Found</Tooltip>
                        ) : null}
                    </div>
                </div>
            </Link>
        </div>
    )
}
