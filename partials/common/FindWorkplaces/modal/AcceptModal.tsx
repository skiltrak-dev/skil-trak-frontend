import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

export const AcceptModal = ({
    industry,
    onCancel,
}: {
    industry: any
    onCancel: () => void
}) => {
    const filterCurrentSector = industry?.industry?.sectorCapacity?.filter(
        (sector: any) => {
            if (sector?.id === industry?.sector?.id) {
                return sector
            }
        }
    )
    const { notification } = useNotification()
    const router = useRouter()

    const [changeStatus, changeStatusResult] =
        CommonApi.FindWorkplace.useChangePendingIndustryStatus()

    const onConfirmClicked = async (industry: any) => {
        const res: any = await changeStatus({
            params: {
                id: industry?.id,
                status: 'approved',
            },
        })

        if (res?.data) {
            notification.success({
                title: `Industry Accept`,
                description: `Industry "${industry?.industry?.user?.name}" has been accept.`,
            })
            router.push(
                `/portals/sub-admin/users/industries/${industry?.industry?.id}`
            )
            onCancel()
        }
    }

    useEffect(() => {}, [changeStatusResult])

    return (
        <>
            <ShowErrorNotifications result={changeStatusResult} />
            <ActionModal
                Icon={HiCheckBadge}
                variant="success"
                title="Confirm Sector Approval"
                description={`This Sector is accepting <strong>(${
                    industry?.industry?.industrySectorCapacity[0]?.capacity ??
                    'N/A'
                })</strong> Students <br/> You are about to approve the selected sector for this industry. Once approved, you will be redirected to the Courses Approval Page.<br/><br/> <strong>On the next page, you will need to:</strong> <br/> <br/>Provide a description for each course in this sector. Add a relevant reference URL for each course. Please ensure all information is accurate and complete before finalizing the industry approval.`}
                onConfirm={onConfirmClicked}
                onCancel={onCancel}
                input
                inputKey={industry?.industry?.user?.email}
                actionObject={industry}
                loading={changeStatusResult.isLoading}
                confirmText={'Approve Sector'}
            />
        </>
    )
}
