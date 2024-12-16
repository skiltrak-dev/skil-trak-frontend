import { Card, Select, Typography } from '@components'
import React, { useMemo, useState } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { AdminApi, AuthApi, CommonApi } from '@queries'
import { Rto, SubAdmin } from '@types'
import { removeEmptyValues } from '@utils'
import { useRouter } from 'next/router'
export const DepartmentLineChart = () => {
    const [rtoId, setRtoId] = useState(undefined)
    const [sectorId, setSectorId] = useState(undefined)
    const [year, setYear] = useState(new Date().getFullYear())

    const router = useRouter()
    const id = router.query.id
    // query
    const getRtos = CommonApi.Filter.useRtos()
    const sectorResponse = AuthApi.useSectors({})
    const chartCount = AdminApi.Department.useDepartmentLineChartCounts(id, {
        skip: !id,
    })
    const monthOrder = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const initialData = chartCount?.data
        ? Object.entries(chartCount?.data)?.map(([month, value]: any) => ({
              name: month,
              studentsAdded: value?.studentsAdded,
              workplaceRequest: value?.workplaceRequest,
              studentsPlaced: value?.studentsPlaced,
              studentsExpired: value?.studentsExpired,
          }))
        : []
    initialData?.sort(
        (a: any, b: any) =>
            monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
    )

    // options
    const sectorOptions = useMemo(
        () =>
            sectorResponse.data?.map((sector: any) => ({
                label: sector?.name,
                value: sector?.id,
            })),
        [sectorResponse]
    )
    const rtoOptions = getRtos?.data?.map((rto: Rto) => ({
        value: rto?.id,
        label: rto?.user?.name,
    }))

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear()
        const startYear = 2018
        const years = []
        for (let i = startYear; i <= currentYear; i++) {
            years.push({ value: i, label: i.toString() })
        }
        return years
    }, [])

    return (
        <Card noPadding>
            <div className="px-8 py-4 flex justify-between items-center">
                <div className="text-nowrap">
                    <Typography variant="h3">Statistics</Typography>
                </div>
                {/* <div className="flex items-center justify-end w-full gap-x-2 xl:gap-x-4">
                    <div className="w-44 lg:w-48 xl:w-64">
                        <Select
                            // label={'Search By Rto'}
                            name={'rtoId'}
                            // value={rtoOptions?.find(
                            //     (rto: OptionType) => rto.value === Number(filter?.rtoId)
                            // )}
                            options={rtoOptions}
                            placeholder={'Select By Rto...'}
                            onChange={(e: any) => {
                                setRtoId(e?.value)
                            }}
                            showError={false}
                            loading={getRtos.isLoading}
                            disabled={getRtos.isLoading}
                        />
                    </div>
                    <div className="w-44 lg:w-48 xl:w-64">
                        <Select
                            // label={'Search by Sector'}
                            name={'sectorId'}
                            options={sectorOptions}
                            placeholder={'Select Sector...'}
                            // value={sectorOptions?.find(
                            //     (sector: SelectOption) =>
                            //         sector.value === Number(filter?.sectorId)
                            // )}
                            onChange={(e: any) => {
                                setSectorId(e?.value)
                            }}
                            showError={false}
                            loading={sectorResponse.isLoading}
                            disabled={sectorResponse.isLoading}
                        />
                    </div>
                    <div className="mt-4 w-44 lg:w-48 xl:w-64">
                        <Select
                            // label={'Search by Year'}
                            name={'year'}
                            options={yearOptions}
                            placeholder={'Select Year...'}
                            onChange={(e: any) => {
                                setYear(e?.value)
                            }}
                            value={yearOptions.find((y) => y.value === year)}
                        />
                    </div>
                </div> */}
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={initialData}
                    margin={{
                        top: 15,
                        right: 0,
                        left: 0,
                        bottom: 15,
                    }}
                    className="pb-5"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="studentsAdded"
                        stroke="#FFC107"
                        strokeWidth={4}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="workplaceRequest"
                        strokeWidth={4}
                        stroke="#6A5ACD"
                    />
                    <Line
                        type="monotone"
                        dataKey="studentsPlaced"
                        strokeWidth={4}
                        stroke="#008080"
                    />
                    <Line
                        type="monotone"
                        dataKey="studentsExpired"
                        strokeWidth={4}
                        stroke="#FF6F61"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}
