import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { ApplyForWorkplaceIndustry } from './ApplyForWorkplaceIndustry'

// components
import { Typography, Card } from 'components'
import { Button } from 'components'
import { VerifyStudentDocs } from '../VerifyStudentDocs'

import {
    useCancelWorkplaceRequestMutation,
    useApplyForWorkplaceMutation,
} from '@queries'
import { AppliedIndustry } from './AppliedIndustry'
import { IndustryNotResponded } from './IndustryNotResponded'

export const IndustrySelection = ({
    setActive,
    // selectedCourses,
    workplaceIndustries,
}: {
    setActive: Function
    // selectedCourses: number[]
    workplaceIndustries: any
}) => {
    console.log('workplaceIndustries', workplaceIndustries)
    const [industries, setIndustries] = useState<any[] | null>([])
    const [selectedCourses, setSelectedCourses] = useState<any[] | null>(null)
    const [industrySelection, setIndustrySelection] = useState(null)
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)

    const [cancelRequest, cancelRequestResult] =
        useCancelWorkplaceRequestMutation()

    useEffect(() => {
        if (workplaceIndustries) {
            const allIndustries = workplaceIndustries[0]?.industries
            setIndustries(allIndustries)
            setAppliedIndustry(allIndustries?.find((i: any) => i.applied))
            setSelectedCourses(
                allIndustries
                    ?.find((i: any) => i.industry.id === industrySelection)
                    ?.industry.courses.map((c: any) => c.id)
            )
        }
    }, [
        workplaceIndustries,
        industrySelection,
        // applyForWorkplaceResult.isSuccess,
    ])

    // console.log('selectedCourses', selectedCourses)

    useEffect(() => {
        if (cancelRequestResult.isSuccess) {
            setActive(1)
        }
    }, [cancelRequestResult.isSuccess])

    console.log('industries', industries)

    return !industrySelection ? (
        <div>
            {appliedIndustry && (
                <>
                    <AppliedIndustry
                        setIndustrySelection={setIndustrySelection}
                        appliedIndustry={appliedIndustry}
                        status={workplaceIndustries[0].currentStatus}
                    />
                </>
            )}

            {/*  */}

            <Typography variant={'label'}>Select Industry</Typography>
            <Card>
                <div className="my-4 flex flex-col gap-y-2">
                    <Typography variant={'muted'} color={'secondaryText'}>
                        These are most suitable industries we have according to
                        your given criteria.
                    </Typography>
                    {industries && industries.length > 0 ? (
                        industries?.map((industry: any, i: number) => {
                            if (
                                !industry?.applied &&
                                industry?.industryResponse !== 'noResponse'
                            )
                                return (
                                    <ApplyForWorkplaceIndustry
                                        key={industry.id}
                                        industry={industry}
                                        industries={industries}
                                    />
                                )
                        })
                    ) : (
                        <div className="px-5 py-12 border border-dashed">
                            <Typography
                                variant={'body'}
                                color={'text-gray-400'}
                                center
                            >
                                Unfortunately! No industry is available with
                                your provided criteria, but one of{' '}
                                <span className="font-bold">
                                    our coordinator will soon get in touch with
                                    you
                                </span>{' '}
                                to help you out.
                            </Typography>
                        </div>
                    )}
                </div>

                <Button
                    variant={'secondary'}
                    text={'Cancel Request'}
                    onClick={async () => {
                        await cancelRequest(null)
                    }}
                    loading={cancelRequestResult.isLoading}
                    disabled={cancelRequestResult.isLoading}
                />
            </Card>
            {industries?.map(
                (industry: any, i: number) =>
                    industry?.industryResponse === 'noResponse' && (
                        <div key={industry.id}>
                            <div className="my-2">
                                <Typography
                                    variant={'label'}
                                    color={'text-black'}
                                >
                                    You Applied For This Industry
                                </Typography>
                            </div>
                            <IndustryNotResponded />
                        </div>
                    )
            )}
        </div>
    ) : (
        <VerifyStudentDocs
            setActive={setActive}
            setIndustrySelection={setIndustrySelection}
            id={industrySelection}
            selectedCourses={selectedCourses}
        />
    )
}
