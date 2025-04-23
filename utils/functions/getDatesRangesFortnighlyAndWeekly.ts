import { InvoiceTypeEnum } from '@partials/admin/invoices'
import moment from 'moment'

export const generateInvoiceDateRanges = (
    type: InvoiceTypeEnum,
    startDateStr: Date,
    endDateStr = moment().format('YYYY-MM-DD')
): { startDate: string; endDate: string }[] => {
    // Parse the start and end dates using Moment
    const startDate = moment(startDateStr)
    const endDate = moment(endDateStr)

    // Array to store the date ranges
    const dateRanges = []

    // Set the current start date to the initial start date
    let currentStartDate = moment(startDate)

    // Loop until we reach or exceed the end date
    while (currentStartDate.isSameOrBefore(endDate)) {
        // Calculate the end date for this period (14 days after start date, inclusive)
        const currentEndDate = moment(currentStartDate).add(
            type === InvoiceTypeEnum.Fortnightly
                ? 13
                : type === InvoiceTypeEnum.Weekly
                ? 6
                : 30,
            'days'
        ) // +13 to include the start date in the 14 days

        // Format dates as YYYY-MM-DD strings
        const formattedStartDate = currentStartDate.format('YYYY-MM-DD')
        const formattedEndDate = currentEndDate.isSameOrBefore(endDate)
            ? currentEndDate.format('YYYY-MM-DD')
            : endDate.format('YYYY-MM-DD')

        // Add the date range object to the array
        dateRanges.push({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        })

        // Move to the next period
        currentStartDate = moment(currentEndDate).add(1, 'days')
    }

    return dateRanges
}

export const generateMonthlyInvoiceDateRanges = (
    startDateStr = moment('4-1-2025').format('YYYY-MM-DD'),
    endDateStr = moment().format('YYYY-MM-DD')
) => {
    // Parse the start and end dates using Moment
    const inputStartDate = moment(startDateStr)
    const endDate = moment(endDateStr)

    // Start from the 1st day of the month of the input date
    const startDate = moment(inputStartDate).startOf('month')

    // Array to store the date ranges
    const monthlyRanges = []

    // Set the current date to the start date
    let currentDate = moment(startDate)

    // Loop until we reach or exceed the end date
    while (currentDate.isSameOrBefore(endDate, 'month')) {
        const monthStart = moment(currentDate).startOf('month')
        const monthEnd = moment(currentDate).endOf('month')

        // If month end is after the end date, use the end date instead
        const rangeEndDate = monthEnd.isAfter(endDate)
            ? moment(endDate)
            : monthEnd

        // Format dates as YYYY-MM-DD strings
        const formattedStartDate = monthStart.format('YYYY-MM-DD')
        const formattedEndDate = rangeEndDate.format('YYYY-MM-DD')

        // Add the date range object to the array
        monthlyRanges.push({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        })

        // Move to the first day of the next month
        currentDate.add(1, 'month').startOf('month')
    }

    return monthlyRanges
}
