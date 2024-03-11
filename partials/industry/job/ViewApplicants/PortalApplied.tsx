import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
} from '@components'
import { DocumentsView } from '@hooks'
import { StudentCellInfo } from '@partials/industry/currentStudents/components'
import { RequirementModal } from '@partials/industry/job/modals/RequirementModal'
import { IndustryApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { IoMdEye } from 'react-icons/io'

export const PortalApplied = () => {
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    const [modal, setModal] = useState<ReactNode | null>(null)

    const { onFileClicked, documentsViewModal } = DocumentsView()
    const onViewRequirementClick = (cover_latter: any) => {
        setModal(
            <RequirementModal
                coverLatter={cover_latter}
                onCancel={() => setModal(null)}
            />
        )
    }
    // query
    const { data, isLoading, isError } = IndustryApi.Job.useAppliedUser(
        {
            id: Number(router.query?.id),
            search: `${JSON.stringify({ ...filter, type: 'appliedFromPortal' })
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
            sort: '-title',
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            skip: !router.query?.id,
        }
    )

    const TableActionOption = [
        {
            text: 'View',
            Icon: IoMdEye,
            onClick: (job: any) => {
                router.push(`/portals/industry/jobs/${router?.query?.id}`)
            },
        },
        // {
        //     text: 'Edit',
        //     Icon: MdEdit,
        //     onClick: (job: any) => {
        //         router.push(`/portals/industry/jobs/form/${job.id}`)
        //     },
        // },
        // {
        //     text: 'Delete',
        //     Icon: AiFillDelete,
        //     onClick: (job: any) => {},
        // },
    ]

    const Columns: ColumnDef<any>[] = [
        {
            header: () => 'Student',
            accessorKey: 'title',
            cell: ({ row }: any) => {
                return (
                    <StudentCellInfo
                        id={row.original?.id}
                        student={
                            row.original?.applier
                                ? row.original?.applier
                                : {
                                      user: {
                                          name: row.original?.name,
                                          email: row.original?.email,
                                      },
                                  }
                        }
                    />
                )
            },
        },
        {
            header: () => 'Resume',
            accessorKey: 'employmentType',
            cell: ({ row }: any) => {
                const user = row.original
                let fileName = user ? user?.resume?.split('\\') : ''
                if (fileName?.length === 1) {
                    fileName = user?.resume?.split('/')

                    if (fileName.length > 1) {
                        fileName = fileName[fileName?.length - 1]
                    }
                }

                const extension = fileName
                    ?.replaceAll('{"', '')
                    .replaceAll('"}', '')
                    ?.split('.')
                    .reverse()[0]
                return (
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            onFileClicked({
                                ...row.original,
                                file: row.original?.resume
                                    .replaceAll('{"', '')
                                    .replaceAll('"}', ''),
                                extension,
                                type: 'all',
                            })
                        }}
                    >
                        View File
                    </ActionButton>
                )
            },
        },
        {
            header: () => 'Cover Letter',
            accessorKey: 'cover',
            cell: (info) => {
                return (
                    <ActionButton
                        variant="link"
                        simple
                        onClick={() =>
                            onViewRequirementClick(
                                info.row.original?.cover_latter
                            )
                        }
                    >
                        View
                    </ActionButton>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        text={'More'}
                        options={TableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]
    return (
        <div>
            {documentsViewModal}
            {modal}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data?.data && data?.data.length ? (
                    <Table
                        columns={Columns}
                        data={data.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: any) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto remove-scrollbar">
                                        <div className="px-6 w-full">
                                            {table}
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Application!'}
                            description={
                                'None of the students have applied yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
