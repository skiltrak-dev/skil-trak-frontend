import { Chart } from 'react-google-charts'
import { RtoProfileProgressTypes } from './RtoProfileProgress'
import { ChartContainer } from './style'

export const ProgressChart = ({
    data,
}: {
    data: RtoProfileProgressTypes[]
}) => {
    const options = {
        pieHole: 0.6,
        is3D: false,
        legend: { position: 'none' },
        chartArea: { width: '60%', height: '90%' },
        colors: data?.map((d: RtoProfileProgressTypes, i: number) => d?.color),
        // pieSliceText: 'none',
        // pieSliceTextStyle: {
        //     fontSize: 30, // Set font size to 30px
        // },
    }

    const updatedData = [
        ['Task', 'Hours per Day'],
        ...data?.map((d: RtoProfileProgressTypes, i: number) => [
            `${d?.title}`,
            +d?.percent,
        ]),
    ]

    return (
        <div className="">
            <ChartContainer>
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="250px"
                    data={updatedData}
                    options={options}
                />
            </ChartContainer>
        </div>
    )
}
