import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { CommonApi } from '@queries'
import { NextPageWithLayout } from '@types'

import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { CourseRequirementsDetail } from '@partials/common'
import { getSectors } from '@utils'

const CourseRequirements: NextPageWithLayout = () => {
    const subadminCourses = CommonApi.Courses.subadminCoursesList()
    const sectorsWithCourses = getSectors(subadminCourses?.data)

    return (
        <>
            {subadminCourses?.isError && <TechnicalError />}
            {subadminCourses?.isLoading ? (
                <LoadingAnimation />
            ) : subadminCourses?.data && subadminCourses?.data?.length > 0 ? (
                <CourseRequirementsDetail
                    sectorsWithCourses={sectorsWithCourses}
                    loading={subadminCourses?.isLoading}
                />
            ) : (
                !subadminCourses?.isError && (
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
