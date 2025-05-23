import { ReactElement, useEffect } from 'react'

import { Animations } from '@animations'
import { DisplayPrimaryActions } from '@components'
import { FigureCard } from '@components/sections/subAdmin'
import { useContextBar } from '@hooks'
import { RtoLayout } from '@layouts'
import { CommonCB } from '@partials/rto/contextBar'
import { NextPageWithLayout } from '@types'

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
        title: 'Black Listed Industries',
        description: 'Your Black Listed Industries',
        link: 'industries/black-listes-industries',
        animation: Animations.Industry.Consultation.Consultation,
    },
    {
        title: 'MoUs',
        description: 'Sign MoUs With Industries',
        link: 'industries/mous',
        animation: Animations.Student.Appointments.Esign,
    },
]

const RtoIndustries: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    const count = RtoApi.Rto.useDashboard()

    useEffect(() => {
        contextBar.setContent(<CommonCB />)
        contextBar.show(false)
        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [])

    return (
        <div className="flex flex-col">
            <div className="flex gap-x-6">
                {/* Primary Actions */}
                <div className="w-2/5 bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
                    <DisplayPrimaryActions actions={PrimaryLinks} />
                </div>

                {/* Special Cards */}
                <div className="w-3/5 flex flex-col space-y-2">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex gap-x-4">
                            <FigureCard
                                imageUrl="/images/icons/students.png"
                                count={count?.data?.currentStudent}
                                title={'Current Students'}
                                link={'/portals/rto/students?tab=active'}
                            />
                            <FigureCard
                                imageUrl="/images/icons/pending-student.png"
                                count={count?.data?.pendingStudent}
                                title={'Pending Students'}
                                link={'/portals/rto/students?tab=pending'}
                            />
                        </div>
                    </div>
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
