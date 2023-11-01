import { ActionButton, Button, Typography } from '@components'
import { Course } from '@types'
import React, { useEffect, useState } from 'react'

export const CourseList = ({
    setSelectedCourses,
    selectedCourses,
    courses,
    editCourse,
}: {
    selectedCourses: any
    setSelectedCourses: any
    editCourse: boolean
    courses: Course[]
}) => {
    useEffect(() => {
        setSelectedCourses((prevCourses: any) =>
            [...prevCourses, ...courses]?.map((c: Course) => ({
                id: c?.id,
                hours: c?.hours,
            }))
        )
    }, [])

    return (
        <div>
            {courses?.map((c: Course) => (
                <>
                    <div key={c?.id} className="flex gap-x-2 justify-start">
                        <div className="flex flex-col items-center">
                            <div className="bg-blue-400 p-2 rounded-full"></div>
                            <div className="bg-blue-400 w-[1px] h-full"></div>
                        </div>
                        <div className="grid grid-cols-4 items-center">
                            <div className="pb-2 col-span-3">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    {c?.code}
                                </Typography>
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    hours: {c?.hours}
                                </Typography>
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-800'}
                                >
                                    {c?.title}
                                </Typography>
                            </div>
                            {editCourse && (
                                <div>
                                    <Typography variant="xs" medium>
                                        Hours:
                                    </Typography>
                                    <input
                                        placeholder="Hours"
                                        className="border rounded p-1.5 text-xs"
                                        name="hours"
                                        type="number"
                                        value={
                                            selectedCourses?.find(
                                                (s: any) => s?.id === c?.id
                                            )
                                                ? selectedCourses?.find(
                                                      (s: any) =>
                                                          s?.id === c?.id
                                                  )?.hours
                                                : c?.hours
                                        }
                                        onChange={(e: any) => {
                                            setSelectedCourses(
                                                (course: any) => {
                                                    const existingCourse =
                                                        courses?.find(
                                                            (ccc: any) =>
                                                                ccc.id === c.id
                                                        )
                                                    return existingCourse
                                                        ? [
                                                              ...course?.filter(
                                                                  (a: any) =>
                                                                      a?.id !==
                                                                      c?.id
                                                              ),
                                                              {
                                                                  id: c?.id,
                                                                  hours: Number(
                                                                      e.target
                                                                          .value
                                                                  ),
                                                              },
                                                          ]
                                                        : [
                                                              ...course,
                                                              {
                                                                  id: c?.id,
                                                                  hours: Number(
                                                                      e.target
                                                                          .value
                                                                  ),
                                                              },
                                                          ]
                                                }
                                            )
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ))}
        </div>
    )
}
