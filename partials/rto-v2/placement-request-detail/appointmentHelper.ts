/* ============================
   Helpers
============================ */

export const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
}

export const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const suffix = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    return `${hours}:${minutes} ${suffix}`
}

export const generateHourlySlots = (startTime: string, endTime: string) => {
    const slots: { time: string; available: boolean }[] = []

    const [sh, sm] = startTime.split(':').map(Number)
    const [eh, em] = endTime.split(':').map(Number)

    const start = new Date()
    start.setHours(sh, sm, 0, 0)

    const end = new Date()
    end.setHours(eh, em, 0, 0)

    while (start < end) {
        slots.push({
            time: formatTime(start),
            available: true,
        })
        start.setHours(start.getHours() + 1)
    }

    return slots
}

export const buildMonthlyAvailability = (availability: any) => {
    if (!availability?.slots?.length) return []

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const year = today.getFullYear()
    const month = today.getMonth()
    const lastDay = new Date(year, month + 1, 0).getDate()

    const days: any[] = []

    for (let d = today.getDate(); d <= lastDay; d++) {
        const date = new Date(year, month, d)
        const weekday = date.getDay()

        const weeklySlots = availability.slots.filter(
            (s: any) => s.isActive && dayMap[s.day?.toLowerCase()] === weekday
        )

        if (!weeklySlots.length) continue

        const hourlySlots = weeklySlots.flatMap((slot: any) =>
            generateHourlySlots(slot.startTime, slot.endTime)
        )

        if (!hourlySlots.length) continue

        days.push({
            date: date.toISOString().split('T')[0],
            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
            dayNumber: d,
            month: date.toLocaleDateString('en-US', { month: 'short' }),
            slots: hourlySlots,
        })
    }

    return days
}
