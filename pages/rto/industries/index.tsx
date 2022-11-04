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
    RecentAppointmentCard,
    RtoContextBarData,
    SidebarCalendar,
} from '@components'
import { useContextBar } from '@hooks'

const PrimaryLinks = [
    {
        title: 'Workplaces',
        description: 'Some helping text',
        link: 'industries/workplaces',
        animation: Animations.Student.Workplace.MyWorkplace,
    },
    {
        title: 'MoUs',
        description: 'MoUs',
        link: 'industries/mous',
        animation: Animations.Student.Appointments.Esign,
    },
    {
        title: 'Consultations',
        description: 'Consultations',
        link: 'industries/consultations',
        animation: Animations.Industry.Consultation.Consultation,
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

const RtoIndustries: NextPageWithLayout = () => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])
    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-full flex flex-col justify-center space-y-2">
                    <PlacementProgressCard
                        requestStatus="Not Requested"
                        description="Place a request to start"
                    />
                    <RecentAppointmentCard
                        title="Work Place Visit"
                        caseOfficer="John Smith Khan"
                        time="09:00 am - 11:00 am"
                        date="Monday, 17 Oct,2022"
                        address="221B Baker Street, Melbourne, VIC 3000"
                    />
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

RtoIndustries.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Industries">{page}</RtoLayout>
}

export default RtoIndustries
