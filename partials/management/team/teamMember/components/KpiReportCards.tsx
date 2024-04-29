import React, { ReactElement, useState } from 'react'
import {
    GlobalModal,
    LoadingAnimation,
    NoData,
    PageSize,
    Pagination,
    TechnicalError,
    Typography,
} from '@components'
import { ManagementApi } from '@queries'
import { KpisFilterModal } from '../../modal'
import { KpiReportCard } from './KpiReportCard'

export const KpiReportCards = ({ id }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    console.log('from', startDate + 'to ' + endDate)
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(6)
    // useSubAdminKpiReports
    const { data, isLoading, isError, isFetching } =
        ManagementApi.CheckKpi.useSubAdminKpiReports(
            {
                id: id,
                params: {
                    // search: `status: ranage`,
                    startDate: startDate,
                    endDate: endDate,
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !id,
                refetchOnMountOrArgChange: true,
            }
        )

    const onCancel = () => {
        setModal(null)
    }

    const onDateRange = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <KpisFilterModal
                    onCancel={onCancel}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </GlobalModal>
        )
        // }
    }
    const onClear = () => {
        setStartDate('')
        setEndDate('')
    }

    return (
        <>
            {modal && modal}
            <div className="">
                <div className="mb-2 flex justify-between items-center">
                    <Typography variant="label" color="text-primaryNew">
                        All KPIs Report
                    </Typography>

                    <div className="flex items-center gap-x-4">
                        {startDate && endDate && (
                            <>
                                <div className="flex items-center gap-x-2 text-sm text-primaryNew font-medium">
                                    {startDate}{' '}
                                    <span className="text-sm font-bold">
                                        To
                                    </span>{' '}
                                    {endDate}
                                </div>
                                <button
                                    onClick={onClear}
                                    className="text-blue-500 font-medium text-sm underline"
                                >
                                    Clear Filter
                                </button>
                            </>
                        )}
                        <button
                            onClick={onDateRange}
                            className="text-blue-500 font-medium text-sm underline"
                        >
                            Date Range
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                        <PageSize
                            itemPerPage={itemPerPage}
                            setItemPerPage={setItemPerPage}
                        />
                        <Pagination
                            pagination={data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[40vh]" />
                    ) : data?.data && data?.data?.length > 0 ? (
                        <div className="grid grid-cols-3 gap-y-4 gap-x-3 w-full">
                            {data?.data?.map((report: any) => (
                                <div>
                                    <KpiReportCard report={report} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        !isError && <NoData text={'No Reports Found'} />
                    )}

                    {/* <KpiReportCard />
                    <KpiReportCard />
                    <KpiReportCard />
                    <KpiReportCard />
                    <KpiReportCard /> */}
                </div>
            </div>
        </>
    )
}
