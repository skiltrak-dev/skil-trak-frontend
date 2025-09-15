import { ReactNode } from 'react'
import {
    CancelWorkplaceModal,
    CancelWorkplaceRequestModal,
    ShowRejectedRequestModal,
    UpdatePrvWPStatusModal,
    UpdateWorkplaceCourseModal,
    ViewPlacementStartedAnswersModal,
    ViewQuestionsModal,
} from '../modals'
import { ChangeStatusModal } from '@partials/admin/invoices'
import { canAddAnotherWorkplace } from '../functions'
import { WorkplaceCurrentStatus } from '@utils'

export const useWorkplaceActions = ({
    selectedWorkplace,
    showModal,
}: {
    selectedWorkplace: any
    showModal: (modal: ReactNode, id?: string) => void
}) => {
    const onCancelWPClicked = () => {
        showModal(
            <CancelWorkplaceModal
                onCancel={() => showModal(null)}
                workplaceId={Number(selectedWorkplace?.id)}
            />
        )
    }

    const onCancelWPRequestClicked = () => {
        showModal(
            <CancelWorkplaceRequestModal
                onCancel={() => showModal(null)}
                workplaceId={Number(selectedWorkplace?.id)}
            />
        )
    }

    const onUpdateWorkplaceCourseClicked = (
        courseId: number,
        workplaceId: number
    ) => {
        showModal(
            <UpdateWorkplaceCourseModal
                onCancel={() => showModal(null)}
                {...{ courseId, workplaceId }}
            />
        )
    }

    const onViewWorkplaceQuestions = (wpId: number) => {
        showModal(
            <ViewQuestionsModal onCancel={() => showModal(null)} wpId={wpId} />
        )
    }

    const onViewPlacementStartedAnswers = (wpId: number) => {
        showModal(
            <ViewPlacementStartedAnswersModal
                onCancel={() => showModal(null)}
                wpId={wpId}
            />
        )
    }

    const onShowRejectedRequestModal = (content: string) => {
        showModal(
            <ShowRejectedRequestModal
                onCancel={() => showModal(null)}
                content={content}
            />
        )
    }

    const onStatusChangeClicked = (id: number) => {
        showModal(
            <ChangeStatusModal onCancel={() => showModal(null)} id={id} />
        )
    }

    const onAddAnotherWp = (
        firstWorkplaceCurrentStatus: WorkplaceCurrentStatus
    ) => {
        if (canAddAnotherWorkplace(firstWorkplaceCurrentStatus)) {
            showModal(
                <UpdatePrvWPStatusModal onCancel={() => showModal(null)} />
            )
            return true
        }
        return false
    }

    return {
        onCancelWPClicked,
        onCancelWPRequestClicked,
        onUpdateWorkplaceCourseClicked,
        onViewWorkplaceQuestions,
        onViewPlacementStartedAnswers,
        onShowRejectedRequestModal,
        onStatusChangeClicked,
        onAddAnotherWp,
    }
}
