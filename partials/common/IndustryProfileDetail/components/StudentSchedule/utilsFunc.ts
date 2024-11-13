// Utility functions
export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
}

export const getStartOfWeek = (date: Date): Date => {
    const result = new Date(date)
    const day = result.getDay()
    const diff = (day + 6) % 7 // Adjust to make Monday start of week
    result.setDate(result.getDate() - diff)
    return result
}

export const isValidDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime())
}
