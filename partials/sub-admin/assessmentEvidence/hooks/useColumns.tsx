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
    UserCreatedAt,
} from '@components'

// types
import { Student } from '@types'
import { AssessmentCellInfo } from '../components'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const useColumns = () => {
    const router = useRouter()
    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (item: any) => {
                router.push({
                    pathname: `/portals/sub-admin/tasks/assessment-evidence/${item?.student?.id}/${item?.student?.user?.id}`,
                    query: {
                        course: item?.course?.id,
                    },
                })
            },
            Icon: FaEye,
        },
    ]

    const columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => <AssessmentCellInfo item={row.original} />,
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
                    <Link
                        legacyBehavior
                        href={`/portals/sub-admin/users/rtos/${id}?tab=overview`}
                    >
                        <a className="flex items-center gap-x-2">
                            <div className="shadow-inner-image rounded-full">
                                {name && (
                                    <InitialAvatar
                                        name={name}
                                        imageUrl={avatar}
                                    />
                                )}
                            </div>
                            <div>
                                <p className={'font-semibold'}>{name}</p>
                                <div className="font-medium text-xs text-gray-500">
                                    <p className="flex items-center gap-x-1">
                                        <span>
                                            <MdEmail />
                                        </span>
                                        {email}
                                    </p>
                                    <p className="flex items-center gap-x-1">
                                        <span>
                                            <MdPhoneIphone />
                                        </span>
                                        {phone}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </Link>
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
            header: () => 'Submission Type',
            accessorKey: 'autoSubmission',
            cell: ({ row }: any) => (
                <Typography variant={'label'} capitalize>
                    {row.original?.autoSubmission ||
                    !row.original?.isManualSubmission
                        ? 'Auto'
                        : 'Manual'}
                </Typography>
            ),
        },
        {
            header: () => 'Submitted On',
            accessorKey: 'result',
            cell: ({ row }: any) => (
                <UserCreatedAt createdAt={row.original?.createdAt} />
            ),
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]
    return columns
}
