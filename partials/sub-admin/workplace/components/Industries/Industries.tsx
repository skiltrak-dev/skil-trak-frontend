import { Typography } from '@components/Typography'
import { useContextBar, useNotification } from '@hooks'
import { useEffect, useState } from 'react'
import { AddIndustryCB } from '../../contextBar'
import { Actions, IndustryCard, SmallIndustryCard } from './components'
import { WorkplaceCurrentStatus } from '@utils'

export const Industries = ({
    admin,
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
                ?.slice(0, appliedIndustry ? 3 : 4)
        )
    }, [industries, appliedIndustry])

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
                                        studentId={workplace?.student?.id}
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
                        applied
                        courseId={courseId}
                    />
                )}

                {/* Book Appointment Button */}
                {!admin &&
                    !appliedIndustry?.cancelled &&
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
                                    {suggestedIndustries
                                        ?.filter(
                                            (industry: any) =>
                                                industry?.industryResponse !==
                                                    WorkplaceCurrentStatus.Rejected &&
                                                industry?.industryResponse !==
                                                    WorkplaceCurrentStatus.NoResponse
                                        )
                                        ?.map((industry: any, i: number) => (
                                            <SmallIndustryCard
                                                key={industry?.id}
                                                industry={industry}
                                            />
                                        ))}
                                </div>
                            </>
                        ) : (
                            suggestedIndustries
                                ?.filter(
                                    (industry: any) =>
                                        industry?.industryResponse !==
                                            WorkplaceCurrentStatus.Rejected &&
                                        industry?.industryResponse !==
                                            WorkplaceCurrentStatus.NoResponse
                                )
                                ?.map((industry: any, i: number) => (
                                    <IndustryCard
                                        key={industry.id}
                                        industry={industry}
                                        appliedIndustry={appliedIndustry}
                                        workplace={workplace}
                                    />
                                ))
                        )
                    ) : (
                        'No Industry Found'
                    )
                ) : null}
            </div>
        </div>
    )
}
