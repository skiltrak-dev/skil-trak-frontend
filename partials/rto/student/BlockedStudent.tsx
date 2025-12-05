import {
    ActionButton,
    Card,
    CaseOfficerAssignedStudent,
    EmptyData,
    LoadingAnimation,
    StudentExpiryDaysLeft,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaTrash } from 'react-icons/fa'

import { useGetRtoStudentsQuery } from '@queries'
import { Student, UserStatus } from '@types'
import { studentsListWorkplace } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { IndustryCell, SectorCell, StudentCellInfo } from './components'
import { DeleteModal, UnblockModal } from './modals'
import { useColumns } from './hooks'

export const BlockedStudent = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, data, isError } = useGetRtoStudentsQuery({
        search: `status:${UserStatus.Blocked}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const { getTableConfig, modal } = useColumns()

    const { columns } = getTableConfig({
        actionKeys: ['unblock', 'delete'],
    })

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4">
                {/* <PageHeading
                    title={'Blocked Students'}
                    subtitle={'List of Blocked Students'}
                >
                    {data && data?.data.length ? (
                        <>
                            <Button
                                text="Export"
                                variant="action"
                                Icon={FaFileExport}
                            />
                        </>
                    ) : null}
                </PageHeading> */}

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
                            }: TableChildrenProps) => (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize &&
                                            pageSize(
                                                itemPerPage,
                                                setItemPerPage
                                            )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination &&
                                                pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                        </div>
                                    </div>
                                    <div className="px-6 overflow-auto">
                                        {table}
                                    </div>
                                </div>
                            )}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Blocked Student!'}
                                description={
                                    'There is no any blocked Student yet'
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
