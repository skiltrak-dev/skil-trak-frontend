import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
    WPTypesFilters,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'

import { useContextBar, useNavbar } from '@hooks'
import { AdminApi } from '@queries'
import { WorkplaceType, WpTypesFilterType } from '@types'
import { getFilterQuery } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { DeleteWpTypeModal } from './modals'

const filterKeys = ['title']

export const WorkplaceTypes = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const navBar = useNavbar()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<WpTypesFilterType>(
        {} as WpTypesFilterType
    )

    useEffect(() => {
        const query = getFilterQuery<WpTypesFilterType>({ router, filterKeys })
        setFilter(query as WpTypesFilterType)
    }, [router])

    useEffect(() => {
        navBar.setTitle('Workplace Types')
    }, [])

    const { isLoading, data, isError, isFetching } = AdminApi.WpTypes.wpTypes({
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

    const onDeleteClicked = (wpType: WorkplaceType) => {
        setModal(
            <DeleteWpTypeModal
                wpType={wpType}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Edit',
            onClick: (item: WorkplaceType) => {
                router.push(`/portals/admin/sectors/wp-types/${item.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (course: WorkplaceType) => onDeleteClicked(course),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<WorkplaceType>[] = [
        {
            accessorKey: 'name',
            cell: (info) => (
                <div className="relative group ">
                    <Typography variant="label" color="text-gray-800">
                        {info.row.original?.name}
                    </Typography>
                </div>
            ),
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'workplaceTypeSectors',
            cell: (info) => (
                <div className="flex items-center gap-1">
                    {info.row?.original?.sectors?.map((wpSectorType) => (
                        <div className="bg-primaryNew rounded px-2 py-1 w-fit">
                            <Typography variant="xs" color="text-white">
                                {wpSectorType?.sector?.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            ),
            header: () => <span>Sectors</span>,
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <TableAction
                        options={tableActionOptions}
                        rowItem={info.row.original}
                    />
                </div>
            ),
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (item: any) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={FaEdit}>Edit</ActionButton>
                <ActionButton
                    Icon={FaTrash}
                    variant="error"
                    onClick={() => onDeleteClicked(item)}
                >
                    Delete
                </ActionButton>
            </div>
        ),
        common: (items: any[]) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success">Accept</ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Workplace Types'}
                    subtitle={'List of all workplace types'}
                >
                    <Button
                        text="Add Worklpace Type"
                        onClick={() => {
                            router.push('sectors/wp-types')
                        }}
                    />

                    {filterAction}
                </PageHeading>

                <Filter<WpTypesFilterType>
                    component={WPTypesFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
                        <Table
                            columns={columns}
                            data={data?.data}
                            enableRowSelection
                            quickActions={quickActionsElements}
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
                                            {pageSize &&
                                                pageSize(
                                                    itemPerPage,
                                                    setItemPerPage,
                                                    data?.data?.length
                                                )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination &&
                                                    pagination(
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
                                title={'No Workplace Types!'}
                                description={
                                    'You have not added any workplace types yet'
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
