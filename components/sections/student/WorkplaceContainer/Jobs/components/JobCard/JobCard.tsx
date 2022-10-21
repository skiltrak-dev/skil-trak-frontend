import Image from 'next/image'

// React icons
import { HiUserGroup } from 'react-icons/hi'
import { IoMdBriefcase } from 'react-icons/io'
import { MdContactPhone } from 'react-icons/md'
import { GiBanknote } from 'react-icons/gi'
import { FaLocationArrow } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'
import { RiTimeFill } from 'react-icons/ri'
import { ApplyNowButton } from '../ApplyNowButton'
import { Typography } from '@components/Typography'

type Props = {
    jobTitle?: string
    companyName?: string
    companyLogo?: string
    companyLocation?: string
    positions?: number
    jobType?: string
    contactTo?: string
    contactNumber?: string
    salary?: string
    jobDescription?: string
    days?: number
    timeAgo?: string
}

export const JobCard = ({
    jobTitle,
    companyName,
    companyLogo,
    companyLocation,
    positions,
    jobType,
    contactTo,
    contactNumber,
    salary,
    jobDescription,
    days,
    timeAgo,
}: Props) => {
    return (
        <>
            <div className="my-3 bg-white border rounded-2xl shadow-sm">
                <div className="px-4 ">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="pt-4">
                                <Typography
                                    variant="subtitle"
                                    color="text-black"
                                >
                                    {jobTitle}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-x-1">
                                <div className="h-4 w-4">
                                    <Image
                                        src={
                                            companyLogo ||
                                            '/images/placeholder.png'
                                        }
                                        alt="industry"
                                        width={100}
                                        height={100}
                                        layout="responsive"
                                    />
                                </div>
                                <Typography
                                    variant="muted"
                                    color="text-gray-400"
                                >
                                    {companyName}
                                </Typography>
                            </div>
                        </div>
                        <ApplyNowButton status="unsaved" />
                    </div>
                    <div className="flex item-center gap-x-2 pt-2">
                        <div className="flex item-center gap-x-2">
                            <HiUserGroup className="text-[#7E9CAF]" />
                            <Typography variant="muted" color="text-black">
                                {positions}
                            </Typography>
                            <Typography variant="small" color="text-gray-400">
                                Positions
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <IoMdBriefcase className="text-[#7E9CAF]" />
                            <Typography variant="muted" color="text-black">
                                {jobType}
                            </Typography>
                            <Typography variant="small" color="text-gray-400">
                                Job
                            </Typography>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <MdContactPhone className="text-[#7E9CAF]" />
                            <Typography variant="muted" color="text-black">
                                {contactTo}
                            </Typography>
                            <Typography variant="small" color="text-gray-400">
                                to Contact
                            </Typography>
                        </div>
                    </div>
                    <div className='pt-2'>
                        <Typography variant="small" color="text-gray-600">
                            {jobDescription}
                        </Typography>
                    </div>
                    <div className="mt-2 mb-4 flex items-center gap-x-2">
                        <GiBanknote className="text-[#D1D5DB]" />
                        <Typography variant="label" color="text-black">
                            {salary}
                        </Typography>
                    </div>
                </div>
                <div className="border-t mt-4">
                    <div className="flex justify-between px-4 py-2">
                        <div className="flex gap-x-2 items-center">
                            <FaLocationArrow className="text-[#D1D5DB]" />
                            <Typography variant="muted" color="text-black">
                                {companyLocation}
                            </Typography>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <FaPhoneAlt className="text-[#D1D5DB]" />
                            <Typography variant="muted" color="text-black">
                                {contactNumber}
                            </Typography>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <RiTimeFill className="text-[#D1D5DB]" />
                            <Typography variant="muted" color="text-black">
                                {days}
                            </Typography>
                            <Typography variant="small" color="text-gray-400">
                                {timeAgo}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
