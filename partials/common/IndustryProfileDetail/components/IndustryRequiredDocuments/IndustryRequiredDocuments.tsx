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
    Card,
} from '@components'
import { CourseDocuments } from './components'

// redux
import { useGetIndustryCoursesQuery } from '@queries'
import { Course, Industry } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'

export const IndustryRequiredDocuments = ({
    industry,
}: {
    industry: Industry
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
        <Card fullHeight shadowType="profile" noPadding>
            <div className="px-4 py-3 flex justify-between items-center border-b border-secondary-dark">
                <Typography semibold>
                    <span className="text-[15px]">Required Documents</span>
                </Typography>
            </div>
            <div className="h-[422px] overflow-auto custom-scrollbar px-3.5 py-2.5">
                {isError && <TechnicalError />}

                <div className=" border-b border-secondary-dark pb-3">
                    <div className="w-full md:w-1/2 lg:w-2/3">
                        <Select
                            label={'Select by Courses'}
                            name={'courseId'}
                            showError={false}
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
                </div>

                {filteredCourse && (
                    <div className="pt-3.5" key={filteredCourse.id}>
                        <CourseDocuments
                            course={filteredCourse}
                            industry={industry as Industry}
                        />
                    </div>
                )}
            </div>
        </Card>
    )
}
