import {
    ActionButton,
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
import { AdminApi } from '@queries'
import { Course, CourseFilterType } from '@types'
import { getFilterQuery } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { CourseView } from './contextBar'
import { DeleteCourseModal, RequirementModal } from './modals'

const filterKeys = ['code', 'title']

export const Courses = () => {
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
    }, [])

    const { isLoading, data, isError } = AdminApi.Courses.useListQuery({
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
    const onCourseClick = (course: Course) => {
        contextBar.setTitle('Course Detail')
        contextBar.setContent(<CourseView course={course} />)
        contextBar.show()
    }
    const onViewRequirementClick = (course: Course) => {
        setModal(
            <RequirementModal course={course} onCancel={onModalCancelClicked} />
        )
    }

    const onDeleteClicked = (course: Course) => {
        setModal(
            <DeleteCourseModal
                course={course}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (course: Course) => onCourseClick(course),
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (item: any) => {
                router.push(`/portals/admin/sectors/courses/form/${item.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (course: Course) => onDeleteClicked(course),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<Course>[] = [
        {
            accessorKey: 'title',
            cell: (info) => {
                return (
                    <div
                        className="relative group cursor-pointer"
                        onClick={() => onCourseClick(info.row.original)}
                    >
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                {info.row.original.code}
                            </p>
                            <p className="font-semibold">
                                {info.row.original.title}
                            </p>
                        </div>

                        <div className="hidden group-hover:block px-4 py-2 bg-white rounded-xl shadow-xl absolute top-10 left-0 z-10">
                            <p className="text-xs font-semibold mb-1 text-gray-500">
                                Course Description
                            </p>
                            <p className="text-sm text-gray-700">
                                {info.row.original.description}
                            </p>
                        </div>
                    </div>
                )
            },
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'hours',
            header: () => <span>Hours</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'sector',
            header: () => <span>Sector</span>,
            cell: (info) => {
                return (
                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            {info.row.original.sector.code}
                        </p>
                        <p className="font-semibold">
                            {info.row.original.sector.name}
                        </p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'requirement',
            header: () => <span>Requirement</span>,
            cell: (info) => {
                return (
                    <ActionButton
                        variant="link"
                        simple
                        onClick={() =>
                            onViewRequirementClick(info.row.original)
                        }
                    >
                        View File
                    </ActionButton>
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
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
                <PageHeading title={'Courses'} subtitle={'List of all courses'}>
                    <Button
                        text="Add Course"
                        onClick={() => {
                            router.push('sectors/courses/form')
                        }}
                    />

                    {filterAction}
                    {data && data?.data.length ? (
                        <Button
                            text="Export"
                            variant="action"
                            Icon={FaFileExport}
                        />
                    ) : null}
                </PageHeading>

                <Filter<CourseFilterType>
                    component={CourseFilters}
                    initialValues={filter}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                    filterKeys={filterKeys}
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
                                title={'No Courses!'}
                                description={
                                    'You have not added any course yet'
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
