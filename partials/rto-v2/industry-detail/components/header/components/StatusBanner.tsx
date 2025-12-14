import { Ban, XCircle, Clock, Sparkles } from 'lucide-react'
import { IndustryStatus } from '../types'
import { Typography } from '@components'
import { useAppSelector } from '@redux/hooks'
import { UserStatus } from '@types'

interface StatusBannerProps {
    industryStatus: IndustryStatus
    profileCompletion: number
    isPlacementReady: boolean
    snoozedStartDate: string
    snoozedEndDate: string
    capacityAvailableDate: string
}

export function StatusBanner({
    industryStatus,
    profileCompletion,
    isPlacementReady,
    snoozedStartDate,
    snoozedEndDate,
    capacityAvailableDate,
}: StatusBannerProps) {
    const industryDetail = useAppSelector(
        (state) => state.industry.industryDetail
    )
    return (
        <div
            className={`relative px-4 py-2 overflow-hidden ${
                industryDetail?.user?.status === UserStatus.Blocked
                    ? 'bg-gradient-to-r from-[#EF4444] via-[#DC2626] to-[#EF4444]'
                    : industryStatus.noCapacity
                    ? 'bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#8B5CF6]'
                    : industryStatus.snoozed
                    ? 'bg-gradient-to-r from-[#F7A619] via-[#EA580C] to-[#F7A619]'
                    : isPlacementReady
                    ? 'bg-gradient-to-r from-[#10B981] via-[#059669] to-[#10B981]'
                    : 'bg-gradient-to-r from-[#F7A619] via-[#EA580C] to-[#F7A619]'
            } bg-[length:200%_100%] animate-gradient`}
        >
            {/* Animated Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center shadow-2xl border border-white/30">
                            {industryStatus.blocked ? (
                                <Ban className="w-3 h-3 text-white" />
                            ) : industryStatus.noCapacity ? (
                                <XCircle className="w-3 h-3 text-white" />
                            ) : industryStatus.snoozed ? (
                                <Clock className="w-3 h-3 text-white" />
                            ) : isPlacementReady ? (
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                <Sparkles className="w-3 h-3 text-white" />
                            )}
                        </div>
                    </div>
                    <div>
                        <Typography variant="title" color={'text-white'} bold>
                            {industryStatus.blocked
                                ? '🚫 Industry Blocked'
                                : industryStatus.noCapacity
                                ? '⭕ No Capacity Available'
                                : industryStatus.snoozed
                                ? '💤 Industry Snoozed'
                                : isPlacementReady
                                ? '✓ Placement Ready'
                                : '⚡ Complete Your Profile'}
                        </Typography>
                        <Typography variant="label" color={'text-white/95'}>
                            {industryStatus.blocked
                                ? 'This industry is currently blocked and cannot accept placements'
                                : industryStatus.noCapacity
                                ? capacityAvailableDate
                                    ? `No capacity available until ${new Date(
                                          capacityAvailableDate
                                      ).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                      })}`
                                    : 'This industry has no capacity to accept new students at this time'
                                : industryStatus.snoozed
                                ? snoozedStartDate && snoozedEndDate
                                    ? `Snoozed from ${new Date(
                                          snoozedStartDate
                                      ).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                      })} to ${new Date(
                                          snoozedEndDate
                                      ).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric',
                                      })}`
                                    : 'This industry is temporarily snoozed for placements'
                                : isPlacementReady
                                ? 'Your industry profile is optimized and ready for placements'
                                : 'Just 15% more to unlock full placement capabilities'}
                        </Typography>
                    </div>
                </div>

                {/* Circular Progress Ring - Only show when not in special states */}
                {!industryStatus.blocked &&
                    !industryStatus.noCapacity &&
                    !industryStatus.snoozed && (
                        <div className="relative w-7 h-7">
                            <svg className="w-7 h-7 transform -rotate-90">
                                <circle
                                    cx="14"
                                    cy="14"
                                    r="11"
                                    stroke="white"
                                    strokeOpacity="0.2"
                                    strokeWidth="2"
                                    fill="none"
                                />
                                <circle
                                    cx="14"
                                    cy="14"
                                    r="11"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 11}`}
                                    strokeDashoffset={`${
                                        2 *
                                        Math.PI *
                                        11 *
                                        (1 - profileCompletion / 100)
                                    }`}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000 drop-shadow-lg"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white font-bold text-[8px]">
                                    {profileCompletion}%
                                </span>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}
