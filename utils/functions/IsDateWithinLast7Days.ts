import moment from 'moment'

export const isDateWithinLast7Days = (dateToCheck: Date) => {
    // Create a Moment object for the current date
    const currentDate = moment()

    // Create a Moment object for the date to check
    const dateToCheckMoment = moment(dateToCheck)

    // Calculate the date 7 days ago from the current date
    const sevenDaysAgo = moment().subtract(7, 'days')

    // Check if the date to check is after sevenDaysAgo and before the current date
    return (
        dateToCheckMoment.isAfter(sevenDaysAgo) &&
        dateToCheckMoment.isBefore(currentDate)
    )
}
