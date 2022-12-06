import { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Course, NextPageWithLayout } from '@types'

// layouts
import { SubAdminLayout } from '@layouts'
// components
import {
    Badge,
    Card,
    ContextBarLoading,
    DocumentCard,
    HelpQuestionSet,
    InitialAvatar,
    LottieAnimation,
    NoData,
    UserProfile,
} from '@components'
import { InitialAvatarContainer } from '@components/InitialAvatar/InitialAvatarContainer'
// icons
import { MdPermContactCalendar, MdPhone, MdVerified } from 'react-icons/md'
import { FaBook, FaMapMarker, FaMapMarkerAlt, FaSchool } from 'react-icons/fa'
import { IoBriefcase } from 'react-icons/io5'
// animations
import { Animations } from '@animations'
// hooks
import { useContextBar } from '@hooks'
import { ViewProfileCB } from '@partials/sub-admin/contextBar'

import { FigureCard } from '@components/sections/subAdmin/components/Cards/FigureCard'


import { AuthUtils } from '@utils'

import { SubAdminApi } from '@queries'
import { ImportantDocuments } from '@partials/sub-admin/components'

const WorkplaceQuestions = [
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
    {
        text: `I don't have a workplace. What should I do?`,
        link: '#',
    },
]

const AssessmentQuestions = [
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

const SubAdminDashboard: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)

    const { data, isSuccess, isLoading } = SubAdminApi.SubAdmin.useProfile()
    const sectorsWithCourses = getSectors(data?.courses)
    


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

            <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-4">
                    <FigureCard
                        imageUrl="/images/icons/students.png"
                        count={0}
                        title={'Students'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/industry.png"
                        count={0}
                        title={'Industries'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/rto.png"
                        count={2}
                        title={'RTOs'}
                    />
                </div>
                <div className="flex gap-x-4">
                    <FigureCard
                        imageUrl="/images/icons/workplace.png"
                        count={0}
                        title={'Workplace Requests'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/pending-student.png"
                        count={0}
                        title={'Pending Students'}
                    />
                    <FigureCard
                        imageUrl="/images/icons/appointments.png"
                        count={0}
                        title={'Appointments'}
                    />
                </div>
            </div>

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

                <div className="mt-4">
                    {isLoading ? (
                        <ContextBarLoading />
                    ) : data?.courses.length ? (
                        Object.keys(sectorsWithCourses).map((sector:any) => {
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

            <ImportantDocuments />
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
