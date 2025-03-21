import { TableData, EmployeeDetails } from '@partials/common/kpis'
import { HiCheck } from 'react-icons/hi'
import { RiGitPullRequestFill, RiMap2Line, RiUserLine } from 'react-icons/ri'

export const SECTIONS = [
    'General',
    'Call industries',
    'call Student',
    'Student Move to flashing',
    'Student removed from Flasting',
    'Dependants',
    'Account',
] as const

export const SUBSECTIONS = {
    General: [
        { title: 'Appointment', icon: <RiUserLine /> },
        {
            title: 'Workplace request',
            icon: (
                <RiGitPullRequestFill className="text-lg rounded-full p-[1px] text-white bg-[#F5A70C]" />
            ),
        },
        {
            title: 'Completed',
            icon: (
                <HiCheck className="text-lg rounded-full p-[1px] text-white bg-[#FF0303]" />
            ),
        },
        {
            title: 'Agreement by student provided workplace',
            icon: <RiMap2Line />,
        },
        {
            title: 'Agreement by workplace Generated request',
            icon: <RiMap2Line />,
        },
    ],
}

export const MOCK_DATA: TableData[] = [
    {
        studentId: 'NTCA220223',
        name: 'Kulvinder kaur',
        email: 'info@westbourne.vic.edu.au',
        phone: '451743038',
        courses: 'Work effectively as a cook',
        appointmentDate: '02 jan 2025',
        workplaceRequestDate: '02 jan 2025',
        completedDate: '02 jan 2025',
        uploadedDate: '02 jan 2025',
    },
    {
        studentId: 'NTCA220223',
        name: 'Kulvinder kaur',
        email: 'info@westbourne.vic.edu.au',
        phone: '451743038',
        courses: 'Work effectively as a cook',
        appointmentDate: '02 jan 2025',
        workplaceRequestDate: '02 jan 2025',
        completedDate: '02 jan 2025',
        uploadedDate: '02 jan 2025',
    },
    {
        studentId: 'NTCA220223',
        name: 'Kulvinder kaur',
        email: 'info@westbourne.vic.edu.au',
        phone: '451743038',
        courses: 'Work effectively as a cook',
        appointmentDate: '02 jan 2025',
        workplaceRequestDate: '02 jan 2025',
        completedDate: '02 jan 2025',
        uploadedDate: '02 jan 2025',
    },
]
export const EMPLOYEE_DETAILS: EmployeeDetails = {
    name: 'Emma',
    position: 'Sr Coordinator',
    department: 'Product & Development',
    employmentStatus: 'Active',
    efficiency: 90,
}
