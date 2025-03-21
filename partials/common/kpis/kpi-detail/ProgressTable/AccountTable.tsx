import { MdAccountBalance } from 'react-icons/md'
import { TableData } from '../../types'
import { DataKpiTable } from '../DataKpiTable'

const AccoutColumns = [
    {
        accessorKey: 'studentId',
        header: 'Student ID',
        cell: (info: any) => info.getValue() as string,
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'industry',
        header: 'Industry Name',
    },
    {
        accessorKey: 'contactPerson',
        header: 'Contact Person',
    },
    {
        accessorKey: 'callDate',
        header: 'Call Date',
    },
    {
        accessorKey: 'callStatus',
        header: 'Status',
    },
    {
        accessorKey: 'followUpDate',
        header: 'Follow-up Date',
    },
]

const AccountData: TableData[] = [
    {
        studentId: 'NTCA220223',
        name: 'Kulvinder kaur',
        email: 'info@westbourne.vic.edu.au',
        phone: '451743038',
        industry: 'Hospitality',
        contactPerson: 'John Smith',
        callDate: '15 Jan 2025',
        callStatus: 'Successful',
        followUpDate: '22 Jan 2025',
        courses: '',
    },
    {
        studentId: 'NTCA220224',
        name: 'Rahul Sharma',
        email: 'rahul.s@westbourne.vic.edu.au',
        phone: '451743039',
        industry: 'Restaurant',
        contactPerson: 'Emma Wilson',
        callDate: '12 Jan 2025',
        callStatus: 'Callback Required',
        followUpDate: '19 Jan 2025',
        courses: '',
    },
    {
        studentId: 'NTCA220225',
        name: 'Lin Wei',
        email: 'lin.w@westbourne.vic.edu.au',
        phone: '451743040',
        industry: 'Hotel',
        contactPerson: 'David Chen',
        callDate: '18 Jan 2025',
        callStatus: 'Successful',
        followUpDate: '01 Feb 2025',
        courses: '',
    },
]

export const AccountTable = () => {
    return (
        <DataKpiTable
            setPage={() => {}}
            colors="blue"
            Icon={MdAccountBalance}
            title="Accounts"
            columns={AccoutColumns}
            data={AccountData}
        />
    )
}
