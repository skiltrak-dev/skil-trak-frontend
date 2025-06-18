import { Course } from '@types'

export const groupDirectCoursesBySector = (courses: Course[]) => {
    const sectorMap = new Map()

    courses?.forEach((course) => {
        const sectorCode = course?.sector?.code
        const sectorInfo = course?.sector

        // Create course object without sector (since sector is at parent level)
        const courseData = {
            id: course?.id,
            code: course?.code,
            title: course?.title,
            hours: course?.hours,
        }

        if (sectorMap.has(sectorCode)) {
            // Add course to existing sector
            sectorMap.get(sectorCode).courses?.push(courseData)
        } else {
            // Create new sector entry
            sectorMap.set(sectorCode, {
                sector: sectorInfo,
                courses: [courseData],
            })
        }
    })

    // Convert Map to Array
    return Array.from(sectorMap.values())
}

export const groupCoursesBySector = (data: any) => {
    const sectorMap = new Map()
    data.forEach((item: any) => {
        const sectorCode = item?.course?.sector?.code
        const sectorInfo = item?.course?.sector
        // Create course object with all relevant data
        const courseData = {
            ...item,
            course: {
                id: item?.course?.id,
                code: item?.course?.code,
                title: item?.course?.title,
                hours: item?.course?.hours,
            },
        }
        if (sectorMap?.has(sectorCode)) {
            // Add course to existing sector
            sectorMap?.get(sectorCode).courses.push(courseData)
        } else {
            // Create new sector entry
            sectorMap.set(sectorCode, {
                sector: sectorInfo,
                actionBy: courseData?.actionBy,
                courses: [courseData],
            })
        }
    })
    // Convert Map to Array
    return Array.from(sectorMap.values())
}

export const getCleanExternalUrl = (url: string | undefined | null): string => {
    if (!url) return '#'

    // Trim whitespace
    url = url.trim()

    // Handle common prefixes and domains
    const cleanUrl = url
        .replace(/^(https?:\/\/)?(www\.)?(skiltrak\.com\.au\/)?/i, '')
        .replace(/\s+/g, '') // Remove any whitespace

    // If empty after cleaning, return fallback
    if (!cleanUrl) return '#'

    // Add protocol if missing
    return cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`
}

export const isValidUrl = (url: any): boolean => {
    if (!url || typeof url !== 'string') return false

    try {
        // More comprehensive URL validation
        const parsedUrl = new URL(
            url.startsWith('http') ? url : `https://${url}`
        )

        // Additional checks
        return parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:'
    } catch {
        return false
    }
}
