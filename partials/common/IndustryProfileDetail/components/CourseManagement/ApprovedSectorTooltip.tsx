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
            <div className="flex items-center gap-x-1">
                {uniqueSectors.map((sector: any, index: any) => (
                    <div key={sector.code} className="relative group">
                        <div className="size-2 bg-blue-500 rounded-full cursor-pointer"></div>
                        <div className="invisible group-hover:visible absolute left-0 top-2 z-20">
                            <div className="bg-white border rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
                                <Typography variant="small" semibold>
                                    {sector.name} ({sector.code})
                                </Typography>
                                <div className="mt-1">
                                    <Typography
                                        variant="xs"
                                        color="text-gray-600"
                                    >
                                        Related Courses:
                                    </Typography>
                                    {courses
                                        .filter(
                                            (course: any) =>
                                                course.sector.code ===
                                                sector.code
                                        )
                                        .map((course: any) => (
                                            <Typography
                                                key={course.id}
                                                variant="xs"
                                            >
                                                • {course.title} ({course.code})
                                            </Typography>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {index < uniqueSectors.length - 1 && (
                            <span className="mx-1 text-gray-400">•</span>
                        )}
                    </div>
                ))}
                <Typography variant="xxs" color="text-gray-500">
                    ({uniqueSectors.length})
                </Typography>
            </div>
        </div>
    )
}
