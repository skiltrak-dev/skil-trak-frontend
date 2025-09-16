import { useAuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'
import { Student } from '@types'
import { getUserCredentials, WorkplaceCurrentStatus } from '@utils'
import moment from 'moment'
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'
import { isAllDocumentsInitiated } from '../functions'
import {
    AppointmentBookModal,
    AppointmentViewWPModal,
    GenerateEsignModal,
} from '../modals'
import { useAutoModals } from './useAutoModals'
import { useShowQueryMessages } from './useShowQueryMessages.hook'
import { useWorkplaceActions } from './useWorkplaceActions'
import { useWorkplaceQueries } from './useWorkplaceQueries.hook'
import { useWorkplaceStatusModals } from './useWorkplaceStatusModals'
import { useWpData } from './useWpData'
import { useAppointmentModals } from './useAppointmentModal.hook'
import { useEsignModals } from './useEsignModals.hook'

// Define the context type
export interface WorkplaceContextType {
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
    skipWpResult: any
    setAutoApplyLoader: any

    // Actions
    setSelectedWorkplace: (workplace: any) => void
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
    const [modalId, setModalId] = useState<string>('')
    const [autoApplyLoader, setAutoApplyLoader] = useState<boolean>(false)

    const onCancelModal = () => setModal(null)

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
        sortedWorkplace,
        ...queriesActions
    } = useWorkplaceQueries({ student })

    const folders = GetFolders(workplaceFolders)

    const authorizedRoles = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN, UserRoles.SUBADMIN],
    })

    useAutoModals({
        selectedWorkplace,
        appliedIndustry,
        student,
        course,
        role,
        showModal: setModal,
    })

    useShowQueryMessages({
        queriesActions,
        setAutoApplyLoader,
    })

    const {
        ignoreCompletedWP,
        firstWorkplaceCurrentStatus,
        latestWorkplaceApprovaleRequest,
        latestWorkplaceApprovaleRequestRto,
    } = useWpData({
        selectedWorkplace,
        studentWorkplace: studentWorkplace?.data,
    })

    const actions = useWorkplaceActions({
        selectedWorkplace,
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

    useAppointmentModals({
        selectedWorkplace,
        getWorkplaceAppointment,
        authorizedRoles,
        student,
        modalId,
        showModal: (modal: ReactNode, id?: string) => {
            setModal(modal)
            setModalId(id + '')
        },
        clearModal: onCancelModal,
        setModalId: () => {},
    })

    useEsignModals({
        selectedWorkplace,
        getWorkplaceAppointment,
        esignDocumentsFolders,
        authorizedRoles,
        modalId,
        showModal: (modal: ReactNode, id?: string) => {
            setModal(modal)
            setModalId(id + '')
        },
        clearModal: onCancelModal,
    })

    useEffect(() => {
        return () => {
            setModal(null)
        }
    }, [])

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
