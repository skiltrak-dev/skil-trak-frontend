import { ReactElement, useEffect, useState } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout, RTOWorkplaceFormFilter } from '@types'
//components
import {
    Button,
    Card,
    EmptyData,
    Filter,
    HelpQuestionSet,
    InitialAvatar,
    LoadingAnimation,
    PageTitle,
    RTOWorkplaceFilters,
    SetDetaultQueryFilteres,
    Table,
    TableAction,
    TechnicalError,
} from '@components'
// Links
import Link from 'next/link'
// Queries
import { useGetRTOWorkplacesQuery } from '@queries'
// Next Image
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { FaFileExport } from 'react-icons/fa'
import { getUserCredentials } from '@utils'

type Props = {}

const filterKeys = [
    'studentId',
    'name',
    'email',
    'location',
    'subAdminId',
    'industryId',
    'courseId',
]

const RtoWorkplaces: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<RTOWorkplaceFormFilter>(
        {} as RTOWorkplaceFormFilter
    )
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const userId = getUserCredentials()?.id

    const { isLoading, data, isError } = useGetRTOWorkplacesQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const RelatedQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: '#',
        },
        {
            text: `I don't have a workplace. What should I do?`,
            link: '#',
        },
        {
            text: `I want to book an appointment`,
            link: '#',
        },
        {
            text: `I want to look for a job`,
            link: '#',
        },
    ]

    const OtherQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: '#',
        },
        {
            text: `I don't have a workplace. What should I do?`,
            link: '#',
        },
        {
            text: `I want to book an appointment`,
            link: '#',
        },
        {
            text: `I want to look for a job`,
            link: '#',
        },
    ]
    const columns: ColumnDef<any>[] = [
        {
            header: () => 'Industry Name',
            accessorKey: 'name',
            cell: ({ row }: any) => {
                const {
                    phoneNumber,
                    user: { name, email, avatar },
                } = row.original

                return (
                    <Link
                        legacyBehavior
                        href={`/portals/rto/industries/workplaces/${row?.original?.id}`}
                    >
                        <a className="flex items-center gap-x-2">
                            <div className="shadow-inner-image rounded-full relative">
                                <InitialAvatar name={name} imageUrl={avatar} />
                            </div>
                            <div>
                                <p className="font-semibold">{name}</p>
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
                                        {phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </Link>
                )
            },
        },
        {
            header: () => 'Abn',
            accessorKey: 'abn',
        },
        {
            header: () => 'Student',
            accessorKey: 'workplaceRequest.student.user.name',
            cell: ({ row }: any) => row.original?.students?.length,
            // cell: ({ row }: any) => (
            //     <StudentCellInfo
            //         student={row.original?.workplaceRequest?.student}
            //     />
            // ),
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }) => {
                const { addressLine1, addressLine2 } = row.original
                return `${addressLine1} ${addressLine2}`
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        rowItem={row.original}
                        options={[
                            {
                                text: 'View',
                                onClick: () => {
                                    router.push(
                                        `/portals/rto/industries/workplaces/${row.original.id}`
                                    )
                                },
                                Icon: '',
                            },
                        ]}
                    />
                )
            },
        },
    ]
    return (
        <>
            <SetDetaultQueryFilteres
                filterKeys={filterKeys}
                setFilter={setFilter}
            />
            <div className="mb-5">
                <div className="flex justify-between items-center">
                    <PageTitle
                        title={'Workplaces'}
                        navigateBack
                        backTitle={'Dashboard'}
                    />
                    {filterAction}
                </div>

                <Filter<RTOWorkplaceFormFilter>
                    component={RTOWorkplaceFilters}
                    initialValues={filter}
                    filterKeys={filterKeys}
                    setFilterAction={setFilterAction}
                    setFilter={setFilter}
                />
                <div className="flex justify-end">
                    {data && data?.data.length ? (
                        <>
                            <a
                                href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/workplaces/download/${userId}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button
                                    text={'Export'}
                                    variant={'action'}
                                    Icon={FaFileExport}
                                />
                            </a>
                        </>
                    ) : null}
                </div>
            </div>
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length ? (
                    <Table<any>
                        columns={columns}
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
                            title={'No Workplaces!'}
                            description={
                                'it seems that there is no workplace request'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
            <div className="mt-6 flex justify-between">
                {/* Related Questions */}
                <HelpQuestionSet
                    title={'What you want to do here?'}
                    questions={RelatedQuestions}
                />

                {/* Other Questions */}
                <HelpQuestionSet
                    title={'What else you want to do?'}
                    questions={OtherQuestions}
                />
            </div>
        </>
    )
}
RtoWorkplaces.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
        // pageTitle={{
        //     title: 'Workplaces',
        // }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoWorkplaces
