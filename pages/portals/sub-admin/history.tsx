import { NextPageWithLayout } from '@types'
import { ReactElement, useEffect, useState } from 'react'

// layouts
import {
    Button,
    EmptyData,
    LoadingAnimation,
    NoData,
    PageSize,
    PageTitle,
    Pagination,
    TechnicalError,
} from '@components'
import { SubAdminLayout } from '@layouts'
import { HistoryDates, HistoryFilters } from '@partials/common'
import { CommonApi } from '@queries'
import { getCommonDates, getUserCredentials, removeEmptyValues } from '@utils'
import moment from 'moment'
import { FigureCard } from '@components/sections/subAdmin'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'
export enum FilterType {
    Today = 'today',
    '7Days' = '7days',
    Range = 'range',
}

const SubAdminHistory: NextPageWithLayout = () => {
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
    const [target, setTarget] = useState<string>('')

    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { data, isError, isLoading, isFetching } =
        CommonApi.RecentActivities.useRecentActivities(
            {
                ...(filterType === FilterType.Today
                    ? { currentDate: 1 }
                    : filterType === FilterType.Range
                    ? {
                          startDate: moment(customRangeDate?.startDate)
                              .add(1, 'days')
                              ?.toISOString(),
                          endDate: moment(customRangeDate?.endDate)
                              .add(1, 'days')
                              ?.toISOString(),
                      }
                    : filterType === FilterType['7Days']
                    ? { last7days: undefined }
                    : ''),
                search: `${JSON.stringify(
                    removeEmptyValues({ target, status: searchedValue })
                )
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                skip:
                    filterType === FilterType.Range &&
                    (!customRangeDate?.startDate || !customRangeDate?.endDate),
                refetchOnMountOrArgChange: true,
            }
        )

    const count = CommonApi.RecentActivities.useRecentActivitiesCount(
        {
            ...(filterType === FilterType.Today
                ? { currentDate: 1 }
                : filterType === FilterType.Range
                ? {
                      startDate: moment(customRangeDate?.startDate)
                          .add(1, 'days')
                          ?.toISOString(),
                      endDate: moment(customRangeDate?.endDate)
                          .add(1, 'days')
                          ?.toISOString(),
                  }
                : filterType === FilterType['7Days']
                ? { last7days: undefined }
                : ''),
            search: `${JSON.stringify({ target })
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
        },
        {
            skip:
                filterType === FilterType.Range &&
                (!customRangeDate?.startDate || !customRangeDate?.endDate),
            refetchOnMountOrArgChange: true,
        }
    )

    const dates = getCommonDates(data?.data)

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title={'History'} navigateBack />

                <HistoryFilters
                    filterType={filterType}
                    isCustomRange={isCustomRange}
                    setFilterType={setFilterType}
                    customRangeDate={customRangeDate}
                    setIsCustomRange={setIsCustomRange}
                    setSearchedValue={setSearchedValue}
                    setCustomRangeDate={setCustomRangeDate}
                />
            </div>

            {count.isError && (
                <NoData
                    text={'There is some technical issue in history count'}
                    isError
                />
            )}
            {count.isLoading ? (
                <LoadingAnimation size={60} />
            ) : (
                count.isSuccess && (
                    <div
                        className={`grid ${
                            getUserCredentials()?.role === UserRoles.ADMIN
                                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                                : getUserCredentials()?.role ===
                                  UserRoles.SUBADMIN
                                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                                : ''
                        } mt-3 gap-4`}
                    >
                        <FigureCard
                            count={count?.data?.callsMadeToStudent}
                            title={'Calls Made to Students'}
                            imageUrl={'/images/history/call-made.png'}
                            onClick={() => {
                                setTarget('call made to  student')
                            }}
                        />
                        <FigureCard
                            count={count?.data?.callsMadeToIndustry}
                            title={'Calls Made to Industry'}
                            imageUrl={'/images/history/industry-call.png'}
                            onClick={() => {
                                setTarget('call made to  industry')
                            }}
                        />
                        <FigureCard
                            count={count?.data?.notes}
                            title={'Notes Added'}
                            imageUrl={'/images/history/notes-added.png'}
                            onClick={() => {
                                setTarget('Note Added for')
                            }}
                        />
                        <FigureCard
                            count={count?.data?.studentProfileViewed}
                            title={'Student Profile Viewed'}
                            imageUrl={'/images/history/student-profile.png'}
                            onClick={() => {
                                setTarget(' Profile Viewed')
                            }}
                        />
                    </div>
                )
            )}
            <div className="mt-3 flex justify-end">
                <Button
                    text={'Clear Filter'}
                    variant="action"
                    onClick={() => {
                        setTarget('')
                    }}
                    disabled={!target}
                />
            </div>

            <div className="flex items-center justify-between">
                <PageSize
                    itemPerPage={itemPerPage}
                    setItemPerPage={setItemPerPage}
                    records={data?.data?.length}
                />
                <Pagination pagination={data?.pagination} setPage={setPage} />
            </div>

            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data?.data && data?.data?.length > 0 ? (
                dates?.map((date: Date, i: number) => (
                    <HistoryDates
                        key={String(date)}
                        date={date}
                        history={data?.data}
                        filterType={filterType}
                        customRangeDate={customRangeDate}
                    />
                ))
            ) : (
                !isError && (
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

SubAdminHistory.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default SubAdminHistory
