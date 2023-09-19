import Image from 'next/image'
// import CountUp from 'react-countup'

import { Card } from '@components/cards'
import { PuffLoader } from 'react-spinners'
import Link from 'next/link'
import { Typography } from '@components/Typography'
import { ImBook } from 'react-icons/im'

type FigureCardProps = {
    imageUrl?: string | undefined
    loading?: boolean
    index: number
    sector: any
}

export const SectorCourseStudentCount = ({
    imageUrl,
    loading,
    index,
    sector,
}: FigureCardProps) => {
    const countNumber = Math.floor(Math.random() * 9)
    return (
        <Link legacyBehavior href={''}>
            <a className="w-full">
                <Card>
                    <div className="flex justify-between">
                        <div className="flex items-start gap-x-2">
                            <div className="mt-1 -rotate-12">
                                <ImBook size={20} className="text-gray-600" />
                            </div>
                            <div>
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-600'}
                                >
                                    <span className="font-bold">
                                        {sector?.name}
                                    </span>
                                </Typography>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            {loading ? (
                                <div className="h-[36px]">
                                    <PuffLoader size={28} />
                                </div>
                            ) : (
                                <p className="text-3xl font-bold">
                                    {/* <CountUp end={count} /> */}
                                    {sector?.totalStudents}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 leading-3 uppercase">
                                Students
                            </p>
                        </div>
                    </div>

                    <div className="mt-2.5 flex justify-between items-center border-b border-[#E8E8E8] py-2">
                        <Typography variant={'small'}>
                            <span className="font-medium">
                                Pending Requests
                            </span>
                        </Typography>
                        <Typography variant={'small'}>
                            {sector?.AwaitingAgreementSigned}
                        </Typography>
                    </div>
                    {/* <div className="flex justify-between items-center border-b border-[#E8E8E8] py-2">
                        <Typography variant={'small'}>
                            <span className="font-medium">Expired Student</span>
                        </Typography>
                        <Typography variant={'small'}>
                            {sector?.totalStudents}
                        </Typography>
                    </div> */}
                    <div className="flex justify-between items-center border-b border-[#E8E8E8] py-2">
                        <Typography variant={'small'}>
                            <span className="font-medium">
                                Industry Partners
                            </span>
                        </Typography>
                        <Typography variant={'small'}>
                            {sector?.PartnerIndustries}
                        </Typography>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#E8E8E8] py-2">
                        <Typography variant={'small'}>
                            <span className="font-medium"> New Students</span>
                        </Typography>
                        <Typography variant={'small'}>
                            {sector?.newStudents}
                        </Typography>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#E8E8E8] py-2">
                        <Typography variant={'small'}>
                            <span className="font-medium">
                                Placement Started Students
                            </span>
                        </Typography>
                        <Typography variant={'small'}>
                            {sector?.placementStarted}
                        </Typography>
                    </div>

                    <div className="mt-4">
                        <Typography variant={'small'}>
                            <span className="font-bold">Detail</span>
                        </Typography>

                        <div className="mt-2">
                            {sector?.courses?.map((course: any, i: number) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center border-b border-[#E8E8E8] py-2"
                                >
                                    <Typography variant={'small'}>
                                        <span className="font-medium">
                                            {course?.title}
                                        </span>
                                    </Typography>
                                    <Typography variant={'small'}>
                                        {course?.studentCount}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </a>
        </Link>
    )
}
