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
        setSelectedCourses((prevCourses: any) => {
            const allCourses = [...prevCourses, ...courses]
            return allCourses?.map((c: Course) => ({
                id: c?.id,
                hours:
                    c?.extraHours && c?.extraHours?.length > 0
                        ? Number(c?.extraHours?.[0]?.hours).toFixed(0)
                        : c?.hours,
            }))
        })
    }, [])

    return (
        <div className="flex flex-col gap-y-2.5 mt-2">
            {courses?.map((c: Course) => (
                <>
                    <div
                        key={c?.id}
                        className="bg-[#95C6FB26] border border-[#6B728050] rounded-md p-2.5"
                    >
                        <div
                            className={
                                'flex gap-x-2 justify-between items-center'
                            }
                        >
                            <Typography
                                variant={'xxs'}
                                color={'text-[#24556D]'}
                            >
                                {c?.code}
                            </Typography>

                            <Typography variant={'xxs'} color={'text-gray-500'}>
                                <span className="text-[#6C6C6C]">
                                    Course Hours :
                                </span>{' '}
                                {editCourse ? (
                                    <input
                                        placeholder="Hours"
                                        className="border rounded p-1.5 text-xs w-14"
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
                                ) : c?.extraHours &&
                                  c?.extraHours?.length > 0 ? (
                                    Number(c?.extraHours?.[0]?.hours).toFixed(0)
                                ) : (
                                    c?.hours
                                )}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant={'xs'} medium>
                                {c?.title}
                            </Typography>
                        </div>
                    </div>
                </>
            ))}
        </div>
    )

    return (
        <div>
            {courses?.map((c: Course) => (
                <>
                    <div key={c?.id} className="flex gap-x-2 justify-start">
                        <div className="flex flex-col items-center">
                            <div className="bg-blue-400 p-2 rounded-full"></div>
                            <div className="bg-blue-400 w-[1px] h-full"></div>
                        </div>
                        <div className="grid grid-cols-4 w-full items-center">
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
                                    hours:{' '}
                                    {c?.extraHours && c?.extraHours?.length > 0
                                        ? Number(
                                              c?.extraHours?.[0]?.hours
                                          ).toFixed(0)
                                        : c?.hours}
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
                                        className="border rounded p-1.5 text-xs w-full"
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
