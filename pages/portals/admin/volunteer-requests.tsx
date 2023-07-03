import { ColumnDef } from '@tanstack/react-table'
import { ReactElement, useEffect, useState } from 'react'

import { AdminLayout } from '@layouts'
import {
    AppointmentType,
    AppointmentTypeFilterType,
    NextPageWithLayout,
} from '@types'

// query
import { AdminApi } from '@queries'

// components
import { PageHeading } from '@components/headings'

import {
    AppointmentTypeFilters,
    Button,
    Card,
    EmptyData,
    Filter,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableActionOption,
    TechnicalError,
} from '@components'
import { useNavbar } from '@hooks'
import { DeleteModal } from '@partials/admin/job'
import { FaFileExport, FaTrash } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

type Props = {}

const VolunteerRequests: NextPageWithLayout = (props: Props) => {
    const navBar = useNavbar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AppointmentTypeFilterType>(
        {} as AppointmentTypeFilterType
    )
    const { isLoading, data, isError } = AdminApi.Volunteer.useList({
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

    const onDeleteClicked = (appointmentType: AppointmentType) => {
        setModal(
            <DeleteModal
                appointmentType={appointmentType}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    useEffect(() => {
        navBar.setTitle('Volunteer Request')
    }, [])

    const columns: ColumnDef<any>[] = [
        {
            header: () => <span>Name</span>,
            accessorKey: 'jobDescription',
            cell: (info) => {
                const {
                    phoneNumber,
                    user: { name, email, avatar },
                } = info.row.original?.industry || {}
                return (
                    <a className="flex items-center gap-x-2">
                        <InitialAvatar name={name} imageUrl={avatar} />
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
                )
            },
        },
        {
            header: () => <span>ABN</span>,
            accessorKey: 'industry.abn',
            cell: (info) => info.getValue(),
        },
        {
            header: () => <span>Address</span>,
            accessorKey: 'industry.addressLine1',
            cell: (info) =>
                `${info.row.original?.industry.addressLine1 || 'N/A'}, ${
                    info.row.original?.industry.addressLine2 || ''
                }`,
        },
        {
            header: () => <span>Enrolled Students</span>,
            accessorKey: 'industry.enrolledStudents',
            cell: (info) => info.getValue(),
        },
    ]

    return (
        <div className="p-6">
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Volunteer Request'}
                    subtitle={'List of Volunteer Request'}
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

                <Filter<AppointmentTypeFilterType>
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
                                title={'No Volunteer Request Found'}
                                description={
                                    'There is no any Volunteer Request request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </div>
    )
}
VolunteerRequests.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}
export default VolunteerRequests
