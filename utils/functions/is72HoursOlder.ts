import moment from 'moment'

export const is72HoursOlder = (date: string | Date): boolean => {
    const inputDate = moment(date)
    const now = moment()

    const durationInHours = now.diff(inputDate, 'hours')
    return durationInHours >= 72
}
