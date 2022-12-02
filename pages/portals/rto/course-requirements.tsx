import { ReactElement, useEffect, useState } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout, Course, Sector } from '@types'
import { RtoApi } from '@queries'

import { LoadingAnimation, NoData, Typography } from '@components'
import { FaBook } from 'react-icons/fa'

const getSectors = (courses: any) => {
    if (!courses) return {}
    const sectors = {}
    courses.forEach((c: any) => {
        if ((sectors as any)[c.sector.name]) {
            ;(sectors as any)[c.sector.name].push(c)
        } else {
            ;(sectors as any)[c.sector.name] = []
            ;(sectors as any)[c.sector.name].push(c)
        }
    })
    return sectors
}

const getFirstCourse = (sectorWithCourse: any) => {
    if (!sectorWithCourse) return undefined
    const keys = Object.keys(sectorWithCourse)
    if (keys.length) {
        return sectorWithCourse[keys[0]][0]
    }

    return undefined
}

const CourseRequirements: NextPageWithLayout = () => {
    const { data: rto, isLoading } = RtoApi.Rto.useProfile()
    const sectorsWithCourses = getSectors(rto?.courses)

    const [selectedCourse, setSelectedCourse] = useState<Course | undefined>()

    useEffect(() => {
        const firstCourse = getFirstCourse(sectorsWithCourses)
        if (firstCourse && !selectedCourse) {
            setSelectedCourse(firstCourse)
        }
    }, [isLoading])

    const onCourseClicked = (course: Course) => {
        setSelectedCourse(course)
    }

    return isLoading ? (
        <LoadingAnimation />
    ) : (
        <div className="flex items-start gap-x-2 min-h-[450px] mb-32">
            <div className="bg-gray-100 py-2 px-2 rounded-xl shadow-xl w-2/5 sticky top-4">
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

            <div className="w-3/5 bg-white rounded-xl shadow-xl">
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
                        className="p-4"
                        dangerouslySetInnerHTML={{
                            __html: selectedCourse.requirements,
                        }}
                    ></div>
                ) : (
                    <div className="p-4">No Course Selected</div>
                )}
            </div>
        </div>
    )
}

CourseRequirements.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout pageTitle={{ title: 'Course Requirements' }}>
            {page}
        </RtoLayout>
    )
}

export default CourseRequirements
