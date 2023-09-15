import Image from 'next/image'
// import CountUp from 'react-countup'

import { Card } from '@components/cards'
import { PuffLoader } from 'react-spinners'
import Link from 'next/link'
import { Typography } from '@components/Typography'

type FigureCardProps = {
    imageUrl?: string | undefined
    loading?: boolean
    index: number
}

export const SectorCourseStudentCount = ({
    imageUrl,
    loading,
    index,
}: FigureCardProps) => {
    const countNumber = Math.floor(Math.random() * 9)
    return (
        <Link legacyBehavior href={''}>
            <a className="w-full">
                <Card>
                    <div className="flex justify-between">
                        <div className="flex gap-x-2">
                            {imageUrl && (
                                <div className="flex items-center gap-x-2 justify-between">
                                    <Image
                                        src={imageUrl || ''}
                                        alt={''}
                                        width={48}
                                        height={48}
                                    />
                                </div>
                            )}
                            <div>
                                <Typography variant={'label'}>
                                    <span className="font-bold">
                                        Sector Name {countNumber}
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
                                    {0}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 leading-3 uppercase">
                                Students
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Typography variant={'small'}>
                            <span className="font-bold">Detail</span>
                        </Typography>

                        <div className="mt-2">
                            {[
                                ...Array(
                                    index === 4
                                        ? 3
                                        : index === 8
                                        ? 2
                                        : index + 1
                                ),
                            ].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center border-b border-[#E8E8E8] py-2"
                                >
                                    <Typography variant={'small'}>
                                        <span className="font-medium">
                                            Comercial Cookery Services
                                        </span>
                                    </Typography>
                                    <Typography variant={'small'}>
                                        {i + 1}
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
