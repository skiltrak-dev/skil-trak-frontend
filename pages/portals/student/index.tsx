import { ReactElement, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
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

const StudentDashboard: NextPageWithLayout = () => {
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.setContent(<UserProfile />)
    }, [])

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
                            Name Of User
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

            <section className="flex gap-x-4">
                <DocumentCard
                    title="Workflow"
                    description="One liner about workflow"
                    idx={1}
                />
                <DocumentCard
                    title="Course Requirements"
                    description="One liner about Course Requirements"
                    idx={2}
                />
                <DocumentCard
                    title="Induction Process"
                    description="One liner about Induction Process"
                    idx={3}
                />
                <DocumentCard
                    title="Placement Info"
                    description="One liner about Placement Info"
                    idx={4}
                />
                <DocumentCard
                    title="Legal"
                    description="One liner about Legal"
                    idx={5}
                />
                <DocumentCard
                    title="Checklist"
                    description="One liner about Checklist"
                    idx={6}
                />
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
                    <Link href="#">
                        <a className="inline-block uppercase text-xs font-medium bg-indigo-100 text-indigo-600 px-4 py-2 rounded">
                            See Details
                        </a>
                    </Link>
                </div>

                {/* Card Body */}
                <div className="flex items-center gap-x-6 mt-4">
                    {/* Sector */}
                    <div className="">
                        <div>
                            <p className="text-xs font-medium text-gray-400">
                                Sector
                            </p>
                            <p className="text-sm font-semibold">
                                Commercial Cookery &amp; Hospitality
                            </p>
                        </div>

                        {/* Courses */}
                        <div className="flex flex-col gap-y-4 ml-4">
                            <div className="border-l-4 border-green-600 px-2">
                                <div>
                                    <p className="text-xs font-medium text-gray-400">
                                        SITHCCC020
                                    </p>
                                    <p className="text-sm">
                                        Work Effectively As A Cook
                                    </p>
                                </div>

                                <Badge text="Active" />
                            </div>

                            <div className="border-l-4 border-gray-300 px-2">
                                <div>
                                    <p className="text-xs font-medium text-gray-400">
                                        SITHKOP005
                                    </p>
                                    <p className="text-sm">
                                        Coordinate Cooking Operation
                                    </p>
                                </div>

                                <Badge text="Not Started" variant="muted" />
                            </div>
                        </div>
                    </div>
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
                        <Link href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
                                See Details
                            </a>
                        </Link>
                    </div>

                    {/* Card Body */}
                    <div className="flex items-center gap-x-6 py-4">
                        <div className="flex-shrink-0">
                            <Image src="" height={100} width={100} />
                        </div>
                        <div>
                            <div>
                                <p className="font-medium">
                                    Guide Star Training &amp; Professional
                                    Services
                                </p>
                                <p className="text-slate-400 text-sm">
                                    tauseef@jti.edu.au
                                </p>
                            </div>
                            <div className="flex gap-x-6 mt-1">
                                <div className="flex items-center gap-x-2">
                                    <span className="text-gray-400">
                                        <MdPermContactCalendar size={14} />
                                    </span>
                                    <span className="text-xs">John Smith</span>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <span className="text-gray-400">
                                        <MdPhone size={14} />
                                    </span>
                                    <span className="text-xs">
                                        039 6534 100
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-[11px] text-gray-400">
                                    Coordinators
                                </p>
                                <div className="flex justify-between gap-x-2">
                                    <div>
                                        <p className="font-medium text-sm">
                                            Yaseen Khan
                                        </p>
                                        <p className="text-xs font-medium text-slate-400">
                                            yaseen@skiltrak.com.au
                                        </p>
                                    </div>

                                    <InitialAvatarContainer show={2}>
                                        <InitialAvatar
                                            name="John Smith"
                                            first
                                        />
                                        <InitialAvatar name="Yaseen Khan" />
                                        <InitialAvatar name="Julie Clarke" />
                                        <InitialAvatar name="Salman" />
                                    </InitialAvatarContainer>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        <Link href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-green-100 text-green-600 px-4 py-2 rounded">
                                See Details
                            </a>
                        </Link>
                    </div>

                    {/* Card Body */}
                    <div className="mt-4">
                        <div className="flex items-center gap-x-6 mb-4">
                            <div className="flex-shrink-0">
                                <Image src="" height={100} width={100} />
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
                                            <MdPermContactCalendar size={14} />
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
                </Card>
            </div>
        </div>
    )
}

StudentDashboard.getLayout = (page: ReactElement) => {
    return <StudentLayout>{page}</StudentLayout>
}

export default StudentDashboard
