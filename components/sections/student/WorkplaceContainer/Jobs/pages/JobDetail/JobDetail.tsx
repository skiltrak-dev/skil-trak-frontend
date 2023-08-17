import Image from 'next/image'
import moment from 'moment'

// job page component
import { ApplyNowButton } from '../../components'

// React icons
import { HiUserGroup } from 'react-icons/hi'
import { IoMdBriefcase } from 'react-icons/io'
import { MdContactPhone } from 'react-icons/md'
import { FaLocationArrow } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'
import { RiTimeFill } from 'react-icons/ri'
import { Typography, EmptyData } from '@components'
import { useRouter } from 'next/router'

import { useGetStudentJobDetailQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { GiBanknote } from 'react-icons/gi'
type Props = {}

export const JobDetail = (props: Props) => {
    const pathname = useRouter()
    const jobId = pathname.query.jobId

    const { data, isLoading, isFetching, isError } =
        useGetStudentJobDetailQuery(String(jobId), {
            skip: !jobId,
        })
    return (
        <>
            {isError && 'Error Occured'}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <div className="mt-4 border rounded-2xl shadow-sm w-full bg-white">
                    <div className="border-b p-4 w-full">
                        <div className="flex justify-between w-full">
                            <div className="flex gap-x-6 items-center w-full">
                                <div className="w-28 h-full relative">
                                    <Image
                                        className="w-full h-full"
                                        src={
                                            data?.avatar ||
                                            'https://placeimg.com/100/10/any'
                                        }
                                        width="0"
                                        height="0"
                                        alt=""
                                    />
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <div>
                                            <Typography
                                                variant="subtitle"
                                                color="text-black"
                                            >
                                                {data?.title}
                                            </Typography>
                                            <Typography
                                                variant="muted"
                                                color="text-gray-400"
                                            >
                                                {data?.industry?.businessName}
                                            </Typography>
                                        </div>
                                        <div className="">
                                            <ApplyNowButton
                                                job={data}
                                                onClick={() => {}}
                                                id={data?.id}
                                                savedJob={data?.savedJobs
                                                    ?.map(({ id }: any) => id)
                                                    .includes(5)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-x-6 mt-1.5 items-center">
                                            <div className="flex gap-x-2 items-center">
                                                <FaLocationArrow className="text-[#D1D5DB]" />
                                                <Typography
                                                    variant="muted"
                                                    color="text-black"
                                                >
                                                    {`${data?.addressLine1}, ${data?.addressLine2}`}
                                                </Typography>
                                            </div>
                                            <div className="flex gap-x-2 items-center">
                                                <FaPhoneAlt className="text-[#D1D5DB]" />

                                                <Typography
                                                    variant="muted"
                                                    color="text-black"
                                                >
                                                    {
                                                        data?.industry
                                                            ?.phoneNumber
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex items-center gap-x-2">
                                            <GiBanknote className="text-[#D1D5DB]" />
                                            <Typography
                                                variant="label"
                                                color="text-black"
                                            >
                                                AUD {data?.salaryFrom} - Aud{' '}
                                                {data?.salaryTo}
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
                                                {data?.vacancies}
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
                                                {data?.employmentType}
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
                                                {data?.contactPerson}
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
                                                {moment(
                                                    data?.createdAt,
                                                    'YYYYMMDDhhmmss'
                                                ).fromNow()}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <Typography variant={'label'} color={'text-gray-400'}>
                            {data?.description}
                        </Typography>
                    </div>
                </div>
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Job Available'}
                        description={
                            'It seems that job is removed or not added'
                        }
                    />
                )
            )}
        </>
    )
}
