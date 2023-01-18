import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    RtoFilters,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaFilter, FaTrash } from 'react-icons/fa'
import { Student } from '@types'

import { useGetRtoStudentsQuery } from '@queries'
import {
    MdBlock,
    MdEmail,
    MdPhoneIphone,
    MdRestore,
    MdUnarchive,
} from 'react-icons/md'
import { useState, ReactElement } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { SectorCell, StudentCellInfo } from './components'
import { useRouter } from 'next/router'
import { DeleteModal, AcceptModal } from './modals'

export const ArchivedStudent = () => {
    const router = useRouter()
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    const { isLoading, data, isError } = useGetRtoStudentsQuery({
        search: `status:archived,${JSON.stringify(filter)
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

    const onDeleteClicked = (student: Student) => {
        setModal(
            <DeleteModal
                item={student}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onUnArchiveClicked = (item: Student) => {
        setModal(
            <AcceptModal item={item} onCancel={() => onModalCancelClicked()} />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(`/portals/rto/students/${student.id}`)
            },
            Icon: FaEye,
        },
        {
            text: 'Unarchive',
            onClick: (student: Student) => onUnArchiveClicked(student),
            Icon: MdUnarchive,
            color: 'text-orange-500 hover:bg-orange-100 hover:border-orange-200',
        },
        {
            text: 'Delete',
            onClick: (student: Student) => onDeleteClicked(student),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Student>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return <StudentCellInfo student={info.row.original} />
            },
            header: () => <span>Student</span>,
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'suburb',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
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
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
        common: (ids: number[]) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <div className="flex flex-col gap-y-4 mb-32">
            {modal && modal}
            <PageHeading
                title={'Archived Students'}
                subtitle={'List of Archived Students'}
            >
                {data && data?.data.length ? (
                    <>
                        {filterAction}
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    </>
                ) : null}
            </PageHeading>

            {data && data?.data.length ? (
                <Filter
                    component={RtoFilters}
                    initialValues={{ name: '', email: '', rtoCode: '' }}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
            ) : null}

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
                                        {pageSize(itemPerPage, setItemPerPage)}
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
                            title={'No Archived Student!'}
                            description={'You have not archived Student yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
