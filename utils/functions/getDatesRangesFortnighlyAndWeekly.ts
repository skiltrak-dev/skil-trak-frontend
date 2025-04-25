import { InvoiceTypeEnum } from '@partials/admin/invoices'
import moment from 'moment'

export const generateMonthlyInvoiceDateRanges = (
    startDateStr = moment('4-1-2025').format('YYYY-MM-DD'), // April 1, 2025
    endDateStr: string | Date = new Date()
) => {
    // Parse the start and end dates using Moment
    const inputStartDate = moment(startDateStr)
    const endDate = moment(endDateStr)
    // Start from the 1st day of the month of the input date
    const startDate = inputStartDate.clone().startOf('month')
    // Array to store the date ranges
    const monthlyRanges = []
    // Set the current date to the start date
    let currentDate = startDate.clone()
    // Loop until we reach or exceed the end date
    while (currentDate.isSameOrBefore(endDate, 'month')) {
        const monthStart = currentDate.clone().startOf('month')
        const monthEnd = currentDate.clone().endOf('month')
        // If month end is after the end date, use the end date instead
        const rangeEndDate = monthEnd.clone()
        // Format dates as YYYY-MM-DD strings
        const formattedStartDate = monthStart.format('YYYY-MM-DD')
        const formattedEndDate = rangeEndDate.format('YYYY-MM-DD')
        // Add the date range object to the array
        monthlyRanges.push({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        })
        // Move to the first day of the next month
        currentDate = currentDate.clone().add(1, 'month').startOf('month')
    }
    return monthlyRanges
}

export const generateInvoiceDateRanges = (
    type: InvoiceTypeEnum,
    startDateStr: string | Date,
    endDateStr: string | Date = new Date()
) => {
    const startDate = moment(startDateStr)
    const endDate = moment(endDateStr || new Date())

    // Array to store the date ranges
    const dateRanges = []

    // Set the current start date to the initial start date
    let currentStartDate = startDate.clone() // Use clone() to avoid modifying the original

    // Loop until we reach or exceed the end date
    while (currentStartDate.isSameOrBefore(endDate)) {
        // Calculate the end date for this period
        let daysToAdd = 0

        if (type === 'fortnightly') {
            daysToAdd = 13
        } else if (type === 'weekly') {
            daysToAdd = 6
        } else {
            daysToAdd = 30
        }

        const currentEndDate = currentStartDate.clone().add(daysToAdd, 'days')

        // Format dates as YYYY-MM-DD strings
        const formattedStartDate = currentStartDate.format('YYYY-MM-DD')
        const formattedEndDate = currentEndDate.format('YYYY-MM-DD')

        // Add the date range object to the array
        dateRanges.push({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        })

        // Move to the next period
        currentStartDate = currentEndDate.clone().add(1, 'days')
    }

    return dateRanges
}
