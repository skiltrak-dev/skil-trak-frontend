import { Card, Select, Typography } from '@components'
import { AdminApi, AuthApi, CommonApi } from '@queries'
import { Rto } from '@types'
import { removeEmptyValues } from '@utils'
import { useMemo, useState } from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { CurveType } from 'recharts/types/shape/Curve'
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
        ? Object.entries(chartCount?.data)?.map(([month, value]: any) => ({
            name: month, ...value
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

    // Chart lines configuration array
    const chartLinesConfig = [
        {
            dataKey: "Student Added",
            stroke: "#FFC107",
            strokeWidth: 4,
            activeDot: { r: 8 },
            type: "monotone"
        },
        {
            dataKey: "Workplace Requests",
            stroke: "#6A5ACD",
            strokeWidth: 4,
            type: "monotone"
        },
        {
            dataKey: "Manual WPO",
            stroke: "#6A5ACD",
            strokeWidth: 4,
            type: "monotone"
        },
        {
            dataKey: "Student Placed",
            stroke: "#008080",
            strokeWidth: 4,
            type: "monotone"
        },
        {
            dataKey: "Current Month Student",
            stroke: "#008080",
            strokeWidth: 4,
            type: "monotone",
            strokeDasharray: "5 5"
        },
        {
            dataKey: "Student Expired",
            stroke: "#FF6F61",
            strokeWidth: 4,
            type: "monotone"
        },
        {
            dataKey: "Automated WPO",
            stroke: "#7ccf00",
            strokeWidth: 4,
            type: "monotone"
        },
        {
            dataKey: "Cancelled Workplace Requests",
            stroke: "#FF7979",
            strokeWidth: 4,
            type: "monotone"
        }
    ];

    return (
        <Card noPadding>

            <div className="px-8 py-4 flex justify-between items-center">
                <div className="text-nowrap">
                    <Typography variant="h3">Statistics</Typography>
                </div>
                <div className="flex items-center justify-end w-full gap-x-2 xl:gap-x-4">
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
                </div>
            </div>
            {/* <div className="w-full h-96 overflow-x-auto overflow-y-hidden">
            <div style={{ width: `${customData.length * 85}px`, height: '100%' }}> */}
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
                    {chartLinesConfig.map((lineConfig) => (
                        <Line
                            key={lineConfig.dataKey}
                            type={lineConfig?.type as CurveType}
                            dataKey={lineConfig.dataKey}
                            stroke={lineConfig.stroke}
                            strokeWidth={lineConfig.strokeWidth}
                            strokeDasharray={lineConfig?.strokeDasharray}
                            activeDot={lineConfig.activeDot}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Card>
    )
}
