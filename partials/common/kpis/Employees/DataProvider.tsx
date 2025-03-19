'use client'
import {
    DataContextType,
    DateRange,
    Employee,
    Week,
} from '@partials/common/kpis'
import {
    addDays,
    addMonths,
    getDay,
    isWithinInterval,
    startOfMonth,
    subDays,
} from 'date-fns'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { data, monthlyData, months } from './EmployeeData'

const DataContext = createContext<DataContextType | undefined>(undefined)

const getFirstMondayOfMonth = (date: Date): Date => {
    const monthStart = startOfMonth(date)
    const dayOfWeek = getDay(monthStart)

    if (dayOfWeek === 1) return monthStart
    const daysToAdd = (8 - dayOfWeek) % 7
    return addDays(monthStart, daysToAdd)
}

const getLastMondayOfMonth = (date: Date): Date => {
    const nextMonth = addMonths(date, 1)
    const firstMondayNextMonth = getFirstMondayOfMonth(nextMonth)
    return subDays(firstMondayNextMonth, 7)
}

const getMonthWeeks = (date: Date): Week[] => {
    const firstMonday = getFirstMondayOfMonth(date)
    const lastMonday = getLastMondayOfMonth(date)

    const weeks: Week[] = []
    let currentStart = firstMonday
    let weekNumber = 1

    while (currentStart <= lastMonday) {
        const weekEnd = addDays(currentStart, 6)
        weeks.push({
            start: currentStart,
            end: weekEnd,
            weekNumber,
        })
        currentStart = addDays(weekEnd, 1)
        weekNumber++
    }

    return weeks
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isClient, setIsClient] = useState(false)
    const [employees] = useState<Employee[]>(() => {
        return data.map((emp) => ({
            ...emp,
            createdAt: emp.createdAt || new Date(),
        }))
    })

    const [selectedMonth, setSelectedMonth] = useState(() => {
        const today = new Date()
        return getFirstMondayOfMonth(today)
    })

    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(
        () => {
            return data.map((emp) => ({
                ...emp,
                createdAt: emp.createdAt || new Date(),
            }))
        }
    )
    const [selectedWeeks, setSelectedWeeks] = useState<DateRange[]>([])
    const [dateRange, setDateRange] = useState<DateRange | null>(null)
    const [currentMonthWeeks, setCurrentMonthWeeks] = useState<Week[]>([])

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const weeks = getMonthWeeks(selectedMonth)
        setCurrentMonthWeeks(weeks)
    }, [selectedMonth])

    const filterEmployees = (emps: Employee[]): Employee[] => {
        return emps.filter((employee) => {
            const employeeDate = employee.createdAt
            if (!employeeDate) return false

            const firstMonday = getFirstMondayOfMonth(selectedMonth)
            const lastMonday = getLastMondayOfMonth(selectedMonth)

            if (dateRange) {
                return isWithinInterval(employeeDate, {
                    start: dateRange.startDate,
                    end: dateRange.endDate,
                })
            }

            if (selectedWeeks.length > 0) {
                return selectedWeeks.some((week) =>
                    isWithinInterval(employeeDate, {
                        start: week.startDate,
                        end: week.endDate,
                    })
                )
            }

            return isWithinInterval(employeeDate, {
                start: firstMonday,
                end: addDays(lastMonday, 6),
            })
        })
    }

    useEffect(() => {
        const filtered = filterEmployees(employees)
        setFilteredEmployees(filtered)
    }, [selectedMonth, selectedWeeks, dateRange, employees])

    const handleMonthChange = (newMonth: Date) => {
        const firstMonday = getFirstMondayOfMonth(newMonth)
        setSelectedMonth(firstMonday)
        setDateRange(null)
        setSelectedWeeks([])
    }

    if (!isClient) {
        return null
    }

    const values = {
        employees,
        filteredEmployees,
        monthlyData,
        months,
        selectedMonth,
        setSelectedMonth: handleMonthChange,
        selectedWeeks,
        setSelectedWeeks,
        dateRange,
        setDateRange,
        currentMonthWeeks,
    }

    return (
        <DataContext.Provider value={values}>{children}</DataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider')
    }
    return context
}
