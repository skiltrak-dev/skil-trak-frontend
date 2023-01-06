import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React, { useEffect, useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { Course } from './Course'

export const Courses = ({ courses, results }: any) => {
    const [studentCourse, setStudentCourse] = useState<any | null>(null)

    console.log(results)

    useEffect(() => {
        const getCourseWithResults = () => {
            const courseResults = {}
            results?.forEach((result: any) => {
                if ((courseResults as any)[result?.course?.id]) {
                    ;(courseResults as any)[result?.course?.id].push(result)
                } else {
                    ;(courseResults as any)[result?.course?.id] = []
                    ;(courseResults as any)[result?.course?.id].push(result)
                }
            })
            console.log('courseResults', courseResults)
            const allCourses = courses?.map((course: any) => ({
                ...course,
                results: (courseResults as any)[course?.id],
            }))
            setStudentCourse(allCourses)
        }
        getCourseWithResults()
    }, [courses, results])

    console.log('studentCourse', studentCourse)
    return (
        <Card>
            <div className="flex items-center gap-x-2">
                <div className="bg-gray-100 p-2 rounded-full">
                    <FaBook className="text-xl text-red-500" />
                </div>
                <Typography variant={'label'}>
                    <span className="font-semibold">
                        My Sector {'&'} Courses
                    </span>
                </Typography>
            </div>

            {/*  */}
            {studentCourse?.map((course: any) => (
                <div key={course?.id}>
                    <div className="mt-2">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Sector
                        </Typography>
                        <Typography variant={'label'} color={'text-gray-700'}>
                            {course?.sector?.name}
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="mt-2 flex flex-col gap-y-1">
                        <Course key={course.id} course={course} />
                    </div>
                </div>
            ))}
        </Card>
    )
}
