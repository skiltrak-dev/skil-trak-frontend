import { useAuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'
import { Student } from '@types'
import { getUserCredentials, WorkplaceCurrentStatus } from '@utils'
import moment from 'moment'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { IWorkplaceIndustries } from 'redux/queryTypes'
import { isAllDocumentsInitiated, sortedWP } from '../functions'
import {
    AppointmentBookModal,
    AppointmentViewWPModal,
    GenerateEsignModal,
} from '../modals'
import { useAutoModals } from './useAutoModals'
import { useWorkplaceActions } from './useWorkplaceActions'
import { useWorkplaceQueries } from './useWorkplaceQueries.hook'
import { useWorkplaceStatusModals } from './useWorkplaceStatusModals'

// Define the context type
interface WorkplaceContextType {
    // Modal state
    modal: ReactNode | null

    // Data from queries
    refresh: any
    refreshResult: any
    course: any
    folders: any
    courses: any
    getCancelledWP: any
    appliedIndustry: any
    workplaceFolders: any
    skipWorkplace: any
    skipWorkplaceResult: any
    sortedWorkplace: any
    studentWorkplace: any
    ignoreCompletedWP: any
    selectedWorkplace: any
    rejectedWorkplaces: any
    showPreviousWorkplace: boolean
    workplaceStudentDetail: any
    workplaceIndustryDetail: any
    latestWorkplaceApprovaleRequest: any
    latestWorkplaceApprovaleRequestRto: any
    appointmentDetail: any
    autoApplyLoader: any
    setAutoApplyLoader: any

    // Actions
    setSelectedWorkplace: (workplace: any) => void
    onAppointmentClicked: () => void
    setShowPreviousWorkplace: (show: boolean) => void
    onAddAnotherWp: () => boolean

    // Actions from useWorkplaceActions (spread)
    [key: string]: any
}

// Create the context
const WorkplaceContext = createContext<WorkplaceContextType | undefined>(
    undefined
)

// Custom hook to use the workplace context
export const useWorkplaceContext = () => {
    const context = useContext(WorkplaceContext)
    if (context === undefined) {
        throw new Error(
            'useWorkplaceContext must be used within a WorkplaceProvider'
        )
    }
    return context
}

// Provider props interface
interface WorkplaceProviderProps {
    children: ReactNode
    student: Student
}

// The provider component
export const WorkplaceHookProvider = ({
    children,
    student,
}: WorkplaceProviderProps) => {
    const [modal, setModal] = useState<ReactNode | null>(null)
    const [modelId, setModelId] = useState<string>('')
    const [autoApplyLoader, setAutoApplyLoader] = useState<boolean>(false)

    const { notification } = useNotification()

    const role = getUserCredentials()?.role

    const {
        selectedWorkplace,
        setSelectedWorkplace,
        showPreviousWorkplace,
        setShowPreviousWorkplace,
        studentWorkplace,
        workplaceIndustryDetail,
        workplaceStudentDetail,
        rejectedWorkplaces,
        courses,
        getCancelledWP,
        esignDocumentsFolders,
        getWorkplaceAppointment,
        workplaceFolders,
        appliedIndustry,
        course,
        ...queriesActions
    } = useWorkplaceQueries({ student })

    console.log({ ststststststststs: selectedWorkplace })

    const latestWorkplaceApprovaleRequest = useMemo(() => {
        return selectedWorkplace?.workplaceApprovaleRequest?.reduce(
            (latest: any, current: any) =>
                new Date(current?.createdAt) > new Date(latest?.createdAt)
                    ? current
                    : latest,
            selectedWorkplace?.workplaceApprovaleRequest?.[0]
        )
    }, [selectedWorkplace?.workplaceApprovaleRequest])

    const actions = useWorkplaceActions({
        selectedWorkplace,
        showModal: setModal,
    })

    useAutoModals({
        selectedWorkplace,
        appliedIndustry,
        student,
        course,
        role,
        showModal: setModal,
    })

    useWorkplaceStatusModals({
        selectedWorkplace,
        appliedIndustry,
        workplaceStudentDetail,
        student,
        role,
        latestWorkplaceApprovaleRequest,
        showModal: setModal,
    })

    const folders = GetFolders(workplaceFolders)

    const allDocumentsInitiated = isAllDocumentsInitiated(esignDocumentsFolders)
    const sortedWorkplace = sortedWP(studentWorkplace)

    const authorizedRoles = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN, UserRoles.SUBADMIN],
    })

    const latestWorkplaceApprovaleRequestRto = useMemo(() => {
        return selectedWorkplace?.workplaceApprovaleRequest?.reduce(
            (latest: any, current: any) =>
                new Date(current?.createdAt) > new Date(latest?.createdAt)
                    ? current
                    : latest,
            selectedWorkplace?.workplaceApprovaleRequest?.[0]
        )
    }, [selectedWorkplace?.workplaceApprovaleRequest])

    useEffect(() => {
        return () => {
            setModal(null)
        }
    }, [])

    useEffect(() => {
        if (queriesActions?.refreshResult?.isSuccess) {
            setTimeout(() => {
                setAutoApplyLoader(false)
                notification.success({
                    title: `Automation Refreshed`,
                    description: `Automation Refreshed.`,
                })
            }, 10000)
        }
    }, [queriesActions?.refreshResult])

    useEffect(() => {
        if (queriesActions?.skipWorkplaceResult?.isSuccess) {
            setTimeout(() => {
                setAutoApplyLoader(false)
                notification.warning({
                    title: `Workplace Industry Skipped`,
                    description: `Workplace Industry Skipped Successfully!`,
                })
            }, 10000)
        }
    }, [queriesActions?.skipWorkplaceResult])

    useEffect(() => {
        if (sortedWorkplace && sortedWorkplace?.length > 0) {
            setSelectedWorkplace(
                selectedWorkplace
                    ? studentWorkplace?.data?.find(
                          (w: any) => w?.id === selectedWorkplace?.id
                      )
                    : sortedWorkplace?.[0]
            )
        }
        return () => {
            setSelectedWorkplace(null)
        }
    }, [studentWorkplace?.data])

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
            onAppointmentViewWPClicked()
            setModelId('appointmentView')
        } else if (
            modelId === 'appointmentView' &&
            !shouldShowAppointmentModal
        ) {
            setModal(null)
            setModelId('')
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

        if (shouldShowAppointmentModal && modelId !== 'appointmentClicked') {
            onAppointmentClicked()
            setModelId('appointmentClicked')
        } else if (
            modelId === 'appointmentClicked' &&
            !shouldShowAppointmentModal
        ) {
            setModal(null)
            setModelId('')
        }
    }, [selectedWorkplace, getWorkplaceAppointment, modelId])

    // Handle e-signature document generation modal
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

        if (shouldShowEsignModal && modelId !== 'generateEsign') {
            onGenerateEsignClicked()
            setModelId('generateEsign')
        } else if (
            isEsignQueryReady &&
            !esignDocumentsFolders?.data?.length &&
            hasSuccessfulAppointment &&
            isAfterCutoffDate &&
            isValidStatus &&
            authorizedRoles
        ) {
            onGenerateEsignClicked()
            setModelId('')
        } else if (modelId === 'generateEsign' && !shouldShowEsignModal) {
            setModal(null)
            setModelId('')
        }
    }, [
        selectedWorkplace,
        allDocumentsInitiated,
        esignDocumentsFolders,
        getWorkplaceAppointment,
        modelId,
    ])

    const onCancelModal = () => setModal(null)

    const ignoreCompletedWP = studentWorkplace?.data?.filter(
        (wp: IWorkplaceIndustries) =>
            wp?.currentStatus !== WorkplaceCurrentStatus.Completed
    )

    const firstWorkplaceCurrentStatus = ignoreCompletedWP?.[0]?.currentStatus

    const onAppointmentViewWPClicked = () => {
        setModal(
            <AppointmentViewWPModal
                onCancel={() => {
                    onCancelModal()
                }}
                appointment={getWorkplaceAppointment?.data}
            />
        )
    }

    const onAppointmentClicked = () => {
        setModal(
            <AppointmentBookModal
                onCancel={() => {
                    onCancelModal()
                }}
                student={student}
                courseId={Number(selectedWorkplace?.courses?.[0]?.id)}
                studentUser={student?.user?.id}
            />
        )
    }

    const onGenerateEsignClicked = () => {
        setModal(
            <GenerateEsignModal
                onCancel={() => {
                    onCancelModal()
                }}
                workplace={selectedWorkplace}
                courseId={Number(selectedWorkplace?.courses?.[0]?.id)}
            />
        )
    }

    const onAddAnotherWp = () =>
        actions.onAddAnotherWp(firstWorkplaceCurrentStatus)

    // Create the context value
    const contextValue: WorkplaceContextType = {
        ...actions,
        ...queriesActions,
        modal,
        course,
        folders,
        courses,
        autoApplyLoader,
        setAutoApplyLoader,
        getCancelledWP,
        appliedIndustry,
        workplaceFolders,
        sortedWorkplace,
        studentWorkplace,
        ignoreCompletedWP,
        selectedWorkplace,
        rejectedWorkplaces,
        setSelectedWorkplace,
        onAppointmentClicked,
        showPreviousWorkplace,
        workplaceStudentDetail,
        workplaceIndustryDetail,
        setShowPreviousWorkplace,
        latestWorkplaceApprovaleRequest,
        latestWorkplaceApprovaleRequestRto,
        appointmentDetail: getWorkplaceAppointment?.data,
        onAddAnotherWp,
    }

    return (
        <WorkplaceContext.Provider value={contextValue}>
            {children}
        </WorkplaceContext.Provider>
    )
}

// Optional: Export the original hook for backward compatibility
export const useWorkplaceHook = () => {
    // This would now just be a thin wrapper around the context
    return useWorkplaceContext()
}
