import { MediaQueries } from '@constants'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

// Components
import { Card, HelpQuestionSet, LottieAnimation, Typography } from '@components'

// Context
import { Animations } from '@animations'
import { Desktop, Mobile } from '@components/Responsive'
import { AdForRPL } from '@components/sections/industry'
import { ImportantDocuments } from '@partials/industry'
import { ViewProfileCB } from '@partials/industry/contextBar'
import { AuthUtils } from '@utils'
import { useContextBar } from 'hooks'
const WorkplaceQuestions = [
    {
        text: `I have a workplace. What next?`,
        link: '',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '',
    },
    {
        text: `I want to book an appointment`,
        link: '',
    },
    {
        text: `I want to look for a job`,
        link: '',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '',
    },
]

const AssessmentQuestions = [
    {
        text: `I have a workplace. What next?`,
        link: '',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '',
    },
    {
        text: `I want to book an appointment`,
        link: '',
    },
]

const NotificationQuestions = [
    {
        text: `I have a workplace. What next?`,
        link: '',
    },
    {
        text: `I don't have a workplace. What should I do?`,
        link: '',
    },
]

export const PrimaryActions = [
    {
        link: 'required-documents',
        title: 'Documentation Required',
        description: 'Some helping text',
        animation: Animations.Industry.Dashboard.RequiredDocuments,
    },
    {
        link: '/under-construction',
        title: 'Request a Volunteer',
        description: 'Some helping text',
        animation: Animations.Industry.Dashboard.RequestVolunteer,
    },
]

const getSectors = (courses: any) => {
    if (!courses) return {}
    const sectors = {}
    courses.forEach((c: any) => {
        if ((sectors as any)[c.sector.name]) {
            ;(sectors as any)[c.sector.name].push(c)
        } else {
            ;(sectors as any)[c.sector.name] = []
            ;(sectors as any)[c.sector.name].push(c)
        }
    })
    return sectors
}

export const IndustryDashboardContainer = () => {
    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)
    const sectorsWithCourses = getSectors([])
    const handleMediaQueryChange = (matches: any) => {
        if (matches) {
            if (contextBar.isVisible) contextBar.hide()
        } else {
            // contextBar.setContent(<ViewProfileCB />)
            if (!contextBar.isVisible) contextBar.show(false)
        }
    }
    const isMobile = useMediaQuery(
        MediaQueries.Mobile,
        undefined,
        handleMediaQueryChange
    )
    useEffect(() => {
        if (!isMobile) {
            contextBar.setContent(<ViewProfileCB />)
            contextBar.show(false)
        }
    }, [isMobile])

    useEffect(() => {
        if (!credentials) {
            if (AuthUtils.isAuthenticated()) {
                setCredentials(AuthUtils.getUserCredentials())
            }
        }
    }, [credentials])

    return (
        <div className="flex flex-col gap-y-6">
            <section className="bg-[#D6F4FF] w-full p-4 rounded-2xl relative overflow-hidden">
                <div className="absolute md:block hidden right-0 -bottom-3">
                    <LottieAnimation
                        animation={Animations.Common.Help}
                        width={200}
                        height={200}
                    />
                </div>
                <div>
                    <h3 className="text-2xl text-orange-500">
                        Welcome Back,{' '}
                        <span className="font-semibold text-black">
                            {credentials?.name}
                        </span>
                    </h3>
                    <h4 className="font-semibold text-gray-400">
                        What you want to do here?
                    </h4>
                </div>

                <div className="mt-2 flex flex-col gap-y-4 md:flex-row md:gap-x-6">
                    <div>
                        <HelpQuestionSet
                            title="Workplace"
                            questions={WorkplaceQuestions}
                            smallHeading
                        />
                    </div>

                    <div>
                        <HelpQuestionSet
                            title="Assessments"
                            questions={AssessmentQuestions}
                            smallHeading
                        />

                        <div className="mt-2">
                            <HelpQuestionSet
                                title="Notifications"
                                questions={NotificationQuestions}
                                smallHeading
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* <ImportantDocuments /> */}
            <Desktop>
                <ImportantDocuments />
            </Desktop>

            {/* Others */}
            <div className="w-full">
                <Typography variant={'title'}>Others</Typography>

                {/*  */}
                <Card>
                    <AdForRPL />
                </Card>
            </div>
            <Mobile>
                <ImportantDocuments />
            </Mobile>
        </div>
    )
}
