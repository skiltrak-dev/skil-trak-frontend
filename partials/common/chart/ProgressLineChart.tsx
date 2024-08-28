import { Card, Select } from '@components'
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
export const ProgressLineChart = () => {
    const [rtoId, setRtoId] = useState(undefined)
    const [sectorId, setSectorId] = useState(undefined)
    const [year, setYear] = useState(new Date().getFullYear())
    // query
    const getRtos = CommonApi.Filter.useRtos()
    const sectorResponse = AuthApi.useSectors({})
    const chartCount = AdminApi.Admin.useDashboardChartCounts(
        {
            search: `${JSON.stringify(
                removeEmptyValues({
                    sectorId: sectorId,
                    rtoId: rtoId,
                    year: year,
                })
            )
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )
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
        ? Object.keys(chartCount?.data)?.map((month) => ({
              name: month,
              studentsAdded: chartCount?.data[month].studentsAdded,
              workplaceRequests: chartCount?.data[month].workplaceRequests,
              studentsPlaced: chartCount?.data[month].studentsPlaced,
              studentsExpired: chartCount?.data[month].studentsExpired,
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
            <div className="flex items-center justify-end w-full gap-x-4 px-8 py-4">
                <Select
                    label={'Search By Rto'}
                    name={'rtoId'}
                    // value={rtoOptions?.find(
                    //     (rto: OptionType) => rto.value === Number(filter?.rtoId)
                    // )}
                    options={rtoOptions}
                    placeholder={'Select Search By Rto...'}
                    onChange={(e: any) => {
                        setRtoId(e?.value)
                    }}
                    showError={false}
                    loading={getRtos.isLoading}
                    disabled={getRtos.isLoading}
                />
                <Select
                    label={'Search by Sector'}
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
                <div className='mt-4'>
                    <Select
                        label={'Search by Year'}
                        name={'year'}
                        options={yearOptions}
                        placeholder={'Select Year...'}
                        onChange={(e: any) => {
                            setYear(e?.value)
                        }}
                        // value={yearOptions.find((y) => y.value === year)}
                    />
                </div>
            </div>
            <ResponsiveContainer width="100%" height={500}>
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
                        dataKey="workplaceRequests"
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
