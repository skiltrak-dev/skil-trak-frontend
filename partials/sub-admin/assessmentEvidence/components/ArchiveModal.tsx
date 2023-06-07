import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { useChangeStatus } from '@partials/admin/sub-admin'
import { AdminApi, SubAdminApi } from '@queries'
import { Student, Subscriber } from '@types'
import { useEffect } from 'react'
import { FaBan } from 'react-icons/fa'
import { IoWarningOutline } from 'react-icons/io5'

export const ArchiveModal = ({
    item,
    onCancel,
}: {
    item: any
    onCancel: Function
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    const [changeStatus, changeStatusResult] =
        SubAdminApi.AssessmentEvidence.useArchiveAssessmentEvidence()

    const onConfirmClicked = async (item: any) => {
        await changeStatus(item)
    }

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            alert.success({
                title:
                    item.status === 'approved'
                        ? 'Request Archived'
                        : 'Request Un-Archived',
                description:
                    item.status === 'approved'
                        ? `Student "${item?.student?.user.name}" has been archived.`
                        : `Student "${item?.student?.user.name}" has been un-archived.`,
            })
            onCancel()
        }
        if (changeStatusResult.isError) {
            notification.error({
                title: 'Request Failed',
                description:
                    item.status === 'approved'
                        ? `Your request for archiving Student was failed`
                        : `Your request for un-archiving Student was failed`,
            })
        }
    }, [changeStatusResult])

    return (
        <ActionModal
            Icon={IoWarningOutline}
            variant="primary"
            title="Are you sure!"
            description={
                item.status === 'approved'
                    ? `You are about to archive <em>"${item?.student?.user?.name}"<em>. Do you wish to continue?`
                    : `You are about to un-archive <em>"${item?.student?.user?.name}"<em>. Do you wish to continue?`
            }
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={item?.student?.user?.email}
            actionObject={item}
            loading={changeStatusResult.isLoading}
        />
    )
}
