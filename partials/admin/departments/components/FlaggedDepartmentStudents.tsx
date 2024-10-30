import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableChildrenProps,
    TechnicalError,
} from '@components'
import React from 'react'
import { useDepartmentStudentList } from '../hooks'
import { isWorkplaceValid } from 'utils/workplaceRowBlinking'
import moment from 'moment'

export const FlaggedDepartmentStudents = ({ status }: { status?: any }) => {
    const {
        isError,
        isLoading,
        isFetching,
        data,
        columns,
        quickActionsElements,
        listingRef,
        handleScroll,
        itemPerPage,
        setItemPerPage,
        setPage,
        // setStatusFilter,
    } = useDepartmentStudentList(status)

    const findCallLogsUnanswered = data?.data?.filter((student: any) => {
        const unansweredCalls = student?.callLog?.filter((call: any) => {
            if (call?.isAnswered === null) {
                const isMoreThanSevenDays =
                    moment().diff(moment(call?.createdAt), 'days') >= 7
                return isMoreThanSevenDays
            }
            return false
        })

        const checkPlacementStarted =
            student?.workplace?.length &&
            student?.workplace?.some(
                (placement: any) =>
                    placement?.currentStatus === 'completed' ||
                    placement?.currentStatus === 'placementStarted'
            )

        return (
            !student?.hasIssue &&
            !student?.isSnoozed &&
            !student?.nonContactable &&
            !checkPlacementStarted &&
            unansweredCalls?.length > 0
        )
    })
    const findExpiringInNext45Days = data?.data?.filter((student: any) => {
        const expiryDate = new Date(student?.expiryDate)
        const currentDate = new Date()
        const timeDiff = expiryDate.getTime() - currentDate.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        const checkPlacementStarted =
            student?.workplace?.length &&
            student?.workplace?.some(
                (placement: any) =>
                    placement?.currentStatus === 'completed' ||
                    placement?.currentStatus === 'placementStarted'
            )
        return (
            !student?.hasIssue &&
            !student?.isSnoozed &&
            !student?.nonContactable &&
            !checkPlacementStarted &&
            // student?.workplace?.length === 0 &&
            daysDiff <= 45 &&
            daysDiff >= 0
        )
    })

    const filterAwaitingAgreementBeyondSevenDays = data?.data?.filter(
        (student: any) => {
            return (
                !student?.hasIssue &&
                !student?.isSnoozed &&
                !student?.nonContactable &&
                student?.workplace?.some((workplace: any) =>
                    isWorkplaceValid(workplace)
                )
            )
        }
    )

    return (
        <>
            {' '}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length ? (
                    <Table
                        columns={columns}
                        data={data?.data}
                        quickActions={quickActionsElements}
                        enableRowSelection
                        awaitingAgreementBeyondSevenDays={
                            filterAwaitingAgreementBeyondSevenDays
                        }
                        findCallLogsUnanswered={findCallLogsUnanswered}
                        findExpiringInNext45Days={findExpiringInNext45Days}
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: TableChildrenProps) => {
                            return (
                                <div>
                                    <div
                                        ref={listingRef}
                                        onScroll={handleScroll}
                                        className="p-6 mb-2 flex justify-between"
                                    >
                                        {pageSize
                                            ? pageSize(
                                                  itemPerPage,
                                                  setItemPerPage,
                                                  data?.data?.length
                                              )
                                            : null}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination
                                                ? pagination(
                                                      data?.pagination,
                                                      setPage
                                                  )
                                                : null}
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto remove-scrollbar">
                                        <div
                                            className="px-6 w-full"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                    </div>
                                    {data?.data?.length > 10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
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
                            title={'No Approved Student!'}
                            description={
                                'You have not approved any Student request yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
