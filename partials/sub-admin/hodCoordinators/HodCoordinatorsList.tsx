import {
    Card,
    EmptyData,
    Table,
    TableSkeleton,
    TechnicalError,
} from '@components'
import { useHodCoordinatorsList } from './HodCoordinatorsListProvider'

export const HodCoordinatorsList = () => {
    const {
        modal,
        passwordModal,
        data,
        columns,
        quickActionsElements,
        itemPerPage,
        setItemPerPage,
        setPage,
    } = useHodCoordinatorsList()

    return (
        <>
            {modal && modal}
            {passwordModal && passwordModal}
            <div className="flex flex-col gap-y-4 mb-5">
                {data.isError && <TechnicalError />}
                <Card noPadding>
                    {data.isLoading || data.isFetching ? (
                        <TableSkeleton arrayLength={data?.data?.data?.length} />
                    ) : data?.data?.data && data?.data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={data?.data?.data}
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
                                                data?.data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.data?.pagination,
                                                    setPage
                                                )}
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
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !data.isError &&
                        !data?.data?.data?.length && (
                            <EmptyData
                                title={'No Active SubAdmin!'}
                                description={'You have no Active SubAdmin'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
