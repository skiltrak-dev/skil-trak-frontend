import React, { Fragment } from 'react'
// components
import {
    BackButton,
    Typography,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { CourseDocuments } from './components'

// redux
import { useGetIndustryCoursesQuery } from '@queries'

export const RequiredDocumentsContainer = () => {
    const { data, isError, isLoading } = useGetIndustryCoursesQuery()

    return (
        <div className="h-full">
            <BackButton text={'Back To Previous'} />

            {isError && <TechnicalError />}

            {isLoading ? (
                <div className="h-full flex items-center justify-center">
                    <LoadingAnimation />
                </div>
            ) : data && data.length > 0 ? (
                data.map((course: any) => (
                    <Fragment key={course.id}>
                        <div className="mt-8">
                            <Typography
                                variant={'small'}
                                color={'text-gray-700'}
                            >
                                {course?.sector?.name}
                            </Typography>
                            <Typography variant={'subtitle'}>
                                {course?.title}
                                {course?.id}
                            </Typography>
                        </div>
                        <CourseDocuments
                            course={course}
                            documentCourseId={course.id}
                            showCustomFields
                            courseId={course.id}
                        />
                    </Fragment>
                ))
            ) : (
                !isError && <EmptyData />
            )}
        </div>
    )
}
