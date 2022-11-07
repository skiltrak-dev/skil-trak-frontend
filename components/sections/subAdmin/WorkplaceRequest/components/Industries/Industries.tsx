import { Button } from '@components/buttons'
import { Typography } from '@components/Typography'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { IndustryCard, SmallIndustryCard } from './components'

// query
import {
    useForwardWorkplaceToIndustryMutation,
    useIndustryResponseMutation,
} from '@queries'

export const Industries = ({
    industries,
    workplaceId,
    appliedIndustry,
}: any) => {
    const [forwardToIndustry, forwardToIndustryResult] =
        useForwardWorkplaceToIndustryMutation()
    const [industryResponse, industryResponseResult] =
        useIndustryResponseMutation()
    return (
        <div>
            <div className="flex justify-between">
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Suggested Industries
                </Typography>
                <Typography variant={'small'} color={'text-info'}>
                    <span className="font-semibold">+ Add Industry</span>
                </Typography>
            </div>

            {/* industries List */}
            <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col gap-y-1">
                {/* {appliedIndustry} */}
                {appliedIndustry && <IndustryCard industry={appliedIndustry} />}

                {/* Book Appointment Button */}
                {appliedIndustry?.awaitingWorkplaceResponse ? (
                    <div className="mt-1.5 mb-2.5">
                        <Button
                            text={'NOT RESPONDED'}
                            variant={'dark'}
                            onClick={() => {
                                industryResponse({
                                    industryId: appliedIndustry?.id,
                                    status: 'noResponse',
                                })
                            }}
                            loading={forwardToIndustryResult?.isLoading}
                            disabled={forwardToIndustryResult?.isLoading}
                        />
                    </div>
                ) : (
                    appliedIndustry?.interview && (
                        <div className="mt-1.5 mb-2.5">
                            <Button
                                text={'FORWARD TO INDUSTRY'}
                                variant={'dark'}
                                onClick={() => {
                                    forwardToIndustry({
                                        industryId:
                                            appliedIndustry?.industry?.id,
                                        id: workplaceId,
                                    })
                                }}
                                loading={forwardToIndustryResult?.isLoading}
                                disabled={forwardToIndustryResult?.isLoading}
                            />
                        </div>
                    )
                )}

                {industries && industries.length > 0 ? (
                    appliedIndustry?.interview ? (
                        <>
                            <Typography variant={'xs'} color={'text-gray-400'}>
                                Other Suggested Industries
                            </Typography>
                            <div className="flex items-center flex-wrap gap-2">
                                {industries.map((industry: any, i: number) => (
                                    <SmallIndustryCard
                                        key={industry?.id}
                                        industry={industry}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        industries.map((industry: any, i: number) => (
                            <IndustryCard
                                key={industry.id}
                                industry={industry}
                            />
                        ))
                    )
                ) : (
                    'No Industry Found'
                )}
            </div>
        </div>
    )
}
