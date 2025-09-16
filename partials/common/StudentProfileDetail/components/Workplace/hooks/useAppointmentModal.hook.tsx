import { ReactNode, useEffect } from 'react'
import moment from 'moment'
import { WorkplaceCurrentStatus } from '@utils'
import { AppointmentViewWPModal, AppointmentBookModal } from '../modals'

export const useAppointmentModals = ({
    selectedWorkplace,
    getWorkplaceAppointment,
    authorizedRoles,
    student,
    modalId,
    showModal,
    clearModal,
    setModalId,
}: {
    selectedWorkplace: any
    getWorkplaceAppointment: any
    authorizedRoles: boolean
    student: any
    modalId: string
    showModal: (modal: ReactNode, id?: string) => void
    clearModal: () => void
    setModalId: (id: string) => void
}) => {
    // Handle appointment view modal for today's appointments
    useEffect(() => {
        const isAppointmentBookedStatus =
            selectedWorkplace?.currentStatus ===
            WorkplaceCurrentStatus.AppointmentBooked
        const isAppointmentQueryReady =
            !getWorkplaceAppointment?.isFetching &&
            !getWorkplaceAppointment?.isLoading &&
            getWorkplaceAppointment?.isSuccess
        const hasNoValidAppointment =
            getWorkplaceAppointment?.data &&
            getWorkplaceAppointment?.data?.isSuccessfull === null
        const isAfterCutoffDate = moment().isSameOrAfter('2025-08-01', 'day')
        const isTodayAppointment = moment().isSame(
            getWorkplaceAppointment?.data?.date,
            'day'
        )

        const shouldShowAppointmentModal =
            authorizedRoles &&
            selectedWorkplace &&
            isAfterCutoffDate &&
            isTodayAppointment &&
            hasNoValidAppointment &&
            isAppointmentQueryReady &&
            isAppointmentBookedStatus &&
            !selectedWorkplace?.byExistingAbn &&
            !selectedWorkplace?.studentProvidedWorkplace

        if (shouldShowAppointmentModal) {
            showModal(
                <AppointmentViewWPModal
                    onCancel={clearModal}
                    appointment={getWorkplaceAppointment?.data}
                />,
                'appointmentView'
            )
        } else if (
            modalId === 'appointmentView' &&
            !shouldShowAppointmentModal
        ) {
            clearModal()
        }
    }, [selectedWorkplace, getWorkplaceAppointment])

    // Handle appointment booking modal for workplaces with booked appointments
    useEffect(() => {
        const isAppointmentBookedStatus =
            selectedWorkplace?.currentStatus ===
            WorkplaceCurrentStatus.AppointmentBooked
        const isAppointmentQueryReady =
            !getWorkplaceAppointment?.isFetching &&
            !getWorkplaceAppointment?.isLoading &&
            getWorkplaceAppointment?.isSuccess
        const hasNoValidAppointment =
            !getWorkplaceAppointment?.data ||
            getWorkplaceAppointment?.data?.isSuccessfull === false
        const isAfterCutoffDate = moment().isSameOrAfter('2025-08-01', 'day')

        const shouldShowAppointmentModal =
            selectedWorkplace &&
            isAppointmentBookedStatus &&
            isAppointmentQueryReady &&
            hasNoValidAppointment &&
            isAfterCutoffDate &&
            authorizedRoles

        if (shouldShowAppointmentModal && modalId !== 'appointmentClicked') {
            showModal(
                <AppointmentBookModal
                    onCancel={clearModal}
                    student={student}
                    courseId={Number(selectedWorkplace?.courses?.[0]?.id)}
                    studentUser={student?.user?.id}
                />,
                'appointmentClicked'
            )
        } else if (
            modalId === 'appointmentClicked' &&
            !shouldShowAppointmentModal
        ) {
            clearModal()
        }
    }, [selectedWorkplace, getWorkplaceAppointment, modalId])
}
