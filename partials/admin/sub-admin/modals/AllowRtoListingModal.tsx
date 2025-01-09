import { ActionModal } from '@components'
import { useAlert, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { SubAdmin } from '@types'
import { useEffect } from 'react'
import { FaSchool } from 'react-icons/fa'
export const AllowRtoListingModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: () => void
}) => {
    const { alert } = useAlert()
    const { notification } = useNotification()
    // const { onBlock, changeStatusResult } = useChangeStatus()
    const [allowRtoListing, allowRtoListingResult] =
        AdminApi.Admin.useAllowRtoListing()
    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await allowRtoListing(subAdmin?.id)
    }

    useEffect(() => {
        if (allowRtoListingResult?.isSuccess) {
            alert.error({
                title: `subAdmin Allowed for Rto Listing`,
                description: `subAdmin "${subAdmin?.user?.name}" has been Allowed for RTO Listing.`,
            })
            onCancel()
        }
        if (allowRtoListingResult?.isError) {
            notification.error({
                title: 'Request Failed',
                description: `Your request for allowing subAdmin for RTO Listing was failed`,
            })
        }
    }, [allowRtoListingResult])

    return (
        <ActionModal
            Icon={FaSchool}
            variant="error"
            title="Are you sure!"
            description={`You are about to allow <em>"${subAdmin?.user?.name}"</em> for RTO Listing. Do you wish to continue?`}
            onConfirm={onConfirmClicked}
            onCancel={onCancel}
            input
            inputKey={subAdmin?.user?.email}
            actionObject={subAdmin}
            loading={allowRtoListingResult?.isLoading}
        />
    )
}
