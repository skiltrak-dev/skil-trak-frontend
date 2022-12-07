// components
import { Typography, Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

import { useAssignToSubAdminMutation } from '@queries'
import { useEffect } from 'react'

export const AssignToMe = ({ workplace, appliedIndustry }: any) => {
    const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (assignToMeResult.isSuccess) {
            notification.success({
                title: 'Workplace Assigned',
                description: 'Workplace Assigned to you Successfully',
            })
        }
    }, [assignToMeResult])

    return (
        <div>
            <ShowErrorNotifications result={assignToMeResult} />

            <Typography variant={'xs'} color={'text-gray-400'}>
                Allocated To:
            </Typography>
            {workplace?.assignedTo ? (
                <div>
                    <Typography variant={'small'} capitalize>
                        <span className="font-semibold">
                            {workplace?.assignedTo?.user?.name}
                        </span>
                    </Typography>
                </div>
            ) : (
                <Button
                    variant={'dark'}
                    text={'ASSIGN TO ME'}
                    onClick={() => {
                        assignToMe({
                            industryId: appliedIndustry?.id,
                            id: workplace?.id,
                        })
                    }}
                    loading={assignToMeResult?.isLoading}
                    disabled={assignToMeResult?.isLoading}
                />
            )}
        </div>
    )
}
