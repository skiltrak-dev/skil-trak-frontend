export const disableInputDates = () => {
    var dtToday = new Date()

    var month = String(dtToday.getMonth() + 1)
    var day = String(dtToday.getDate())
    var year = dtToday.getFullYear()

    if (Number(month) < 10) month = '0' + month.toString()
    if (Number(day) < 10) day = '0' + day.toString()

    return `${year}-${month}-${day}`
}
