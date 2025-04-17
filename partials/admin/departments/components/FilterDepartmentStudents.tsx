import { Card, EmptyData, LoadingAnimation, Table } from '@components'

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
