import { Badge, Button, TextInput, Typography } from '@components'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import {
    Ban,
    Building2,
    Calendar,
    Clock,
    Mail,
    MapPin,
    Sparkles,
    Star,
    TrendingUp,
    UserCircle,
    XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { BranchLocationsModal } from '../../modal'
import { ContactBiographyModal } from '../ContactBiographyModal'
import { ProfileLinks, QuickActions } from './components'

export function IndustryDetailHeader() {
    const [showMenu, setShowMenu] = useState(false)
    const [showBranchLocations, setShowBranchLocations] = useState(false)
    const [showContactBioModal, setShowContactBioModal] = useState(false)
    const [showAddMenu, setShowAddMenu] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [showEmailVerificationModal, setShowEmailVerificationModal] =
        useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [showSnoozedDatePicker, setShowSnoozedDatePicker] = useState(false)
    const [snoozedStartDate, setSnoozedStartDate] = useState('')
    const [snoozedEndDate, setSnoozedEndDate] = useState('')
    const profileCompletion = 85
    const isPlacementReady = profileCompletion >= 90
    const [badges, setBadges] = useState({
        verified: true,
        premium: true,
        topRated: true,
    })

    const [industryStatus, setIndustryStatus] = useState({
        hiring: false,
        partner: true,
        nonPartner: false,
        snoozed: false,
        blocked: false,
        noCapacity: false,
    })

    const toggleStatus = (status: keyof typeof industryStatus) => {
        setIndustryStatus((prev) => {
            // If toggling Blocked, No Capacity, or Snoozed, ensure only one is active
            if (
                status === 'blocked' ||
                status === 'noCapacity' ||
                status === 'snoozed'
            ) {
                return {
                    ...prev,
                    blocked: status === 'blocked' ? !prev.blocked : false,
                    noCapacity:
                        status === 'noCapacity' ? !prev.noCapacity : false,
                    snoozed: status === 'snoozed' ? !prev.snoozed : false,
                }
            }
            // For other statuses (hiring, partner), toggle independently
            return {
                ...prev,
                [status]: !prev[status],
            }
        })
    }

    const branchLocations = [
        {
            name: 'Head Office',
            address: '123 Tech Street, Sydney NSW 2000',
            status: 'Primary',
            students: 45,
        },
        {
            name: 'Northern Branch',
            address: '45 Innovation Ave, North Sydney NSW 2060',
            status: 'Active',
            students: 28,
        },
        {
            name: 'Western Branch',
            address: '78 Business Rd, Parramatta NSW 2150',
            status: 'Active',
            students: 32,
        },
    ]

    const toggleBadge = (badgeType: 'verified' | 'premium' | 'topRated') => {
        setBadges((prev) => ({
            ...prev,
            [badgeType]: !prev[badgeType],
        }))
    }

    return (
        <div className="relative rounded-2xl">
            {/* Glassmorphic Card with Gradient Border */}
            <div className="relative bg-white rounded-2xl shadow-xl border border-[#E2E8F0]  group hover:shadow-2xl transition-all duration-500">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#044866]/3 via-transparent to-[#F7A619]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Premium Status Banner */}
                <div
                    className={`relative px-4 py-2 overflow-hidden rounded-t-2xl ${
                        industryStatus.blocked
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
                                <Typography
                                    variant="label"
                                    color="text-white"
                                    semibold
                                >
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
                                <Typography variant="small" color="text-white">
                                    {industryStatus.blocked
                                        ? 'This industry is currently blocked and cannot accept placements'
                                        : industryStatus.noCapacity
                                        ? 'This industry has no capacity to accept new students at this time'
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
                                            strokeDasharray={`${
                                                2 * Math.PI * 11
                                            }`}
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

                {/* Main Header Content */}
                <div className="relative px-2 py-2">
                    <div className="flex items-start justify-between">
                        {/* Left: Company Info */}
                        <div className="flex items-start gap-2">
                            {/* Company Avatar with Gradient */}
                            <div className="relative group/avatar">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#044866] via-[#0D5468] to-[#044866] rounded-lg flex items-center justify-center shadow-2xl transform group-hover/avatar:scale-110 group-hover/avatar:rotate-3 transition-all duration-300">
                                    <Building2 className="w-4 h-4 text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] rounded-full border border-white flex items-center justify-center">
                                    <svg
                                        className="w-1.5 h-1.5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center gap-1 mb-1">
                                    <Typography
                                        variant="title"
                                        color="text-[#1A2332]"
                                        semibold
                                    >
                                        TechCorp Solutions
                                    </Typography>
                                    <TrendingUp className="w-2.5 h-2.5 text-[#10B981]" />
                                </div>

                                {/* Status Badges - Modern Pills */}
                                <div className="flex items-center gap-1 flex-wrap mb-1">
                                    {badges.verified && (
                                        <Badge
                                            onClick={() =>
                                                toggleBadge('verified')
                                            }
                                            className="px-1.5 py-0.5 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-full text-[11px] font-medium shadow-lg shadow-[#10B981]/20 border border-[#10B981]/20 hover:from-[#059669] hover:to-[#10B981] transition-all active:scale-95 cursor-pointer h-auto"
                                        >
                                            ✓ Verified Partner
                                        </Badge>
                                    )}
                                    {badges.premium && (
                                        <Badge
                                            onClick={() =>
                                                toggleBadge('premium')
                                            }
                                            className="px-1.5 py-0.5 bg-gradient-to-r from-[#F7A619] to-[#EA580C] text-white rounded-full text-[11px] font-medium shadow-lg shadow-[#F7A619]/20 hover:from-[#EA580C] hover:to-[#F7A619] transition-all active:scale-95 cursor-pointer h-auto"
                                        >
                                            ⭐ Premium Member
                                        </Badge>
                                    )}
                                    {badges.topRated && (
                                        <Badge
                                            onClick={() =>
                                                toggleBadge('topRated')
                                            }
                                            className="px-1.5 py-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-full text-[11px] font-medium shadow-lg shadow-[#8B5CF6]/20 hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all active:scale-95 cursor-pointer h-auto"
                                        >
                                            🏆 Top Rated
                                        </Badge>
                                    )}
                                    {!badges.verified &&
                                        !badges.premium &&
                                        !badges.topRated && (
                                            <span className="text-[8px] text-[#94A3B8] italic">
                                                No badges active
                                            </span>
                                        )}
                                </div>

                                <Typography
                                    variant="xs"
                                    color="text-[#64748B]"
                                    className="flex items-center gap-1"
                                >
                                    <MapPin className="w-2 h-2" />
                                    Technology & IT Services • Sydney, NSW
                                </Typography>
                            </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex items-center gap-1">
                            {/* Favorite Button */}
                            <Button
                                onClick={() => setIsFavorite(!isFavorite)}
                                outline
                                title={
                                    isFavorite
                                        ? 'Remove from favorites'
                                        : 'Add to favorites'
                                }
                            >
                                <Star
                                    className={`w-2.5 h-2.5 ${
                                        isFavorite ? 'fill-white' : ''
                                    }`}
                                />
                                {isFavorite ? 'Favorited' : 'Favorite'}
                            </Button>

                            {/* Email Verification Button */}
                            <Button
                                onClick={() =>
                                    setShowEmailVerificationModal(true)
                                }
                                variant="success"
                                outline
                                title={
                                    emailVerified
                                        ? 'Email verified'
                                        : 'Verify email'
                                }
                            >
                                <Mail className="w-2.5 h-2.5" />
                                {emailVerified ? 'Verified' : 'Verify Email'}
                            </Button>

                            <Button
                                onClick={() => setShowContactBioModal(true)}
                                className="px-2 py-1 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] text-white rounded-lg flex items-center gap-1 transition-all shadow-lg hover:shadow-xl active:scale-95 text-[10px] font-medium h-auto"
                            >
                                <UserCircle className="w-2.5 h-2.5" />
                                Contact & Bio
                            </Button>
                            <Button
                                onClick={() => setShowBranchLocations(true)}
                                variant="secondary"
                                className="px-2 py-1 bg-white hover:bg-[#F8FAFB] text-[#044866] border border-[#044866]/10 hover:border-[#044866]/30 rounded-lg flex items-center gap-1 transition-all hover:shadow-lg active:scale-95 text-[10px] font-medium h-auto"
                            >
                                <MapPin className="w-2.5 h-2.5" />
                                Branch Locations
                                <span className="text-[8px] bg-[#044866]/10 text-[#044866] px-1 py-0.5 rounded-full font-bold">
                                    {branchLocations.length}
                                </span>
                            </Button>

                            {/* Add Menu Dropdown */}
                            <ProfileLinks />
                        </div>
                    </div>
                </div>

                {/* Industry Status Buttons - Enhanced Design */}
                <QuickActions
                    industryStatus={industryStatus}
                    toggleStatus={toggleStatus}
                />
            </div>

            {/* Branch Locations Modal */}
            <BranchLocationsModal
                showBranchLocations={showBranchLocations}
                setShowBranchLocations={setShowBranchLocations}
            />

            {/* Contact & Biography Modal */}
            <ContactBiographyModal
                isOpen={showContactBioModal}
                onClose={() => setShowContactBioModal(false)}
            />

            {/* Email Verification Modal */}
            <Dialog
                open={showEmailVerificationModal}
                onOpenChange={setShowEmailVerificationModal}
            >
                <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-0">
                    <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-white font-bold">
                                    Email Verification
                                </DialogTitle>
                                <p className="text-white/80 text-xs">
                                    Verify your industry contact email
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-6">
                        {!emailVerified ? (
                            <>
                                <div className="mb-6">
                                    <div className="bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] rounded-xl p-4 border border-[#B8D9E8] mb-4">
                                        <p className="text-sm text-[#1A2332] mb-2">
                                            <strong>Email:</strong>{' '}
                                            industry@techcorp.com
                                        </p>
                                        <p className="text-xs text-[#64748B]">
                                            We've sent a verification code to
                                            this email address. Please enter it
                                            below.
                                        </p>
                                    </div>

                                    <TextInput
                                        label="Verification Code"
                                        name="verificationCode"
                                        id="verificationCode"
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e: any) =>
                                            setVerificationCode(e.target.value)
                                        }
                                        placeholder="Enter 6-digit code"
                                        className="w-full px-4 py-3 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] border border-[#E2E8F0] rounded-xl text-lg font-mono text-center text-[#1A2332] placeholder-[#94A3B8] hover:border-[#044866]/30 focus:outline-none focus:ring-2 focus:ring-[#044866]/20 focus:border-[#044866] transition-all"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={() => {
                                            if (verificationCode.length === 6) {
                                                setEmailVerified(true)
                                                setTimeout(
                                                    () =>
                                                        setShowEmailVerificationModal(
                                                            false
                                                        ),
                                                    1500
                                                )
                                            }
                                        }}
                                        className="flex-1 px-4 py-3 bg-gradient-to-br from-[#10B981] to-[#059669] hover:shadow-lg text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={verificationCode.length !== 6}
                                    >
                                        <Mail className="w-4 h-4" />
                                        Verify Email
                                    </Button>
                                    <Button
                                        onClick={() => setVerificationCode('')}
                                        variant="secondary"
                                        className="px-4 py-3 bg-white hover:bg-[#F8FAFB] border border-[#E2E8F0] text-[#64748B] rounded-xl font-medium transition-all duration-300 h-auto"
                                    >
                                        Resend Code
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <svg
                                        className="w-8 h-8 text-white"
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
                                </div>
                                <h3 className="font-bold text-[#1A2332] mb-2">
                                    Email Verified!
                                </h3>
                                <p className="text-sm text-[#64748B]">
                                    Your email address has been successfully
                                    verified.
                                </p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Snoozed Date Picker Modal */}
            <Dialog
                open={showSnoozedDatePicker}
                onOpenChange={setShowSnoozedDatePicker}
            >
                <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-0">
                    <DialogHeader className="bg-gradient-to-r from-[#044866] to-[#0D5468] p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle className="text-white font-bold">
                                    Snoozed Date Picker
                                </DialogTitle>
                                <p className="text-white/80 text-xs">
                                    Select the start and end dates for snoozing
                                </p>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="p-6">
                        <div className="mb-4">
                            <TextInput
                                label="Start Date"
                                name="startDate"
                                id="startDate"
                                type="date"
                                value={snoozedStartDate}
                                onChange={(e: any) =>
                                    setSnoozedStartDate(e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <TextInput
                                label="End Date"
                                name="endDate"
                                id="endDate"
                                type="date"
                                value={snoozedEndDate}
                                onChange={(e: any) =>
                                    setSnoozedEndDate(e.target.value)
                                }
                                className="w-full px-4 py-3 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] border border-[#E2E8F0] rounded-xl text-sm text-[#1A2332] placeholder-[#94A3B8] hover:border-[#044866]/30 focus:outline-none focus:ring-2 focus:ring-[#044866]/20 focus:border-[#044866] transition-all"
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => {
                                    // Handle snoozed date selection
                                    toggleStatus('snoozed')
                                    setShowSnoozedDatePicker(false)
                                }}
                                className="flex-1 px-4 py-3 bg-gradient-to-br from-[#10B981] to-[#059669] hover:shadow-lg text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 h-auto"
                            >
                                <Calendar className="w-4 h-4" />
                                Set Dates
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
