// components
import { Typography, Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

import { useAssignToSubAdminMutation } from '@queries'
import { useEffect } from 'react'

// utils
import { ellipsisText } from '@utils'

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
                        <span
                            className="font-semibold"
                            title={workplace?.assignedTo?.user?.name}
                        >
                            {ellipsisText(
                                workplace?.assignedTo?.user?.name,
                                15
                            )}
                        </span>
                    </Typography>
                </div>
            ) : (
                <Button
                    variant={'dark'}
                    text={'ASSIGN TO ME'}
                    onClick={() => {
                        if (appliedIndustry) {
                            assignToMe({
                                industryId: appliedIndustry?.id,
                                id: workplace?.id,
                            })
                        } else {
                            notification.error({
                                title: 'First Apply To Industry',
                                description:
                                    'Student Must apply to industry Before placing Coordinator or Coordinator also apply to industry on behalf of Student',
                                autoDismiss: false,
                            })
                        }
                    }}
                    loading={assignToMeResult?.isLoading}
                    disabled={
                        assignToMeResult?.isLoading ||
                        workplace?.currentStatus === 'cancelled'
                    }
                />
            )}
        </div>
    )
}
