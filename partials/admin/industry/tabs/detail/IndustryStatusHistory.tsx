import {
    EmptyData,
    LoadingAnimation,
    NoData,
    PageTitle,
    TechnicalError,
} from '@components'
import { FigureCard } from '@components/sections/subAdmin'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { CommonApi } from '@queries'
import { getCommonDates } from '@utils'
import moment from 'moment'
import { FilterType } from 'pages/portals/sub-admin/history'
import React, { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
export const IndustryStatusHistory = ({ industry }: { industry: any }) => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [isCustomRange, setIsCustomRange] = useState<boolean>(false)
    const [filterType, setFilterType] = useState<FilterType>(
        FilterType['7Days']
    )
    const [customRangeDate, setCustomRangeDate] = useState<{
        startDate: Date | null
        endDate: Date | null
    }>({
        startDate: null,
        endDate: null,
    })
    const [searchedValue, setSearchedValue] = useState<string>('')

    // const count = CommonApi.RecentActivities.useRecentActivitiesCount(

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title={'Status History'} />
            </div>
            {industry?.isError && <TechnicalError />}
            {industry?.isLoading || industry?.isFetching ? (
                <LoadingAnimation />
            ) : industry.data?.user.statusChangeHistory &&
              industry?.data?.user?.statusChangeHistory.length > 0 ? (
                <div className="bg-white rounded-md shadow-md p-3 mt-4 flex justify-center items-center  gap-x-4">
                    {industry?.data?.user?.statusChangeHistory.map(
                        (history: any, i: number) => (
                            <>
                                {/* <div className="w-6 h-[1px] bg-slate-600"></div> */}
                                <span className="text-xs">Previous Status</span>
                                <BsArrowRight className="" size={20} />

                                <div>
                                    <div className="text-sm p-3 flex items-center justify-center rounded-full text-orange-500 bg-orange-100">
                                        <span className="text-sm capitalize font-semibold text-orange-500">
                                            {history.previous}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-6 h-[1px] bg-slate-600"></div>
                                <span className="text-xs ">Current Status</span>
                                <BsArrowRight className="" size={20} />

                                <div>
                                    <div className="text-sm p-3 flex items-center justify-center rounded-full text-green-500 bg-green-100">
                                        <span className="text-sm capitalize font-semibold text-green-500">
                                            {history.current}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-6 h-[1px] bg-slate-600"></div>
                                <span className="text-xs">Updated At</span>
                                <BsArrowRight className="" size={20} />
                                <div>
                                    <div className="text-sm p-3 flex items-center justify-center rounded-full text-gray-500 bg-gray-100">
                                        <span className="text-sm font-semibold text-gray-500">
                                            {history.updateAt.slice(0, 10)}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-6 h-[1px] bg-slate-600"></div>
                                <span className="text-xs">Updated By</span>
                                <BsArrowRight className="" size={20} />
                                <div>
                                    <div className="text-sm p-3 flex items-center gap-x-1 justify-center rounded-full text-red-500 bg-red-100">
                                        {/* <CiUser size={18} /> */}
                                        <span className="text-sm font-semibold capitalize text-red-500">
                                            {history.updateBy}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </div>
            ) : (
                !industry?.isError && (
                    <EmptyData
                        title={'No Title were found'}
                        description={
                            'It may be due to you have perform any action yet'
                        }
                    />
                )
            )}
        </div>
    )
}
