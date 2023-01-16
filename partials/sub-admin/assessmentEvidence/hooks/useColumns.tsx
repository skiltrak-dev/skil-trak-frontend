import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Icons
import { FaEnvelope, FaEye, FaPhoneSquareAlt } from 'react-icons/fa'

// components
import {
    InitialAvatar,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'

// types
import { Student } from '@types'
import { AssessmentCellInfo } from '../components'

export const useColumns = () => {
    const router = useRouter()
    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                const {
                    courses,
                    id,
                    user: { id: userId },
                } = student
                router.push(
                    `/portals/sub-admin/tasks/assessment-evidence/${id}/${userId}`
                )
            },
            Icon: FaEye,
        },
    ]

    const columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => (
                <AssessmentCellInfo student={row.original?.student} />
            ),
        },
        {
            header: () => 'Course',
            accessorKey: 'course',
            cell: ({ row }: any) => {
                const course = row.original?.course
                return (
                    <div className="flex flex-col justify-center">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            {course?.sector?.name}
                        </Typography>
                        <Typography variant={'label'}>
                            {course?.title}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'RTO',
            accessorKey: 'rto',
            cell: ({ row }: any) => {
                const {
                    id,
                    phone,
                    user: { name, email, avatar },
                } = row.original?.student?.rto

                return (
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <div>
                                {avatar ? (
                                    <Image
                                        className="rounded-full w-7 h-7"
                                        src={avatar}
                                        alt={''}
                                        width={50}
                                        height={50}
                                    />
                                ) : (
                                    <InitialAvatar name={name} />
                                )}
                            </div>
                            <Link legacyBehavior
                                href={`/portals/sub-admin/users/rtos/${id}?tab=overview`}
                            >
                                <a>
                                    <Typography color={'black'}>
                                        {name}
                                    </Typography>
                                    <div className="flex items-center gap-x-2">
                                        <FaPhoneSquareAlt className="text-gray" />
                                        <Typography variant={'muted'}>
                                            {phone}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <FaEnvelope />
                                        <Typography
                                            variant={'muted'}
                                            color={'gray'}
                                        >
                                            {email}
                                        </Typography>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                )
            },
        },
        {
            header: () => 'Result',
            accessorKey: 'result',
            cell: ({ row }: any) => (
                <Typography variant={'label'} capitalize>
                    {row.original?.result}
                </Typography>
            ),
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction options={tableActionOptions} rowItem={row} />
                )
            },
        },
    ]
    return columns
}
