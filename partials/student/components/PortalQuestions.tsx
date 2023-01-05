import { Animations } from '@animations'
import {
  HelpQuestionSet, LottieAnimation
} from '@components'
import { AuthUtils } from '@utils'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { CallBackProps } from 'react-joyride'

export const PortalQuestions = () => {
    const [name, setName] = useState('')
    const router = useRouter()
    const credentials = AuthUtils.getUserCredentials()

    useEffect(() => {
        if (name === '') {
            if (credentials) {
                setName(credentials?.name || 'Student')
            } else {
                setName('Student')
            }
        }
    }, [])

    const WorkplaceQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: 'student/workplace',
            steps: [
                {
                    target: '#workplace',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You can select your workplace option from here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#my-workplace',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You Will find already workplace procedure</div>
                        </>
                    ),
                },
                {
                    target: '#i-have-workplace',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can go here</div>
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
                    if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace/my-workplace')
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
            text: `I don't have a workplace. What should I do?`,
            link: '/student/workplace/my-workplace/dont-have-workplace',
            steps: [
                {
                    target: '#workplace',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You can select your workplace option from here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#my-workplace',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can go here</div>
                        </>
                    ),
                },
                {
                    target: '#i-dont-have-workplace',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can go here</div>
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
                    if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace/my-workplace')
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
            text: `I want to book an appointment`,
            link: '/student/workplace/appointments',
            steps: [
                {
                    target: '#workplace',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can see appointment tab from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#appointments',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>Select appointment tab</div>
                        </>
                    ),
                },
                {
                    target: '#book-appointment',
                    content: (
                        <>
                            <div>Click Here</div>
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
                    if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace/appointments')
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
            text: `I want to look for a job`,
            link: '#',
            steps: [
                {
                    target: '#workplace',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can see jobs tab from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#jobs',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can find jobs here</div>
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
                    if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/workplace/jobs')
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

    const AssessmentQuestions = [
        {
            text: `Where can I find assessment evidence?`,
            link: '#',
            steps: [
                {
                    target: '#assessments',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You can see assessments evidence tab from here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#assessment-evidence',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can find assessment evidence here</div>
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
                    if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/assessments')
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
            text: `where can I find assessment tools`,
            link: '#',
            steps: [
                {
                    target: '#assessments',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You can see assessment tools tab from here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#assessment-tools',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can find assessment tools here</div>
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
                    if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/assessments')
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
            text: `Where can I find e-signature?`,
            link: '#',
            steps: [
                {
                    target: '#assessments',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can see E-Sign tab from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#e-sign',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>Here is E-Sign</div>
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
                    if (
                        type === 'step:after' &&
                        index === 0 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/student/assessments')
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

    const NotificationQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: '#',
        },
        {
            text: `I don't have a workplace. What should I do?`,
            link: '#',
        },
    ]

    return (
        <section className="bg-[#D6F4FF] w-full p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute right-0 -bottom-3">
                <LottieAnimation
                    animation={Animations.Common.Help}
                    width={200}
                    height={200}
                />
            </div>
            <div>
                <h3 className="text-2xl text-orange-500">
                    Welcome Back,{' '}
                    <span className="font-semibold text-black">{name}</span>
                </h3>
                <h4 className="font-semibold text-gray-400">
                    What you want to do here?
                </h4>
            </div>

            <div className="mt-2 flex gap-x-6">
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
    )
}
