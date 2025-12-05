import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
} from '@components'
import { Student, UserStatus } from '@types'
import { FaTrash } from 'react-icons/fa'

import { useGetRtoStudentsQuery } from '@queries'
import { useState } from 'react'
import { MdUnarchive } from 'react-icons/md'
import { useColumns } from './hooks'

export const ArchivedStudent = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Archived}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const { getTableConfig, modal } = useColumns()

    const { columns } = getTableConfig({
        actionKeys: ['changeStatus', 'changeExpiry', 'delete'],
    })

    const quickActionsElements = {
        id: 'id',
        individual: (id: Student) => (
            <div className="flex gap-x-2">
                <ActionButton>Sub Admins</ActionButton>
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
        common: (ids: Student[]) => (
            <div className="flex gap-x-2">
                <ActionButton Icon={MdUnarchive} variant="warning">
                    Unarchive
                </ActionButton>
                <ActionButton Icon={FaTrash} variant="error">
                    Delete
                </ActionButton>
            </div>
        ),
    }

    return (
        <div className="flex flex-col gap-y-4">
            {modal}
            {/* <PageHeading
                title={'Archived Students'}
                subtitle={'List of Archived Students'}
            >
                {data && data?.data.length ? (
                    <>
                        <a
                            href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/students-list/download/${userId}?status=expired`}
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
            </PageHeading> */}

            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length ? (
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
                                            setItemPerPage,
                                            data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-6 overflow-auto">
                                        {table}
                                    </div>
                                    {data?.data?.length > 10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Archived Student!'}
                            description={'You have not archived Student yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
