import {
    ActionButton,
    Badge,
    Card,
    EmptyData,
    LoadingAnimation,
    StudentSubAdmin,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye } from 'react-icons/fa'

import { RtoCellInfo } from '@partials/admin/rto/components'
import { CommonApi } from '@queries'
import { Rto, Student, UserStatus } from '@types'
import { checkListLength } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { MdBlock } from 'react-icons/md'

// hooks
import { DocumentsView } from '@hooks'
import Link from 'next/link'
import { BlockModal, BlockMultiStudentsModal } from '../student/modals'
import { ArchiveModal } from './modal'

export const ApprovedEsigns = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { onFileClicked, documentsViewModal } = DocumentsView()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const getEsign = CommonApi.ESign.useGetEsign(
        {
            search: `status:${UserStatus.Approved}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { refetchOnMountOrArgChange: true }
    )

    const onModalCancelClicked = useCallback(() => {
        setModal(null)
    }, [])
    const onBlockClicked = (student: Student) => {
        setModal(<BlockModal item={student} onCancel={onModalCancelClicked} />)
    }

    const onBlockMultiStudents = (student: Student[]) => {
        setModal(
            <BlockMultiStudentsModal
                onCancel={onModalCancelClicked}
                student={student}
            />
        )
    }

    const onArchiveClicked = (eSign: any) => {
        setModal(<ArchiveModal eSign={eSign} onCancel={onModalCancelClicked} />)
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (eSign: any) => {
                onFileClicked({
                    ...eSign,
                    extension: 'pdf',
                    type: 'all',
                })
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (eSign: any) => {
                router.push(`/portals/admin/e-sign/${eSign?.id}/edit`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Archive',
            onClick: (eSign: any) => onArchiveClicked(eSign),
            Icon: MdBlock,
            color: 'text-red-400 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return (
                    <Link
                        href={`/portals/admin/e-sign/${info.row.original?.id}/edit`}
                    >
                        <Typography variant="label" semibold>
                            <span className="cursor-pointer">
                                {info.row.original?.name}
                            </span>
                        </Typography>
                    </Link>
                )
            },
            header: () => <span>Title</span>,
        },
        {
            accessorKey: 'rto',
            header: () => <span>RTO</span>,
            cell: (info) => {
                return (
                    <RtoCellInfo
                        rto={
                            {
                                id: info?.row?.original?.user?.rto?.id,
                                user: info?.row?.original?.user,
                            } as Rto
                        }
                        short
                    />
                )
            },
        },

        {
            accessorKey: 'Course',
            header: () => <span>Course</span>,
            cell: (info) => (
                <Typography variant="label" color="text-info">
                    {info.row.original?.course?.title}
                </Typography>
            ),
        },
        {
            accessorKey: 'folder',
            header: () => <span>Folder</span>,
            cell: (info) => (
                <Typography variant="label" color="text-info">
                    {info.row.original?.folder?.name}
                </Typography>
            ),
        },
        {
            accessorKey: 'file',
            header: () => <span>File</span>,
            cell: (info) => (
                <a
                    href={info.row.original?.file}
                    target="_blank"
                    className="text-sm font-semibold text-info"
                >
                    <Badge text="Download" variant="info" />
                </a>
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const length = checkListLength<StudentSubAdmin>(
                    getEsign?.data?.data as StudentSubAdmin[]
                )

                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                            lastIndex={length.includes(info.row?.index)}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (student: Student) => {
            return (
                <div className="flex gap-x-2">
                    <ActionButton
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/${student?.id}?tab=overview`
                            )
                        }}
                    >
                        View
                    </ActionButton>
                    <ActionButton
                        Icon={FaEdit}
                        onClick={() => {
                            router.push(
                                `/portals/admin/student/edit-student/${student?.id}`
                            )
                        }}
                    >
                        Edit
                    </ActionButton>
                    <ActionButton
                        Icon={MdBlock}
                        variant="error"
                        onClick={() => {
                            onBlockClicked(student)
                        }}
                    >
                        Block
                    </ActionButton>
                </div>
            )
        },
        common: (student: Student[]) => (
            <ActionButton
                onClick={() => {
                    onBlockMultiStudents(student)
                }}
                Icon={MdBlock}
                variant="error"
            >
                Block
            </ActionButton>
        ),
    }

    return (
        <>
            {modal}
            {documentsViewModal}
            <div className="flex flex-col gap-y-4">
                <div className="flex">
                    <PageHeading
                        title={'Approved E-Sign'}
                        subtitle={'List of Approved E-Sign'}
                    />
                </div>
                <Card noPadding>
                    {getEsign.isError && <TechnicalError />}
                    {getEsign.isLoading || getEsign.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : getEsign.data && getEsign.data?.data?.length ? (
                        <Table
                            columns={columns as any}
                            data={getEsign.data?.data}
                            quickActions={quickActionsElements}
                            enableRowSelection
                        >
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      getEsign.data?.data
                                                          ?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          getEsign.data
                                                              ?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className=" overflow-x-scroll remove-scrollbar">
                                            <div className="px-6 w-full">
                                                {table}
                                            </div>
                                        </div>
                                        {getEsign.data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          getEsign.data?.data
                                                              ?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              getEsign.data
                                                                  ?.pagination,
                                                              setPage
                                                          )
                                                        : null}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !getEsign.isError && (
                            <EmptyData
                                title={'No Approved Student!'}
                                description={
                                    'You have not approved any Student request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
