'use client'
import { DoughnutChartProps } from '@partials/common/kpis'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DoughnutChart = ({ segments, empty }: DoughnutChartProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const total = segments.reduce((acc, curr) => acc + curr?.value, 0)

    const chartData = {
        labels: segments.map((segment) => segment.label),
        datasets: [
            {
                data: segments.map((segment) => segment.value),
                backgroundColor: segments.map((segment) => segment.color),
                borderColor: segments.map((segment) => segment.color),
                borderWidth: 0,
                borderRadius: segments.map(() => -2),
                hoverBackgroundColor: segments.map((segment) => segment.color),
                hoverBorderColor: segments.map((segment) => segment.color),
                hoverBorderRadius: segments.map((_, index) =>
                    index === hoveredIndex ? 0 : 0
                ),
                hoverBorderWidth: segments.map((_, index) =>
                    index === hoveredIndex ? 8 : 0
                ),
            },
        ],
    }

    const chartOptions = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },

            datalabels: {
                display: false,
            },
        },
        layout: {
            padding: 24,
        },
        cutout: '50%',
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,
        onHover: (event: any, elements: any[]) => {
            if (elements.length > 0) {
                const index = elements[0].index
                if (hoveredIndex !== index) {
                    setHoveredIndex(index)
                }
            } else {
                setHoveredIndex(null)
            }
        },
        animation: {
            animateScale: true,
        },
    }

    return (
        <div className="relative  mx-auto ">
            <div className="h-52 m-8 relative overflow-visible">
                <div className="absolute inset-0 -m-8 overflow-visible">
                    <Doughnut data={chartData} options={chartOptions} />
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {!empty && hoveredIndex !== null ? (
                        <div className="text-center">
                            <div
                                className="text-[44px] font-semibold"
                                style={{ color: segments[hoveredIndex].color }}
                            >
                                {(
                                    (segments[hoveredIndex].value / total) *
                                    100
                                ).toFixed(0)}
                                %
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 text-xl"></div>
                    )}
                </div>
            </div>
        </div>
    )
}
