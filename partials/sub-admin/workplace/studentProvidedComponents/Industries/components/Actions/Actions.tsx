import { useEffect, useState, ReactElement } from 'react'
import moment from 'moment'

// components
import { Typography, ShowErrorNotifications } from '@components'
import { AfterPlacementActions } from './components'

// query
import {
    useAgrementSignMutation,
    useStartPlacementMutation,
    useIndustryResponseMutation,
    useUpdateWorkplaceStatusMutation,
    useForwardWorkplaceToIndustryMutation,
    useChangeCustomIndustryStatusMutation,
} from '@queries'
import { Button } from '@components/buttons'
import { useNotification } from '@hooks'
import { userStatus } from '@utils'
import { ForwardModal } from '@partials/sub-admin/workplace/modals'

export const Actions = ({
    appliedIndustry,
    workplaceId,
    workplace,
    folders,
}: any) => {
    const [actionStatus, setActionStatus] = useState<any | string>('')
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [changeCustomIndustryStatus, changeCustomIndustryStatusResult] =
        useChangeCustomIndustryStatusMutation()
    const [industryResponse, industryResponseResult] =
        useIndustryResponseMutation()
    const [agrementSign, agrementSignResult] = useAgrementSignMutation()
    const [startPlacement, startPlacementResult] = useStartPlacementMutation()
    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()

    // hooks
    const { notification } = useNotification()

    useEffect(() => {
        if (updateStatusResult.isSuccess) {
            notification.success({
                title: `Workplace ${actionStatus}`,
                description: `Workplace ${actionStatus} Successfully`,
            })
        }
        if (startPlacementResult.isSuccess) {
            notification.success({
                title: `Placement Started`,
                description: `WPlacement Started Successfully`,
            })
        }
    }, [updateStatusResult, startPlacementResult])

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onForwardClicked = (industry: any) => {
        setModal(
            <ForwardModal
                industry={industry}
                workplaceId={workplaceId}
                folders={folders}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    return (
        <div className="mt-1.5 mb-2.5">
            {modal && modal}
            <ShowErrorNotifications result={updateStatusResult} />
            <ShowErrorNotifications result={startPlacementResult} />
            <ShowErrorNotifications result={agrementSignResult} />
            <ShowErrorNotifications result={industryResponseResult} />

            {workplace?.industryStatus === 'pending' ? (
                <div className="flex items-center gap-x-2">
                    <Button
                        text={'Approve Industry'}
                        onClick={() => {
                            if (workplace?.assignedTo) {
                                changeCustomIndustryStatus({
                                    id: appliedIndustry?.industry?.user?.id,
                                    status: userStatus.APPROVED,
                                })
                            } else {
                                notification.error({
                                    title: 'Changing Status Failed',
                                    description:
                                        'You can,t change the status without assigning Workplace',
                                })
                            }
                        }}
                        loading={changeCustomIndustryStatusResult.isLoading}
                        disabled={changeCustomIndustryStatusResult.isLoading}
                    />
                    <Button
                        text={'Reject Industry'}
                        variant={'dark'}
                        onClick={() => {
                            if (workplace?.assignedTo) {
                                changeCustomIndustryStatus({
                                    id: appliedIndustry?.industry?.user?.id,
                                    status: userStatus.REJECTED,
                                })
                            } else {
                                notification.error({
                                    title: 'Changing Status Failed',
                                    description:
                                        'You can,t change the status without assigning Workplace',
                                })
                            }
                        }}
                        loading={changeCustomIndustryStatusResult.isLoading}
                        disabled={changeCustomIndustryStatusResult.isLoading}
                    />
                </div>
            ) : null}

            {workplace?.industryStatus === 'approved' ? (
                <div className="flex items-center gap-x-2">
                    {!appliedIndustry?.AgreementSigned && (
                        <Button
                            text={'SIGN AGREEMENT'}
                            variant={'dark'}
                            onClick={() => {
                                agrementSign(appliedIndustry?.id)
                            }}
                            loading={agrementSignResult.isLoading}
                            disabled={agrementSignResult.isLoading}
                        />
                    )}
                    {!appliedIndustry.placementStarted && (
                        <Button
                            text={'START PLACEMENT'}
                            variant={'primary'}
                            onClick={() => {
                                if (appliedIndustry?.AgreementSigned) {
                                    startPlacement(appliedIndustry?.id)
                                } else {
                                    notification.error({
                                        title: 'Cant start placement',
                                        description:
                                            'You can,t start placement without signed agrement',
                                    })
                                }
                            }}
                            loading={startPlacementResult.isLoading}
                            disabled={startPlacementResult.isLoading}
                        />
                    )}
                    {appliedIndustry?.AgreementSigned &&
                        appliedIndustry?.placementStarted &&
                        !appliedIndustry?.isCompleted &&
                        !appliedIndustry?.cancelled &&
                        !appliedIndustry?.terminated && (
                            <AfterPlacementActions
                                appliedIndustry={appliedIndustry}
                            />
                        )}
                </div>
            ) : null}
        </div>
    )
}
