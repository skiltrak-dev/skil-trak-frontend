import moment from "moment"

export const smartDateFormat = (inputDate: Date) => {
    const date = moment(inputDate)
    const now = moment()
    const yesterday = moment().subtract(1, 'days')

    // Check if date is today
    if (date.isSame(now, 'day')) {
        return `Today`
    }

    // Check if date is yesterday
    if (date.isSame(yesterday, 'day')) {
        return `Yesterday`
    }

    // For older dates, show the actual date (Apr 30) with time
    return `${date.format('MMM D')}`
}

export const smartDateTimeFormat = (inputDate: Date) => {
    const date = moment(inputDate)
    const timeStr = date.format('h:mm A')

    return timeStr
}
