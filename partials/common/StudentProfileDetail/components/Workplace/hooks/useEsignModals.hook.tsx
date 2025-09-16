import { ReactNode, useEffect } from 'react'
import moment from 'moment'
import { WorkplaceCurrentStatus } from '@utils'
import { GenerateEsignModal } from '../modals'
import { isAllDocumentsInitiated } from '../functions'

export const useEsignModals = ({
    selectedWorkplace,
    getWorkplaceAppointment,
    esignDocumentsFolders,
    authorizedRoles,
    modalId,
    showModal,
    clearModal,
}: {
    selectedWorkplace: any
    getWorkplaceAppointment: any
    esignDocumentsFolders: any
    authorizedRoles: boolean
    modalId: string
    showModal: (modal: ReactNode, id?: string) => void
    clearModal: () => void
}) => {
    const allDocumentsInitiated = isAllDocumentsInitiated(esignDocumentsFolders)

    useEffect(() => {
        const hasSuccessfulAppointment =
            getWorkplaceAppointment?.data?.isSuccessfull === true
        const isAfterCutoffDate = moment().isSameOrAfter('2025-08-01', 'day')
        const isEsignQueryReady = esignDocumentsFolders?.isSuccess
        const needsDocumentInitiation = !allDocumentsInitiated
        const isValidStatus =
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AppointmentBooked ||
            selectedWorkplace?.currentStatus ===
                WorkplaceCurrentStatus.AwaitingAgreementSigned

        const shouldShowEsignModal =
            getWorkplaceAppointment &&
            hasSuccessfulAppointment &&
            isAfterCutoffDate &&
            isEsignQueryReady &&
            needsDocumentInitiation &&
            isValidStatus &&
            authorizedRoles

        if (shouldShowEsignModal && modalId !== 'generateEsign') {
            showModal(
                <GenerateEsignModal
                    onCancel={clearModal}
                    workplace={selectedWorkplace}
                    courseId={Number(selectedWorkplace?.courses?.[0]?.id)}
                />,
                'generateEsign'
            )
        } else if (
            isEsignQueryReady &&
            !esignDocumentsFolders?.data?.length &&
            hasSuccessfulAppointment &&
            isAfterCutoffDate &&
            isValidStatus &&
            authorizedRoles
        ) {
            showModal(
                <GenerateEsignModal
                    onCancel={clearModal}
                    workplace={selectedWorkplace}
                    courseId={Number(selectedWorkplace?.courses?.[0]?.id)}
                />
            )
        } else if (modalId === 'generateEsign' && !shouldShowEsignModal) {
            clearModal()
        }
    }, [
        selectedWorkplace,
        allDocumentsInitiated,
        esignDocumentsFolders,
        getWorkplaceAppointment,
        modalId,
    ])
}
