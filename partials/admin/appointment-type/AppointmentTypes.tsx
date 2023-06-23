import {
    ActionButton,
    AppointmentTypeFilters,
    Button,
    Card,
    EmptyData,
    Filter,
    LoadingAnimation,
    SectorFilters,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaBook, FaEdit, FaFileExport, FaTrash, FaVideo } from 'react-icons/fa'

import Image from 'next/image'
import { useContextBar } from '@hooks'
import { AdminApi } from '@queries'
import { AppointmentType, Sector } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { DeleteModal, RequirementModal } from './modals'

export const AppointmentTypes = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = AdminApi.AppointmentTypes.useList({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const getImages = (type: string) => {
        switch (type) {
            case 'student':
                return '/images/icons/students.png'
            case 'rto':
                return '/images/icons/rto.png'
            case 'industry':
                return '/images/icons/industry.png'
            default:
                return ''
        }
    }

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onViewContentClicked = (appointmentType: AppointmentType) => {
        setModal(
            <RequirementModal
                appointmentType={appointmentType}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onDeleteClicked = (appointmentType: AppointmentType) => {
        setModal(
            <DeleteModal
                appointmentType={appointmentType}
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
            onClick: (item: any) => {
                router.push(`/portals/admin/appointment-type/form/${item.id}`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Delete',
            onClick: (item: any) => onDeleteClicked(item),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<AppointmentType>[] = [
        {
            header: () => <span>Title</span>,
            accessorKey: 'title',
            cell: (info) => {
                return (
                    <div>
                        <p className="font-semibold">
                            {info.row.original.title}
                        </p>
                        <div className="flex gap-x-1 items-center">
                            <div
                                className="h-4 w-4 rounded-[4px]"
                                style={{
                                    backgroundColor: info.row.original.color,
                                }}
                            ></div>
                            {info.row.original.videoAppointment ? (
                                <div className="h-4 w-4 bg-indigo-500 text-white flex items-center justify-center rounded-[4px]">
                                    <FaVideo size={11} />
                                </div>
                            ) : null}
                        </div>
                    </div>
                )
            },
        },
        {
            accessorKey: 'breakDuration',
            header: () => <span>Break</span>,
            cell: (info) => (
                <div>
                    <span className="font-medium">
                        {info.row.original.breakDuration}
                    </span>{' '}
                    <span className="text-xs text-gray-500">Minutes</span>
                </div>
            ),
        },
        {
            accessorKey: 'duration',
            header: () => <span>Duration</span>,
            cell: (info) => (
                <div>
                    <span className="font-medium">
                        {info.row.original.duration}
                    </span>{' '}
                    <span className="text-xs text-gray-500">Minutes</span>
                </div>
            ),
        },
        {
            accessorKey: 'appointmentFor',
            header: () => <span>For</span>,
            cell: (info) => {
                return (
                    <div>
                        <Image
                            title={info.row.original.appointmentFor}
                            src={getImages(
                                info.row.original.appointmentFor || ''
                            )}
                            width={28}
                            height={28}
                            alt=""
                        />
                    </div>
                )
            },
        },
        {
            accessorKey: 'appointmentParticipants',
            header: () => <span>Participants</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-2 items-center">
                        {info.row.original.appointmentParticipants?.map((p) => (
                            <div className="bg-white p-1 rounded-md shadow w-8 h-8">
                                <Image
                                    title={p}
                                    src={getImages(p)}
                                    width={22}
                                    height={22}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                )
            },
        },
        {
            accessorKey: 'emailContent',
            header: () => <span>Email Content</span>,
            cell: (info) => (
                <ActionButton
                    variant="link"
                    simple
                    onClick={() => onViewContentClicked(info.row.original)}
                >
                    View
                </ActionButton>
            ),
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

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Appointment Type'}
                    subtitle={'List of All Appointment Types'}
                >
                    <>
                        <Button
                            text="Create Appointment"
                            onClick={() => {
                                router.push(
                                    'appointment-type/create-appointment'
                                )
                            }}
                        />
                        <Button
                            text="Add Appointment Type"
                            onClick={() => {
                                router.push('appointment-type/form')
                            }}
                        />
                        {/* {data && data?.data.length ? ( */}
                        <>
                            {filterAction}
                            <Button
                                text="Export"
                                variant="action"
                                Icon={FaFileExport}
                            />
                        </>
                        {/* ) : null} */}
                    </>
                </PageHeading>

                {data && data?.data.length ? (
                    <Filter
                        component={AppointmentTypeFilters}
                        initialValues={filter}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                    />
                ) : null}

                <Card noPadding>
                    {isError && <TechnicalError />}
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
                                title={'No Appointment Type!'}
                                description={'You have no appointment type yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
