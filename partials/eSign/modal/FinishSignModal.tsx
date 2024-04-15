import { ActionModal, ShowErrorNotifications } from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'

import { useRouter } from 'next/router'
import { IoWarningOutline } from 'react-icons/io5'

export const FinishSignModal = ({
    customFieldsData,
    onCancel,
}: {
    customFieldsData: any
    onCancel: Function
}) => {
    const { notification } = useNotification()
    const router = useRouter()

    const [addCustomFieldsData, addCustomFieldsDataResult] =
        CommonApi.ESign.addCustomFieldData()

    console.log({ customFieldsData })

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
                onCancel()
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
                    description={`You are about to finish Esign Do you wish to continue?`}
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
