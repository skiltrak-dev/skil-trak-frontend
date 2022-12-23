import { ContextBarLoading, NoData, Typography } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'

import { Rto, SubAdmin } from '@types'
import { useEffect } from 'react'
import { AssignedRto } from '../components'
import { AssignRtoForm } from '../form'

export const ViewRtosCB = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    const { notification } = useNotification()
    const rtoList = AdminApi.SubAdmins.useRtos(subAdmin.id)

    const [assignRto, assignRtoResult] = AdminApi.SubAdmins.useAssignRto()

    const onSubmit = async (values: any) => {
        await assignRto({
            subadmin: subAdmin.id,
            rto: values.rto.value,
        })
    }

    useEffect(() => {
        if (assignRtoResult.isSuccess) {
            notification.success({
                title: 'RTO Assigned',
                description: 'RTO have been assigned to sub admin',
            })
        }

        if (assignRtoResult.isError) {
            notification.error({
                title: 'RTO Assignment Failed',
                description: 'An error occurred while assigning RTO(s)',
            })
        }
    }, [assignRtoResult])

    const [unassign, unassignResult] = AdminApi.SubAdmins.useUnassignRto()
    const onRemoveClicked = async (rto: Rto) => {
        await unassign({
            id: rto.id,
            subAdmin: subAdmin.id,
        })
    }

    useEffect(() => {
        if (unassignResult.isSuccess) {
            notification.info({
                title: 'RTO Unassigned',
                description: 'RTO have been unassigned to RTO',
            })
        }

        if (unassignResult.isError) {
            notification.error({
                title: 'Failed To Unassign',
                description: 'An error occurred while unassign RTO(s)',
            })
        }
    }, [unassignResult])

    return (
        <div className="flex flex-col gap-y-6">
            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Assign Rto To:
                </Typography>
                <Typography variant={'label'}>{subAdmin.user.name}</Typography>
            </div>

            <AssignRtoForm onSubmit={onSubmit} result={assignRtoResult} />

            <div className={'flex flex-col gap-y-2'}>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Assigned RTOs
                </Typography>

                <div>
                    {rtoList.isLoading ? (
                        <ContextBarLoading />
                    ) : rtoList.data?.length ? (
                        rtoList.data.map((rto: Rto) => (
                            <AssignedRto rto={rto} onRemove={onRemoveClicked} />
                        ))
                    ) : (
                        <NoData text={'No RTOs Assigned'} />
                    )}
                </div>
            </div>
        </div>
    )
}
