import {
    AppointmentTable,
    CallIndustriesTable,
    CallStudents,
    Completed,
    FlagStudents,
    SnoozedStudents,
    StudentAgreementTable,
    WorkplaceAgreementTable,
    WorkplaceRequest,
} from './ProgressTable'

export const SECTIONS_CONFIG = [
    {
        label: 'General',
        components: [
            { component: AppointmentTable, key: 'appointment' },
            { component: WorkplaceRequest, key: 'workplace-request' },
            { component: Completed, key: 'completed' },
            { component: StudentAgreementTable, key: 'student-agreement' },
            { component: WorkplaceAgreementTable, key: 'workplace-agreement' },
        ],
    },
    {
        label: 'Call Industries',
        components: [
            { component: CallIndustriesTable, key: 'call-industries' },
        ],
    },
    {
        label: 'Call Student',
        components: [{ component: CallStudents, key: 'call-students' }],
    },
    {
        label: 'Snoozed',
        components: [{ component: SnoozedStudents, key: 'snoozed' }],
    },
    {
        label: 'Flagged',
        components: [{ component: FlagStudents, key: 'flagedTable' }],
    },
]
