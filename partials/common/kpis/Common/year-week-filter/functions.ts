import moment, { Moment } from 'moment'

interface MonthDates {
    startDate: Moment
    endDate: Moment
}

export const getMonthDates = (
    date: Moment = moment(new Date())
): MonthDates => {
    // Parse the input date with Moment

    // Check if the date is valid
    if (!date.isValid()) {
        throw new Error('Invalid date provided')
    }

    // Get the start and end of the month
    const startDate = date.clone().startOf('month')
    const endDate = date.clone().endOf('month')

    return { startDate, endDate }
}

export const getWeeksOfCurrentMonth = (
    momentDate: Moment = moment(new Date())
): Array<{
    startDate: string
    endDate: string
}> => {
    // Initialize moment with the given date

    // Get the first day of the month
    const firstDayOfMonth = moment(momentDate).startOf('month')

    // Get the last day of the month
    const lastDayOfMonth = moment(momentDate).endOf('month')

    // Find the first Monday within the month
    // If the first day is not Monday, move to the next Monday
    const firstMonday = moment(firstDayOfMonth)
    if (firstMonday.day() !== 1) {
        // If not Monday (1)
        firstMonday.day(8) // Next Monday (move to next week's Monday)

        // If we've gone out of the month, go back to first day
        if (firstMonday.month() !== momentDate.month()) {
            firstMonday.date(1) // Reset to first day of month
        }
    }

    const weeks: Array<{
        startDate: string
        endDate: string
    }> = []

    // Start from the first Monday in the month
    let currentWeekStart = moment(firstMonday)

    // Iterate through all weeks that have days in this month
    while (currentWeekStart.month() === momentDate.month()) {
        // Calculate the end of this week (Sunday)
        const currentWeekEnd = moment(currentWeekStart).add(6, 'days')

        // Add the week to our list
        weeks.push({
            startDate: currentWeekStart.format('YYYY-MM-DD'),
            endDate: currentWeekEnd.format('YYYY-MM-DD'),
        })

        // Move to the next Monday
        currentWeekStart.add(7, 'days')
    }

    return weeks
}
