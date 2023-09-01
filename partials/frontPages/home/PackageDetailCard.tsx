import { BackButton, Typography } from '@components'
import { useRouter } from 'next/router'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { MdHomeWork } from 'react-icons/md'

export const PackageDetailCard = ({
    onClick,
    nextPackage,
    previousPackage,
    currentPackage,
    goBack,
}: {
    currentPackage: any
    nextPackage?: any
    onClick: () => void
    previousPackage?: any
    goBack?: () => void
}) => {
    const router = useRouter()

    const classes =
        'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-gray-200 hover:text-white rounded-lg cursor-pointer'
    const Icon = (
        <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
    )
    return (
        <div
            className={`${currentPackage?.color} p-12 flex flex-col justify-center w-80 md:w-96 h-full`}
        >
            <div className={classes} onClick={goBack}>
                {Icon}
                <span className="ml-2">{'Back'}</span>
            </div>
            <div className="mb-6 md:mb-10">
                <MdHomeWork className="text-white" size={55} />
            </div>
            <div className="flex flex-col gap-y-16">
                <div className="">
                    <Typography variant="title" color="text-white">
                        {currentPackage?.content}
                    </Typography>
                    <Typography variant="subtitle" color="text-white">
                        Do it yourself
                    </Typography>
                </div>
                <div className="">
                    <Typography variant="title" color={'text-[#6BB8FF]'}>
                        {currentPackage?.price}
                    </Typography>
                    <div className="mt-2">
                        <div
                            onClick={() =>
                                router.push({
                                    pathname: '/auth/signup/rto',
                                    query: { step: 'account-info' },
                                })
                            }
                            className="px-4 py-2 cursor-pointer rounded-lg bg-[#97CCFD] text-[#094D8C] text-sm"
                        >
                            Start With This Package
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`flex justify-between items-center ${
                    previousPackage ? 'cursor-pointer' : ''
                }`}
            >
                <div
                    onClick={() => {
                        if (previousPackage) {
                            previousPackage()
                        }
                    }}
                    className="group flex items-center mt-20"
                >
                    <div className="mt-2  group-hover:-translate-x-3 transition-transform duration-300 ease-in-out">
                        <AiOutlineArrowRight
                            className={`${
                                previousPackage
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            } rotate-180`}
                        />
                    </div>
                    <div className="pl-2">
                        <Typography
                            variant="muted"
                            color={
                                previousPackage
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            }
                        >
                            View Details
                        </Typography>
                        <Typography
                            variant="xs"
                            color={
                                previousPackage
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            }
                        >
                            Package
                        </Typography>
                    </div>
                </div>

                <div
                    className={`group flex items-center mt-20 ${
                        nextPackage ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => {
                        if (nextPackage) {
                            nextPackage()
                        }
                    }}
                >
                    <div className="">
                        <Typography
                            variant="muted"
                            color={
                                nextPackage ? 'text-white' : 'text-[#ffffff60]'
                            }
                        >
                            View Details
                        </Typography>
                        <Typography
                            variant="xs"
                            color={
                                nextPackage ? 'text-white' : 'text-[#ffffff60]'
                            }
                        >
                            Package
                        </Typography>
                    </div>
                    <div className="mt-2 pl-2 group-hover:translate-x-3 transition-transform duration-300 ease-in-out">
                        <AiOutlineArrowRight
                            className={
                                nextPackage ? 'text-white' : 'text-[#ffffff60]'
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
