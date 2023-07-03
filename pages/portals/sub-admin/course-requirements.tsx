import { ReactElement } from 'react'

import { RtoLayout, StudentLayout, SubAdminLayout } from '@layouts'
import { RtoApi, SubAdminApi, useGetStudentCoursesQuery } from '@queries'
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
    const { data, isSuccess, isLoading, isError } =
        SubAdminApi.SubAdmin.useProfile()
    const sectorsWithCourses = getSectors(data?.courses)

    return (
        <>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data?.courses && data?.courses?.length > 0 ? (
                <CourseRequirementsDetail
                    sectorsWithCourses={sectorsWithCourses}
                    loading={isLoading}
                />
            ) : (
                !isError && (
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
        <SubAdminLayout pageTitle={{ title: 'Course Requirements' }}>
            {page}
        </SubAdminLayout>
    )
}

export default CourseRequirements
