import moment from 'moment'

export const currentWeekDates = () => {
    const weekDays = moment()

    // Get the start of the current week (Sunday)
    const startOfWeek = weekDays.clone().startOf('week')

    // Initialize an array to store the dates from Sunday to Saturday
    const datesOfWeek = []

    // Loop through each day of the week (Sunday to Saturday)
    for (let i = 0; i < 7; i++) {
        // Add the current date to the array
        datesOfWeek.push(startOfWeek.clone().add(i, 'days'))
    }

    // Format and display the dates
    return datesOfWeek
}

export const currentMonthDates = () => {
    const monthDays = moment()

    // Get the start of the current month
    const startOfMonth = monthDays.clone().startOf('month')

    // Get the end of the current month
    const endOfMonth = monthDays.clone().endOf('month')

    // Initialize an array to store the dates of the current month
    const datesOfMonth = []

    // Loop through each day of the month
    let currentDate = startOfMonth.clone()
    while (
        currentDate.isBefore(endOfMonth) ||
        currentDate.isSame(endOfMonth, 'day')
    ) {
        // Add the current date to the array
        datesOfMonth.push(currentDate.clone())
        // Move to the next day
        currentDate.add(1, 'day')
    }

    // Return the array of dates for the current month
    return datesOfMonth
}
