import { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// layout
import { StudentLayout } from '@layouts'
import { Course, NextPageWithLayout, SubAdmin } from '@types'
// components
import {
    Badge,
    Card,
    DocumentCard,
    HelpQuestionSet,
    InitialAvatar,
    LottieAnimation,
    UserProfile,
    InitialAvatarContainer,
    ContextBarLoading,
    NoData,
} from '@components'
import { Animations } from '@animations'
// icons
import {
    FaBook,
    FaBriefcase,
    FaMapMarker,
    FaMapMarkerAlt,
    FaSchool,
} from 'react-icons/fa'
import { MdPermContactCalendar, MdPhone, MdVerified } from 'react-icons/md'
import { IoBriefcase } from 'react-icons/io5'
// hooks
import { useContextBar } from '@hooks'
import { AuthUtils } from '@utils'
import { ImportantDocuments } from '@partials/student/components'
import { ViewProfileCB } from '@partials/student/contextBar'
// import { InitialAvatarContainer } from '@components/InitialAvatar/InitialAvatarContainer'
import { useGetStudentProfileDetailQuery } from '@queries'

import { CallBackProps } from 'react-joyride'
import { useRouter } from 'next/router'

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

const StudentDashboard: NextPageWithLayout = () => {
    const { data, isSuccess, isLoading } = useGetStudentProfileDetailQuery()
    const sectorsWithCourses = getSectors(data?.courses)

    const [name, setName] = useState('')
    const credentials = AuthUtils.getUserCredentials()

    const contextBar = useContextBar()
    const router = useRouter()
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
    useEffect(() => {
        contextBar.setContent(<ViewProfileCB />)
        contextBar.show(false)
    }, [])

    useEffect(() => {
        if (name === '') {
            if (credentials) {
                setName(credentials?.name || 'Student')
            } else {
                setName('Student')
            }
        }
    }, [])

    return (
        <div className="flex flex-col gap-y-6 pb-8">
            {/* Question Section */}
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

            {/* Sector Card */}
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

                <div className="flex items-center gap-x-6 mt-4">
                    {isLoading ? (
                        <ContextBarLoading />
                    ) : data?.courses.length ? (
                        Object.keys(sectorsWithCourses).map((sector, i) => {
                            return (
                                <div className="" key={i}>
                                    <div>
                                        <p className="text-xs font-medium text-gray-400">
                                            Sector
                                        </p>
                                        <p className="text-sm font-semibold">
                                            {sector}
                                        </p>
                                    </div>

                                    {(sectorsWithCourses as any)[sector].map(
                                        (c: Course) => (
                                            <div
                                                className="flex flex-col gap-y-4 ml-4"
                                                key={c.id}
                                            >
                                                <div className="border-l-4 border-green-600 px-2">
                                                    <div>
                                                        <p className="text-xs font-medium text-gray-400">
                                                            {c.code}
                                                        </p>
                                                        <p className="text-sm">
                                                            {c.title}
                                                        </p>
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
                        <NoData text={'No Courses Assigned'} />
                    )}
                </div>
            </Card>

            <div className="flex gap-x-6">
                {/* RTO Card */}
                <Card>
                    {/* Card Header */}
                    <div className="flex justify-between items-center">
                        {/* Icon Title */}
                        <div className="flex items-center gap-x-2">
                            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex justify-center items-center">
                                <FaSchool size={16} />
                            </div>
                            <p className="text-sm font-semibold">My RTO</p>
                        </div>

                        {/* Action */}
                        {/* <Link href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
                                See Details
                            </a>
                        </Link> */}
                    </div>

                    {/* Card Body */}
                    {data?.rto ? (
                        <div className="flex items-center gap-x-6 py-4">
                            <div className="flex-shrink-0">
                                {data?.rto?.user.avatar ? (
                                    <Image
                                        src={data?.rto?.user.avatar}
                                        width={100}
                                        height={100}
                                        className="rounded-full shadow-inner-image"
                                    />
                                ) : (
                                    <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                        <span className="text-4xl text-gray-300">
                                            <FaSchool />
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div>
                                    <p className="font-medium">
                                        {data?.rto.user.name}
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        {data?.rto.user.email}
                                    </p>
                                </div>
                                <div className="flex gap-x-6 mt-1">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-gray-400">
                                            <MdPermContactCalendar size={14} />
                                        </span>
                                        <span className="text-xs">
                                            Not Provided
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-gray-400">
                                            <MdPhone size={14} />
                                        </span>
                                        <span className="text-xs">
                                            {data?.rto.phone}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-[11px] text-gray-400">
                                        Coordinators
                                    </p>
                                    <div className="flex justify-between gap-x-2">
                                        {data?.rto.subadmin.length && (
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {
                                                        data?.rto.subadmin[0]
                                                            .user.name
                                                    }
                                                </p>
                                                <p className="text-xs font-medium text-slate-400">
                                                    {
                                                        data?.rto.subadmin[0]
                                                            .user.email
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {data?.rto.subadmin.slice(
                                            1,
                                            data?.rto.subadmin.length
                                        ).length > 0 && (
                                            <InitialAvatarContainer show={2}>
                                                {data?.rto.subadmin
                                                    .slice(
                                                        1,
                                                        data?.rto.subadmin
                                                            .length
                                                    )
                                                    .map(
                                                        (
                                                            subAdmin: SubAdmin,
                                                            idx: number
                                                        ) => (
                                                            <InitialAvatar
                                                                key={
                                                                    subAdmin.id
                                                                }
                                                                name={
                                                                    subAdmin
                                                                        .user
                                                                        .name
                                                                }
                                                                first={
                                                                    idx === 0
                                                                }
                                                            />
                                                        )
                                                    )}
                                            </InitialAvatarContainer>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <NoData text="No RTO Assigned" />
                        </div>
                    )}
                </Card>

                {/* Workplace Card */}
                <Card>
                    {/* Card Header */}
                    <div className="flex justify-between items-center">
                        {/* Icon Title */}
                        <div className="flex items-center gap-x-2">
                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex justify-center items-center">
                                <IoBriefcase size={16} />
                            </div>
                            <p className="text-sm font-semibold">
                                My Workplace
                            </p>
                        </div>

                        {/* Action */}
                        {/* <Link href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-green-100 text-green-600 px-4 py-2 rounded">
                                See Details
                            </a>
                        </Link> */}
                    </div>

                    {/* Card Body */}
                    {data?.workplace.length ? (
                        <div className="mt-4">
                            <div className="flex items-center gap-x-6 mb-4">
                                <div className="flex-shrink-0">
                                    {data?.rto?.user.avatar ? (
                                        <Image
                                            src={data?.rto?.user.avatar}
                                            width={100}
                                            height={100}
                                            className="rounded-full shadow-inner-image"
                                        />
                                    ) : (
                                        <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                            <span className="text-4xl text-gray-300">
                                                <FaBriefcase />
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div>
                                        <p className="font-medium">
                                            Tandoori Fusions Restaurants
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            info@tandoori.edu.au
                                        </p>
                                    </div>

                                    <div className="flex gap-x-3 mt-1 border-t pt-2">
                                        <div className="flex items-center gap-x-1">
                                            <span className="text-gray-400">
                                                <MdPermContactCalendar
                                                    size={14}
                                                />
                                            </span>
                                            <span className="text-xs">
                                                John Smith
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-x-1">
                                            <span className="text-gray-400">
                                                <MdPhone size={14} />
                                            </span>
                                            <span className="text-xs">
                                                039 6534 100
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-[11px] text-gray-400">
                                            Contact Person
                                        </p>
                                        <div className="flex justify-between gap-x-4">
                                            <div>
                                                <p className="font-medium text-sm">
                                                    Taylor Smith
                                                </p>
                                                <p className="text-xs font-medium text-slate-400">
                                                    smith@tandoori.com.au
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-x-3 mt-1 border-t pt-2">
                                <div className="flex items-center gap-x-1">
                                    <span className="text-gray-400">
                                        <FaMapMarkerAlt size={14} />
                                    </span>
                                    <span className="text-xs">
                                        221B Baker Street, Sydney, Australia
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <NoData text="No Workplace" />
                        </div>
                    )}
                </Card>
            </div>

            <ImportantDocuments />
        </div>
    )
}

StudentDashboard.getLayout = (page: ReactElement) => {
    return <StudentLayout>{page}</StudentLayout>
}

export default StudentDashboard
