import { SubAdminLayout } from '@layouts'
import {
    DataProvider,
    DeptEmployeeProgressCount,
    HodEmployeeCounts,
    HodTableColumns,
    LineChart,
    WeekFilter,
} from '@partials/common'
import { Moment } from 'moment'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import { LuSettings } from 'react-icons/lu'
import { PiUsersBold } from 'react-icons/pi'

const Kpis = () => {
    const [startDate, setStartDate] = useState<Moment | null>(null)
    const [endDate, setEndDate] = useState<Moment | null>(null)

    const handleDatesChange = (startDate: Moment, endDate: Moment) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }
    return (
        <DataProvider>
            <div className="flex flex-col pb-6 px-2 sm:px-4 md:px-6 pt-4 md:pt-6">
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-0">
                    <div className="flex justify-center sm:justify-start items-center">
                        <p className="bg-white p-3 md:p-4 border border-[#1436B033] rounded-xl">
                            <PiUsersBold className="text-lg md:text-xl text-[#1436B0]" />
                        </p>
                        <h1 className="pl-3 md:pl-4 py-2 md:py-3 font-medium text-2xl md:text-3xl font-inter">
                            Department All Employee Kpi
                        </h1>
                    </div>
                    <button className="flex justify-center items-center p-3 md:p-4 font-medium bg-white border border-[#1436B033] rounded-xl">
                        <LuSettings className="text-lg md:text-xl text-[#1436B0]" />
                        <Link
                            href={'/hod/import-setting'}
                            className="pl-2 md:pl-3 text-sm md:text-base"
                        >
                            Import Settings
                        </Link>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    <div className="w-full md:col-span-1">
                        <HodEmployeeCounts />
                    </div>
                    <div className="w-full md:col-span-1">
                        <DeptEmployeeProgressCount
                            {...{ startDate, endDate }}
                        />
                    </div>
                    <div className="w-full md:col-span-2">
                        <LineChart />
                    </div>
                </div>
                <div>
                    <WeekFilter handleDatesChange={handleDatesChange} />
                </div>

                <div className="flex">
                    <div className="w-full ">
                        <HodTableColumns {...{ startDate, endDate }} />
                    </div>
                </div>
            </div>
        </DataProvider>
    )
}

Kpis.getLayout = (page: ReactElement) => {
    return <SubAdminLayout pageTitle={{ title: 'Kpis' }}>{page}</SubAdminLayout>
}

export default Kpis
