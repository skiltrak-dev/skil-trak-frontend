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
        ?.map(({ updatedAt }: { updatedAt: Date }) => getDate(updatedAt))
        ?.filter(
            (date: Date, i: number, array: any) => array.indexOf(date) === i
        )
}

export const getIsEnabledCommonDates = (data: any) => {
    return data
        ?.map(
            ({
                createdAt,
                isEnabled,
            }: {
                createdAt: Date
                isEnabled: Date | null
            }) => getDate(isEnabled ? isEnabled : createdAt)
        )
        ?.filter(
            (date: Date, i: number, array: any) => array.indexOf(date) === i
        )
}
