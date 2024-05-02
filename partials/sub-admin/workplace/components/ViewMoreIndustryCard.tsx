import React, { useEffect } from 'react'
import Link from 'next/link'
import { Industry } from '@types'
import { BsDot } from 'react-icons/bs'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { InitialAvatar, ShowErrorNotifications, Typography } from '@components'
import { useAddExistingIndustriesMutation } from '@queries'
import { useNotification } from '@hooks'
import { PulseLoader } from 'react-spinners'

export const ViewMoreIndustryCard = ({
    industry,
    onCancel,
    workplaceId,
}: {
    workplaceId: number
    industry: {
        distance: string
        industry: Industry
    }
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()

    useEffect(() => {
        if (addExistingIndustryResult.isSuccess) {
            notification.success({
                title: 'Industry Added Successfully',
                description: 'Industry Added Successfully',
            })
            onCancel()
        }
    }, [addExistingIndustryResult])

    const onApplyIndustry = () => {
        addExistingIndustry({
            workplaceId,
            industryId: industry?.industry?.id,
        })
    }

    const role = getUserCredentials()?.role
    return (
        <>
            <ShowErrorNotifications result={addExistingIndustryResult} />
            <div className="bg-secondary py-1 px-2 rounded-lg flex flex-col lg:flex-row justify-between lg:items-center">
                <Link
                    href={
                        role === UserRoles.ADMIN
                            ? `/portals/admin/industry/${industry?.industry?.id}?tab=sectors`
                            : role === UserRoles.SUBADMIN
                            ? `/portals/sub-admin/users/industries/${industry?.industry?.id}?tab=overview`
                            : '#'
                    }
                    className="flex items-center gap-x-2 cursor-pointer"
                >
                    {industry?.industry?.user?.name && (
                        <InitialAvatar
                            name={industry?.industry?.user?.name}
                            imageUrl={industry?.industry?.user?.avatar}
                        />
                    )}
                    <div>
                        <div className="flex items-center gap-x-0.5">
                            <Typography variant={'label'}>
                                <span className="cursor-pointer">
                                    {industry?.industry?.user?.name}
                                </span>
                            </Typography>
                            <BsDot />
                            <Typography variant={'xs'} color={'text-gray-500'}>
                                {Number(industry?.distance)?.toFixed(2)} Km Away
                            </Typography>
                        </div>
                        <Typography variant={'muted'} color={'gray'}>
                            {industry?.industry?.addressLine1},{' '}
                            {industry?.industry?.addressLine2}
                        </Typography>
                    </div>
                </Link>
                <div className="flex items-center gap-x-2 ml-auto">
                    <Typography variant={'xs'} color={'text-red-800'} center>
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                onApplyIndustry()
                            }}
                        >
                            {addExistingIndustryResult.isLoading ? (
                                <PulseLoader size={4} />
                            ) : (
                                'APPLY HERE'
                            )}
                        </span>
                    </Typography>
                </div>
            </div>
        </>
    )
}
