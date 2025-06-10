import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'

import { IoMdSend } from 'react-icons/io'

export const UpdateIndustryEligibilityModal = ({
    wpReqApproval,
    onCancel,
}: {
    wpReqApproval: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const [update, updateResult] =
        SubAdminApi.Student.updateWpIndustryEligibility()

    console.log({ wpReqApproval })

    const onConfirmUClicked = async (wpReqApproval: any) => {
        const res: any = await update(Number(wpReqApproval?.id))
        if (res?.data) {
            notification.success({
                title: `Status Changed!`,
                description: `Industry "${wpReqApproval?.industry?.user?.name}" has been sent to Student!.`,
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={updateResult} />
            <ActionModal
                Icon={IoMdSend}
                variant="success"
                title="Are you sure!"
                description={`You are about to Submit industry for approval to Student <b>"${wpReqApproval?.industry?.user?.name}"</b>. Do you wish to continue?`}
                onConfirm={onConfirmUClicked}
                onCancel={onCancel}
                input
                inputKey={wpReqApproval?.industry?.user?.name}
                actionObject={wpReqApproval}
                loading={updateResult.isLoading}
            />
        </>
    )
}
