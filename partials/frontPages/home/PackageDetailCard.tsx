import { BackButton, Typography } from '@components'
import { useRouter } from 'next/router'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { MdHomeWork } from 'react-icons/md'

export const PackageDetailCard = ({
    onNext,
    onPrevious,
    currentPackage,
    goBack,
}: {
    currentPackage: any
    onNext?: any
    onPrevious?: any
    goBack?: () => void
}) => {
    const router = useRouter()

    const classes =
        'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-gray-200 hover:text-white rounded-lg cursor-pointer'
    const Icon = (
        <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
    )

    console.log('currentPackage', currentPackage?.title)

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
                        {currentPackage?.title}
                    </Typography>
                    <Typography variant="subtitle" color="text-white">
                        {currentPackage?.tagline}
                    </Typography>
                </div>
                <div className="">
                    {/* <Typography variant="title" color={'text-[#6BB8FF]'}>
                        {currentPackage?.price}
                    </Typography> */}
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
                    currentPackage?.prevButton ? 'cursor-pointer' : ''
                }`}
            >
                <div
                    onClick={() => {
                        if (currentPackage?.prevButton) {
                            onPrevious()
                        }
                    }}
                    className="group flex items-center mt-20"
                >
                    <div className="mt-2  group-hover:-translate-x-3 transition-transform duration-300 ease-in-out">
                        <AiOutlineArrowRight
                            className={`${
                                currentPackage?.prevButton
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            } rotate-180`}
                        />
                    </div>
                    <div className="pl-2">
                        <Typography
                            variant="muted"
                            color={
                                currentPackage?.prevButton
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            }
                        >
                            {currentPackage?.prevButton}
                        </Typography>
                        <Typography
                            variant="xs"
                            color={
                                currentPackage?.prevButton
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
                        onNext ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => {
                        if (currentPackage?.nextButton) {
                            onNext()
                        }
                    }}
                >
                    <div className="">
                        <Typography
                            variant="muted"
                            color={
                                currentPackage?.nextButton
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            }
                        >
                            {currentPackage?.nextButton}
                        </Typography>
                        <Typography
                            variant="xs"
                            color={
                                currentPackage?.nextButton
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            }
                        >
                            Package
                        </Typography>
                    </div>
                    <div className="mt-2 pl-2 group-hover:translate-x-3 transition-transform duration-300 ease-in-out">
                        <AiOutlineArrowRight
                            className={
                                currentPackage?.nextButton
                                    ? 'text-white'
                                    : 'text-[#ffffff60]'
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
