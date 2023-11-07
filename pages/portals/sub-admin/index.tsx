import { Course, NextPageWithLayout } from '@types'
import { ReactElement, useEffect, useState } from 'react'

// layouts
import { SubAdminLayout } from '@layouts'
// components
import {
    Card,
    ContextBarLoading,
    HelpQuestionSet,
    LottieAnimation,
    NoData,
} from '@components'
// icons
import { FaSchool } from 'react-icons/fa'
// animations
import { Animations } from '@animations'
// hooks
import { useContextBar, useJoyRide } from '@hooks'
import { ViewProfileCB } from '@partials/sub-admin/contextBar'

import { FigureCard } from '@components/sections/subAdmin/components/Cards/FigureCard'

import { AuthUtils } from '@utils'

import { SubAdminApi, useGetSubAdminIndustryStudentsQuery } from '@queries'
import { CallBackProps } from 'react-joyride'
import { useRouter } from 'next/router'
import { ImportantDocuments } from '@partials/common'

const NotificationQuestions = [
    {
        // text: `How to send an email to student from portal?`,
        text: '',
        link: '#',
    },
    {
        // text: `Where can I see student communication?`,
        text: '',
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

const SubAdminDashboard: NextPageWithLayout = () => {
    const studentList = useGetSubAdminIndustryStudentsQuery({
        industry: 198,
        skip: 0,
        limit: 50,
    })
    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)

    const { data, isSuccess, isLoading } = SubAdminApi.SubAdmin.useProfile()
    const statistics = SubAdminApi.Count.statistics()
    const sectorsWithCourses = getSectors(data?.courses)

    const router = useRouter()
    // const joyride = useJoyRide()
    const WorkplaceQuestions = [
        {
            text: `Where can I find my students?`,
            link: 'sub-admin/users/students?tab=my-students',
            steps: [
                {
                    target: '#student',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can see users of different type here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#students',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can view all students in here</div>
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
                        router.push('/portals/sub-admin/students?tab=all')
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
            text: `How to add student workplace?`,
            link: 'sub-admin/tasks',
            steps: [
                {
                    target: '#student',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                To See List of Student with their workplace
                                details
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#student-profile',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>
                                Select a single student, it will redirect you to
                                student profile from there you can add workplace
                                by clicking &quot;Add Workplace Button&quot; by
                                clicking &rdquo;Add Workplace Button&rdquo;
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
                        router.push('/portals/sub-admin/students?tab=all')
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 1,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `Looking for workplace for a student!`,
            link: 'sub-admin/tasks',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can view workplaces here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#workplace',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can view all workplaces here</div>
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
                        router.push('/portals/sub-admin/tasks')
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
            text: `Where can I see student placement status?`,
            link: 'sub-admin/tasks',
            steps: [
                {
                    target: '#student',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can view placement here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#student-profile',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>
                                Select a single student, it will redirect you to
                                student profile from there you can see
                                &rdquo;Placement Status&rdquo; of a student.
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
                        router.push('/portals/sub-admin/students?tab=all')
                    }
                    // else if (
                    //     type === 'step:after' &&
                    //     index === 1 /* or step.target === '#home' */
                    // ) {
                    //     joyride.setState((prev: any) => ({
                    //         ...prev,
                    //         run: false,
                    //     }))
                    // }
                    else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 1,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            text: `How to add note on student profile?`,
            link: 'sub-admin/students?tab=all',
            steps: [
                {
                    target: '#student',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can see users of different type here</div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#students',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can add note on student profile here</div>
                        </>
                    ),
                },
                {
                    target: '#student-profile',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>
                                You can select a single student in the following
                                list then in you student profile go to notes tab
                                you can add note there
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
                        router.push('/portals/sub-admin/students?tab=all')
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 0,
                            tourActive: false,
                        })
                    }
                    // else if (type === 'step:after' && index === 1) {
                    //     joyride.setState((prev: any) => ({
                    //         ...prev,
                    //         run: false,
                    //     }))
                    //     router.push('/portals/sub-admin/students?tab=all')
                    // }
                    // else if (type === 'step:after' && index === 2) {
                    //     joyride.setState((prev: any) => ({
                    //         ...prev,
                    //         run: false,
                    //     }))
                    //     router.push(
                    //         '/portals/sub-admin/users/students/34?tab=notes'
                    //     )
                    // }
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
    const AssessmentQuestions = [
        {
            text: `Where can I find industry checks for students?`,
            link: '#',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>
                                You can find industry checks for students here
                            </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#workplace',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>
                                You can find student placement from workplace
                            </div>
                        </>
                    ),
                },
                {
                    target: '#placement-documents',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>
                                You can find student placement document from
                                here
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
                        router.push('/portals/sub-admin/tasks')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push(
                            '/portals/sub-admin/tasks/workplace?tab=all'
                        )
                    } else if (action === 'reset' || lifecycle === 'complete') {
                        joyride.setState({
                            ...joyride.state,
                            run: false,
                            stepIndex: 2,
                            tourActive: false,
                        })
                    }
                }
            },
        },
        {
            // text: `Where can I add or view assessment requirements?`,
            text: `Where can I find assessment submissions?`,
            link: '#',
            steps: [
                {
                    target: '#tasks',
                    content: (
                        <>
                            <div className="font-semibold">Click here</div>
                            <div>You can go to Assessment Submission </div>
                        </>
                    ),
                    disableBeacon: true,
                },
                {
                    target: '#assessment-evidence',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>You can view student assessment from here</div>
                        </>
                    ),
                },
                {
                    target: '#assessment-submission',
                    content: (
                        <>
                            <div>Click Here</div>
                            <div>
                                You can select a single student in the following
                                list, to view their assessment submission
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
                        router.push('/portals/sub-admin/tasks')
                    } else if (
                        type === 'step:after' &&
                        index === 1 /* or step.target === '#home' */
                    ) {
                        joyride.setState((prev: any) => ({
                            ...prev,
                            run: false,
                        }))
                        router.push(
                            '/portals/sub-admin/tasks/assessment-evidence?tab=pending'
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
        // {
        //     // text: `Where can I add or view assessment requirements?`,
        //     text: `Where can I find required documents?`,
        //     link: '#',
        //     steps: [
        //         {
        //             target: '#important-docs',
        //             content: (
        //                 <>
        //                     <div className="font-semibold">Click here</div>
        //                     <div>You can find Important documents here </div>
        //                 </>
        //             ),
        //             disableBeacon: true,
        //         },
        //         {
        //             target: '#routeB',
        //             content: (
        //                 <>
        //                     <div>This is Route B</div>
        //                     <div>
        //                         Yet another loader simulation and now we reached
        //                         the last step in our tour!
        //                     </div>
        //                 </>
        //             ),
        //         },
        //     ],
        //     joyrideCallback: (joyride: any) => {
        //         return (data: CallBackProps) => {
        //             const { action, index, lifecycle, type } = data
        //             if (action === 'close') {
        //                 joyride.setState({
        //                     ...joyride.state,
        //                     run: false,
        //                     stepIndex: 0,
        //                     tourActive: false,
        //                 })
        //             } else if (action === 'reset' || lifecycle === 'complete') {
        //                 joyride.setState({
        //                     ...joyride.state,
        //                     run: false,
        //                     stepIndex: 0,
        //                     tourActive: false,
        //                 })
        //             }
        //         }
        //     },
        // },
    ]
    useEffect(() => {
        contextBar.setContent(<ViewProfileCB />)
        contextBar.show(false)
        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
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
            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-4">
                    <FigureCard
                        imageUrl="/images/icons/rto.png"
                        count={statistics?.data?.rto}
                        title={'RTOs'}
                        link={'sub-admin/users/rtos'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/students.png"
                        count={statistics?.data?.student}
                        title={'Students'}
                        link={'sub-admin/students?tab=all'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={statistics?.data?.industry}
                        title={'Industries'}
                        link={'sub-admin/users/industries?tab=all'}
                    />
                </div>
                <div className="flex gap-x-4">
                    <FigureCard
                        imageUrl="/images/icons/workplace.png"
                        count={statistics?.data?.workplaceRequest}
                        title={'Workplace Requests'}
                        link={'sub-admin/tasks/workplace?tab=all'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/pending-student.png"
                        count={statistics?.data?.assessmentEvidence}
                        title={'Assessment Submissions'}
                        link={'sub-admin/tasks/assessment-evidence?tab=pending'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/appointments.png"
                        count={statistics?.data?.appointment}
                        title={'Appointments'}
                        link={'sub-admin/tasks/appointments'}
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
                            {credentials?.name}
                        </span>
                    </h3>
                    <h4 className="font-semibold text-gray-400">
                        What you want to do here?
                    </h4>
                </div>

                <div className="mt-2 flex gap-x-6">
                    <div>
                        <HelpQuestionSet
                            title="Students"
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

            <ImportantDocuments
                coureseRequirementsLink={
                    '/portals/sub-admin/course-requirements'
                }
            />

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
                    {/* <Link legacyBehavior href="#">
                        <a className="inline-block uppercase text-xs font-medium bg-indigo-100 text-indigo-600 px-4 py-2 rounded">
                            See Details
                        </a>
                    </Link> */}
                </div>

                <div className="mt-4">
                    {isLoading ? (
                        <ContextBarLoading />
                    ) : data?.courses.length ? (
                        Object.keys(sectorsWithCourses).map((sector: any) => {
                            return (
                                <div className="mt-4" key={sector?.id}>
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
                                                className="flex flex-col gap-y-4 ml-4"
                                                key={i}
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
                        <div className="w-full">
                            <NoData text={'No Courses Assigned'} />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

SubAdminDashboard.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Dashboard' }}>
            {page}
        </SubAdminLayout>
    )
}

export default SubAdminDashboard
