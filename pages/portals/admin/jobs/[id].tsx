import {
    ActionButton,
    BackButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableChildrenProps,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'

import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// hooks
import { DocumentsView } from '@hooks'
import { AdminLayout } from '@layouts'
import { StudentCellInfo } from '@partials/admin/student/components'
import { RequirementModal } from '@partials/industry/job/modals/RequirementModal'
import { IoMdEye } from 'react-icons/io'

const JobsAppliedStudents: NextPageWithLayout = () => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { onFileClicked, documentsViewModal } = DocumentsView()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks

    const { isLoading, isFetching, data, isError, refetch } =
        AdminApi.Jobs.useJobApplicants(
            {
                id: Number(router.query?.id),
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { skip: !router.query?.id, refetchOnMountOrArgChange: true }
        )

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                Icon: IoMdEye,
                onClick: (job: any) => {
                    router.push(`/portals/industry/jobs/${router?.query?.id}`)
                },
            },
        ]
    }

    const onViewRequirementClick = (cover_latter: any) => {
        setModal(
            <RequirementModal
                coverLatter={cover_latter}
                onCancel={() => setModal(null)}
            />
        )
    }

    const columns: ColumnDef<any>[] = [
        {
            header: () => 'Student',
            accessorKey: 'title',
            cell: ({ row }: any) => {
                return (
                    <StudentCellInfo
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
    ]

    return (
        <>
            {modal}
            {documentsViewModal}
            <div className="flex flex-col gap-y-4 p-4">
                <div className="flex flex-col">
                    <BackButton />
                    <PageHeading
                        title={'Applied Students'}
                        subtitle={'List of Applied Students'}
                    />
                </div>
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table columns={columns} data={data.data}>
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
                                                      data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto remove-scrollbar">
                                            <div className="px-6 w-full">
                                                {table}
                                            </div>
                                        </div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          data?.data?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              data?.pagination,
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
                        !isError && (
                            <EmptyData
                                title={'No Applied student!'}
                                description={
                                    'You have no Student that applied for a job'
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
JobsAppliedStudents.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default JobsAppliedStudents
