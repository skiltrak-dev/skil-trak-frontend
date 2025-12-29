import { ActionModal, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'
import { IoWarningOutline } from 'react-icons/io5'
import { getUserCredentials } from '@utils'
export const FinishSignModal = ({
    customFieldsData,
    onCancel,
}: {
    customFieldsData: any
    onCancel?: Function
}) => {
    const { notification } = useNotification()
    const router = useRouter()
    const role = getUserCredentials()?.role
    const [addCustomFieldsData, addCustomFieldsDataResult] =
        CommonApi.ESign.addCustomFieldData()

    const onConfirmUClicked = () => {
        addCustomFieldsData({
            documentId: Number(router.query?.id),
            tabsResponse: customFieldsData
                ?.filter((data: any) => data?.isCustom && data?.fieldValue)
                ?.map((tab: any) => ({
                    tab: tab?.id,
                    data: tab?.fieldValue,
                })),
        }).then((res: any) => {
            if (res?.data) {
                // onCancel()
                router.back()
            }
        })
    }

    return (
        <>
            <ShowErrorNotifications result={addCustomFieldsDataResult} />
            <div className="relative z-[11111111]">
                <ActionModal
                    Icon={IoWarningOutline}
                    variant="success"
                    title="Are you sure!"
                    description={`${
                        role === UserRoles?.RTO
                            ? 'Please review the e-sign document before finishing. Once completed, the document will be approved.'
                            : 'You are about to finish Esign Do you wish to continue?'
                    }`}
                    onConfirm={onConfirmUClicked}
                    onCancel={onCancel}
                    input
                    inputKey={customFieldsData}
                    actionObject={customFieldsData}
                    loading={addCustomFieldsDataResult.isLoading}
                />
            </div>
        </>
    )
}
