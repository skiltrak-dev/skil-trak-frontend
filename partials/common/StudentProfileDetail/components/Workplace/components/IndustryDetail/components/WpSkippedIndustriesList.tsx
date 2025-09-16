import { LoadingAnimation, NoData, Typography } from '@components'
import { UserRoles } from '@constants'
import { SubAdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { BarChart3, Sparkles } from 'lucide-react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { MdOutlineLocalPhone } from 'react-icons/md'

export const WpSkippedIndustriesList = ({
    workplaceId,
}: {
    workplaceId: number
}) => {
    const [hoveredCriteria, setHoveredCriteria] = useState<number | null>(null)

    const router = useRouter()

    const getSkippedIndustriesList = SubAdminApi.Student.skippedIndustriesList(
        workplaceId,
        {
            skip: !workplaceId,
        }
    )

    const role = getUserCredentials()?.role

    return (
        <>
            <div className="w-full max-w-4xl lg:w-[800px] mx-auto space-y-4 animate-fadeInUp">
                {/* Enhanced Matching Analysis Section */}
                <div className="animate-fadeInUp delay-100">
                    <div className="border-0 shadow-lg bg-white/95 backdrop-blur-md relative overflow-hidden rounded-md p-0.5">
                        {/* Floating gradient orbs */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-teal-500/20 rounded-full blur-xl animate-float"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-teal-700/20 to-orange-500/20 rounded-full blur-lg float-delayed"></div>

                        <div className="p-2 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md animate-spinSlow">
                                            <BarChart3 className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-pulseCustom"></div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-teal-700 mb-1">
                                            Skipped Workplaces
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Collapsible Results */}
                    <div className="animate-slideDown overflow-hidden">
                        <div className="border-0 shadow-lg bg-white/95 backdrop-blur-md mt-3 relative overflow-hidden rounded-md p-0.5">
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 10px 10px, rgb(20 184 166) 1px, transparent 0)`,
                                        backgroundSize: '20px 20px',
                                    }}
                                ></div>
                            </div>

                            <div className="p-4 relative z-10">
                                <div className="space-y-2 max-h-[50vh] overflow-auto custom-scrollbar">
                                    {getSkippedIndustriesList?.isError && (
                                        <NoData
                                            isError
                                            text="There is some technical issue!"
                                        />
                                    )}
                                    {getSkippedIndustriesList?.isLoading ? (
                                        <LoadingAnimation />
                                    ) : getSkippedIndustriesList?.data &&
                                      getSkippedIndustriesList?.data?.length >
                                          0 &&
                                      getSkippedIndustriesList?.isSuccess ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            {getSkippedIndustriesList?.data?.map(
                                                (
                                                    wpIndustries: any,
                                                    index: number
                                                ) => {
                                                    // const Icon = criteria.icon
                                                    const isPassed =
                                                        wpIndustries.status ===
                                                        'passed'
                                                    const staggerClass = `stagger-${
                                                        index + 1
                                                    }`

                                                    return (
                                                        <div
                                                            key={
                                                                wpIndustries?.id
                                                            }
                                                            className={`group relative flex items-center justify-between p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-101 hover:-translate-y-0.5 animate-fadeInLeft ${staggerClass} ${
                                                                isPassed
                                                                    ? 'bg-gradient-to-r from-green-50 to-green-50/50 border-green-200 hover:from-green-100 hover:to-green-100/50 hover:border-green-300 hover:shadow-md'
                                                                    : 'bg-gradient-to-r from-red-50 to-red-50/50 border-red-200 hover:from-red-100 hover:to-red-100/50 hover:border-red-300 hover:shadow-md'
                                                            }`}
                                                            onMouseEnter={() =>
                                                                setHoveredCriteria(
                                                                    wpIndustries?.id
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setHoveredCriteria(
                                                                    null
                                                                )
                                                            }
                                                            onClick={() => {
                                                                router.push(
                                                                    role ===
                                                                        UserRoles.ADMIN
                                                                        ? `/portals/admin/industry/${wpIndustries?.industry?.id}`
                                                                        : role ===
                                                                          UserRoles.SUBADMIN
                                                                        ? `/portals/sub-admin/users/industries/${wpIndustries?.industry?.id}`
                                                                        : '#'
                                                                )
                                                            }}
                                                        >
                                                            {/* Progress indicator */}
                                                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-current to-transparent opacity-30"></div>

                                                            <div className="flex items-center gap-3 flex-1">
                                                                <div
                                                                    className={`relative p-2 rounded-lg shadow-sm transition-transform duration-300 ${
                                                                        hoveredCriteria ===
                                                                        wpIndustries?.id
                                                                            ? 'animate-bounceGentle'
                                                                            : ''
                                                                    } ${
                                                                        isPassed
                                                                            ? 'bg-green-100'
                                                                            : 'bg-red-100'
                                                                    }`}
                                                                >
                                                                    {/* Floating sparkles on hover */}
                                                                    {hoveredCriteria ===
                                                                        wpIndustries?.id && (
                                                                        <div className="absolute -top-0.5 -right-0.5 animate-scaleIn">
                                                                            <Sparkles className="h-2 w-2 text-orange-500" />
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="w-full space-y-0.5">
                                                                    <div className=" flex justify-between items-center gap-x-2">
                                                                        <h4
                                                                            className={`font-semibold text-sm mb-0.5 text-green-800`}
                                                                        >
                                                                            {
                                                                                wpIndustries
                                                                                    ?.industry
                                                                                    ?.user
                                                                                    ?.name
                                                                            }
                                                                        </h4>

                                                                        <div>
                                                                            <div className="flex items-center gap-x-2">
                                                                                <Typography variant="small">
                                                                                    Skipped
                                                                                    At:
                                                                                </Typography>{' '}
                                                                                <Typography variant="small">
                                                                                    {moment(
                                                                                        wpIndustries?.updatedAt
                                                                                    ).format(
                                                                                        'DD-MMM-YYYY'
                                                                                    )}
                                                                                </Typography>{' '}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-x-2">
                                                                        <MdOutlineLocalPhone />
                                                                        <Typography variant="small">
                                                                            {
                                                                                wpIndustries
                                                                                    ?.industry
                                                                                    ?.phoneNumber
                                                                            }
                                                                        </Typography>{' '}
                                                                    </div>
                                                                    <div className="flex items-center gap-x-2">
                                                                        <IoLocationSharp />
                                                                        <Typography variant="small">
                                                                            {
                                                                                wpIndustries
                                                                                    ?.industry
                                                                                    ?.addressLine1
                                                                            }
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    ) : getSkippedIndustriesList?.isSuccess ? (
                                        <NoData text="No Industry list found!" />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-15px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }

                @keyframes spinSlow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes pulseCustom {
                    0%,
                    100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                }

                @keyframes bounceGentle {
                    0%,
                    100% {
                        transform: scale(1) rotate(0deg);
                    }
                    25% {
                        transform: scale(1.05) rotate(-10deg);
                    }
                    75% {
                        transform: scale(1.05) rotate(10deg);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        max-height: 1000px;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out;
                }
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.4s ease-out forwards;
                }
                .animate-spinSlow {
                    animation: spinSlow 20s linear infinite;
                }
                .animate-pulseCustom {
                    animation: pulseCustom 2s ease-in-out infinite;
                }
                .animate-bounceGentle {
                    animation: bounceGentle 0.5s ease-in-out;
                }
                .animate-slideDown {
                    animation: slideDown 0.4s ease-in-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .stagger-1 {
                    animation-delay: 0.08s;
                }
                .stagger-2 {
                    animation-delay: 0.16s;
                }
                .stagger-3 {
                    animation-delay: 0.24s;
                }
                .stagger-4 {
                    animation-delay: 0.32s;
                }
                .stagger-5 {
                    animation-delay: 0.4s;
                }
                .stagger-6 {
                    animation-delay: 0.48s;
                }
                .stagger-7 {
                    animation-delay: 0.56s;
                }
                .stagger-8 {
                    animation-delay: 0.64s;
                }
                .stagger-9 {
                    animation-delay: 0.72s;
                }
                .stagger-10 {
                    animation-delay: 0.8s;
                }

                .delay-100 {
                    animation-delay: 0.1s;
                }
                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-500 {
                    animation-delay: 0.5s;
                }
                .delay-800 {
                    animation-delay: 0.8s;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }

                .float-delayed {
                    animation: float 3s ease-in-out infinite;
                    animation-delay: 1s;
                }
            `}</style>
        </>
    )
}
