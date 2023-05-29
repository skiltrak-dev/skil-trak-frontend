import { ReactElement, useEffect, useState } from 'react'

import { Animations } from '@animations'
import {
    Card,
    ContextBarLoading,
    HelpQuestionSet,
    LottieAnimation,
    NoData,
} from '@components'
import { FigureCard } from '@components/sections/subAdmin'
import { useContextBar } from '@hooks'
import { RtoLayout } from '@layouts'
import { ViewProfileCB } from '@partials/rto/contextBar'
import { ImportantDocuments } from '@partials/student/components'
import { RtoApi } from '@queries'
import { Course, NextPageWithLayout } from '@types'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'
import { FaSchool } from 'react-icons/fa'
import { CallBackProps } from 'react-joyride'

const RTODashboard: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)
    const { data: rto, isLoading } = RtoApi.Rto.useProfile()
    const count = RtoApi.Rto.useDashboard()
    const router = useRouter()
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
    const sectorsWithCourses = getSectors(rto?.courses)

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
                        router.push('/portals/rto/students?tab=active')
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
                            <div>Add students</div>
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
                        router.push('/portals/rto/students?tab=active')
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
                            <div>Add Coordinator</div>
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
                        router.push('/portals/rto/coordinators')
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
                            <div>Click on contact person tab to add admin</div>
                        </>
                    ),
                },
                {
                    target: '#add-admin',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>You can add admin here</div>
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
                        router.push('/portals/rto/admins')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/rto/admins/contact-person')
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

    const TaskQuestions = [
        // {
        //     text: `Where can I find students agreement and other documents?`,
        //     link: '#',
        // },
        {
            text: `I want to book an appointment?`,
            link: '#',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>In tasks you will find appointments tab</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#appointments',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>
                                Click on appointments tab to book an appointment
                            </div>
                        </>
                    ),
                },
                {
                    target: '#create-appointment',
                    content: (
                        <>
                            <div>Click here</div>
                            <div>You can create an appointment here</div>
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
                        router.push('/portals/rto/tasks')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/rto/tasks/appointments')
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
                            <div>You can add assessments here</div>
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
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push('/portals/rto/tasks/assessment-tools')
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

    const ProfileQuestions = [
        {
            text: `How can I edit my profile?`,
            link: '#',
            steps: [
                {
                    target: '#edit-profile',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                From Dropdown Click On Profile to Edit Your
                                Profile
                            </div>
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
                        router.push('/portals/rto/my-profile')
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
    // Pa$$w0rd!
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
            {/* <CheckStatus /> */}
            {/* Figure Cards */}
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
                    <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={count?.data?.workplaceRequest}
                        title={'Workplace Requests'}
                        link={'/portals/rto/industries/workplaces'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/job.png"
                        count={count?.data?.pendingResult}
                        title={'Pending Result'}
                        link={'/portals/rto/students/2426?tab=submissions'}
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
                <ImportantDocuments
                    coureseRequirementsLink={'/portals/rto/course-requirements'}
                />
            </div>
            <Card>
                {/* Card Header */}
                <div className="flex justify-between items-center">
                    {/* Icon Title */}
                    <div className="flex items-center gap-x-2">
                        <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex justify-center items-center">
                            <FaSchool size={16} />
                        </div>
                        <p className="text-sm font-semibold">
                            My Sector &amp; Courses
                        </p>
                    </div>

                    {/* Action */}
                    {/* <Link href="#">
                        <a className="inline-block uppercase text-xs font-medium bg-indigo-100 text-indigo-600 px-4 py-2 rounded">
                            See Details
                        </a>
                    </Link> */}
                </div>

                <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                    {isLoading ? (
                        <ContextBarLoading />
                    ) : rto?.courses.length ? (
                        Object.keys(sectorsWithCourses).map((sector: any) => {
                            return (
                                <div
                                    className="border rounded p-2"
                                    key={sector?.id}
                                >
                                    <div>
                                        {/* <p className="text-xs font-medium text-gray-400">
                                            Sector
                                        </p> */}
                                        <p className="text-sm font-semibold">
                                            {sector}
                                        </p>
                                    </div>

                                    {(sectorsWithCourses as any)[sector].map(
                                        (c: Course, i: number) => (
                                            <div
                                                className="flex flex-col gap-y-4 ml-4 mb-2"
                                                key={i}
                                            >
                                                <div className="border-l-4 border-green-600 px-2">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-400">
                                                            {c.code}
                                                        </p>
                                                        <div>
                                                            <p className="text-sm">
                                                                {c.title}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* <Badge text="Active" /> */}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="w-full">
                            <NoData text={'No Courses Assigned'} />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

RTODashboard.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default RTODashboard
