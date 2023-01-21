import { ReactElement, useEffect, useState } from 'react'

import {
    Button,
    Card,
    EmptyData,
    HelpQuestionSet,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { RtoLayout } from '@layouts'
import { AdminApi, RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useContextBar, useJoyRide } from '@hooks'
import { AddAdminCB, DeleteModal } from '@partials/rto'

type Props = {}

const RtoContactPersons: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const contextBar = useContextBar()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})

    const { isLoading, data } = RtoApi.Rto.useContactPersons({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    // ADD ADMIN JOY RIDE - START
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 2 })
            }, 1200)
        }
    }, [])
    // ADD ADMIN JOY RIDE - END

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
    const onDeleteClicked = (contactPerson: any) => {
        setModal(
            <DeleteModal
                contactPerson={contactPerson}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onAddAdmin = ({
        contactPerson,
        edit,
    }: {
        contactPerson?: any
        edit: boolean
    }) => {
        contextBar.setTitle('Add Contact Person')
        contextBar.setContent(
            <AddAdminCB
                {...(contactPerson ? { initialValues: contactPerson } : {})}
                {...(edit ? { edit: edit } : {})}
            />
        )
        contextBar.show(false)
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'Edit',
            onClick: (contactPerson: any) => {
                onAddAdmin({ contactPerson, edit: true })
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: async (contactPerson: any) =>
                onDeleteClicked(contactPerson),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            cell: (info) => (
                <div className="flex items-center gap-x-1">
                    <InitialAvatar name={info.row.original.name} />
                    <Typography variant={'label'}>
                        {info.row.original.name}
                    </Typography>
                </div>
            ),
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'phone',
            header: () => <span>Phone Number</span>,
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

    return (
        <>
            {modal && modal}
            <div id="add-admin" className="flex justify-end mb-2">
                <Button
                    text={'+ Add Contact Person'}
                    onClick={() => {
                        onAddAdmin({ contactPerson: null, edit: false })
                    }}
                />
            </div>

            {/*  */}
            <Card noPadding>
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table columns={columns} data={data.data}>
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
                    <EmptyData
                        title={'No Contact Persons!'}
                        description={'You have no contact persons yet'}
                        height={'50vh'}
                    />
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

RtoContactPersons.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout pageTitle={{ title: 'Contact Persons', backTitle: 'Users' }}>
            {page}
        </RtoLayout>
    )
}

export default RtoContactPersons
