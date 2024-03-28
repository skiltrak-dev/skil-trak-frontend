import React, { ReactElement, useState } from 'react'
import { IndustryCard } from './components'
import { NoData, Typography } from '@components'
import { Course } from '@types'
import { WorkplaceCurrentStatus } from '@utils'
import { ViewMoreIndustriesModal } from '@partials/sub-admin/workplace/modals'
import { useContextBar, useNotification } from '@hooks'
import { AddIndustryCB } from '@partials/sub-admin/workplace/contextBar'
import { Actions } from './Actions'
import { StudentProvidedActions } from './StudentProvidedActions'
import { StudentProvidedABNActions } from './StudentProvidedABNActions'
import { AgreementView } from '../AgreementView'

export const IndustryDetail = ({
    workplace,
    appliedIndustry,
    course,
}: {
    workplace: any
    appliedIndustry: any
    course: Course
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const contextBar = useContextBar()
    const { notification } = useNotification()

    const suggestedIndustries = workplace?.industries?.filter(
        (i: any) => !i.applied
    )

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
        <>
            {modal}
            <div className="h-full">
                <div className="flex justify-between items-center">
                    <Typography variant="small" capitalize semibold>
                        Industry Detail
                    </Typography>
                    <div className="flex items-center gap-x-3">
                        {appliedIndustry?.AgreementSigned && (
                            <AgreementView workplace={workplace} />
                        )}
                        {!appliedIndustry ? (
                            <>
                                <Typography
                                    variant={'small'}
                                    color={'text-info'}
                                >
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
                                <Typography
                                    variant={'small'}
                                    color={'text-info'}
                                >
                                    <span
                                        className="font-semibold cursor-pointer"
                                        onClick={() => {
                                            if (!appliedIndustry) {
                                                contextBar.setContent(
                                                    <AddIndustryCB
                                                        studentId={
                                                            workplace?.student
                                                                ?.id
                                                        }
                                                        workplaceId={
                                                            workplace?.id
                                                        }
                                                        courseId={course?.id}
                                                    />
                                                )
                                                contextBar.show()
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
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="h-[200px] overflow-auto custom-scrollbar flex flex-col gap-y-2 border border-[#6B7280] rounded-md p-2.5 mt-2.5">
                    {!workplace?.industries?.length ? (
                        <NoData text="No Industries were found!" />
                    ) : (
                        ''
                    )}
                    {appliedIndustry && (
                        <>
                            <IndustryCard
                                industry={appliedIndustry}
                                workplace={workplace}
                                applied
                                courseId={course?.id}
                            />
                            {/*  */}
                            {workplace.studentProvidedWorkplace ? (
                                <StudentProvidedActions
                                    workplace={workplace}
                                    student={workplace?.student}
                                    appliedIndustry={appliedIndustry}
                                />
                            ) : workplace?.byExistingAbn ? (
                                <StudentProvidedABNActions
                                    workplace={workplace}
                                    student={workplace?.student}
                                    appliedIndustry={appliedIndustry}
                                />
                            ) : (
                                <Actions
                                    appliedIndustry={appliedIndustry}
                                    currentStatus={workplace?.currentStatus}
                                    student={workplace?.student}
                                    courses={workplace?.courses}
                                />
                            )}
                        </>
                    )}

                    {suggestedIndustries?.map(
                        (industry: any, index: number) => (
                            <IndustryCard
                                key={industry?.id}
                                industry={industry}
                                workplace={workplace}
                                courseId={course?.id}
                                appliedIndustry={appliedIndustry}
                            />
                        )
                    )}
                </div>
            </div>
        </>
    )
}
