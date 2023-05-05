import React, { ReactElement, useState } from 'react'
import { CalendarStyles } from '@components/Calendar/style'
import Calendar from 'react-calendar'
import { AiTwotoneFilter } from 'react-icons/ai'
import { RiTimerLine } from 'react-icons/ri'
import { MdViewQuilt } from 'react-icons/md'
import { MonthlyDropdown } from './MonthlyDropdown'
import { AnnualDropdown } from './AnnualDropdown'
import OutsideClickHandler from 'react-outside-click-handler'
import { Card } from '@components'
import { ReportListModal } from '../components/ReportListModal'

type Props = {   
    startDate: any
    setStartDate: any
    endDate: any
    setEndDate: any
}

export const FilterReport = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}: Props) => {
    const [dateRange, setDateRange] = useState<any>('')
    const [showCalendars, setShowCalendars] = useState<any>(false)
    const [selectedFilter, setSelectedFilter] = useState<any>('Weekly')

    const [showFilter, setShowFilter] = useState<any>(false)
    const [modal, setModal] = useState<ReactElement | null>(null)
    // months
    const [year, setYear] = useState<any>({
        label: new Date().getFullYear().toString(),
        value: new Date().getFullYear(),
    })
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
    const [month, setMonth] = useState<any>({
        label: months[new Date().getMonth()],
        value: new Date().getMonth().toString(),
    })

    const onClose = () => {
        setModal(null)
    }
    const onViewClicked = () => {
        setModal(<ReportListModal onClose={() => onClose()} />)
    }

    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }

    const handleStartDateChange = (date: any) => {
        setStartDate(date)
        if (selectedFilter === 'Monthly') {
            setShowCalendars(false)
            setDateRange(
                date.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                })
            )
        }
        if (selectedFilter === 'Weekly') {
            setShowCalendars(false)
            const weekStart = new Date(date)
            const weekEnd = new Date(date)
            weekEnd.setDate(weekEnd.getDate() + 6)
            setDateRange(
                `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
            )
        }
    }

    const handleEndDateChange = (date: any) => {
        setEndDate(date)
        if (selectedFilter === 'Range') {
            setShowCalendars(false)
            setDateRange(
                `${startDate.toLocaleDateString()} - ${date.toLocaleDateString()}`
            )
        }
    }

    const handleFilterSelect = (filter: any) => {
        setSelectedFilter(filter)
        setDateRange('')
    }

    const getCalendarByFilter = () => {
        switch (selectedFilter) {
            case 'Monthly':
                return (
                    // <div className='absolute top-10 z-10'>
                    // <CalendarStyles>
                    //     <Calendar
                    //         onChange={handleStartDateChange}
                    //         value={startDate}
                    //         view="year"
                    //         showNavigation={false}
                    //         onClickYear={(value, event) => {
                    //             console.log('value', value)
                    //             handleYearChange(value)
                    //             setShowCalendars(false)
                    //             setDateRange(
                    //                 value.toLocaleDateString('en-US', {
                    //                     year: 'numeric',
                    //                 })
                    //             )
                    //         }}
                    //         tileContent={({ date, view }) =>
                    //             view === 'month' && date.getFullYear() ? (
                    //                 <span className="">
                    //                     {date.toLocaleDateString('en-US', {
                    //                         month: 'numeric',
                    //                     })}
                    //                 </span>
                    //             ) : null
                    //         }
                    //     />
                    // </CalendarStyles>
                    <MonthlyDropdown
                        setShowCalendars={setShowCalendars}
                        month={month}
                        year={year}
                        setMonth={setMonth}
                        setYear={setYear}
                    />
                )
            case 'Weekly':
                return (
                    <Card>
                        <CalendarStyles>
                            <Calendar
                                onChange={handleStartDateChange}
                                value={startDate}
                                onClickDay={(value, event) => {
                                    handleStartDateChange(value)
                                }}
                            />
                        </CalendarStyles>
                    </Card>
                )
            case 'Annually':
                return (
                    // <div className='absolute top-10 right-0 z-10'>
                    // <CalendarStyles>
                    //     <Calendar
                    //         onChange={handleStartDateChange}
                    //         value={startDate}
                    //         showNavigation={false}
                    //         view="decade"
                    //         onClickDecade={(value, event) => {
                    //             setShowCalendars(false)
                    //             setDateRange(
                    //                 value.toLocaleDateString('en-US', {
                    //                     year: 'numeric',
                    //                 })
                    //             )
                    //         }}
                    //         tileContent={({ date, view }) =>
                    //             view === 'year' &&
                    //                 date.toLocaleDateString() ===
                    //                 startDate.toLocaleDateString() ? (
                    //                 <span style={{ fontWeight: 'bold' }}>
                    //                     {date.toLocaleDateString('en-US', {
                    //                         year: 'numeric',
                    //                     })}
                    //                 </span>
                    //             ) : null
                    //         }
                    //     />
                    // </CalendarStyles>
                    // </div>
                    <Card>
                        <AnnualDropdown
                            setShowCalendars={setShowCalendars}
                            year={year}
                            setYear={setYear}
                        />
                    </Card>
                )
            default:
                return (
                    <Card>
                        <div className="flex justify-between w-full">
                            <CalendarStyles>
                                <Calendar
                                    onChange={handleStartDateChange}
                                    value={startDate}
                                />
                            </CalendarStyles>
                            <CalendarStyles>
                                <Calendar
                                    onChange={handleEndDateChange}
                                    value={endDate}
                                />
                            </CalendarStyles>
                        </div>
                    </Card>
                )
        }
    }
    return (
        <>
            {modal && modal}
            <div className="flex items-center gap-x-4 ">
                <OutsideClickHandler
                    onOutsideClick={() => setShowCalendars(false)}
                >
                    <div className="relative">
                        <div
                            onClick={() => setShowCalendars(!showCalendars)}
                            className="flex cursor-pointer items-center gap-x-2 bg-gray-100 px-4 py-1 rounded"
                        >
                            <RiTimerLine className="text-gray-400 " />
                            <button>
                                {dateRange
                                    ? dateRange
                                    : selectedFilter === 'Monthly'
                                        ? `${month?.label} / ${year?.value}`
                                        : selectedFilter === 'Annually'
                                            ? `${year?.value}`
                                            : selectedFilter}
                            </button>
                        </div>
                        {showCalendars && (
                            <div className="absolute top-10 right-0 min-w-[500px] calendars-container z-20">
                                {getCalendarByFilter()}
                            </div>
                        )}
                    </div>
                </OutsideClickHandler>

                <OutsideClickHandler
                    onOutsideClick={() => setShowFilter(false)}
                >
                    <div className="relative">
                        {/* <button onClick={handleShowFilter}>{selectedFilter}</button> */}
                        <div className="bg-gray-100 rounded p-1">
                            <AiTwotoneFilter
                                size={20}
                                className="text-gray-400 cursor-pointer"
                                onClick={handleShowFilter}
                            />
                        </div>
                        {showFilter && (
                            <div className="absolute z-20 bg-white rounded-lg">
                                <ul className="">
                                    <li
                                        className="border-b px-4"
                                        onClick={() => {
                                            handleFilterSelect('Range')
                                            setShowFilter(false)
                                        }}
                                    >
                                        Range
                                    </li>
                                    <li
                                        className="border-b px-4"
                                        onClick={() => {
                                            handleFilterSelect('Monthly')
                                            setShowFilter(false)
                                        }}
                                    >
                                        Monthly
                                    </li>
                                    <li
                                        className="border-b px-4"
                                        onClick={() => {
                                            handleFilterSelect('Weekly')
                                            setShowFilter(false)
                                        }}
                                    >
                                        Weekly
                                    </li>
                                    <li
                                        className="border-b px-4"
                                        onClick={() => {
                                            handleFilterSelect('Annually')
                                            setShowFilter(false)
                                        }}
                                    >
                                        Annually
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </OutsideClickHandler>
                <div
                    onClick={() => {
                        onViewClicked()
                    }}
                    className="bg-gray-100 cursor-pointer rounded p-1 flex items-center gap-x-2"
                >
                    <MdViewQuilt size={20} className="text-gray-400" />
                    <span>VIEW FULL LIST</span>
                </div>
            </div>
            {/* <button onClick={handleRangeSelect}>Select Range</button> */}

            {/* {showCalendars && (
                <div className="calendars-container">
                    {getCalendarByFilter()}
                </div>
            )} */}
        </>
    )
}
