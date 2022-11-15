import React, { Fragment } from 'react'
// components
import { GoBackButton, Typography } from 'components'
import { CourseDocuments } from './components'

// console

// redux
import { EmptyData, Loading, TechnicalError } from 'components'
import { useGetIndustryCoursesQuery } from 'redux/query'

export const RequiredDocuments = () => {
    const { data, isError, isLoading } = useGetIndustryCoursesQuery()

    return (
        <div className="h-full">
            <GoBackButton>Back To Previous</GoBackButton>

            {isError && <TechnicalError />}

            {isLoading ? (
                <div className="h-full flex items-center justify-center">
                    <Loading />
                </div>
            ) : data && data.length > 0 ? (
                data.map((course, i) => (
                    <Fragment key={course.id}>
                        <div className="mt-8">
                            <Typography variant={'muted'} color={'gray'}>
                                {course?.courses?.sector?.name}
                            </Typography>
                            <Typography variant={'subtitle'}>
                                {course?.courses?.title}
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
