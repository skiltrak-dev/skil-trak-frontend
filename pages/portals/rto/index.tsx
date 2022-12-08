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

const UserQuestions = [
    {
        text: `Where can I find my students?`,
        link: '#',
    },
    {
        text: `How can I add students?`,
        link: '#',
    },
    {
        text: `How can I add my coordinators and assessor?`,
        link: '#',
    },
    {
        text: `How can I add an admin?b`,
        link: '#',
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
    },
]

const ProfileQuestions = [
    {
        text: `How can I edit my account?`,
        link: '#',
    },
]

const RTODashboard: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const [credentials, setCredentials] = useState<any>(null)
    const { data: rto, isLoading } = RtoApi.Rto.useProfile()
    
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
