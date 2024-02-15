import { Typography } from '@components/Typography'
import { useContextBar, useNotification } from '@hooks'
import { WorkplaceCurrentStatus } from '@utils'
import { ReactElement, useEffect, useState } from 'react'
import { AddIndustryCB } from '../../contextBar'
import { ViewMoreIndustriesModal } from '../../modals'
import { Actions, IndustryCard, SmallIndustryCard } from './components'

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
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()
    const { setContent, show, setTitle, content, hide } = useContextBar()

    useEffect(() => {
        return () => {
            hide()
            setTitle('')
            setContent(null)
        }
    }, [])

    useEffect(() => {
        setSuggestedIndustries(industries?.filter((i: any) => !i.applied))
    }, [industries, appliedIndustry])

    const onCancelClicked = () => setModal(null)

    const onViewMoreIndustries = () => {
        setModal(
            <ViewMoreIndustriesModal
                onCancel={onCancelClicked}
                workplaceId={workplace?.id}
                title={'View More Industries'}
                subtitle={'View More Industries'}
                suggestedIndustriesIds={suggestedIndustries
                    ?.filter(
                        (industry: any) =>
                            industry?.industryResponse !==
                                WorkplaceCurrentStatus.Rejected &&
                            industry?.industryResponse !==
                                WorkplaceCurrentStatus.NoResponse
                    )
                    ?.map((ind: any) => ind?.industry?.id)}
            />
        )
    }

    return (
        <div>
            {modal}
            <div className="flex justify-between">
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Suggested Industries
                </Typography>
                <div className="flex items-center gap-x-3">
                    <Typography variant={'small'} color={'text-info'}>
                        <span
                            className="font-semibold cursor-pointer"
                            onClick={() => {
                                if (!appliedIndustry) {
                                    onViewMoreIndustries()
                                } else {
                                    notification.warning({
                                        title: 'Already Applied',
                                        description:
                                            'Student have already applied to industry',
                                    })
                                }
                            }}
                        >
                            View More Industry
                        </span>
                    </Typography>
                    <Typography variant={'small'} color={'text-info'}>
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
                                        // ?.filter(
                                        //     (industry: any) =>
                                        //         industry?.industryResponse !==
                                        //             WorkplaceCurrentStatus.Rejected &&
                                        //         industry?.industryResponse !==
                                        //             WorkplaceCurrentStatus.NoResponse
                                        // )
                                        ?.reverse()
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
                                // ?.filter(
                                //     (industry: any) =>
                                //         industry?.industryResponse !==
                                //             WorkplaceCurrentStatus.Rejected &&
                                //         industry?.industryResponse !==
                                //             WorkplaceCurrentStatus.NoResponse
                                // )
                                ?.reverse()
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
