import { Chart } from 'react-google-charts'
import { RtoProfileProgressTypes } from './RtoProfileProgress'
import { ChartContainer } from './style'

export const ProgressChart = ({
    height,
    data,
    pieHole,
    pieSliceText,
}: {
    pieHole?: number
    height?: string
    data: RtoProfileProgressTypes[]
    pieSliceText?: 'percentage' | 'value' | 'label' | 'none'
}) => {
    const options = {
        pieHole: pieHole || 0.6,
        is3D: false,
        legend: { position: 'none' },
        chartArea: { width: '60%', height: '90%' },
        colors: data.map((d) => d.color),
        pieSliceText: pieSliceText || 'percentage',
        tooltip: {
            isHtml: false,
        },
    }

    const updatedData = [
        ['Task', 'Hours per Day'],
        ...data.map((d) => [
            // d.title,
            // d.percent,
            // `${d?.title} (${d.percent}%)`,
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
                    height={height || '250px'}
                    data={updatedData}
                    options={options}
                />
            </ChartContainer>
        </div>
    )
}
