import { ReactElement, useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { AdminLayout } from '@layouts'
import { AppointmentType, Job, NextPageWithLayout } from '@types'

// query
import { AdminApi } from '@queries'

// components
import { PageHeading } from '@components/headings'

import { useNavbar } from '@hooks'
import {
    ActionButton,
    AppointmentTypeFilters,
    Button,
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
import { FaEnvelope, FaFileExport, FaPhone, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { DeleteRplModal } from '@partials/admin/Rpl'

type Props = {}

const RPLList: NextPageWithLayout = (props: Props) => {
    const navBar = useNavbar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = AdminApi.Rpl.useRplList({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (rpl: any) => {
        setModal(<DeleteRplModal rpl={rpl} onCancel={onModalCancelClicked} />)
    }
    useEffect(() => {
        navBar.setTitle('RPL LIST')
    }, [])
    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Delete',
            onClick: (item: any) => onDeleteClicked(item),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Industry</span>,
            accessorKey: 'name',
            cell: ({ row }) => {
                const { industry } = row.original
                return (
                    <Link href={`#`} className="flex items-center gap-x-2">
                        <div className="shadow-inner-image rounded-full relative">
                            <InitialAvatar
                                name={industry?.user?.name}
                                imageUrl={industry?.user?.avatar}
                            />
                        </div>
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
        // {
        //   header: () => <span>Description</span>,
        //   accessorKey: '',
        //   cell: (info) => {
        //     return (
        //       <ActionButton variant="link" simple>
        //         View
        //       </ActionButton>
        //     )
        //   },
        // },
        {
            header: () => <span>Job Description</span>,
            accessorKey: 'jobDescription',
            cell: (info) => {
                return <div>{info.row.original?.jobDescription}</div>
            },
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
        individual: (id: number) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
            <ActionButton variant="error" onClick={() => {}}>
                Reject
            </ActionButton>
        ),
    }

    return (
        <div className="p-6">
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'RPL List'}
                    subtitle={'List of Requested RPL'}
                >
                    {/* {filterAction} */}
                    {data && data?.data.length ? (
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    ) : null}
                </PageHeading>

                <Filter
                    component={AppointmentTypeFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
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
