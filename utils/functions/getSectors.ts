import { Course, GetSectorsType, OptionType } from '@types'
import { newline_toDos } from 'jsrsasign'

export const getSectors = (courses: Course[]) => {
    if (!courses) return {}
    const sectors: GetSectorsType = {}
    courses.forEach((c: Course) => {
        if (sectors[c?.sector?.name]) {
            sectors[c?.sector?.name].push(c)
        } else {
            sectors[c?.sector?.name] = []
            sectors[c?.sector?.name].push(c)
        }
    })
    return sectors
}

export const getSectorsDetail = (courses: Course[]) => {
    const uniqueSectorsObject = {}
    courses?.forEach((course) => {
        ;(uniqueSectorsObject as any)[course.sector.id] = course.sector
    })

    // Convert the object back to an array to get unique sector objects
    return Object.values(uniqueSectorsObject)
}

export const sectorsCoursesOptions = (
    sectors: OptionType[],
    sectorResponse: any
) => {
    const filteredCourses = sectors?.map((selectedSector: any) => {
        const sectorExisting = sectorResponse?.find(
            (sector: any) => sector?.id === selectedSector?.value
        )
        if (sectorExisting && sectorExisting?.courses?.length) {
            return sectorExisting?.courses
        }
    })

    const newCourseOptions: any = []
    filteredCourses?.map((courseList: any) => {
        if (courseList && courseList?.length) {
            return courseList.map((course: any) =>
                newCourseOptions.push({
                    item: course,
                    value: course?.id,
                    label: course?.title,
                })
            )
        }
    })
    return newCourseOptions
}

export const courseOptionsWhenSectorChange = (
    newCourseOptions: OptionType[],
    removedCourses: number[]
) =>
    newCourseOptions
        ?.map((c: OptionType) => c?.value)
        ?.filter((c: any) => !removedCourses?.includes(Number(c))) as number[]

export const getRemovedCoursesFromList = (
    courseOptions: OptionType[],
    event: number[]
) =>
    courseOptions
        .filter(
            (option: OptionType) => !event?.includes(option?.value as number)
        )
        ?.map((r: OptionType) => r?.value) as number[]
