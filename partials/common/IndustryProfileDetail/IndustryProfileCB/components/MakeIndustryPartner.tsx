import {
    ShowErrorNotifications,
    Switch,
    Tooltip,
    TooltipPosition,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { RemoveAddToPartnerModal } from '@partials/sub-admin/Industries'
import { SubAdminApi } from '@queries'
import { PartnerRemovalRequests, User } from '@types'
import { getUserCredentials } from '@utils'
import { ReactElement, useState } from 'react'
import { CiSquareQuestion } from 'react-icons/ci'
import { IoInformationCircleSharp } from 'react-icons/io5'

export const MakeIndustryPartner = ({
    industryId,
    isPartner,
    PartneredBy,
    partnerRemovalRequests,
}: {
    PartneredBy: User
    industryId: number
    isPartner: boolean
    partnerRemovalRequests: PartnerRemovalRequests | undefined
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [addToPartner, addToPartnerResult] =
        SubAdminApi.Industry.useAddToPartner()

    const { notification } = useNotification()

    const onCancelClicked = () => setModal(null)

    const onAddPartner = () => {
        // setModal(
        //     <AddToPartnerModal
        //         industry={industryId}
        //         onCancel={onCancelClicked}
        //     />
        // )
        addToPartner({ industry: industryId })?.then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Industry Added as Partner',
                    description: 'Industry Added as Partner Successfully',
                })
            }
        })
    }

    const onRemovePartner = () => {
        if (partnerRemovalRequests) {
            notification.warning({
                title: 'Removal Partner Request Already Sent',
                description: 'Removal Partner Request Already Sent',
            })
        } else {
            setModal(
                <RemoveAddToPartnerModal
                    industry={industryId}
                    onCancel={onCancelClicked}
                />
            )
        }
        // addToPartner({ industry: industryId, studentCapacity: 0 })?.then(
        //     (res: any) => {
        //         if (res?.data) {
        //             notification.error({
        //                 title: 'Industry Removed from Partner',
        //                 description:
        //                     'Industry Removed from Partner Successfully',
        //             })
        //         }
        //     }
        // )
    }
    const role = getUserCredentials()?.role
    const checkRto = role === UserRoles.RTO

    return (
        <div>
            {modal}
            <ShowErrorNotifications result={addToPartnerResult} />
            <div className="py-4 border-b border-secondary-dark flex justify-between items-center">
                <div className="flex items-center gap-x-1">
                    <Typography variant="small" medium>
                        Partner
                    </Typography>
                    {PartneredBy ? (
                        <div className="relative group ">
                            <IoInformationCircleSharp className="text-lg mt-0.5 text-gray-400 hover:text-gray-600 transition-all" />
                            <Tooltip position={TooltipPosition.left}>
                                <span className={'text-xs'}>
                                    Partnered By : {PartneredBy?.name}
                                </span>
                            </Tooltip>
                        </div>
                    ) : null}
                </div>
                <div className="flex items-center gap-x-2">
                    {partnerRemovalRequests && (
                        <div className="relative group">
                            <CiSquareQuestion size={22} />
                            <Tooltip position={TooltipPosition.center}>
                                Removal Partner Request Already Sent
                            </Tooltip>
                        </div>
                    )}
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
                            {...(isPartner ? { isChecked: isPartner } : {})}
                            defaultChecked={isPartner}
                            customStyleClass={'profileSwitch'}
                            loading={addToPartnerResult.isLoading}
                            disabled={
                                addToPartnerResult.isLoading ||
                                checkRto ||
                                !!partnerRemovalRequests
                            }
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
