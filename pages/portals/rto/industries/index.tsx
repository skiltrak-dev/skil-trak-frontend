import { ReactElement, useEffect } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Animations } from '@animations'
import {
    AssessmentResultCard,
    Button,
    DisplayPrimaryActions,
    HelpQuestionSet,
    PendingSignatureCard,
    PlacementProgressCard,
    QuestionCard,
    RecentAppointmentCard,
    RtoContextBarData,
    SidebarCalendar,
} from '@components'
import { useContextBar } from '@hooks'
import { CommonCB } from '@partials/rto/contextBar'
import { FigureCard } from '@components/sections/subAdmin'

// queries
import { RtoApi } from '@queries'

const PrimaryLinks = [
    {
        title: 'Workplaces',
        description: 'View Workplaces Of Your Students',
        link: 'industries/workplaces',
        animation: Animations.Student.Workplace.MyWorkplace,
    },
    {
        title: 'MoUs',
        description: 'Sign MoUs With Industries',
        link: 'industries/mous',
        animation: Animations.Student.Appointments.Esign,
    },
    // {
    //     title: 'Consultations',
    //     description: 'Your Consultations With Industries',
    //     link: 'industries/consultations',
    //     animation: Animations.Industry.Consultation.Consultation,
    // },
]

const WorkplaceQuestions = [
    {
        text: `Where can I view Student's workplaces?`,
        link: '#',
    },
]

const MoUQuestions = [
    {
        text: `Where can I view MoUs`,
        link: '#',
    },
]

const RtoIndustries: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    const count = RtoApi.Rto.useDashboard()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="w-2/5 bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-3/5 flex flex-col justify-center space-y-2">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex gap-x-4">
                            <FigureCard
                                imageUrl="/images/icons/students.png"
                                count={count?.data?.currentStudent}
                                title={'Current Students'}
                            />
                            <FigureCard
                                imageUrl="/images/icons/pending-student.png"
                                count={count?.data?.pendingStudent}
                                title={'Pending Students'}
                            />
                        </div>
                    </div>

                    <QuestionCard>
                        <>
                            <div className="flex flex-col gap-y-2">
                                <HelpQuestionSet
                                    title={'Workplaces'}
                                    questions={WorkplaceQuestions}
                                />

                                {/* <HelpQuestionSet
                                    title={'Memorandum Of Understanding'}
                                    questions={Mou}
                                /> */}
                            </div>

                            <HelpQuestionSet
                                title={'Memorandum Of Understanding'}
                                questions={MoUQuestions}
                            />
                        </>
                    </QuestionCard>
                </div>
            </div>

            {/* <div className="mt-6 flex justify-between">

                <HelpQuestionSet
                    title={'What you want to do here?'}
                    questions={RelatedQuestions}
                />

                <HelpQuestionSet
                    title={'What else you want to do?'}
                    questions={OtherQuestions}
                />
            </div> */}
        </div>
    )
}

RtoIndustries.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Industries',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoIndustries
