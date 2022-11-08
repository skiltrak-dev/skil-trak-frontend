import React, { useEffect, useState } from 'react'
import moment from 'moment'

// components
import { Typography, Card } from 'components'
import { Button } from 'components'
import { VerifyStudentDocs } from '../VerifyStudentDocs'

import {
    useCancelWorkplaceRequestMutation,
    useApplyForWorkplaceMutation,
} from '@queries'

export const IndustrySelection = ({
    setActive,
    // selectedCourses,
    workplaceIndustries,
}: {
    setActive: Function
    // selectedCourses: number[]
    workplaceIndustries: any
}) => {
    const [industries, setIndustries] = useState<any[] | null>([])
    const [selectedCourses, setSelectedCourses] = useState<any[] | null>(null)
    const [industrySelection, setIndustrySelection] = useState(null)
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)

    const [cancelRequest, cancelRequestResult] =
        useCancelWorkplaceRequestMutation()
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()

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
        applyForWorkplaceResult.isSuccess,
    ])

    console.log('selectedCourses', selectedCourses)

    useEffect(() => {
        if (cancelRequestResult.isSuccess) {
            setActive(1)
        }
    }, [cancelRequestResult.isSuccess])

    const daysLeft = () => {
        let date = new Date(appliedIndustry?.appliedDate)
        const todayDate = new Date()
        const dayTimestamp = 24 * 60 * 60 * 1000
        const time = dayTimestamp * 28 // millisecond for 28 days
        return Math.ceil(
            (date.getTime() + time - todayDate.getTime()) / dayTimestamp
        )
    }

    return !industrySelection ? (
        <div>
            {appliedIndustry && (
                <>
                    <Typography variant={'label'}>
                        You Have Applied For This Industry
                    </Typography>
                    <Card>
                        <div className="py-2 px-4 rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-x-2">
                                <img
                                    src={`https://picsum.photos/100/10${appliedIndustry?.id}`}
                                    alt=""
                                />
                                <div>
                                    <Typography
                                        variant={'muted'}
                                        color={'gray'}
                                    >
                                        5km away
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {
                                            appliedIndustry?.industry
                                                ?.businessName
                                        }
                                    </Typography>
                                    <Typography
                                        variant={'muted'}
                                        color={'gray'}
                                    >
                                        {
                                            appliedIndustry?.industry
                                                ?.addressLine1
                                        }
                                        ,{' '}
                                        {
                                            appliedIndustry?.industry
                                                ?.addressLine2
                                        }
                                    </Typography>
                                </div>
                            </div>
                            <div>
                                <Typography variant={'xs'} right>
                                    <span className="font-bold">
                                        {daysLeft()}
                                    </span>{' '}
                                    days left
                                </Typography>
                                <Button
                                    variant={'primary'}
                                    text={'Upload Documents'}
                                    onClick={() => {
                                        setIndustrySelection(
                                            appliedIndustry?.industry?.id
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
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
                            if (!industry?.applied)
                                return (
                                    <div
                                        key={i}
                                        className="bg-secondary-dark py-2 px-4 rounded-lg flex justify-between items-center"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <img
                                                src={`https://picsum.photos/100/10${i}`}
                                                alt=""
                                            />
                                            <div>
                                                <Typography
                                                    variant={'muted'}
                                                    color={'gray'}
                                                >
                                                    5km away
                                                </Typography>
                                                <Typography variant={'label'}>
                                                    {
                                                        industry?.industry
                                                            ?.businessName
                                                    }
                                                </Typography>
                                                <Typography
                                                    variant={'muted'}
                                                    color={'gray'}
                                                >
                                                    {
                                                        industry?.industry
                                                            ?.addressLine1
                                                    }
                                                    ,{' '}
                                                    {
                                                        industry?.industry
                                                            ?.addressLine2
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                        <Button
                                            variant={'secondary'}
                                            text={'Apply Here'}
                                            disabled={industries
                                                ?.map((i: any) => i.applied)
                                                .includes(true)}
                                            onClick={async () => {
                                                await applyForWorkplace(
                                                    industry?.industry?.id
                                                )
                                            }}
                                            loading={
                                                applyForWorkplaceResult.isLoading &&
                                                applyForWorkplaceResult.originalArgs ===
                                                    industry?.industry?.id
                                            }
                                        />
                                    </div>
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
