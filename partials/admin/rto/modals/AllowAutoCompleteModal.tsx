import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { MdAdminPanelSettings, MdIncompleteCircle } from 'react-icons/md'

export const AllowAutoCompleteModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [allowAutoUpdate, allowAutoUpdateResult] =
        AdminApi.Rtos.rtoAutoComplete()

    const onConfirmClicked = async (rto: Rto) => {
        await allowAutoUpdate(rto?.id).then((res: any) => {
            if (res?.data) {
                notification?.[rto?.allowAutoComplete ? 'error' : 'success']({
                    title: rto?.allowAutoComplete
                        ? 'Removed Auto Complete'
                        : `Allowed Auto Complete`,
                    description: rto?.allowAutoComplete
                        ? 'Removed Auto Complete'
                        : `Allowed Auto Complete`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={allowAutoUpdateResult} />
            <ActionModal
                Icon={MdIncompleteCircle}
                variant="success"
                title="Are you sure!"
                description={`You are about to ${
                    rto?.allowAutoComplete ? 'remove' : 'allow'
                } <em>"${
                    rto?.user?.name
                }"</em> auto complete placement. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={rto?.user?.email}
                actionObject={rto}
                loading={allowAutoUpdateResult?.isLoading}
            />
        </>
    )
}
