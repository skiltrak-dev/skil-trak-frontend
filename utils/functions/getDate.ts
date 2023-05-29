export const getDate = (date?: Date | undefined) => {
    let dtToday = new Date()
    if (date) {
        dtToday = new Date(date)
    }

    var month = String(dtToday.getMonth() + 1)
    var day = String(dtToday.getDate())
    var year = dtToday.getFullYear()

    if (Number(month) < 10) month = '0' + month.toString()
    if (Number(day) < 10) day = '0' + day.toString()

    return `${year}-${month}-${day}`
}

export const getCommonDates = (data: any) => {
    return data
        ?.map(({ updatedAt }: any) => getDate(updatedAt))
        ?.filter(
            (date: any, i: number, array: any) => array.indexOf(date) === i
        )
}
