import React from 'react'
import { SiteLayout } from '@layouts'
import Image from 'next/image'
import { FeatureCard } from '../components/site/FeatureCard'
import { css } from '@emotion/react'

import {
    FaUserGraduate,
    FaVideo,
    FaFileSignature,
    FaTicketAlt,
    FaRegCalendarAlt,
    FaMobileAlt,
    FaStream,
    FaUsers,
    FaUserFriends,
    FaChartBar,
    FaRegCreditCard,
} from 'react-icons/fa'

import { IoMdChatbubbles, IoMdTime } from 'react-icons/io'
import { VscScreenNormal } from 'react-icons/vsc'
import { MdTimelapse } from 'react-icons/md'
import { NextPage } from 'next'
import { Typography } from '@components'
import { KeyFeatureCard } from '@components/site/keyFeatures'

const features = [
    {
        icon: <FaUserGraduate />,
        name: 'Bulk Students Accounts Creating',
        description: `A hassle-free process offered by Skiltrak – students accounts are automatically generated from the RTO’s student list, accessible by RTO, students and Industry.`,
        id: 'bulk-students-accounts',
    },
    {
        icon: <FaVideo />,
        name: 'Video Conferencing',
        description: `Video conferencing offers all the benefits that come with face-to-face communication, without the cost of commuting or traveling. For RTOs, this means no hiccups in communication for students in work placements regardless of travel capability or safety restrictions. `,
        id: '',
    },
    {
        icon: <FaFileSignature />,
        name: 'E-Sign System',
        id: 'e-sign',
        description: `It's easier than ever to sign all your most important documents 
    without the hassle of a printer, scanner, or fax machine. Legally 
    binding electronic signatures empower you to sign documents
    online using a desktop, tablet, or mobile phone such as tri partite 
    WBT agreement, eligibility checklist and any other documentations.`,
    },
    {
        icon: <FaTicketAlt />,
        name: 'Ticket System',
        id: 'ticket-system',
        description: `A ticketing system to ensure your urgent requests are actioned 
    promptly and efficiently. This feature is available to RTOs, and Industries.`,
    },
    {
        icon: <FaRegCalendarAlt />,
        name: 'Appointment Bookings',
        id: 'appointment-bookings',
        description: `Give students, RTO and industries, the freedom to book a virtual or 
    in-person appointments online from their portal.`,
    },
    {
        icon: <FaMobileAlt />,
        name: 'SkilTrak App',
        id: 'skiltrak-app',
        description: `Improve how you connect and take Skiltrak with you, 
    wherever you go.`,
    },
    {
        icon: <FaStream />,
        name: 'Streamline & Online Learning',
        id: 'streamline-learning',
        description: `Assign your Coordinator, schedule induction classes, book 
    appointments and monitor your students’ progress with our shared 
    content portal.  All our assessment tools are available online for 
    easy access to students and assessors. RTOs can review, 
    unpublish, and update their materials ensuring continuous 
    improvement.`,
    },
    {
        icon: <IoMdChatbubbles />,
        name: 'Manage Compliance',
        id: 'manage-compliance',
        description: `All your RTO compliance requirements are available from a simple 
    click request. Visit our Compliance section for more information or 
    book an appointment with a Skiltrak consultant via your RTO portal.`,
    },
    {
        icon: <FaUsers />,
        name: 'Enhanced Communication',
        id: 'enhanced-communication',
        description: `Learners can access discussions, notifications, emails and 
    information about workplaces etc. All parties can communicate 
    through their skiltrak accounts, all communications recorded on 
    portals.`,
    },
    {
        icon: <FaUserFriends />,
        name: 'Access To Volunteer Students',
        id: '',
        description: `Industry partners will receive automated placement application 
    from active students in the closest areas.`,
    },
    {
        icon: <FaChartBar />,
        name: 'Progress Tracing ',
        id: 'progress-tracing',
        description: `In working toward achieving competencies, students in placement 
    can view their progress and access their profile to view results. The 
    same applies to the RTO via RTO portal.`,
    },
    {
        icon: <IoMdTime />,
        name: 'Work Schedule',
        id: 'work-schedule',
        description: `Creating work schedule online is a great way of control the 
    student WBT progress.`,
    },
    {
        icon: <VscScreenNormal />,
        name: 'Intuitive Use',
        id: 'intuitive-use',
        description: `SkilTrak Workplace desktop, tablet and mobile app easily enable 
    learners to locate their learning programs, create viewing 
    preferences, review due dates, track their progress and complete 
    requirements for placement units.`,
    },
    {
        icon: <MdTimelapse />,
        name: 'Save Time With Automation',
        id: 'save-time-with-automation',
        description: `Save time with dynamic rules and automate repetitive tasks such 
    as auto account creation or reminder emails plus Skiltrak allows to 
    motivate and keep track of your students with automated push 
    notifications and messaging. Reward and recognize employee 
    achievements with automated “Outstanding awards”.`,
    },
    {
        icon: <FaRegCreditCard />,
        name: 'Paid Jobs Advertisements',
        id: '',
        description: `Industry partners are able to advertise paid jobs through Skiltrak 
    allowing students to apply directly. Students will be notified 
    through push notifications.`,
    },
]

const bgColors = [
    '#FFFAEF',
    '#F3F8FC',
    '#E8F8F4',
    '#FDF7F6',
    '#FBFBFC',
    '#EFFAFD',
]

const Page: NextPage = () => {
    return (
        <SiteLayout title={'Features'}>
            <div className="h-96 bg-gradient-to-r from-[#0a56b0] to-[rgba(52, 91, 135, 0)] w-full">
                <div className="h-full max-w-3xl mx-auto flex flex-col justify-center items-center">
                    <Typography variant={'h1'} color="text-white">
                        SKILTRAK FEATURES
                    </Typography>
                    <Typography
                        variant={'subtitle'}
                        color={'text-white'}
                        center
                    >
                        We have knowledgeable and friendly professionals
                        available to schedule an appointment or answer any
                        questions you may have in relation to Work Placement .
                        Call us today!
                    </Typography>
                </div>
            </div>

            <div className="max-w-7xl 2xl:max-w-screen-3xl my-4 mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center px-5">
                    {features.map((feature, i) => (
                        <KeyFeatureCard
                            key={i}
                            icon={feature.icon}
                            title={feature.name}
                            content={feature.description}
                            color={`bg-[${bgColors[i % bgColors?.length]}]`}
                            link={feature.id}
                        />
                    ))}
                </div>
            </div>
        </SiteLayout>
    )
}

export default Page
