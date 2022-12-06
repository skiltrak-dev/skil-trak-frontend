import { ContextBarLoading, NoData, Typography } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Rto, SubAdmin } from '@types'
import { useEffect } from 'react'
import { AssignedSubAdmin } from '../components'
import { AssignSubAdminForm } from '../form'

export const ViewSubAdminsCB = ({ rto }: { rto: Rto }) => {
    const { notification } = useNotification()
    const subAdmins = AdminApi.Rtos.useSubAdmins(rto.id)

    const [assignSubAdmin, assignSubAdminResult] =
        AdminApi.Rtos.useAssignSubAdmin()
    const onSubmit = async (values: any) => {
        const subAdmins = values.subAdmins.map((s: any) => s.value)
        await assignSubAdmin({
            user: rto.id,
            subAdmins,
        })
    }

    useEffect(() => {
        if (assignSubAdminResult.isSuccess) {
            notification.success({
                title: 'Sub Admin Assigned',
                description: 'Sub Admin have been assigned to RTO',
            })
        }

        if (assignSubAdminResult.isError) {
            notification.error({
                title: 'Sub Admin Assignment Failed',
                description: 'An error occurred while assigning Sub Admin(s)',
            })
        }
    }, [assignSubAdminResult])

    const [unassignSubAdmin, unassignSubAdminResult] =
        AdminApi.Rtos.useUnAssignSubAdmin()
    const onSubAdminClicked = async (subAdmin: SubAdmin) => {
        await unassignSubAdmin({
            rtoId: rto.id,
            subAdmin: subAdmin.id,
        })
    }

    useEffect(() => {
        if (unassignSubAdminResult.isSuccess) {
            notification.info({
                title: 'Sub Admin Unassigned',
                description: 'Sub Admin have been unassigned to RTO',
            })
        }

        if (unassignSubAdminResult.isError) {
            notification.error({
                title: 'Failed To Unassign',
                description: 'An error occurred while unassign sub admin(s)',
            })
        }
    }, [unassignSubAdminResult])

    return (
        <div className="flex flex-col gap-y-6">
            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Assign Sub Admins To:
                </Typography>
                <Typography variant={'label'}>{rto.user.name}</Typography>
            </div>

            <AssignSubAdminForm
                onSubmit={onSubmit}
                result={assignSubAdminResult}
            />

            <div className={'flex flex-col gap-y-2'}>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Assigned Sub Admin
                </Typography>

                <div>
                    {subAdmins.isLoading ? (
                        <ContextBarLoading />
                    ) : subAdmins.data?.subadmin.length ? (
                        subAdmins.data.subadmin.map((subAdmin: SubAdmin) => (
                            <AssignedSubAdmin
                                subAdmin={subAdmin}
                                onRemove={onSubAdminClicked}
                                result={unassignSubAdminResult}
                            />
                        ))
                    ) : (
                        <NoData text={'No Sub Admins Assigned'} />
                    )}
                </div>
            </div>
        </div>
    )
}
