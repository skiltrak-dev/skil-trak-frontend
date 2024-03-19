import { Typography } from '@components/Typography'
import { KeyFeatureCard } from './KeyFeatureCard'
import { useRouter } from 'next/router'
import { MdAttachEmail, MdOutlinePolyline } from 'react-icons/md'
import { RiComputerFill } from 'react-icons/ri'
import { FaFileSignature, FaUserClock } from 'react-icons/fa'
import { AiFillSchedule } from 'react-icons/ai'
import { Button } from '@components/buttons'

const KeyFeatures = () => {
    const router = useRouter()

    const features = [
        {
            icon: <MdOutlinePolyline />,
            title: 'Bulk Students Accounts',
            content: `A hassle-free process offered by Skiltrak students accounts are automatically ...`,
            color: 'bg-[#FFFAEF]',
            link: 'bulk-students-accounts',
        },
        {
            icon: <RiComputerFill />,
            title: 'Save Time With Automation',
            content: `Save time with dynamic rules and automate repetitive tasks such as auto account ...`,
            color: 'bg-[#F3F8FC]',
            link: 'save-time-with-automation',
        },
        {
            icon: <FaUserClock />,
            title: 'Progress Tracing',
            content: `In working toward achieving competencies, students in placement can view their ...`,
            color: 'bg-[#E8F8F4]',
            link: 'progress-tracing',
        },
        {
            icon: <AiFillSchedule />,
            title: 'Work Schedule',
            content: `SkilTrak Workplace desktop, tablet and mobile app easily enable learners to locate ...`,
            color: 'bg-[#FDF7F6]',
            link: 'work-schedule',
        },
        {
            icon: <FaFileSignature />,
            title: 'E-Sign System',
            content: `It's easier than ever to sign all your most important documents without the hassle ...`,
            color: 'bg-[#FBFBFC]',
            link: 'e-sign',
        },
        {
            icon: <MdAttachEmail />,
            title: 'Enhanced Communication',
            content: `Learners can access discussions, notifications, emails and information about ...`,
            color: 'bg-[#EFFAFD]',
            link: 'enhanced-communication',
        },
    ]
    return (
        <div className="px-4 xl:px-0 py-6 max-w-7xl mx-auto">
            <div
                className="w-full flex justify-center px-4 mb-4"
                data-aos="fade-up"
            >
                <Typography variant="h2">
                    Key features and benefits of SkilTrak
                </Typography>
            </div>
            <div
                data-aos="fade-up"
                className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
            >
                {features.map((feature, index) => (
                    <KeyFeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        content={feature.content}
                        color={feature.color}
                        link={feature.link}
                    />
                ))}
            </div>
            <div data-aos="fade-up" className="flex justify-center my-5">
                <Button
                    onClick={() => {
                        router.push('/features')
                    }}
                    outline
                    text="View all features"
                />
            </div>
        </div>
    )
}

export default KeyFeatures
