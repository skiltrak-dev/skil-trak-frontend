import { ReactElement } from 'react'

import { RtoLayout, StudentLayout } from '@layouts'
import { RtoApi, useGetStudentCoursesQuery } from '@queries'
import { Course, GetSectorsType, NextPageWithLayout } from '@types'

import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { CourseRequirementsDetail } from '@partials/common'

const getSectors = (courses: Course[]) => {
    if (!courses) return {}
    const sectors: GetSectorsType = {}
    courses?.forEach((c: Course) => {
        if (sectors[c?.sector?.name]) {
            sectors[c?.sector?.name].push(c)
        } else {
            sectors[c?.sector?.name] = []
            sectors[c?.sector?.name].push(c)
        }
    })
    return sectors
}

const CourseRequirements: NextPageWithLayout = () => {
    // const { data: rto, isLoading } = RtoApi.Rto.useProfile()
    const courses = useGetStudentCoursesQuery()
    const sectorsWithCourses = getSectors(courses?.data)

    return (
        <>
            {courses.isError && <TechnicalError />}
            {courses?.isLoading ? (
                <LoadingAnimation />
            ) : courses?.data && courses?.data?.length > 0 ? (
                <CourseRequirementsDetail
                    sectorsWithCourses={sectorsWithCourses}
                    loading={courses?.isLoading}
                />
            ) : (
                !courses.isError && (
                    <EmptyData
                        title={'No Courses were found'}
                        description={'You have no courses assigned'}
                    />
                )
            )}
        </>
    )
}

CourseRequirements.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Course Requirements' }}>
            {page}
        </StudentLayout>
    )
}

export default CourseRequirements
