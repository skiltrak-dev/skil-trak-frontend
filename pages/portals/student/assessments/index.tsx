import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Animations } from '@animations'
import {
    AssessmentResultCard,
    DisplayPrimaryActions,
    HelpQuestionSet,
    PendingSignatureCard,
} from '@components'

const PrimaryLinks = [
    {
        title: 'Assessment Evidence',
        description: 'Submit your evidences',
        link: '#',
        animation: Animations.Student.Appointments.AssessmentEvidence,
    },
    {
        title: 'Assessment Tools',
        description: 'View assessment tools for courses',
        link: '#',
        animation: Animations.Student.Appointments.AssessmentTool,
    },
    {
        title: 'E-Sign',
        description: 'Sign your digital documents',
        link: '#',
        animation: Animations.Student.Appointments.Esign,
    },
]

const RelatedQuestions = [
    {
        text: `I have a workplace. What next?`,
        link: '#',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '#',
    },
    {
        text: `I want to book an appointment`,
        link: '#',
    },
    {
        text: `I want to look for a job`,
        link: '#',
    },
]

const OtherQuestions = [
    {
        text: `I have a workplace. What next?`,
        link: '#',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '#',
    },
    {
        text: `I want to book an appointment`,
        link: '#',
    },
    {
        text: `I want to look for a job`,
        link: '#',
    },
]

const StudentAssessments: NextPageWithLayout = () => {
    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-full flex flex-col justify-center space-y-2">
                    <AssessmentResultCard
                        status="Not Assessed"
                        assessedBy="Not Assessed"
                    />
                    <PendingSignatureCard />
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                {/* Related Questions */}
                <HelpQuestionSet
                    title={'What you want to do here?'}
                    questions={RelatedQuestions}
                />

                {/* Other Questions */}
                <HelpQuestionSet
                    title={'What else you want to do?'}
                    questions={OtherQuestions}
                />
            </div>
        </div>
    )
}

StudentAssessments.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Assessments">{page}</StudentLayout>
}

export default StudentAssessments
