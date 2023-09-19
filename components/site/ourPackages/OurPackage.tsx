import { Typography } from '@components/Typography'
import { Button } from '@components/buttons'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GiCheckMark } from 'react-icons/gi'
import { MdHomeWork } from 'react-icons/md'

export const packageTypes = {
    PlacementManagement: 'Placement Management Portal',
    StartupPackage: 'The Startup Package',
    CompletePackage: 'The Complete Package',
}

const packagesFeatures = [
    {
        text: 'Student Progress Tracking',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Mapped WBT assessment tools available',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Online appointment booking',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Innovative way to track and monitor your work placement units',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Stay compliant and liaise directly with Industry partners',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'SMS/LMS to assist your everyday business needs',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Workplaces automatically assigned as per students&apos; location',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Video conference with recording available',
        packageType: [
            packageTypes.PlacementManagement,
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Skiltrak LMS portal featuring all services',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Automated push notifications',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Induction class Skiltrak consultant',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Chat system',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Placement workplace visits',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Interview tutorials',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Ticket systems',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'Liaison between students',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },
    {
        text: 'RTO and industry',
        packageType: [
            packageTypes.StartupPackage,
            packageTypes.CompletePackage,
        ],
    },

    {
        text: 'Skiltrak Coordinator assigned to class',
        packageType: [packageTypes.CompletePackage],
    },
    {
        text: 'Placement observation visits/remote',
        packageType: [packageTypes.CompletePackage],
    },
    {
        text: 'Coaching calls',
        packageType: [packageTypes.CompletePackage],
    },
    {
        text: 'Ticket systems',
        packageType: [packageTypes.CompletePackage],
    },
    {
        text: 'Online assessing and learning materials',
        packageType: [packageTypes.CompletePackage],
    },
    {
        text: 'Student final outcome displayed with feedback',
        packageType: [packageTypes.CompletePackage],
    },
    {
        text: 'Liaison between students, RTO and industry',
        packageType: [packageTypes.CompletePackage],
    },
]

export const OurPackage = ({
    title,
    color,
    price,
    tagline,
    textColor,
    onClick,
    bgBtnColor,
    btnTextColor,
    titleColor,
}: any) => {
    const router = useRouter()
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    return (
        <div className="card relative">
            <div className="card__side card__side--front">
                <div
                    className={`${color} rounded-2xl p-6 md:p-12 md:h-[450px] w-full md:w-96`}
                >
                    <div className="text-3xl mb-2 md:mb-10">
                        <MdHomeWork className={`${titleColor}`} />
                    </div>
                    <div className="flex flex-col gap-y-[72px]">
                        <div className="h-12 ">
                            <Typography variant="body" color={titleColor}>
                                {title}
                            </Typography>
                            <Typography variant="xs" color={titleColor}>
                                {tagline}
                            </Typography>
                        </div>
                        <div className="md:inline-block hidden">
                            {/* <div className="h-12">
                                <Typography variant="muted" color={textColor}>
                                    {price}
                                </Typography>
                            </div> */}
                            <div
                                onClick={() =>
                                    router.push({
                                        pathname: '/auth/signup/rto',
                                        query: { step: 'account-info' },
                                    })
                                }
                                className={`${bgBtnColor} ${btnTextColor} md:block hidden px-4 py-2 text-center cursor-pointer rounded-lg text-sm`}
                            >
                                Start With This Package
                            </div>
                        </div>
                    </div>
                    <div
                        className="group hidden md:flex items-center cursor-pointer justify-end mt-20"
                        onClick={() => {
                            if (onClick) {
                                onClick()
                            }
                        }}
                    >
                        <div className="">
                            <Typography variant="muted" color="text-white">
                                View Details
                            </Typography>
                            <Typography variant="xs" color="text-white">
                                Package
                            </Typography>
                        </div>
                        <div className="mt-2 pl-2 group-hover:translate-x-4 transition-transform duration-300 ease-in-out">
                            <AiOutlineArrowRight className="text-white" />
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="mt-10 flex items-center justify-between gap-x-4 md:hidden">
                        <div className="">
                            {/* <div className="h-12">
                                <Typography variant="muted" color={textColor}>
                                    {price}
                                </Typography>
                            </div> */}

                            <div
                                onClick={() =>
                                    router.push({
                                        pathname: '/auth/signup/rto',
                                        query: { step: 'account-info' },
                                    })
                                }
                                className={`${bgBtnColor} ${btnTextColor} md:hidden inline-block px-4 py-2 cursor-pointer rounded-lg text-xs`}
                            >
                                Start With This Package
                            </div>
                        </div>
                        <div
                            className="group flex items-center cursor-pointer justify-end"
                            onClick={() => {
                                if (onClick) {
                                    onClick()
                                }
                            }}
                        >
                            <div className="">
                                <Typography variant="muted" color="text-white">
                                    View Details
                                </Typography>
                                <Typography variant="xs" color="text-white">
                                    Package
                                </Typography>
                            </div>
                            <div className="mt-2 pl-2 group-hover:translate-x-4 transition-transform duration-300 ease-in-out">
                                <AiOutlineArrowRight className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* back */}
            </div>
            <div className="card__side card__side--back absolute top-0 left-0">
                <div
                    className={`${color} rounded-2xl p-6 md:pb-12 md:h-[470px] overflow-hidden  w-full md:w-96`}
                >
                    <div className="overflow-auto remove-scrollbar custom-scrollbar max-h-[470px]">
                        <div className="">
                            {/* Filter the packFeatures and include packtype if true then return that object */}
                            {packagesFeatures
                                .filter((pack) =>
                                    pack.packageType.includes(title)
                                )
                                .map((feature, index) => {
                                    return (
                                        <div key={index} className={``}>
                                            <div className="flex gap-x-2 items-start">
                                                <GiCheckMark
                                                    className={`${btnTextColor} w-1/3 mb-2`}
                                                    size={18}
                                                />
                                                <div className="w-full mb-2 pb-2">
                                                    <Typography
                                                        variant="label"
                                                        color={`${
                                                            title=== "Placement Management Portal"
                                                                ? 'text-[#98c4ec]'
                                                                : title === "The Startup Package"
                                                                ? 'text-[#e5641a]'
                                                                : 'text-[#52595D]'
                                                        } `}
                                                    >
                                                        {feature?.text}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
