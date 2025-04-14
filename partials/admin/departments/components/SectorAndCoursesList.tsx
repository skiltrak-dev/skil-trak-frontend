import { Card, Typography } from '@components'
import React from 'react'
import { FaSchool } from 'react-icons/fa'

// Define the shape of a Sector object
interface Sector {
    id: number
    name: string
}

// Define the shape of a Course object
interface Course {
    id: number
    code: string
    title: string
    hours: number
    sector: Sector
    isSuperseded: boolean
}

// Define props for the component
interface SectorAndCoursesListProps {
    courses: Course[]
}

export const SectorAndCoursesList = ({
    courses,
}: SectorAndCoursesListProps) => {
    // Group courses by sector
    const groupedCourses = courses?.reduce<Record<string, Course[]>>(
        (acc, course) => {
            const sectorName = course.sector.name
            if (!acc[sectorName]) {
                acc[sectorName] = []
            }
            acc[sectorName].push(course)
            return acc
        },
        {}
    )

    return (
        <div className="w-full h-full">
            <Card fullHeight>
                {/* Card Header */}
                <div className="flex justify-between items-center pb-5">
                    {/* Icon Title */}
                    <div className="flex items-center gap-x-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex justify-center items-center">
                            <FaSchool size={16} />
                        </div>
                        <p className="text-sm font-semibold">
                            My Sector &amp; Courses
                        </p>
                    </div>
                </div>

                <div className="p-4 overflow-auto custom-scrollbar max-h-[450px]">
                    {Object.entries(groupedCourses).map(
                        ([sectorName, sectorCourses]) => (
                            <div key={sectorName} className="mb-4">
                                <Typography
                                    variant="label"
                                    color="text-primaryNew"
                                    semibold
                                >
                                    {sectorName}
                                </Typography>
                                {sectorCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="bg-[#95c6fb26] border-[0.2px] border-gray-200 bg-opacity-15 p-3 rounded-lg mb-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <Typography
                                                variant="muted"
                                                color="text-primaryNew"
                                            >
                                                {course?.code ?? 'NA'}
                                            </Typography>
                                            <div className="flex items-center gap-x-1">
                                                <Typography
                                                    variant="xs"
                                                    color="text-primaryNew"
                                                >
                                                    Course Hours:{' '}
                                                </Typography>
                                                <Typography
                                                    variant="xs"
                                                    // color="text-primaryNew"
                                                    semibold
                                                >
                                                    {course?.hours ?? 'NA'}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div
                                            className={`${
                                                course.isSuperseded &&
                                                'line-through'
                                            }`}
                                        >
                                            <Typography
                                                variant="small"
                                                // color="text-primaryNew"
                                                semibold
                                            >
                                                {course?.title ?? 'NA'}
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </Card>
        </div>
    )
}
