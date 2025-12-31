import { IndustryCourseApproval, Sector } from '@types'

export interface IndustrySectorGroup {
    sector: Sector
    approvalCourses: IndustryCourseApproval[]
}

export const useCoursesData = () => {
    const groupBySector = (
        data: IndustryCourseApproval[]
    ): IndustrySectorGroup[] => {
        return Object.values(
            data.reduce(
                (
                    acc: Record<number, IndustrySectorGroup>,
                    item: IndustryCourseApproval
                ) => {
                    const sectorId = item.course.sector.id

                    if (!acc[sectorId]) {
                        acc[sectorId] = {
                            sector: item.course.sector,
                            approvalCourses: [],
                        }
                    }

                    acc[sectorId].approvalCourses.push({
                        ...item,
                        course: item.course,
                    })

                    return acc
                },
                {}
            )
        )
    }
    return { groupBySector }
}
