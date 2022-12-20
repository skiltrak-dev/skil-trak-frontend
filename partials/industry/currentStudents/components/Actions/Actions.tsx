import moment from 'moment'

// components
import { Button, Typography } from '@components'

// query
import {
    useWorkplaceActionsMutation,
    useSignAgreementMutation,
    useStartPlacementByIndustryMutation,
} from '@queries'
import { useState, ReactElement } from 'react'
import { ChangeStatusAction } from './components'
import { ViewAgreement } from '../../contextBar'
import { useContextBar } from '@hooks'
import { Feedback, PlacementStartedModal, ReportModal } from '../../modals'

export const Actions = ({ workplace, industry, student }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    //  query
    const [workplaceActions, workplaceActionsResult] =
        useWorkplaceActionsMutation()

    // hooks
    const { setContent, show } = useContextBar()

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onStartPlacementClicked = (id: any) => {
        setModal(
            <PlacementStartedModal
                id={id}
                student={student}
                agreementSigned={industry?.AgreementSigned}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onFeedBackClicked = () => {
        setModal(
            <Feedback
                onCancel={onModalCancelClicked}
                workIndustry={industry?.id}
                student={workplace?.student?.id}
            />
        )
    }

    const onReportClicked = () => {
        setModal(
            <ReportModal
                onCancel={onModalCancelClicked}
                workIndustry={industry?.id}
                student={workplace?.student?.id}
            />
        )
    }

    return (
        <div className="flex items-center gap-x-2">
            {modal && modal}
            {industry?.industryResponseDate && (
                <Typography variant={'xs'} color={'text-success'}>
                    Student was APPROVED on{' '}
                    {moment(industry?.industryResponseDate).format(
                        'Do MMM, YYYY'
                    )}
                </Typography>
            )}
            {industry?.AgreementSigned && (
                <Button
                    variant={'info'}
                    text={'View Agreement'}
                    onClick={() => {
                        setContent(
                            <ViewAgreement
                                agreement={workplace?.student?.agreement}
                            />
                        )
                        show()
                    }}
                />
            )}
            {industry?.industryResponse === 'approved' ? (
                !industry?.terminated &&
                !industry?.isCompleted &&
                !industry?.cancelled &&
                !industry?.placementStarted ? (
                    <>
                        {!industry.placementStarted && (
                            <Button
                                variant={'primary'}
                                text={'Start Placement'}
                                onClick={() => {
                                    onStartPlacementClicked(industry.id)
                                }}
                            />
                        )}
                        <Button variant={'dark'} text={'ADD SCHEDULE'} />
                    </>
                ) : industry?.isCompleted ? (
                    <Typography variant={'small'} color={'text-white'}>
                        <span className="bg-success-dark px-3 py-0.5 rounded-full">
                            COMPLETED
                        </span>
                    </Typography>
                ) : industry?.terminated ? (
                    <Typography variant={'small'} color={'text-white'}>
                        <span className="bg-success-dark px-3 py-0.5 rounded-full">
                            TERMINATED
                        </span>
                    </Typography>
                ) : industry?.cancelled ? (
                    <Typography variant={'small'} color={'text-red-800'}>
                        <span className="bg-secondary px-3 py-0.5 rounded-full">
                            CANCELLED
                        </span>
                    </Typography>
                ) : (
                    <>
                        <ChangeStatusAction industry={industry} />
                        <Button variant={'action'} onClick={onFeedBackClicked}>
                            <span className="text-gray-800">FEEDBACK</span>
                        </Button>
                        <Button variant={'action'} onClick={onReportClicked}>
                            <span className="text-error">REPORT</span>
                        </Button>
                    </>
                )
            ) : (
                <>
                    <Button text={'Book Appointment'} variant={'info'} />
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            workplaceActions({
                                id: industry.id,
                                status: 'approved',
                            })
                        }}
                        loading={workplaceActionsResult?.isLoading}
                        disabled={workplaceActionsResult?.isLoading}
                    >
                        <span className="text-success">Approve</span>
                    </Button>
                    <Button variant={'secondary'}>
                        <span className="text-error">Reject</span>
                    </Button>
                </>
            )}
        </div>
    )
}
