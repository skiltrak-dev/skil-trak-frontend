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
import { ArchiveModal, AssessmentCellInfo, DeleteModal } from '../components'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { ReactElement, useState } from 'react'
import { BsArchiveFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { Result } from '@constants'

export const useColumns = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onArchiveClicked = (student: any) => {
        setModal(
            <ArchiveModal item={student} onCancel={onModalCancelClicked} />
        )
    }
    const onDeleteClicked = (student: any) => {
        setModal(<DeleteModal item={student} onCancel={onModalCancelClicked} />)
    }

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (item: any) => {
                    router.push({
                        pathname: `/portals/sub-admin/students/${item?.student?.id}?tab=submissions`,
                        query: {
                            course: item?.course?.id,
                        },
                    })
                },
                Icon: FaEye,
            },
            {
                text:
                    student.status === Result.Archived
                        ? 'Un-archive'
                        : 'Archive',
                onClick: (student: any) => onArchiveClicked(student),
                Icon: BsArchiveFill,
                color: 'text-blue-500 hover:bg-blue-100 hover:border-blue-200',
            },
            {
                text: 'Delete',
                onClick: (student: any) => onDeleteClicked(student),
                Icon: AiFillDelete,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
        ]
    }

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
                } = row.original?.student?.rto || {}

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
                    {row.original?.autoSubmission ? 'Auto' : 'Manual'}
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
                const tableActionOption = tableActionOptions(row.original)
                return (
                    <TableAction
                        options={tableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]
    return { columns, modal }
}
