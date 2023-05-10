import { useEffect, useState } from 'react'

// components
import { Select, ShowErrorNotifications, Typography } from '@components'

// queries
import { AdminApi } from '@queries'

// utils
import { ellipsisText } from '@utils'
import { useNotification } from '@hooks'

export const AssignWorkplace = ({ workplace }: { workplace: any }) => {
    const { notification } = useNotification()

    const subadmins = AdminApi.Workplace.subadminForAssignWorkplace()
    const [assignSubAdmin, assignSubAdminResult] =
        AdminApi.Workplace.useWorkplaceMutation()

    useEffect(() => {
        if (assignSubAdminResult.isSuccess) {
            notification.success({
                title: 'Subadmin Assigned',
                description: 'Subadmin Assigned Successfully',
            })
        }
    }, [assignSubAdminResult])

    const subAdminOptions = subadmins?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.id,
    }))

    const onAssignSubAdmin = (e: any) => {
        assignSubAdmin({ subadmin: e?.value, workplace: workplace?.id })
    }
    return (
        <div>
            <ShowErrorNotifications result={assignSubAdminResult} />
            {workplace?.assignedTo ? (
                <>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        <span className="font-semibold">Assigned To:</span>
                    </Typography>
                    <Typography variant={'small'} capitalize>
                        <span
                            className="font-semibold"
                            title={workplace?.assignedTo?.user?.name}
                        >
                            {ellipsisText(
                                workplace?.assignedTo?.user?.name,
                                15
                            )}
                        </span>
                    </Typography>{' '}
                </>
            ) : (
                <Select
                    label={'Sub Admin'}
                    name={'subAdmin'}
                    placeholder={'Select Sub Admin'}
                    options={subAdminOptions}
                    loading={subadmins?.isLoading}
                    disabled={subadmins?.isLoading}
                    onChange={(e: any) => {
                        onAssignSubAdmin(e)
                    }}
                />
            )}
        </div>
    )
}
