import { InitialAvatar } from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import { Card } from '@components/cards'
import Image from 'next/image'
import Link from 'next/link'
import { HiCurrencyDollar } from 'react-icons/hi2'
import { MdLocationOn } from 'react-icons/md'

export const RecentJobCard = ({
    title,
    industry,
    salaryFrom,
    salaryTo,
    sectorName,
    suburb,
    description,
    id,
    sectors,
}: any) => {
    console.log('home page sectors', sectors)

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm">
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-1 px-4 pt-4">
                        <div title="title">
                            <Typography variant="title">
                                {title.length <= 40
                                    ? title
                                    : title.substr(0, 40) + '...'}
                            </Typography>
                        </div>
                        <div className="flex items-center flex-row gap-x-2">
                            <div>
                                {/* <Image
                                    className="rounded-full"
                                    src={avatar}
                                    alt="avatar"
                                    width={40}
                                    height={40}
                                /> */}
                                <InitialAvatar
                                    name={industry?.user?.name || 'N/A'}
                                    imageUrl="#"
                                />
                            </div>
                            <div>
                                <Typography variant="small">
                                    {industry?.user?.name}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border"></div>
                    <div className="flex flex-col gap-y-2 px-4 pb-4">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <MdLocationOn className="text-blue-400" />
                            </div>
                            <div title={suburb}>
                                <Typography variant="small">
                                    {suburb.length <= 14
                                        ? suburb
                                        : suburb.substr(0, 14) + '...'}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <HiCurrencyDollar className="text-blue-400" />
                            </div>
                            <div className="flex items-center ">
                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <strong>{salaryFrom}</strong>{' '}
                                        <Typography
                                            variant="muted"
                                            color="text-gray-300"
                                        >
                                            AUD
                                        </Typography>
                                    </div>
                                </div>
                                <strong className="mx-2">-</strong>
                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <strong>{salaryTo}</strong>{' '}
                                        <Typography
                                            variant="muted"
                                            color="text-gray-300"
                                        >
                                            AUD
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 h-12" title={description}>
                                <Typography
                                    variant="small"
                                    color="text-gray-400"
                                >
                                    {description.length <= 100
                                        ? description
                                        : description.substr(0, 100) + '...'}
                                </Typography>
                            </div>

                            {sectors?.map(({ sector, index }: any) => (
                                <span
                                    key={index}
                                    className="py-0.5 px-2 text-xs rounded-full border text-center text-blue-400 border-blue-400"
                                >
                                    {sector?.name || 'N/A'}
                                </span>
                            ))}
                        </div>

                        <div>
                            <Link
                                href={`/jobs/${id}`}
                                className="text-orange-400 font-bold text-xs"
                            >
                                View Job
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
