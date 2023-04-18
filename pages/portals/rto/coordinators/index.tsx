import { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout, SubAdmin } from '@types'
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
    TableActionOption,
    InitialAvatar,
} from '@components'
// queries
import { RtoApi } from '@queries'
// Link
import Link from 'next/link'
// React icons
import { toNamespacedPath } from 'path'
import { useJoyRide, useNotification } from '@hooks'
import { DeleteModal } from '@partials/admin/sub-admin/modals'
import { CoursesCell } from '@partials/rto/coordinators'

type Props = {}

const RtoCoordinators: NextPageWithLayout = (props: Props) => {
    const [changeStatusResult, setChangeStatusResult] = useState<any>({})
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { notification } = useNotification()

    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = RtoApi.Coordinator.useList({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const [removeCoordinator, removeCoordinatorResult] =
        RtoApi.Coordinator.useRemove()

    // ADD COORDINATOR JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    // ADD COORDINATOR JOY RIDE - END

    useEffect(() => {
        if (removeCoordinatorResult.isSuccess) {
            notification.error({
                title: 'Coordinato Removed',
                description: 'Coordinato Removed Successfully',
            })
        }
    }, [removeCoordinatorResult])

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

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onArchivedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <DeleteModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
                setChangeStatusResult={setChangeStatusResult}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (coordinator: any) => {
                router.push(`/portals/rto/coordinators/${coordinator?.id}`)
            },
            Icon: '',
        },
        {
            text: 'Delete',
            onClick: (coordinator: any) => {
                removeCoordinator(coordinator?.user?.id)
            },
            Icon: '',
        },
    ]

    const Columns: ColumnDef<any>[] = [
        {
            header: () => 'Coordinator',
            accessorKey: 'title',
            cell: ({ row }: any) => {
                const {
                    user: { name, email, avatar },
                } = row.original
                return (
                    <Link
                        legacyBehavior
                        href={`/portals/rto/coordinators/${row.original.id}`}
                        className="flex items-center gap-x-2 relative"
                    >
                        <a className="flex items-center gap-x-1">
                            <InitialAvatar name={name} imageUrl={avatar} />
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
            header: () => 'Courses',
            accessorKey: 'course',
            cell: (info) => {
                return <CoursesCell coordinator={info.row.original} />
            },
        },
        {
            header: () => 'Address',
            accessorKey: 'addressLine1',
        },

        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        rowItem={row?.original}
                        options={tableActionOptions}
                    />
                )
            },
        },
    ]
    return (
        <div>
            <div className="flex justify-between items-end mb-6">
                <PageTitle title="Coordinators" backTitle="Users" />
                <div id="add-coordinator">
                    <Button
                        text="+ Add Coordinator"
                        onClick={() => {
                            router.push('coordinators/create')
                        }}
                    />
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
                            title={'No Coordinator!'}
                            description={'You have not any Coordinator yet'}
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
