import { Typography } from '@components'

export const ApprovedSectorTooltip = ({ courses }: any) => {
    // Get unique sectors from all courses
    const uniqueSectors = courses.reduce((acc: any, course: any) => {
        if (
            course?.sector &&
            !acc.find((s: any) => s.code === course.sector.code)
        ) {
            acc.push(course.sector)
        }
        return acc
    }, [])

    if (uniqueSectors.length <= 1) {
        return (
            <h2 className="text-sm font-medium">
                Sector: {uniqueSectors[0]?.name || 'N/A'}
            </h2>
        )
    }


    return (
        <div className="flex items-center gap-x-2">
            <h2 className="text-sm font-medium">Sectors:</h2>
            <div className="flex items-center gap-x-1"></div>
        </div>
    )
}
