import React, { useEffect, useState } from 'react'
import moment from 'moment'
// import { ApplyForWorkplaceIndustry } from './ApplyForWorkplaceIndustry'

// components
import { Typography, Card, LoadingAnimation, ActionButton } from '@components'

import {
    useSubAdminCancelStudentWorkplaceRequestMutation,
    useApplyForWorkplaceMutation,
} from '@queries'
import { ApplyForWorkplace, VerifyStudentDocs } from './components'
import { AppliedIndustry } from './AppliedIndustry'
import { IndustryNotResponded } from '@partials/common'
// import { IndustryNotResponded } from './IndustryNotResponded'

export const IndustrySelection = ({
    setActive,
    userId,
    workplace,
}: {
    setActive: Function
    userId: number
    workplace: any
}) => {
    const [industries, setIndustries] = useState<any | null>([])
    const [noRespondedIndustries, setNoRespondedIndustries] = useState<
        any | null
    >([])
    const [selectedCourses, setSelectedCourses] = useState<any[] | null>(null)
    const [industrySelection, setIndustrySelection] = useState(null)
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const [workplaceIndustries, setWorkplaceIndustries] = useState<any | null>(
        null
    )

    const [cancelRequest, cancelRequestResult] =
        useSubAdminCancelStudentWorkplaceRequestMutation()

    useEffect(() => {
        if (workplace) {
            const allIndustries = workplace?.data[0]?.industries
            setWorkplaceIndustries(workplace?.data[0])
            setNoRespondedIndustries(
                allIndustries?.filter(
                    (i: any) => i?.industryResponse === 'noResponse'
                )
            )
            setIndustries(
                allIndustries?.filter(
                    (industry: any) =>
                        !industry?.applied &&
                        industry?.industryResponse !== 'noResponse'
                )
            )
            setAppliedIndustry(allIndustries?.find((i: any) => i.applied))
            // setSelectedCourses(
            //     allIndustries
            //         ?.find((i: any) => i.industry.id === industrySelection)
            //         ?.industry.courses.map((c: any) => c.id)
            // )
            setSelectedCourses(workplace?.data[0]?.courses[0]?.id)
        }
    }, [
        workplace,
        industrySelection,
        // applyForWorkplaceResult.isSuccess,
    ])

    useEffect(() => {
        if (cancelRequestResult.isSuccess) {
            setActive(1)
        }
    }, [cancelRequestResult])

    const onCancelWorkplace = async () => {
        await cancelRequest(workplace?.data[0]?.id)
    }

    const workplaceCancelRequest = (simple: boolean = false) => {
        return (
            <div className="mt-3">
                <ActionButton
                    variant={'error'}
                    onClick={onCancelWorkplace}
                    loading={cancelRequestResult.isLoading}
                    disabled={cancelRequestResult.isLoading}
                    simple={simple}
                >
                    Cancel Request
                </ActionButton>
            </div>
        )
    }

    return !industrySelection ? (
        <div className="flex flex-col gap-y-3">
            {appliedIndustry && (
                <AppliedIndustry
                    workplaceCancelRequest={workplaceCancelRequest}
                    appliedIndustry={appliedIndustry}
                    setIndustrySelection={setIndustrySelection}
                    status={workplaceIndustries?.currentStatus}
                    workplaceRequest={workplaceIndustries}
                />
            )}

            {/*  */}

            {workplace?.isFetching ? (
                <LoadingAnimation />
            ) : industries && industries.length > 0 ? (
                <Card>
                    <Typography variant={'label'}>Select Industry</Typography>
                    <div className="my-4 flex flex-col gap-y-2">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            These are most suitable industries we have according
                            to your given criteria.
                        </Typography>
                        {industries?.map((industry: any, i: number) => {
                            return (
                                <ApplyForWorkplace
                                    key={industry.id}
                                    industry={industry}
                                    industries={industries}
                                    appliedIndustry={appliedIndustry}
                                    index={i}
                                />
                            )
                        })}
                    </div>

                    {!appliedIndustry && workplaceCancelRequest()}
                </Card>
            ) : (
                !appliedIndustry && (
                    <Card>
                        <div className="px-5 py-12 border border-dashed rounded-lg">
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

                        {workplaceCancelRequest()}
                    </Card>
                )
            )}

            {noRespondedIndustries && noRespondedIndustries?.length > 0 ? (
                <IndustryNotResponded industries={noRespondedIndustries} />
            ) : null}
        </div>
    ) : (
        <VerifyStudentDocs
            setActive={setActive}
            setIndustrySelection={setIndustrySelection}
            id={industrySelection}
            selectedCourses={selectedCourses}
            workplaceId={workplaceIndustries?.id}
            userId={userId}
        />
    )
}
