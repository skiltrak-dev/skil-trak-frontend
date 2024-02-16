import { useStudentAssessmentCoursesQuery } from '@queries'
import { Course, Sector, Student } from '@types'
import React, { useEffect, useMemo, useState } from 'react'
import { CourseCard, SectorCard } from '../Cards'
import { Typography } from '@components'

export const Courses = ({ student }: { student: Student }) => {
    const [selectedSector, setSelectedSector] = useState<number | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const studentCourses = useStudentAssessmentCoursesQuery(
        Number(student?.id),
        {
            skip: !student?.id,
            refetchOnMountOrArgChange: true,
        }
    )

    const getSectors = (data: any) => {
        const sectorsById: { [key: number]: Sector } = {}

        // Iterate through the data and add sectors to the object
        data?.forEach((item: Course) => {
            const sectorId = item.sector.id

            // Check if the sectorId already exists in the object
            if (!sectorsById.hasOwnProperty(sectorId)) {
                // If it doesn't exist, add the sector to the object
                sectorsById[sectorId] = item.sector
            }
        })

        // Convert the object values to an array
        const commonSectors: Sector[] = Object.values(sectorsById)

        return commonSectors
    }

    const sectors = useMemo(
        () => getSectors(studentCourses?.data),
        [studentCourses?.data]
    )

    useEffect(() => {
        if (sectors && sectors?.length > 0) {
            setSelectedSector(sectors?.[0]?.id)
        }
    }, [sectors])

    const courses = useMemo(
        () =>
            studentCourses?.data?.filter(
                (c: any) => c?.sector?.id === selectedSector
            ),
        [studentCourses?.data, selectedSector]
    )

    useEffect(() => {
        if (courses && courses?.length > 0) {
            setSelectedCourse(courses[0]?.id)
        }
    }, [courses])

    console.log({ courses })
    return (
        <div>
            <div className="border-b border-secondary-dark px-4 py-2.5">
                <Typography variant="small" medium>
                    Sectors
                </Typography>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                    {sectors?.map((sector: Sector) => (
                        <SectorCard
                            onClick={() => setSelectedSector(sector.id)}
                            sector={sector}
                            active={selectedSector === sector?.id}
                        />
                    ))}
                </div>
            </div>

            {/*  */}
            <div className="px-4 py-4 border-b border-secondary-dark">
                <Typography variant="small" medium>
                    Courses
                </Typography>
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                    {courses?.map((course: Course) => (
                        <CourseCard
                            onClick={() => setSelectedCourse(course.id)}
                            course={course}
                            active={selectedCourse === course?.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
