import React, { Fragment, useEffect, useState } from 'react'
// components
import {
    BackButton,
    Typography,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Select,
    SelectOption,
} from '@components'
import { CourseDocuments } from './components'

// redux
import { useGetIndustryCoursesQuery } from '@queries'
import { Course, Industry } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

export const RequiredDocumentsContainer = ({
    industry,
}: {
    industry?: Industry
}) => {
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const { data, isError, isLoading } = useGetIndustryCoursesQuery(
        Number(industry?.user?.id)
    )

    useEffect(() => {
        if (data && data?.length > 0) {
            setSelectedCourse(data[0]?.id)
        }
    }, [data])

    const coursesOptions = data?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    const filteredCourse = data?.find((c: Course) => c?.id === selectedCourse)

    return (
        <div className="h-full">
            <BackButton text={'Back To Previous'} />

            {isError && <TechnicalError />}

            <div className="w-full md:w-1/2 lg:w-1/3">
                <Select
                    label={'Select by Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    value={coursesOptions?.find(
                        (course: SelectOption) =>
                            course.value === Number(selectedCourse)
                    )}
                    onChange={(e: any) => {
                        setSelectedCourse(e)
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                    onlyValue
                    components={{
                        Option: CourseSelectOption,
                    }}
                    formatOptionLabel={formatOptionLabel}
                />
            </div>

            {filteredCourse && (
                <Fragment key={filteredCourse.id}>
                    <div className="mt-8">
                        <Typography variant={'small'} color={'text-gray-700'}>
                            {filteredCourse?.sector?.name}
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {filteredCourse?.title}
                            {filteredCourse?.id}
                        </Typography>
                    </div>
                    <CourseDocuments
                        course={filteredCourse}
                        industry={industry as Industry}
                    />
                </Fragment>
            )}

            {/* {isLoading ? (
                <div className="h-full flex items-center justify-center">
                    <LoadingAnimation />
                </div>
            ) : data && data.length > 0 ? (
                data.map((course: Course) => (
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
                            industry={industry as Industry}
                        />
                    </Fragment>
                ))
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Courses were found!'}
                        description={'it seems that no courses were found!'}
                    />
                )
            )} */}
        </div>
    )
}
