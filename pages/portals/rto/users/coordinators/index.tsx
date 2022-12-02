import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ColumnDef } from '@tanstack/react-table'
//components
import {
    HelpQuestionSet,
    TableAction,
    Typography,
    EmptyData,
    Table,
    TechnicalError,
    Card,
    LoadingAnimation,
    PageTitle,
    Button,
} from '@components'
// queries
import { useGetRtoCoordinatorsQuery } from '@queries'
// Link
import Link from 'next/link'
// React icons
import { toNamespacedPath } from 'path'

type Props = {}

const RtoCoordinators: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = useGetRtoCoordinatorsQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    console.log("::: DATA", data)
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
    const Columns: ColumnDef<any>[] = [
        {
            header: () => 'Coordinator',
            accessorKey: 'title',
            cell: ({ row }: any) => {
                const {
                    user: { name, email },
                } = row.original
                return (
                    <Link
                        href={`/portals/rto/users/coordinators/${row.original.id}`}
                        className="flex items-center gap-x-2 relative"
                    >
                        <a>
                            {' '}
                            <div className="absolute top-1">
                                {/* <SimpleCheckbox /> */}
                            </div>
                            <div>
                                <Typography color={'black'}>
                                    {' '}
                                    {name}{' '}
                                </Typography>
                                <Typography variant={'muted'} color={'gray'}>
                                    {email}
                                </Typography>
                            </div>
                        </a>
                    </Link>
                )
            },
        },
        {
            header: () => 'Phone',
            accessorKey: 'phone',
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
        },

        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        rowItem={row}
                        options={[
                            {
                                text: 'View',
                                onClick: () => {
                                    router.push(
                                        `/portals/rto/users/coordinators/${row.original.id}`
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
        <div>
            <div className='flex justify-between items-end mb-6'>
                <PageTitle title="Coordinators" backTitle="Users" />
                <div>
                    <Button text="+ Add Coordinator" onClick={()=>{
                        router.push('coordinators/create')
                    }}/>
                </div>
            </div>
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
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
                            title={'No Approved Student!'}
                            description={
                                'You have not approved any Student request yet'
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
        </div>
    )
}
RtoCoordinators.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default RtoCoordinators
