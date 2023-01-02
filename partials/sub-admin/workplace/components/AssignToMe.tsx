// components
import { Typography, Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

import { useAssignToSubAdminMutation } from '@queries'
import { useEffect, useState } from 'react'

// utils
import { ellipsisText } from '@utils'
import { SmallActionModal } from '../modals'
import { HiCheckBadge } from 'react-icons/hi2'

export const AssignToMe = ({ workplace, appliedIndustry }: any) => {
    const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()
    const [modal, setModal] = useState<any | null>(null)

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (assignToMeResult.isSuccess) {
            notification.success({
                title: 'Workplace Assigned',
                description: 'Workplace Assigned to you Successfully',
            })
            setModal(
                <SmallActionModal
                    Icon={HiCheckBadge}
                    title={'Successfully Assigned'}
                    subtitle={
                        'Now You can take an Interview from Student, You can select the interview from top right options of workplace'
                    }
                    onCancel={() => setModal(null)}
                />
            )
            // setTimeout(() => {
            //     setModal(null)
            // }, 5000)
        }
    }, [assignToMeResult])

    return (
        <div>
            {modal && modal}
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
