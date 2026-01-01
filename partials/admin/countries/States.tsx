import {
    ActionButton,
    Badge,
    Button,
    Card,
    CourseFilters,
    EmptyData,
    Filter,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaTrash } from 'react-icons/fa'

import { useContextBar, useNavbar } from '@hooks'
import { CommonApi } from '@queries'
import { Course, CourseFilterType } from '@types'
import { getFilterQuery, isDateWithinLast7Days } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
// import { CourseView } from './contextBar'
import { DeleteStateModal } from './modals'

const filterKeys = ['code', 'title']

export const States = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const navBar = useNavbar()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<CourseFilterType>(
        {} as CourseFilterType
    )

    useEffect(() => {
        const query = getFilterQuery<CourseFilterType>({ router, filterKeys })
        setFilter(query as CourseFilterType)
    }, [router])

    useEffect(() => {
        navBar.setTitle('Courses')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const { isLoading, data, isError } = CommonApi.Countries.useStatesList({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }
    // const onCourseClick = (course: Course) => {
    //     contextBar.setTitle('Course Detail')
    //     contextBar.setContent(<CourseView course={course} />)
    //     contextBar.show()
    // }

    const onDeleteClicked = (state: any) => {
        setModal(
            <DeleteStateModal
                state={state}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tableActionOptions: TableActionOption<any>[] = [
        // {
        //     text: 'View',
        //     onClick: (course: Course) => onCourseClick(course),
        //     Icon: FaEye,
        // },
        // {
        //     text: 'Edit',
        //     onClick: (item: any) => {
        //         router.push(`/portals/admin/sectors/courses/form/${item.id}`)
        //     },
        //     Icon: FaEdit,
        // },
        {
            text: 'Delete',
            onClick: (state: any) => onDeleteClicked(state),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns = [
        {
            accessorKey: 'name',
            cell: (info: any) => {
                return (
                    <div
                        className="relative group"
                        // onClick={() => onCourseClick(info.row.original)}
                    >
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                {info?.row?.original?.code}
                            </p>
                            <p className="font-semibold">
                                {info?.row?.original?.name}{' '}
                                {isDateWithinLast7Days(
                                    info?.row?.original?.createdAt as Date
                                ) && <Badge text={'New'} variant={'info'} />}
                            </p>
                        </div>

                        {/* <div className="hidden group-hover:block px-4 py-2 bg-white rounded-xl shadow-xl absolute top-10 left-0 z-10">
                            <p className="text-xs font-semibold mb-1 text-gray-500">
                                Course Description
                            </p>
                            <p className="text-sm text-gray-700">
                                {info?.row.original?.description}
                            </p>
                        </div> */}
                    </div>
                )
            },
            header: () => <span>States</span>,
        },

        {
            accessorKey: 'country',
            header: () => <span>Country</span>,
            cell: (info: any) => {
                return (
                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            {info?.row?.original?.country?.code}
                        </p>
                        <p className="font-semibold">
                            {info?.row?.original?.country?.name}
                        </p>
                    </div>
                )
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
                            rowItem={info?.row?.original}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (item: Course) => (
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
        common: (items: Course[]) => (
            <div className="flex gap-x-2">
                {/* <ActionButton variant="success">Accept</ActionButton> */}
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
                <PageHeading title={'States'} subtitle={'List of all states'}>
                    <Button
                        text="Add State"
                        onClick={() => {
                            router.push('countries/states/form')
                        }}
                    />

                    {/* {filterAction} */}
                    {/* {data && data?.data.length ? (
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    ) : null} */}
                </PageHeading>

                {/* <Filter<CourseFilterType>
                    component={CourseFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
                /> */}

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
                                title={'No State!'}
                                description={'You have not added any state yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
