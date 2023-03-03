import { ReactElement } from 'react'

import { IndustryLayout } from '@layouts'
import { SubAdminApi, useIndustryProfileQuery } from '@queries'
import { NextPageWithLayout } from '@types'

import { EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { CourseRequirementsDetail } from '@partials/common'

const getSectors = (courses: any) => {
    if (!courses) return {}
    const sectors = {}
    courses?.forEach((c: any) => {
        if ((sectors as any)[c?.sector?.name]) {
            ;(sectors as any)[c?.sector?.name].push(c)
        } else {
            ;(sectors as any)[c?.sector?.name] = []
            ;(sectors as any)[c?.sector?.name].push(c)
        }
    })
    return sectors
}

const CourseRequirements: NextPageWithLayout = () => {
    const { data, isSuccess, isLoading, isError } = useIndustryProfileQuery()

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
        <IndustryLayout pageTitle={{ title: 'Course Requirements' }}>
            {page}
        </IndustryLayout>
    )
}

export default CourseRequirements
