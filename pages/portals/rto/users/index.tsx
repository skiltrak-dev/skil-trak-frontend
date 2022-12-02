import { ReactElement, useEffect } from 'react'

import { Animations } from '@animations'
import {
    DisplayPrimaryActions,
    HelpQuestionSet,
    QuestionCard,
} from '@components'
import { FigureCard } from '@components/sections'
import { useContextBar } from '@hooks'
import { RtoLayout } from '@layouts'
import { CommonCB } from '@partials/rto/contextBar'
import { NextPageWithLayout } from '@types'

const PrimaryLinks = [
    {
        title: 'Students',
        description: 'View & Manage Your Students',
        link: 'users/students?tab=approved',
        animation: Animations.Student.Workplace.Student,
    },
    {
        title: 'Contact Person',
        description: 'View & Manage Your Contact Persons',
        link: 'users/contact-person',
        animation: Animations.Student.Appointments.AssessmentTool,
    },
    {
        title: 'Coordinators',
        description: 'View & Manage Your Coordinators',
        link: 'users/coordinators',
        animation: Animations.Student.Workplace.Jobs,
    },
]

const StudentQuestions = [
    {
        text: `Where can I add a Student?`,
        link: '#',
    },
    {
        text: `Where can I view my Students?`,
        link: '#',
    },
]

const ContactPersonQuestions = [
    {
        text: `Where can I add a Contact Person?`,
        link: '#',
    },
    {
        text: `Where can I view my Contact Persons?`,
        link: '#',
    },
]

const OtherQuestions = [
    {
        text: `Where can I view my Coordinators?`,
        link: '#',
    },
    {
        text: `Where can I add my own Coordinator?`,
        link: '#',
    },
    {
        text: `How can I unassign a coordinator?`,
        link: '#',
    },
]

const RtoUsers: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0 w-2/5">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-3/5 flex flex-col justify-between space-y-2">
                    {/* Figure Cards */}
                    <div className="flex flex-col gap-y-4">
                        <div className="flex gap-x-4">
                            <FigureCard
                                imageUrl="/images/icons/students.png"
                                count={0}
                                title={'Current Students'}
                            />
                            <FigureCard
                                imageUrl="/images/icons/pending-student.png"
                                count={0}
                                title={'Pending Students'}
                            />
                        </div>
                    </div>


                    <QuestionCard>
                        <>
                            <div className="flex flex-col gap-y-2">
                                <HelpQuestionSet
                                    title={'Students'}
                                    questions={StudentQuestions}
                                />

                                <HelpQuestionSet
                                    title={'Contact Persons'}
                                    questions={ContactPersonQuestions}
                                />
                            </div>

                            <HelpQuestionSet
                                title={'Coordinators'}
                                questions={OtherQuestions}
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

RtoUsers.getLayout = (page: ReactElement) => {
    return <RtoLayout pageTitle={{ title: 'Users' }}>{page}</RtoLayout>
}

export default RtoUsers
