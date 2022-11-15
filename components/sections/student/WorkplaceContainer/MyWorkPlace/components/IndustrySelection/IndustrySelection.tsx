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
    const [industries, setIndustries] = useState<any[] | null>([])
    const [selectedCourses, setSelectedCourses] = useState<any[] | null>(null)
    const [industrySelection, setIndustrySelection] = useState(null)
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)

    const [cancelRequest, cancelRequestResult] =
        useCancelWorkplaceRequestMutation()
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()
    console.log('Industry Responsed', appliedIndustry)

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

    return !industrySelection ? (
        <div>
            {appliedIndustry && (
                <>
                    <AppliedIndustry
                        setIndustrySelection={setIndustrySelection}
                        appliedIndustry={appliedIndustry}
                    />
                </>
            )}

            {/*  */}

            <Typography variant={'label'}>Select Industry</Typography>
            <Card>
                <div className="my-4 flex flex-col gap-y-2">
                    <Typography variant={'muted'} color={'secondaryText'}>
                        These are most suitable industries we have according to your given
                        criteria.
                    </Typography>
                    {industries && industries.length > 0 ? (
                        industries?.map((industry: any, i: number) => {
                            if (!industry?.applied && industry?.industryResponse !== 'noResponse')
                                return (
                                    <div
                                        key={i}
                                        className="bg-secondary-dark py-2 px-4 rounded-lg flex justify-between items-center"
                                    >
                                        <div className="flex items-center gap-x-2">
                                            <img src={`https://picsum.photos/100/10${i}`} alt="" />
                                            <div>
                                                <Typography variant={'muted'} color={'gray'}>
                                                    5km away
                                                </Typography>
                                                <Typography variant={'label'}>
                                                    {industry?.industry?.businessName}
                                                </Typography>
                                                <Typography variant={'muted'} color={'gray'}>
                                                    {industry?.industry?.addressLine1},{' '}
                                                    {industry?.industry?.addressLine2}
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
                                                    industry?.id
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
                            <Typography variant={'body'} color={'text-gray-400'} center>
                                Unfortunately! No industry is available with your provided
                                criteria, but one of{' '}
                                <span className="font-bold">
                                    our coordinator will soon get in touch with you
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
            {industries?.map((industry: any, i: number) => (
                industry?.industryResponse === 'noResponse' && (
                    <div>
                        <div className="my-2">
                            <Typography variant={'label'} color={'text-black'}>
                                You Applied For This Industry
                            </Typography>
                        </div>
                        <IndustryNotResponded />
                    </div>
                )
            ))
            }
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
