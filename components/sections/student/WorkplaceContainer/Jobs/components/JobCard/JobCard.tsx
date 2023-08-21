import Image from 'next/image'
import Link from 'next/link'

// React icons
import { Typography } from '@components/Typography'
import { FaLocationArrow, FaPhoneAlt } from 'react-icons/fa'
import { GiBanknote } from 'react-icons/gi'
import { HiUserGroup } from 'react-icons/hi'
import { IoMdBriefcase } from 'react-icons/io'
import { MdContactPhone } from 'react-icons/md'
import { RiTimeFill } from 'react-icons/ri'
import { ApplyNowButton } from '../ApplyNowButton'

// query

type Props = {
    savedJobs?: any
    job: any
}

export const JobCard = ({ savedJobs, job }: Props) => {
    return (
        <>
            <div className="my-3 bg-white border rounded-2xl shadow-sm">
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <Link
                                legacyBehavior
                                href={`/portals/student/workplace/jobs/${job?.id}`}
                            >
                                <a>
                                    <Typography
                                        variant="subtitle"
                                        color="text-black"
                                    >
                                        {job?.title}
                                    </Typography>
                                </a>
                            </Link>

                            <div className="flex items-center gap-x-1">
                                <div className="h-4 w-4">
                                    <Image
                                        className="rounded-full"
                                        src={
                                            job?.avatar ||
                                            'https://placeimg.com/100/10/any'
                                        }
                                        alt="industry"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <Typography
                                    variant="muted"
                                    color="text-gray-400"
                                >
                                    {job?.companyName}
                                </Typography>
                            </div>
                        </div>
                        <ApplyNowButton
                            onClick={() => {
                                // saveJob(id)

                            }}
                            id={job?.id}
                            job={job}
                            savedJob={savedJobs
                                ?.map(({ id }: any) => id)
                                .includes(job?.id)}
                        />
                    </div>
                    <div className="flex item-center gap-x-2 pt-2">
                        <div className="flex item-center gap-x-2">
                            <HiUserGroup className="text-[#7E9CAF]" />
                            <Typography variant="muted" color="text-black">
                                {job?.positions}
                            </Typography>
                            <Typography variant="small" color="text-gray-400">
                                Positions
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <IoMdBriefcase className="text-[#7E9CAF]" />
                            <Typography variant="muted" color="text-black">
                                {job?.employmentType}
                            </Typography>
                            <Typography variant="small" color="text-gray-400">
                                Job
                            </Typography>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <MdContactPhone className="text-[#7E9CAF]" />
                            <Typography variant="muted" color="text-black">
                                {job?.contactPerson}
                            </Typography>
                            <Typography variant="small" color="text-gray-400">
                                to Contact
                            </Typography>
                        </div>
                    </div>
                    <div className="pt-2">
                        <Typography variant="small" color="text-gray-600">
                            {job?.description}
                        </Typography>
                    </div>
                    <div className="mt-2 flex items-center gap-x-2">
                        <GiBanknote className="text-[#D1D5DB]" />
                        <Typography variant="label" color="text-black">
                            AUD {job?.salaryFrom} - Aud {job?.salaryTo}
                        </Typography>
                    </div>
                </div>
                <div className="border-t">
                    <div className="flex justify-between px-4 py-2">
                        <div className="flex items-center gap-x-6">
                            <div className="flex gap-x-2 items-center">
                                <FaLocationArrow className="text-[#D1D5DB]" />
                                <Typography variant="muted" color="text-black">
                                    {job?.address}
                                </Typography>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <FaPhoneAlt className="text-[#D1D5DB]" />
                                <Typography variant="muted" color="text-black">
                                    {job?.phoneNumber}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <RiTimeFill className="text-[#D1D5DB]" />
                            <Typography variant="small" color="text-black">
                                {job?.expiry || 0}{' '}
                                <span className="text-gray-400 text-xs ">
                                    Days Ago
                                </span>
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
