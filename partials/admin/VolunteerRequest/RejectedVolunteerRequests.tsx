import { ColumnDef } from '@tanstack/react-table'
import { ReactElement, useEffect, useState } from 'react'

import { AppointmentTypeFilterType } from '@types'

// query
import { AdminApi } from '@queries'

// components
import { PageHeading } from '@components/headings'

import {
    AppointmentTypeFilters,
    Card,
    EmptyData,
    Filter,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { useNavbar } from '@hooks'
import { CancelVolunteerModal } from '@partials/industry'
import moment from 'moment'
import { IoMdCloseCircle } from 'react-icons/io'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { VolunteerRequestEnum } from './enum'
import { VolunteerIndustryCellInfo } from './components'
import { useColumns } from './hooks'

export const RejectedVolunteerRequests = () => {
    const navBar = useNavbar()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState<AppointmentTypeFilterType>(
        {} as AppointmentTypeFilterType
    )
    const { isLoading, data, isError } = AdminApi.Volunteer.useList({
        search: `status:${VolunteerRequestEnum.REJECTED}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    useEffect(() => {
        navBar.setTitle('Volunteer Request')

        return () => {
            navBar.setTitle('')
        }
    }, [])

    const onCancelModal = () => setModal(null)

    const onCancelRequest = (volunteer: any) => {
        setModal(
            <CancelVolunteerModal
                volunteer={volunteer}
                onCancel={onCancelModal}
            />
        )
    }

    const columns = useColumns()

    return (
        <div>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Rejected Volunteer Request'}
                    subtitle={'List of Rejected Volunteer Request'}
                />

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
