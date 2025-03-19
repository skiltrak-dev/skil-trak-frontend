import { Typography } from '@components'
import { AdminLayout } from '@layouts'
import {
    DataProvider,
    BarChart,
    DepartmentDetails,
    EmployeeTableColumns,
    LineChart,
    RadialChart,
    WeekFilter,
    EmployeeCounts,
    AllEmployeeProgressCount,
} from '@partials/common'
import { Moment } from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import { LuSettings } from 'react-icons/lu'
import { PiUsersBold } from 'react-icons/pi'

const Kpis = () => {
    const router = useRouter()
    const [startDate, setStartDate] = useState<Moment | null>(null)
    const [endDate, setEndDate] = useState<Moment | null>(null)

    const handleDatesChange = (startDate: Moment, endDate: Moment) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    console.log('startDate', startDate)
    console.log('endDate', endDate)

    return (
        <div>
            <DataProvider>
                <div className="flex flex-col px-2 sm:px-4 md:px-6 pt-4 md:pt-6">
                    <div className="flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-0">
                        <div className="flex justify-center sm:justify-start items-center">
                            <p className="bg-white p-3 md:p-4 border border-[#1436B033] rounded-xl">
                                <PiUsersBold className="text-lg md:text-xl text-[#1436B0]" />
                            </p>
                            <h1 className="pl-3 md:pl-4 py-2 md:py-3 font-medium text-2xl md:text-3xl font-inter">
                                Employee
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() => {
                                    router.push(
                                        '/portals/admin/kpis-progress/add-types'
                                    )
                                }}
                                className="cursor-pointer flex justify-center items-center gap-x-3 p-3 md:p-4 font-medium bg-white border border-[#1436B033] rounded-xl"
                            >
                                <IoIosAddCircle className="text-lg md:text-xl text-[#1436B0]" />
                                <Typography>Add Types</Typography>
                            </div>
                            <div
                                onClick={() => {
                                    router.push(
                                        '/portals/admin/kpis-progress/import-setting'
                                    )
                                }}
                                className="cursor-pointer flex justify-center items-center gap-x-3 p-3 md:p-4 font-medium bg-white border border-[#1436B033] rounded-xl"
                            >
                                <LuSettings className="text-lg md:text-xl text-[#1436B0]" />
                                <Typography>Import Settings</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                        <div className="w-full md:col-span-1">
                            <EmployeeCounts />
                        </div>
                        <div className="w-full md:col-span-1">
                            <AllEmployeeProgressCount
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                        <div className="w-full lg:col-span-2">
                            <EmployeeTableColumns {...{ startDate, endDate }} />
                        </div>
                        <div className="w-full">
                            <DepartmentDetails {...{ startDate, endDate }} />
                        </div>
                    </div>
                </div>
            </DataProvider>
        </div>
    )
}

Kpis.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Kpis
