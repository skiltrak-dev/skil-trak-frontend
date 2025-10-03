import { ColumnDef } from '@tanstack/react-table'
import { ReactElement, useEffect, useState } from 'react'

import { AdminLayout } from '@layouts'
import { AppointmentTypeFilterType, NextPageWithLayout, Rpl } from '@types'

// query
import { AdminApi } from '@queries'

// components
import { PageHeading } from '@components/headings'

import {
    ActionButton,
    AppointmentTypeFilters,
    Card,
    EmptyData,
    Filter,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { DocumentsView, useNavbar } from '@hooks'
import { DeleteRplModal, ViewAcademicDocumentsModal } from '@partials/admin/Rpl'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

type Props = {}

const RPLList: NextPageWithLayout = (props: Props) => {
    const navBar = useNavbar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AppointmentTypeFilterType>(
        {} as AppointmentTypeFilterType
    )
    const { documentsViewModal, onFileClicked } = DocumentsView()

    const { isLoading, data, isError } = AdminApi.Rpl.useRplList({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const [markAsRead, markAsReadResult] = AdminApi.Rpl.useRplRead()
    useEffect(() => {
        markAsRead()
    }, [])
    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (rpl: any) => {
        setModal(<DeleteRplModal rpl={rpl} onCancel={onModalCancelClicked} />)
    }

    const onViewAcademicDocuments = (financialEvidence: any) => {
        setModal(
            <ViewAcademicDocumentsModal
                onCancel={onModalCancelClicked}
                financialEvidence={financialEvidence}
            />
        )
    }

    useEffect(() => {
        navBar.setTitle('RPL LIST')

        return () => {
            navBar.setTitle('')
        }
    }, [])
    const tableActionOptions: TableActionOption<Rpl>[] = [
        {
            text: 'Delete',
            onClick: (item) => onDeleteClicked(item),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Rpl>[] = [
        {
            header: () => <span>Industry</span>,
            accessorKey: 'name',
            cell: ({ row }) => {
                const { industry } = row.original
                return (
                    <Link href={`#`} className="flex items-center gap-x-2">
                        {industry?.user?.name && (
                            <div className="shadow-inner-image rounded-full relative">
                                <InitialAvatar
                                    name={industry?.user?.name}
                                    imageUrl={industry?.user?.avatar}
                                />
                            </div>
                        )}
                        <div>
                            <p className="font-semibold">
                                {industry?.user?.name}
                            </p>
                            <div className="font-medium text-xs text-gray-500">
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdEmail />
                                    </span>
                                    {industry?.user?.email}
                                </p>
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdPhoneIphone />
                                    </span>
                                    {industry?.phoneNumber}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            },
        },
        {
            header: () => <span>Job Description</span>,
            accessorKey: 'jobDescription',
            cell: (info) => {
                return <div>{info.row.original?.jobDescription}</div>
            },
        },
        {
            header: () => <span>Course</span>,
            accessorKey: 'course',
            cell: (info) => {
                return <div>{info.row.original?.course || '---'}</div>
            },
        },
        {
            header: () => <span>Resume</span>,
            accessorKey: 'resume',
            cell: (info) => {
                const fileType = info.row.original?.resume
                    ?.split('.')
                    ?.reverse()[0]
                return info.row.original?.resume ? (
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            onFileClicked({
                                file: info.row.original?.resume,
                                extension: fileType,
                            })
                        }}
                    >
                        View
                    </ActionButton>
                ) : (
                    '---'
                )
            },
        },
        {
            header: () => <span>Identity</span>,
            accessorKey: 'identity',
            cell: (info) => {
                const fileType = info.row.original?.identity
                    ?.split('.')
                    ?.reverse()[0]
                return info.row.original?.identity ? (
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            onFileClicked({
                                file: info.row.original?.identity,
                                extension: fileType,
                            })
                        }}
                    >
                        View
                    </ActionButton>
                ) : (
                    '---'
                )
            },
        },
        {
            header: () => <span>Financial Evidence</span>,
            accessorKey: 'financialEvidence',
            cell: (info) => {
                const extension = info.row.original?.financialEvidence?.[0]
                    ?.split('.')
                    ?.reverse()[0]
                return info.row.original?.financialEvidence &&
                    info.row.original?.financialEvidence?.length > 0 ? (
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            onFileClicked({
                                file: info.row.original?.financialEvidence?.[0],
                                extension,
                            })
                        }}
                    >
                        View
                    </ActionButton>
                ) : (
                    '---'
                )
            },
        },
        {
            header: () => <span>Academic Documents</span>,
            accessorKey: 'academicDocuments',
            cell: (info) =>
                info.row.original?.academicDocuments &&
                info.row.original?.academicDocuments?.length > 0 ? (
                    <ActionButton
                        variant="info"
                        onClick={() => {
                            onViewAcademicDocuments(
                                info.row.original?.academicDocuments
                            )
                        }}
                    >
                        View
                    </ActionButton>
                ) : (
                    '---'
                ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: Rpl) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: Rpl[]) => (
            <ActionButton variant="error" onClick={() => {}}>
                Reject
            </ActionButton>
        ),
    }

    return (
        <div className="p-6">
            {modal && modal}
            {documentsViewModal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'RPL List'}
                    subtitle={'List of Requested RPL'}
                ></PageHeading>

                <Filter<AppointmentTypeFilterType>
                    component={AppointmentTypeFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={data.data}
                            quickActions={quickActionsElements}
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
                                                setItemPerPage
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                        <div className="px-6">{table}</div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No RPL!'}
                                description={'You have no RPL yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </div>
    )
}
RPLList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default RPLList
