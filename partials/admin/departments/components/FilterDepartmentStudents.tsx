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
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'

import { useActionModal } from '@hooks'
import { RtoCellInfo } from '@partials/admin/rto/components'
import { Student, UserStatus } from '@types'
import { getUserCredentials, studentsListWorkplace } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { MdBlock } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { UserRoles } from '@constants'
import { isWorkplaceValid } from 'utils/workplaceRowBlinking'
import {
    AcceptModal,
    ArchiveModal,
    BlockModal,
    BlockMultiStudentsModal,
    ChangeStatusModal,
    DeleteModal,
    RejectModal,
    UnblockModal,
} from '@partials/admin/student/modals'
import {
    SectorCell,
    StudentCellInfo,
    StudentIndustries,
} from '@partials/admin/student/components'
import { useDepartmentStudentList } from '../hooks'

interface StatusTableActionOption extends TableActionOption {
    status: string[]
}

export const FilterDepartmentStudents = () => {
    const {
        modal,
        columns,
        quickActionsElements,
        passwordModal,
        isLoading,
        isFetching,
        isError,
        isSuccess,
        refetch,
        filter,
        data,
        setPage,
        itemPerPage,
        setItemPerPage,
    } = useDepartmentStudentList()
    // hooks

    // ================= Blinking/Flashing rows of students ================
    // const findCallLogsUnanswered = student?.data?.data?.filter(
    //     (student: any) => {
    //         const unansweredCalls = student?.callLog?.filter((call: any) => {
    //             if (call?.isAnswered === null) {
    //                 const isMoreThanSevenDays =
    //                     moment().diff(moment(call?.createdAt), 'days') >= 7
    //                 return isMoreThanSevenDays
    //             }
    //             return false
    //         })

    //         const checkPlacementStarted =
    //             student?.workplace?.length &&
    //             student?.workplace?.some(
    //                 (placement: any) =>
    //                     placement?.currentStatus === 'completed' ||
    //                     placement?.currentStatus === 'placementStarted'
    //             )

    //         return (
    //             !student?.hasIssue &&
    //             !student?.isSnoozed &&
    //             !student?.nonContactable &&
    //             !checkPlacementStarted &&
    //             unansweredCalls?.length > 0
    //         )
    //     }
    // )
    // const findExpiringInNext45Days = student?.data?.data?.filter(
    //     (student: any) => {
    //         const expiryDate = new Date(student?.expiryDate)
    //         const currentDate = new Date()
    //         const timeDiff = expiryDate.getTime() - currentDate.getTime()
    //         const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    //         const checkPlacementStarted =
    //             student?.workplace?.length &&
    //             student?.workplace?.some(
    //                 (placement: any) =>
    //                     placement?.currentStatus === 'completed' ||
    //                     placement?.currentStatus === 'placementStarted'
    //             )
    //         return (
    //             !student?.hasIssue &&
    //             !student?.isSnoozed &&
    //             !student?.nonContactable &&
    //             !checkPlacementStarted &&
    //             // student?.workplace?.length === 0 &&
    //             daysDiff <= 45 &&
    //             daysDiff >= 0
    //         )
    //     }
    // )

    // const filterAwaitingAgreementBeyondSevenDays = student?.data?.data?.filter(
    //     (student: any) => {
    //         return (
    //             !student?.hasIssue &&
    //             !student?.isSnoozed &&
    //             !student?.nonContactable &&
    //             student?.workplace?.some((workplace: any) =>
    //                 isWorkplaceValid(workplace)
    //             )
    //         )
    //     }
    // )
    // ============================= END ====================================

    console.log('student filtered', data)
    return (
        <>
            {passwordModal && passwordModal}
            {modal && modal}
            <div className="flex flex-col gap-y-4 p-4">
                

                <Card noPadding>
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data && data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={data?.data}
                            quickActions={quickActionsElements}
                            enableRowSelection
                            // awaitingAgreementBeyondSevenDays={
                            //     filterAwaitingAgreementBeyondSevenDays
                            // }
                            // findCallLogsUnanswered={findCallLogsUnanswered}
                            // findExpiringInNext45Days={findExpiringInNext45Days}
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
                                        <div
                                            className="px-6 overflow-auto remove-scrollbar"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize(
                                                    itemPerPage,
                                                    setItemPerPage,
                                                    data.data?.length
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
                        <EmptyData
                            title={'No Students in your Search!'}
                            description={'No Students in your Search yet'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
