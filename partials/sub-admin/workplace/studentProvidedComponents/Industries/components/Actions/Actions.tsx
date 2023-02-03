import { useEffect, useState, ReactElement } from 'react'
import moment from 'moment'

// components
import { Typography, ShowErrorNotifications } from '@components'
import { AfterPlacementActions } from '@partials/sub-admin/workplace/components/Industries/components/Actions/components'

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
import {
    ForwardModal,
    PlacementStartedModal,
} from '@partials/sub-admin/workplace/modals'
import { SignAgreement } from '@partials/sub-admin/workplace/components/Industries/components/Actions/components'
import { UserStatus } from '@types'

export const Actions = ({
    appliedIndustry,
    workplaceId,
    workplace,
    folders,
    student,
}: any) => {
    const [actionStatus, setActionStatus] = useState<any | string>('')
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [changeCustomIndustryStatus, changeCustomIndustryStatusResult] =
        useChangeCustomIndustryStatusMutation()
    const [industryResponse, industryResponseResult] =
        useIndustryResponseMutation()

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
        if (changeCustomIndustryStatusResult.isSuccess) {
            notification.success({
                title: `Industry ${actionStatus}`,
                description: `Industry ${actionStatus} Successfully`,
            })
        }
    }, [updateStatusResult, changeCustomIndustryStatusResult])

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

    const onPlacementStartedClicked = (id: number) => {
        setModal(
            <PlacementStartedModal
                id={id}
                agreementSigned={appliedIndustry?.AgreementSigned}
                student={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    return (
        <div className="mt-1.5 mb-2.5">
            {modal && modal}
            <ShowErrorNotifications result={updateStatusResult} />
            <ShowErrorNotifications result={industryResponseResult} />
            <ShowErrorNotifications result={changeCustomIndustryStatusResult} />

            {workplace?.industryStatus === 'pending' ? (
                <div className="flex items-center gap-x-2">
                    <Button
                        text={'Approve Industry'}
                        onClick={() => {
                            if (workplace?.assignedTo) {
                                changeCustomIndustryStatus({
                                    id: appliedIndustry?.industry?.user?.id,
                                    workplaceId,
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
                                    workplaceId,
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

            {workplace?.industryStatus === UserStatus.Approved &&
            workplace?.approvalStatus === UserStatus.Approved ? (
                <div className="flex items-center gap-x-2">
                    {!appliedIndustry?.AgreementSigned && (
                        <div>
                            <SignAgreement
                                studentId={workplace?.student?.id}
                                appliedIndustryId={appliedIndustry?.id}
                            />
                        </div>
                    )}
                    {!appliedIndustry?.placementStarted && (
                        <div className="flex-shrink-0">
                            <Button
                                text={'START PLACEMENT'}
                                variant={'primary'}
                                onClick={() => {
                                    onPlacementStartedClicked(
                                        Number(appliedIndustry?.id)
                                    )
                                }}
                            />
                        </div>
                    )}
                    {appliedIndustry?.placementStarted &&
                        !appliedIndustry?.isCompleted &&
                        !appliedIndustry?.cancelled &&
                        !appliedIndustry?.terminated && (
                            <AfterPlacementActions
                                appliedIndustry={appliedIndustry}
                            />
                        )}
                </div>
            ) : null}
            <div className="mt-2">
                {(appliedIndustry?.isCompleted ||
                    appliedIndustry?.cancelled ||
                    appliedIndustry?.terminated) && (
                    <Typography variant={'small'} color={'text-gray-700'}>
                        Status of student placement
                    </Typography>
                )}
                {appliedIndustry?.isCompleted && (
                    <Button
                        submit
                        variant={'success'}
                        text={
                            'This Placement was COMPLETED by Sub-Admin/Industry'
                        }
                    />
                )}

                {appliedIndustry?.cancelled && (
                    <Button submit variant={'secondary'}>
                        <span className="text-red-800">
                            This Placement was CANCELLED by Sub-Admin/Industry
                        </span>
                    </Button>
                )}

                {appliedIndustry?.terminated && (
                    <Button
                        submit
                        variant={'error'}
                        text={
                            'This Placement was TERMINATED by Sub-Admin/Industry'
                        }
                    />
                )}
            </div>
        </div>
    )
}
