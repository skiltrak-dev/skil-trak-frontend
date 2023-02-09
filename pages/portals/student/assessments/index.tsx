import { ReactElement, useEffect } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Animations } from '@animations'
import {
    AssessmentResultCard,
    DisplayPrimaryActions,
    HelpQuestionSet,
    PendingSignatureCard,
} from '@components'
import { useJoyRide } from '@hooks'

const PrimaryLinks = [
    {
        title: 'Assessment Evidence',
        description: 'Submit your evidences',
        link: 'assessments/assessment-evidence',
        animation: Animations.Student.Appointments.AssessmentEvidence,
        id: 'assessment-evidence',
    },
    {
        title: 'Assessment Tools',
        description: 'View assessment tools for courses',
        link: 'assessments/assessment-tools',
        animation: Animations.Student.Appointments.AssessmentTool,
        id: 'assessment-tools',
    },
    {
        title: 'Schedule',
        description: 'Your Schedule',
        link: 'assessments/schedule',
        animation: Animations.Student.Appointments.Esign,
        id: 'e-sign',
    },
    // {
    //     title: 'E-Sign',
    //     description: 'Sign your digital documents',
    //     link: 'assessments/e-sign',
    //     animation: Animations.Student.Appointments.Esign,
    //     id: 'e-sign',
    // },
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
    // WORKPLACE JOY RIDE - END
    const joyride = useJoyRide()
    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])
    // WORKPLACE JOY RIDE - END
    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-y-3 gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-full flex flex-col space-y-2">
                    <AssessmentResultCard
                        status="Not Assessed"
                        assessedBy="Not Assessed"
                    />
                    {/* <PendingSignatureCard /> */}
                </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-y-3 justify-between">
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
    return (
        <StudentLayout pageTitle={{ title: 'Assessments' }}>
            {page}
        </StudentLayout>
    )
}

export default StudentAssessments
