import { Chart } from 'react-google-charts'
import { ChartContainer } from './style'

export const ProgressChart = ({ data }: { data: any[] }) => {
    const options = {
        pieHole: 0.75,
        is3D: false,
        legend: { position: 'none' },
        chartArea: { width: '60%', height: '90%' },
        colors: data?.map((d: any, i: number) => d?.color),
        pieSliceText: 'none',
        // pieSliceTextStyle: {
        //     fontSize: 30,
        // },
    }

    const updatedData = [
        ['Task', 'Hours per Day'],
        ...data?.map((d: any, i: number) => [`${d?.title}`, +d?.percent]),
    ]
    return (
        <div className="">
            <p className="font-semibold flex justify-center">Progress</p>
            <ChartContainer>
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="180px"
                    data={updatedData}
                    options={options}
                />
            </ChartContainer>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
                {data?.map((item: any) => (
                    <div
                        key={item?.title}
                        className="flex items-center gap-x-2 justify-between"
                    >
                        <div className={`flex gap-x-2 items-center`}>
                            <div
                                className="rounded-full w-3.5 h-3.5"
                                style={{ backgroundColor: item?.color }}
                            ></div>
                            <p className="text-sm">{item?.title}</p>
                        </div>
                        <p className="text-sm" style={{ color: item?.color }}>
                            {item?.percent ? item?.percent.toFixed(1) : 0}%
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
