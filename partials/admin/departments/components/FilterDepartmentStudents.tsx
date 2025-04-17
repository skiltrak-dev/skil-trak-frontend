import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableActionOption,
} from '@components'

import { useDepartmentStudentList } from '../hooks'

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
