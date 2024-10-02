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

export const DepartmentStudentList = () => {
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
    } = useDepartmentStudentList()
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
