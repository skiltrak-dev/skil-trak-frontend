import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { SubAdmin } from '@types'
import { FaSchool } from 'react-icons/fa'
export const AllowIndustryListingModal = ({
    subAdmin,
    onCancel,
}: {
    subAdmin: SubAdmin
    onCancel: Function
}) => {
    const { notification } = useNotification()
    // const { onBlock, changeStatusResult } = useChangeStatus()
    const [allowIndustryListing, allowIndustryListingResult] =
        AdminApi.Admin.allowIndustryListing()
    const onConfirmClicked = async (subAdmin: SubAdmin) => {
        await allowIndustryListing(subAdmin?.id).then((res: any) => {
            if (res?.data) {
                notification.error({
                    title: `subAdmin Allowed for Industry Listing`,
                    description: `subAdmin "${subAdmin?.user?.name}" has been Allowed for Industry Listing.`,
                })
                onCancel()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={allowIndustryListingResult} />
            <ActionModal
                Icon={FaSchool}
                variant="error"
                title="Are you sure!"
                description={`You are about to allow <em>"${subAdmin?.user?.name}"</em> for Industry Listing. Do you wish to continue?`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={subAdmin?.user?.email}
                actionObject={subAdmin}
                loading={allowIndustryListingResult?.isLoading}
            />
        </>
    )
}
