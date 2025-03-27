import Link from 'next/link'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import moment, { Moment } from 'moment'
import { SubAdminLayout } from '@layouts'
import { RxCross2 } from 'react-icons/rx'
import { PiUsersBold } from 'react-icons/pi'
import { StudentKpiDetails, WeekFilter } from '@partials/common'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { getMonthDates } from '@partials/common/kpis/Common/year-week-filter/functions'
import { SECTIONS_CONFIG } from '@partials/common/kpis/kpi-detail/kpiComponentsData'

const HodKpiDetail = () => {
    const router = useRouter()

    const [activeSection, setActiveSection] = useState(SECTIONS_CONFIG[0].label)

    const [startDate, setStartDate] = useState<Moment | null>(null)
    const [endDate, setEndDate] = useState<Moment | null>(null)

    useEffect(() => {
        const { startDate, endDate } = getMonthDates()
        handleDatesChange(startDate, endDate)
    }, [])

    const searchParams = useMemo(() => {
        if (startDate && endDate) {
            return `startDate:${moment(startDate).format(
                'YYYY-MM-DD'
            )},endDate:${moment(endDate).format('YYYY-MM-DD')}`
        }
        return ''
    }, [startDate, endDate])

    const subadmin = AdminApi.Kpi.subadminDetail(
        {
            id: Number(router?.query?.id),
        },
        {
            skip: !router?.query?.id,
            refetchOnMountOrArgChange: true,
        }
    )

    const handleDatesChange = useCallback(
        (startDate: Moment, endDate: Moment) => {
            setStartDate(startDate)
            setEndDate(endDate)
        },
        []
    )

    return (
        <div>
            {subadmin?.isError ? <TechnicalError /> : null}
            {subadmin?.isLoading ? (
                <LoadingAnimation />
            ) : subadmin?.data && subadmin?.isSuccess ? (
                <div className="flex bg-white flex-col ">
                    <div className="flex flex-col px-2 sm:px-4 md:px-6 py-3 md:py-4  sm:flex-row justify-between w-full gap-4 sm:gap-0">
                        <div className="flex justify-center sm:justify-start items-center">
                            <p className="  ">
                                <PiUsersBold className="text-lg md:text-xl text-[#1436B0]" />
                            </p>
                            <h1 className="pl-3 md:pl-4 py-2 md:py-3 font-medium text-2xl md:text-3xl font-inter">
                                Employee KPI Details
                            </h1>
                        </div>
                        <button className="flex justify-center items-center p-3 md:p-4 font-medium ">
                            <Link href={'/admin'}>
                                <RxCross2 className="text-lg md:text-xl text-[#9A9A9A]" />
                            </Link>
                        </button>
                    </div>
                    <hr className="" />

                    <StudentKpiDetails
                        subadmin={subadmin?.data}
                        {...{
                            startDate,
                            endDate,
                            activeSection,
                            setActiveSection,
                        }}
                        handleDatesChange={handleDatesChange}
                    />
                </div>
            ) : subadmin?.isSuccess ? (
                <EmptyData />
            ) : null}
        </div>
    )
}

HodKpiDetail.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default HodKpiDetail
