import { UserRoles } from '@constants'
import { ForwardModal } from '@partials/sub-admin/workplace/modals'
import moment from 'moment'
import { ReactNode, useEffect } from 'react'
import { MapModal } from '../components/IndustryDetail/components/MapModal'
import { excludedRoles } from '../functions'
import { NoEligibleWorkplaceFoundModal } from '../modals'

export const useAutoModals = ({
    role,
    course,
    student,
    showModal,
    appliedIndustry,
    selectedWorkplace,
}: {
    course: any
    student: any
    role: UserRoles
    appliedIndustry: any
    selectedWorkplace: any
    showModal: (modal: ReactNode, id?: string) => void
}) => {
    // Auto show no eligible workplace modal
    useEffect(() => {
        if (
            selectedWorkplace &&
            !selectedWorkplace?.byExistingAbn &&
            !selectedWorkplace?.studentProvidedWorkplace &&
            !selectedWorkplace?.workplaceApprovaleRequest?.length &&
            moment(selectedWorkplace?.createdAt).isSame(moment(), 'minute')
        ) {
            const onWorkplaceFinderClicked = () => {
                showModal(
                    <MapModal
                        course={course}
                        student={student}
                        onCancel={() => showModal(null)}
                        appliedIndustry={appliedIndustry}
                        workplace={{ ...selectedWorkplace, student }}
                    />
                )
            }

            showModal(
                <NoEligibleWorkplaceFoundModal
                    onCancel={() => showModal(null)}
                    onWorkplaceFinderClicked={onWorkplaceFinderClicked}
                />
            )
        }
    }, [selectedWorkplace])

    // Auto show forward modal
    useEffect(() => {
        if (
            selectedWorkplace &&
            appliedIndustry &&
            !appliedIndustry?.awaitingWorkplaceResponseDate &&
            selectedWorkplace?.assignedTo &&
            !selectedWorkplace?.studentProvidedWorkplace &&
            !excludedRoles.includes(role)
        ) {
            showModal(
                <ForwardModal
                    industry={appliedIndustry}
                    workplaceId={Number(selectedWorkplace?.id)}
                    onCancel={() => showModal(null)}
                />
            )
        }
    }, [selectedWorkplace, appliedIndustry])
}
