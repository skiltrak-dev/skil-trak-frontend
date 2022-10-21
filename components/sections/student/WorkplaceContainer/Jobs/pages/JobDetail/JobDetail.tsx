import Image from 'next/image'

// job page component
import { ApplyNowButton } from '../../components'

// React icons
import { HiUserGroup } from 'react-icons/hi'
import { IoMdBriefcase } from 'react-icons/io'
import { MdContactPhone } from 'react-icons/md'
import { FaLocationArrow } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'
import { RiTimeFill } from 'react-icons/ri'
import { Typography } from '@components/Typography'
import { useRouter } from 'next/router'
type Props = {}

export const JobDetail = (props: Props) => {
    const pathname = useRouter()
    const jobId = pathname.query.jobId;
    return (
        <>
            <div className="mt-4 border rounded-2xl shadow-sm">
                <div className="border-b p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-x-6 items-center">
                            <div className="">
                                <Image
                                    src="/assets/images/avatar-rect.png"
                                    width={80}
                                    height={70}
                                    alt="Job Details"
                                />
                            </div>
                            <div>
                                <div>
                                    <Typography
                                        variant="subtitle"
                                        color="text-black"
                                    >
                                        Disability Support Worker
                                    </Typography>
                                    <Typography
                                        variant="muted"
                                        color="text-gray-400"
                                    >
                                        Km Health Services
                                    </Typography>
                                </div>
                                <div className="flex gap-x-6 mt-1.5 items-center">
                                    <div className="flex gap-x-2 items-center">
                                        <FaLocationArrow className="text-[#D1D5DB]" />
                                        <Typography
                                            variant="muted"
                                            color="text-black"
                                        >
                                            Level 10, 440, Collins Street,
                                            Melbourne, 3000
                                        </Typography>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                        <FaPhoneAlt className="text-[#D1D5DB]" />

                                        <Typography
                                            variant="muted"
                                            color="text-black"
                                        >
                                            040 5660 022
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex item-center gap-x-6 mt-4">
                                    <div className="flex item-center gap-x-2">
                                        <HiUserGroup className="text-[#7E9CAF]" />
                                        <Typography
                                            variant="muted"
                                            color="text-black"
                                        >
                                            25
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="text-gray-400"
                                        >
                                            Positions
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <IoMdBriefcase className="text-[#7E9CAF]" />
                                        <Typography
                                            variant="muted"
                                            color="text-black"
                                        >
                                            Part-Time
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="text-gray-400"
                                        >
                                            Job
                                        </Typography>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                        <MdContactPhone className="text-[#7E9CAF]" />
                                        <Typography
                                            variant="muted"
                                            color="text-black"
                                        >
                                            Diviya
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="text-gray-400"
                                        >
                                            to Contact
                                        </Typography>
                                    </div>
                                    <div className="flex gap-x-2 items-center">
                                        <RiTimeFill className="text-[#D1D5DB]" />
                                        <Typography
                                            variant="small"
                                            color="text-gray-400"
                                        >
                                            Posted
                                        </Typography>
                                        <Typography
                                            variant="muted"
                                            color="text-black"
                                        >
                                            10
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="text-gray-400"
                                        >
                                            Days ago
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <ApplyNowButton status="saved" />
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <Typography variant="body" color="text-black">
                        We are looking for a passionate and experienced
                        Disability Support Worker to join our team. You will be
                        working with a young An exciting opportunity has become
                        available to join a forward thinking established
                        company. Working with People with disabilities you will
                        proactively assist and help provide clients with a
                        fulfilled and independent lifestyle. You will mainly be
                        working with Adults with physical, sensory and cognitive
                        disabilities.
                    </Typography>
                    <div className="mt-6">
                        <Typography variant="title" color="text-black">
                            The Role
                        </Typography>
                    </div>
                    <div className="mb-4">
                        <Typography variant="body" color="text-black">
                            Engage with clients in activities to create
                            fulfilling lifestyles, by helping them achieve their
                            goals, help develop their skills and abilities and
                            help build their confidence.
                        </Typography>
                    </div>
                    <Typography variant="body" color="text-black">
                        The support you provide may include assisting with
                        transport and community or recreational activities. If
                        you have an interest in cooking, music, gardening, and
                        other activities come and share your talent with our
                        clients.
                    </Typography>
                    <div className="mt-6">
                        <Typography variant="title" color="text-black">
                            About you
                        </Typography>
                    </div>
                    <ul className="list-inside list-disc">
                        <li>
                            Have at least Certificate lll in Individual Support
                            or currently studying related healthcare
                            qualifications
                        </li>
                        <li>First Aid/ CPR </li>
                        <li>Current Full</li>
                        <li>Driver's License and insured Vehicle</li>
                        <li>Police Check</li>
                        <li>Flexible approach to work</li>
                        <li>
                            Effective communication and interpersonal skills
                        </li>
                        <li>
                            Proven ability to work effectively in a team
                            environment and independently as required with one
                            on one
                        </li>
                    </ul>
                    <div className="mt-6">
                        <Typography variant="title" color="text-black">
                            We Offer
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
