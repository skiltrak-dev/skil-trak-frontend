import { Card, LoadingAnimation, NoData, Select, Typography } from '@components'
import React, { useEffect, useState } from 'react'
import { WorkplaceProgress } from '../../components'
import { SubAdminApi } from '@queries'
import { Course, Industry } from '@types'
import { CourseSelectOption, formatOptionLabel } from '@utils'
import { UpdatedExistingIndustryCard } from './UpdatedExistingIndustryCard'
import { UpdatedIndustryCourse } from './UpdatedIndustryCourse'

export const UpdatedExistingIndustryByName = ({
    student,
    setActive,
    setFindIndustryType,
    industrySearchValue,
}: {
    student?: number
    setActive: any
    setFindIndustryType: (e: null) => void
    industrySearchValue: string | null
}) => {
    const [selectedCourse, setselectedCourse] = useState<number | null>(null)

    const industries = SubAdminApi.Student.useFindSuggestedIndustries(
        {
            name: industrySearchValue,
        },
        {
            skip: !industrySearchValue,
        }
    )

    useEffect(() => {
        if (industries?.isSuccess && !industries?.data?.length) {
            setTimeout(() => {
                setFindIndustryType(null)
            }, 2000)
        }
    }, [industries])

    return (
        <div className="flex flex-col gap-y-7">
            {industries?.isSuccess && !industries?.data?.length ? (
                <div className="bg-red-200 rounded-lg px-2 py-1 mb-2">
                    <p className="text-sm font-semibold text-red-500">
                        Industry for provided ABN not found
                    </p>
                    <p className="text-xs text-red-400">
                        You will be redirected to Industry Form so you can add
                        your industry&apos;s information
                    </p>
                </div>
            ) : null}
            <Card noPadding>
                <div className="w-full ">
                    <div className="w-full py-7 border-b border-[#D9DBE9]">
                        <WorkplaceProgress
                            progressNumber={3}
                            activeNumber={2}
                        />
                    </div>

                    {/*  */}
                    <div className="w-full px-10 pt-5 pb-9">
                        <Typography
                            color="text-[#6F6C90]"
                            variant="h4"
                            bold
                            center
                        >
                            We found following Workplace
                        </Typography>
                        <Typography
                            color="text-[#6F6C90]"
                            variant="title"
                            center
                            normal
                        >
                            Result Found From Given Name{' '}
                            <span className="font-semibold">
                                {industrySearchValue}
                            </span>
                        </Typography>

                        {/*  */}
                        <div className="flex flex-col gap-y-3 gap-x-10 mt-5">
                            <div className="w-full max-w-lg mx-auto">
                                <UpdatedIndustryCourse
                                    setselectedCourse={setselectedCourse}
                                />

                                {/*  */}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Typography center medium>
                                    Workplace
                                </Typography>
                                <div className="top-full left-0 w-full  rounded-md">
                                    {industries.isError && (
                                        <NoData text="There is some technical issue!" />
                                    )}
                                    {industries.isLoading ? (
                                        <LoadingAnimation />
                                    ) : industries?.data &&
                                      industries?.data?.length > 0 &&
                                      industries?.isSuccess ? (
                                        <div className="flex flex-col gap-y-3 p-3 h-auto overflow-auto custom-scrollbar">
                                            {industries?.data?.map(
                                                (industry: Industry) => (
                                                    <UpdatedExistingIndustryCard
                                                        industry={industry}
                                                        selectedCourse={
                                                            selectedCourse
                                                        }
                                                        setActive={setActive}
                                                        student={student}
                                                    />
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        industries.isSuccess && (
                                            <NoData text="No Industries were found" />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <div className="w-40 mx-auto"></div>
        </div>
    )
}
