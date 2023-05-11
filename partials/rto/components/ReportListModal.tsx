import { LoadingAnimation, NoData, Table } from '@components'
import { Button } from '@components/buttons'
import { CommonApi } from '@queries'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { PulseLoader } from 'react-spinners'

export const ReportListModal = ({ data, columns, onClose }: any) => {

    return (
        <>
            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white h-[80vh] overflow-auto custom-scrollbar rounded-2xl flex flex-col items-center gap-y-2 shadow-xl min-w-[450px] px-4 py-4">
                    <div className="flex justify-end w-full">
                        <FaTimes
                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                            onClick={() => {
                                onClose && onClose()
                            }}
                        />
                    </div>
                    {data?.data?.length > 0 ? (
                        <Table columns={columns} data={data?.data}>
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: any) => {
                                return (
                                    <div>
                                        {/* <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(itemPerPage, setItemPerPage)}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div> */}
                                        <div className="px-6">{table}</div>
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        <NoData text='No data found' />
                    )}

                    <div className="flex gap-x-4 items-center justify-end">
                        <Button
                            text="Close"
                            variant="secondary"
                            onClick={() => {
                                onClose && onClose()
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
