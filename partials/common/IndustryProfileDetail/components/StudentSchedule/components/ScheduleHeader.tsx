import { FC, useEffect, useRef, useState } from 'react'
import {
    IoArrowBackCircleOutline,
    IoArrowForwardCircleOutline,
} from 'react-icons/io5'
import { getStartOfWeek } from '../utilsFunc'

interface ScheduleHeaderProps {
    startDate: Date
    onPrevWeek: () => void
    onNextWeek: () => void
    onMonth: (monthIndex: number) => void
    view: string
    setView: (view: string) => void
    activeMonthIndex: any
    setActiveMonthIndex: any
    setYear: any
    year: any
}

export const ScheduleHeader: FC<ScheduleHeaderProps> = ({
    startDate,
    onPrevWeek,
    onNextWeek,
    onMonth,
    view,
    setView,
    activeMonthIndex,
    setActiveMonthIndex,
    setYear,
    year,
}) => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    // const [activeMonthIndex, setActiveMonthIndex] = useState<number>(
    //     startDate.getMonth()
    // )
    // const [year, setYear] = useState<number>(startDate.getFullYear())
    const monthRefs = useRef<HTMLDivElement[]>([])

    const adjustedStartDate = getStartOfWeek(startDate)
    const endDate = new Date(adjustedStartDate)
    endDate.setDate(adjustedStartDate.getDate() + 6)

    useEffect(() => {
        setActiveMonthIndex(startDate.getMonth())
        setYear(startDate.getFullYear())
    }, [startDate])

    useEffect(() => {
        if (activeMonthIndex !== null && monthRefs.current[activeMonthIndex]) {
            monthRefs.current[activeMonthIndex].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
            })
        }
    }, [activeMonthIndex])

    const months = [
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

    const handleYearChange = (newYear: number) => {
        setYear(newYear <= currentYear ? newYear : currentYear)
    }

    const getDateDisplay = () => {
        if (view === 'month') {
            // Get the last day of the current month
            const lastDay = new Date(year, activeMonthIndex + 1, 0).getDate()
            return `1 ${months[activeMonthIndex]} ${year} - ${lastDay} ${months[activeMonthIndex]} ${year}`
        } else {
            // Week view - keep existing logic
            return `${adjustedStartDate.getDate()} 
                ${months[adjustedStartDate.getMonth()]} 
                ${adjustedStartDate.getFullYear()} - ${endDate.getDate()} 
                ${months[endDate.getMonth()]} 
                ${
                    endDate.getFullYear() !== adjustedStartDate.getFullYear()
                        ? endDate.getFullYear()
                        : ''
                }`
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 w-full">
                <div className="flex items-center space-x-4 w-full">
                    <h1 className="text-lg font-semibold">Schedule</h1>
                    <div className="flex items-center justify-center w-full space-x-2">
                        <button
                            onClick={onPrevWeek}
                            className="p-1 rounded hover:bg-gray-100"
                        >
                            <IoArrowBackCircleOutline className="w-5 h-5" />
                        </button>
                        <span className="text-sm">{getDateDisplay()}</span>
                        <button
                            onClick={onNextWeek}
                            className="p-1 rounded hover:bg-gray-100"
                        >
                            <IoArrowForwardCircleOutline className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleYearChange(year - 1)}
                                className={`${
                                    year <= 2020 ? 'cursor-not-allowed' : ''
                                } p-1 rounded hover:bg-gray-100`}
                                disabled={year <= 2020}
                            >
                                ◁
                            </button>
                            <span className="text-sm font-medium">
                                Year - {year}
                            </span>
                            <button
                                onClick={() => handleYearChange(year + 1)}
                                className={`${
                                    year >= currentYear
                                        ? 'cursor-not-allowed'
                                        : ''
                                } p-1 rounded hover:bg-gray-100`}
                                disabled={year >= currentYear}
                            >
                                ▷
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2 rounded-md border shadow-sm">
                    <button
                        onClick={() => setView('week')}
                        className={`px-4 py-2 font-semibold rounded-l-md ${
                            view === 'week' ? 'bg-white' : 'text-gray-400'
                        }`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setView('month')}
                        className={`px-4 py-2 font-semibold rounded-r-md ${
                            view === 'month' ? 'bg-white' : 'text-gray-400'
                        }`}
                    >
                        Month
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-2 bg-[#FBFBFB] border rounded-md custom-scrollbar overflow-auto">
                {months.map((month, index) => (
                    <div key={index} className="flex items-center gap-x-4">
                        <div
                            ref={(el: any) => (monthRefs.current[index] = el)}
                            onClick={() => {
                                setActiveMonthIndex(index)
                                onMonth(index)
                            }}
                            className="cursor-pointer rounded-md px-8 py-2 text-sm font-semibold"
                            style={{
                                background:
                                    activeMonthIndex === index
                                        ? '#FFF'
                                        : '#FBFBFB',
                                boxShadow:
                                    activeMonthIndex === index
                                        ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
                                        : 'none',
                                color:
                                    activeMonthIndex === index
                                        ? '#000'
                                        : '#888',
                            }}
                        >
                            {month}
                        </div>
                        <div className="h-4 w-[1.5px] bg-[#E5E8EB] rounded-[1px] mx-4" />
                    </div>
                ))}
            </div>
        </>
    )
}
