import { InitialAvatar } from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { HiCurrencyDollar } from 'react-icons/hi2'
import { MdLocationOn } from 'react-icons/md'

export const RelatedJobCard = ({
    title,
    industry,
    address,
    salaryFrom,
    salaryTo,
    sectorName,
    suburb,
    sectors,
}: any) => {
    return (
        <div className="bg-white rounded-lg shadow-md w-full border min-h-[180px]">
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-1 px-4 pt-4">
                    <div title={title}>
                        <Typography variant="title">
                            {title?.length <= 40
                                ? title
                                : title?.substr(0, 40) + '...' || 'N/A'}
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
                                name={
                                    industry?.businessName ||
                                    industry?.user?.name ||
                                    'N/A'
                                }
                                imageUrl="#"
                            />
                        </div>
                        <div>
                            <Typography variant="small">
                                {industry?.businessName ||
                                    industry?.user?.name ||
                                    'N/A'}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="border-b border"></div>
                <div className="flex flex-col gap-y-2 px-4 pb-4 min-h-[80px]">
                    {/* Address and Salary Flex */}
                    <div className="flex items-center gap-x-8">
                        <div className="flex gap-x-2 items-start">
                            <div>
                                <MdLocationOn className="text-blue-400" />
                            </div>
                            <div className="" title={suburb}>
                                <Typography variant="small">
                                    {suburb?.length <= 14
                                        ? suburb
                                        : suburb?.substr(0, 14) + '...' ||
                                          'N/A'}
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
                    </div>
                    <div className="flex flex-wrap whitespace-nowrap gap-2">
                        {sectors?.map((sector: any, index: any) => (
                            <span
                                title={sector?.name}
                                key={index}
                                className="py-0.5 px-2 text-xs rounded-full border text-center text-blue-400 border-blue-400"
                            >
                                {sector?.name?.length <= 8
                                    ? sector?.name
                                    : sector?.name?.substr(0, 8) + '...' ||
                                      'N/A'}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
