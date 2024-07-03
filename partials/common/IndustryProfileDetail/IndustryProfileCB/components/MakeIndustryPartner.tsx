import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { ReactElement, useState } from 'react'
import {
    ShowErrorNotifications,
    Switch,
    Tooltip,
    TooltipPosition,
    Typography,
} from '@components'
import { AddToPartnerModal } from '@partials/sub-admin/Industries/modals/AddToPartnerModal'
import { IoInformationCircleSharp } from 'react-icons/io5'

export const MakeIndustryPartner = ({
    industryId,
    isPartner,
}: {
    industryId: number
    isPartner: boolean
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [addToPartner, addToPartnerResult] =
        SubAdminApi.Industry.useAddToPartner()

    const { notification } = useNotification()

    const onCancelClicked = () => setModal(null)

    const onAddPartner = () => {
        setModal(
            <AddToPartnerModal
                industry={industryId}
                onCancel={onCancelClicked}
            />
        )
    }

    const onRemovePartner = () => {
        addToPartner({ industry: industryId, studentCapacity: 0 })?.then(
            (res: any) => {
                if (res?.data) {
                    notification.error({
                        title: 'Industry Removed from Partner',
                        description:
                            'Industry Removed from Partner Successfully',
                    })
                }
            }
        )
    }
    return (
        <div>
            {modal}
            <ShowErrorNotifications result={addToPartnerResult} />
            <div className="py-4 border-b border-secondary-dark flex justify-between items-center">
                <div className="flex items-center gap-x-1">
                    <Typography variant="small" medium>
                        Partner
                    </Typography>
                    <div className="relative group ">
                        <IoInformationCircleSharp className="text-lg mt-0.5 text-gray-400 hover:text-gray-600 transition-all" />
                        <Tooltip position={TooltipPosition.left}>
                            Updated By :Saad
                        </Tooltip>
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <Typography variant="small" bold color={'text-[#BF0000]'}>
                        NO
                    </Typography>
                    <div className="-mb-2">
                        <Switch
                            name="isPartner"
                            onChange={() => {
                                isPartner ? onRemovePartner() : onAddPartner()
                            }}
                            value={isPartner}
                            defaultChecked={isPartner}
                            customStyleClass={'profileSwitch'}
                            loading={addToPartnerResult.isLoading}
                            disabled={addToPartnerResult.isLoading}
                        />
                    </div>
                    <Typography variant="small" bold>
                        YES
                    </Typography>
                </div>
            </div>
        </div>
    )
}
