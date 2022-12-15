import { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { NextPageWithLayout } from '@types'
import { RtoLayout } from '@layouts'
import {
    Alert,
    Badge,
    Card,
    DocumentCard,
    HelpQuestionSet,
    InitialAvatar,
    LottieAnimation,
    UserProfile,
} from '@components'
import { FaBook, FaMapMarker, FaMapMarkerAlt, FaSchool } from 'react-icons/fa'
import { Animations } from '@animations'
import { MdPermContactCalendar, MdPhone, MdVerified } from 'react-icons/md'
import { IoBriefcase } from 'react-icons/io5'
import { useContextBar } from '@hooks'
import { InitialAvatarContainer } from '@components/InitialAvatar/InitialAvatarContainer'
import { AuthUtils } from '@utils'
import { AuthApi, RtoApi } from '@queries'
import { CheckStatus } from '@partials/auth'
import { ViewProfileCB } from '@partials/rto/contextBar'
import { ImportantDocuments } from '@partials/rto/components'
import { FigureCard } from '@components/sections/subAdmin'
import { CallBackProps } from 'react-joyride'
import { useRouter } from 'next/router'



const RTODashboard: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)
    const { data: rto, isLoading } = RtoApi.Rto.useProfile()
    const router = useRouter()

    const UserQuestions = [
        {
            text: `Where can I find my students?`,
            link: '#',
            steps: [
                {
                    target: '#students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can view all students here</div>
                        </>
                    ),
                    disableBeacon: true,
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
                        router.push('/portals/rto/students?tab=approved')
                    }


                    else if (action === 'reset' || lifecycle === 'complete') {
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
            text: `How can I add students?`,
            link: '#',
            steps: [
                {
                    target: '#students',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can add students from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#add-students',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>
                                Add students
                            </div>
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
                        router.push('/portals/rto/students?tab=approved')
                    }


                    else if (action === 'reset' || lifecycle === 'complete') {
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
            text: `How can I add my coordinators and assessor?`,
            link: '#',
            steps: [
                {
                    target: '#coordinators',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can add coordinator from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#add-coordinator',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>
                                Add Coordinator
                            </div>
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
                        router.push('/portals/rto/coordinators')
                    }


                    else if (action === 'reset' || lifecycle === 'complete') {
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
            text: `How can I add an admin?`,
            link: '#',
            steps: [
                {
                    target: '#admins',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can add admin from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#contact-person',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>
                                Click on contact person tab to add admin
                            </div>
                        </>
                    ),
                },
                {
                    target: '#add-admin',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>
                                You can add admin here
                            </div>
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
                        router.push('/portals/rto/admins')
                    }
                    else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/rto/admins/contact-person')
                    }

                    else if (action === 'reset' || lifecycle === 'complete') {
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

    const TaskQuestions = [
        {
            text: `Where can I find students agreement and other documents?`,
            link: '#',
        },
        {
            text: `I want to book an appointment?`,
            link: '#',
        },
        {
            text: `How can I upload assessment tools?`,
            link: '#',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can view assessment tools from here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#assessment-tools',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>
                                Click on assessment tools tab to view assessment
                            </div>
                        </>
                    ),
                },
                {
                    target: '#add-assessments',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>
                                You can add assessments here
                            </div>
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
                        router.push('/portals/rto/tasks')
                    }
                    else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/rto/tasks/assessment-tools')
                    }

                    else if (action === 'reset' || lifecycle === 'complete') {
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

    const ProfileQuestions = [
        {
            text: `How can I edit my account?`,
            link: '#',
        },
    ]
    useEffect(() => {
        contextBar.setContent(<ViewProfileCB />)
        contextBar.show(false)
    }, [])

    useEffect(() => {
        if (!credentials) {
            if (AuthUtils.isAuthenticated()) {
                setCredentials(AuthUtils.getUserCredentials())
            }
        }
    }, [credentials])

    return (
        <div className="flex flex-col gap-y-6 pb-8">
            {/* Status Check */}
            <CheckStatus />
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
                    <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={0}
                        title={'Workplace Requests'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/job.png"
                        count={0}
                        title={'Pending Result'}
                    />
                </div>
            </div>

            {/* Question Section */}
            <section className="bg-[#D6F4FF] w-full p-4 rounded-2xl relative overflow-hidden">
                <div className="absolute right-0 -bottom-3">
                    {/* <Image
                        src={'/images/students/help.png'}
                        width={180}
                        height={145}
                    /> */}
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
                            {credentials?.name || 'User'}
                        </span>
                    </h3>
                    <h4 className="font-semibold text-gray-400">
                        What you want to do here?
                    </h4>
                </div>

                <div className="mt-2 flex gap-x-6">
                    <div>
                        <HelpQuestionSet
                            title="Users"
                            questions={UserQuestions}
                            smallHeading
                        />
                    </div>

                    <div>
                        <HelpQuestionSet
                            title="Task"
                            questions={TaskQuestions}
                            smallHeading
                        />

                        <div className="mt-2">
                            <HelpQuestionSet
                                title="Profile"
                                questions={ProfileQuestions}
                                smallHeading
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <ImportantDocuments />
            </div>
        </div>
    )
}

RTODashboard.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default RTODashboard
