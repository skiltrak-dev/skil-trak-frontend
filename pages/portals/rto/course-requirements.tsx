import { ReactElement } from 'react'

import { RtoApi } from '@queries'
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { getSectors } from '@utils'
import { CourseRequirementsDetail } from '@partials/common'
import { EmptyData, LoadingAnimation, TechnicalError } from '@components'

const CourseRequirements: NextPageWithLayout = () => {
    const { data: rto, isLoading, isError } = RtoApi.Rto.useProfile()
    const sectorsWithCourses = getSectors(rto?.courses)
    console.log('sectorsWithCourses', sectorsWithCourses)
    
    return (
        <>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : rto?.courses && rto?.courses?.length > 0 ? (
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
        <RtoLayout pageTitle={{ title: 'Course Requirements' }}>
            {page}
        </RtoLayout>
    )
}

export default CourseRequirements
