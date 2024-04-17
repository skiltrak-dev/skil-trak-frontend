import moment from 'moment'

export const isLessThan24HoursDifference = (givenDate: Date) => {
    // Get the current date and time using Moment.js
    const currentDate = moment()

    // Parse the given date string using Moment.js
    const givenDateObj = moment(givenDate)

    // Calculate the difference in hours between the current date and the given date
    const hoursDifference = givenDateObj.diff(currentDate, 'hours')

    // Check if the difference is less than 24 hours
    return hoursDifference < 24
}
