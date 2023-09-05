export const calculateRemainingDays = (date: Date) => {
    // Get the current date
    const currentDate = new Date()
    const targetDate = new Date(date)

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate.getTime() - currentDate.getTime()

    // Convert milliseconds to days
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24))

    return remainingDays
}
