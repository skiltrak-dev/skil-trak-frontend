import React, { useEffect, useState } from 'react'

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
    selectedCourses,
    workplaceIndustries,
}: {
    setActive: Function
    selectedCourses: number[]
    workplaceIndustries: any
}) => {
    const [industrySelection, setIndustrySelection] = useState(null)

    const [cancelRequest, cancelRequestResult] =
        useCancelWorkplaceRequestMutation()
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()

    useEffect(() => {
        if (cancelRequestResult.isSuccess) {
            setActive(1)
        }
    }, [cancelRequestResult.isSuccess])

    return (
        <div>
            <Typography variant={'label'}>Select Industry</Typography>

            {/*  */}

            <Card>
                <div className="my-4 flex flex-col gap-y-2">
                    <Typography variant={'muted'} color={'secondaryText'}>
                        These are most suitable industries we have according to
                        your given criteria.
                    </Typography>
                    {workplaceIndustries && workplaceIndustries.length > 0 ? (
                        workplaceIndustries.map((industry: any, i: number) => (
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
                                            {industry?.businessName}
                                        </Typography>
                                        <Typography
                                            variant={'muted'}
                                            color={'gray'}
                                        >
                                            {industry?.addressLine1},{' '}
                                            {industry?.addressLine2}
                                        </Typography>
                                    </div>
                                </div>
                                <Button
                                    variant={'secondary'}
                                    text={'Apply Here'}
                                    onClick={async () => {
                                        await applyForWorkplace(industry?.id)
                                        setIndustrySelection(industry?.id)
                                    }}
                                />
                            </div>
                        ))
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
                                </span>
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
            {/* <VerifyStudentDocs
                    setActive={setActive}
                    setIndustrySelection={setIndustrySelection}
                    id={industrySelection}
                    selectedCourses={selectedCourses}
                /> */}
        </div>
    )
}
