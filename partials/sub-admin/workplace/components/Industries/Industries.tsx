import { Button } from '@components/buttons'
import { Typography } from '@components/Typography'
import { useContextBar, useNotification } from '@hooks'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { BsDot } from 'react-icons/bs'
import { AddIndustryCB } from '../../contextBar'
import { Actions, IndustryCard, SmallIndustryCard } from './components'

export const Industries = ({
    industries,
    workplaceId,
    appliedIndustry,
    workplace,
    courseId,
    folders,
    student,
}: any) => {
    // const ii = industries.map((i) => i.industryResponse)
    // const industryResponse = ii.includes('rejected') || ii.includes('noResponse')

    const [suggestedIndustries, setSuggestedIndustries] = useState<any | null>(
        null
    )

    useEffect(() => {
        setSuggestedIndustries(
            industries
                ?.filter((i: any) => !i.applied)
                ?.slice(0, appliedIndustry ? 4 : 3)
        )
    }, [industries])

    const { setContent, show } = useContextBar()
    const { notification } = useNotification()
    return (
        <div>
            <div className="flex justify-between">
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Suggested Industries
                </Typography>
                <Typography
                    variant={'small'}
                    color={'text-info'}
                    // color={appliedIndustry ? 'text-gray-300' : 'text-info'}
                >
                    <span
                        className="font-semibold cursor-pointer"
                        onClick={() => {
                            if (!appliedIndustry) {
                                setContent(
                                    <AddIndustryCB
                                        workplaceId={workplace?.id}
                                        courseId={courseId}
                                    />
                                )
                                show()
                            } else {
                                notification.warning({
                                    title: 'Already Applied',
                                    description:
                                        'Student have already applied to industry',
                                })
                            }
                        }}
                    >
                        + Add Industry
                    </span>
                </Typography>
            </div>

            {/* industries List */}
            <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col gap-y-1">
                {/* {appliedIndustry} */}
                {appliedIndustry && (
                    <IndustryCard
                        industry={appliedIndustry}
                        workplace={workplace}
                    />
                )}

                {/* Book Appointment Button */}
                {!appliedIndustry?.cancelled &&
                    appliedIndustry?.industryResponse !== 'rejected' && (
                        <Actions
                            appliedIndustry={appliedIndustry}
                            workplaceId={workplaceId}
                            workplace={workplace}
                            folders={folders}
                            student={student}
                        />
                    )}

                {appliedIndustry?.industryResponse !== 'approved' ? (
                    industries && industries.length > 0 ? (
                        appliedIndustry?.interview &&
                        !industries
                            .map((i: any) => i.industryResponse)
                            .includes('noResponse') ? (
                            <>
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    Other Suggested Industries
                                </Typography>
                                <div className="flex items-center flex-wrap gap-2">
                                    {suggestedIndustries?.map(
                                        (industry: any, i: number) => (
                                            <SmallIndustryCard
                                                key={industry?.id}
                                                industry={industry}
                                            />
                                        )
                                    )}
                                </div>
                            </>
                        ) : (
                            suggestedIndustries?.map(
                                (industry: any, i: number) => (
                                    <IndustryCard
                                        key={industry.id}
                                        industry={industry}
                                        appliedIndustry={appliedIndustry}
                                        workplace={workplace}
                                    />
                                )
                            )
                        )
                    ) : (
                        'No Industry Found'
                    )
                ) : null}
            </div>
        </div>
    )
}
