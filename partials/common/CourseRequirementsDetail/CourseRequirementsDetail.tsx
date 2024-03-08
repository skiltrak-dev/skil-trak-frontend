import { BackButton, NoData } from '@components'
import { Course } from '@types'
import React, { useEffect, useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { MediaQueries } from '@constants'
import { useMediaQuery } from 'react-responsive'

const getFirstCourse = (sectorWithCourse: any) => {
    if (!sectorWithCourse) return undefined
    const keys = Object.keys(sectorWithCourse)
    if (keys.length) {
        return sectorWithCourse[keys[0]][0]
    }

    return undefined
}

export const CourseRequirementsDetail = ({
    sectorsWithCourses,
    loading,
}: {
    sectorsWithCourses: any
    loading: boolean
}) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const [selectedCourse, setSelectedCourse] = useState<Course | undefined>()
    useEffect(() => {
        const firstCourse = getFirstCourse(sectorsWithCourses)
        if (firstCourse && !selectedCourse && !isMobile) {
            setSelectedCourse(firstCourse)
        }
    }, [loading])

    const onCourseClicked = (course: Course) => {
        setSelectedCourse(course)
    }
    return (
        <div className="flex items-start gap-x-2 min-h-[450px] mb-32">
            <div
                className={`${
                    selectedCourse ? 'md:block hidden' : 'block'
                } bg-gray-100 py-2 px-2 rounded-xl shadow-xl w-full md:w-2/5 sticky top-4`}
            >
                <div className="text-sm font-medium text-gray-500">
                    Select a course
                </div>
                {sectorsWithCourses ? (
                    Object.keys(sectorsWithCourses).map((sector: string) => {
                        return (
                            <div className="mb-2 pt-2" key={sector}>
                                <p className="text-xs font-medium text-gray-400">
                                    {sector}
                                </p>

                                {(sectorsWithCourses as any)[sector].map(
                                    (c: Course) => (
                                        <div
                                            key={c.id}
                                            className={`px-2 py-1 flex gap-x-2 items-start cursor-pointer hover:bg-gray-300 rounded-md ${
                                                selectedCourse?.id === c.id
                                                    ? 'bg-gray-300'
                                                    : ''
                                            }`}
                                            onClick={() => onCourseClicked(c)}
                                        >
                                            <div className="pt-1 text-blue-600">
                                                <FaBook size={12} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500">
                                                    {c.code}
                                                </p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {c.title}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )
                    })
                ) : (
                    <NoData text={'No Sectors Assigned'} />
                )}
            </div>

            <div
                className={`${
                    selectedCourse ? 'block' : 'hidden md:block'
                } w-full md:w-3/5`}
            >
                <div className="hidden md:block">
                    <BackButton
                        onClick={() => {
                            setSelectedCourse(undefined)
                        }}
                    />
                </div>
                <div className={` w-full  bg-white rounded-xl shadow-xl`}>
                    <div className="bg-slate-100 rounded-t-xl p-2 text-sm">
                        {selectedCourse ? (
                            <span>
                                {selectedCourse.code} - {selectedCourse?.title}
                            </span>
                        ) : (
                            'No Course Selected'
                        )}
                    </div>
                    {selectedCourse ? (
                        <div
                            className="p-4 break-all"
                            dangerouslySetInnerHTML={{
                                __html: selectedCourse.requirements,
                            }}
                        ></div>
                    ) : (
                        <div className="p-4">No Course Selected</div>
                    )}
                </div>
            </div>
        </div>
    )
}
