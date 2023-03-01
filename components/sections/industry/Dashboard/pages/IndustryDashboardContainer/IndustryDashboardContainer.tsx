import { MediaQueries } from '@constants'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

// Components
import { Card, HelpQuestionSet, LottieAnimation, Typography } from '@components'

// Context
import { Animations } from '@animations'
import { Desktop, Mobile } from '@components/Responsive'
import { AdForRPL } from '@components/sections/industry'
// import { ImportantDocuments } from '@partials/industry'
import { ImportantDocuments } from '@partials/student/components'
import { ViewProfileCB } from '@partials/industry/contextBar'
import { AuthUtils } from '@utils'
import { useContextBar } from 'hooks'
import { useRouter } from 'next/router'
import { CallBackProps } from 'react-joyride'

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
            ; (sectors as any)[c.sector.name].push(c)
        } else {
            ; (sectors as any)[c.sector.name] = []
                ; (sectors as any)[c.sector.name].push(c)
        }
    })
    return sectors
}

export const IndustryDashboardContainer = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)
    const sectorsWithCourses = getSectors([])
    // Questions
    const WorkplaceQuestions = [
        {
            text: `Set required documents for placement to students.`,
            link: '',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You select required document</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#required-documents',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Required Documents</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/tasks')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/required-documents')
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `how can I my employees and students schedule?`,
            link: '',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>From tasks select add schedule</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#add-schedule',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can select add schedule</div>
                        </>
                    ),
                },
                {
                    target: '#add-employee-schedule',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can add employee schedule here</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/tasks')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/tasks/add-a-schedule')
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `how can I advertise my shifts availability to students?`,
            link: '',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You select available shifts from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#available-shifts',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Select available shifts</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/tasks')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/tasks/available-shifts')
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `where are students cv and other related documents?`,
            link: '',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You can find students cv and other related docs
                                from here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#apply-for-rpl',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>RPL form</div>
                        </>
                    ),
                },

                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/tasks')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/tasks/apply-for-rpl')
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
    ]
    //============================================================
    const AssessmentQuestions = [
        {
            text: `where are students new request?`,
            link: '',
            steps: [
                {
                    target: '#students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You see new students from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#current-students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Select current students tab</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/students')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push(
                            '/portals/industry/students/current-students?tab=pending'
                        )
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `booking an appointment with coordinator?`,
            link: '',
            steps: [
                {
                    target: '#students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can select appointments from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#appointments',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Select appointments tab</div>
                        </>
                    ),
                },
                {
                    target: '#create-appointment',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Create new appointment here</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/students')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/students/appointments')
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `how can I sent a request for volunteers?`,
            link: '',
            steps: [
                {
                    target: '#students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You Find Request a volunteer tab from here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#request-a-volunteer',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Select Request a volunteer</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/students')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push(
                            '/portals/industry/students/request-a-volunteer'
                        )
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `where can I find students agreements etc?`,
            link: '',
            steps: [
                {
                    target: '#students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You see student agreements etc from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#current-students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Select current students tab</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/students')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push(
                            '/portals/industry/students/current-students?tab=pending'
                        )
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
    ]
    //=================================================
    const NotificationQuestions = [
        {
            text: `I want to advertise paid jobs.`,
            link: '',
            steps: [
                {
                    target: '#jobs',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You can find advertise a job tab from here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#advertise-a-job',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Select advertise a job tab</div>
                        </>
                    ),
                },
                {
                    target: '#advertise-new-job',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>Advertise a new job here</div>
                        </>
                    ),
                },
                {
                    target: '#routeB',
                    content: (
                        <>
                            <div>This is Route B</div>
                            <div>
                                Yet another loader simulation and now we reached
                                the last step in our tour!
                            </div>
                        </>
                    ),
                },
            ],
            joyrideCallback: (joyride: any) => {
                return (data: CallBackProps) => {
                    const { action, index, lifecycle, type } = data
                    if (action === 'close') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/jobs')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/industry/jobs/advertised-jobs')
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: ``,
            link: '',
        },
    ]
    // Questions

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
                            title="Tasks"
                            questions={WorkplaceQuestions}
                            smallHeading
                        />
                    </div>

                    <div>
                        <HelpQuestionSet
                            title="Students"
                            questions={AssessmentQuestions}
                            smallHeading
                        />

                        <div className="mt-2">
                            <HelpQuestionSet
                                title="Jobs"
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
