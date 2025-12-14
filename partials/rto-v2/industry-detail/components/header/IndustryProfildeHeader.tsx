import { useState } from 'react'
import { ContactBiographyModal } from '../ContactBiographyModal'
import {
    ActionButtons,
    CompanyInfo,
    StatusBanner,
    StatusControls,
} from './components'
import { companyLocation, companyName, industryEmail } from './data'
import {
    BranchLocationsDialog,
    CapacityDatePickerDialog,
    EditProfileModal,
    EmailVerificationDialog,
    IndustryStatusChangeModal,
} from './modals'
import { BadgeState, IndustryStatus } from './types'
import { useAppSelector } from '@redux/hooks'

export function IndustryProfildeHeader() {
    const [showMenu, setShowMenu] = useState(false)

    const [showContactBioModal, setShowContactBioModal] = useState(false)
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showAddMenu, setShowAddMenu] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [showEmailVerificationModal, setShowEmailVerificationModal] =
        useState(false)
    const [showSnoozedDatePicker, setShowSnoozedDatePicker] = useState(false)
    const [snoozedStartDate, setSnoozedStartDate] = useState('')
    const [snoozedEndDate, setSnoozedEndDate] = useState('')
    const [showCapacityDatePicker, setShowCapacityDatePicker] = useState(false)
    const [capacityAvailableDate, setCapacityAvailableDate] = useState('')
    const [showStatusChangeModal, setShowStatusChangeModal] = useState(false)

    const profileCompletion = 85
    const isPlacementReady = profileCompletion >= 90

    const industryDetail = useAppSelector(
        (state) => state.industry.industryDetail
    )

    const [badges, setBadges] = useState<BadgeState>({
        verified: true,
        premium: true,
        topRated: true,
    })

    const [industryStatus, setIndustryStatus] = useState<IndustryStatus>({
        hiring: false,
        partner: true,
        nonPartner: false,
        snoozed: false,
        blocked: false,
        noCapacity: false,
    })

    const toggleStatus = (status: keyof IndustryStatus) => {
        setIndustryStatus((prev) => {
            // If toggling Blocked, No Capacity, or Snoozed, ensure only one is active
            if (
                status === 'blocked' ||
                status === 'noCapacity' ||
                status === 'snoozed'
            ) {
                // If turning ON No Capacity, show the date picker
                if (status === 'noCapacity' && !prev.noCapacity) {
                    setShowCapacityDatePicker(true)
                }

                // If turning OFF No Capacity, clear the date
                if (status === 'noCapacity' && prev.noCapacity) {
                    setCapacityAvailableDate('')
                }

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

    const toggleBadge = (badgeType: 'verified' | 'premium' | 'topRated') => {
        setBadges((prev) => ({
            ...prev,
            [badgeType]: !prev[badgeType],
        }))
    }

    const handleSnoozedClick = () => {
        if (!industryStatus.snoozed) {
            setShowSnoozedDatePicker(true)
        } else {
            toggleStatus('snoozed')
            setSnoozedStartDate('')
            setSnoozedEndDate('')
        }
    }

    const handleSnoozedConfirm = () => {
        toggleStatus('snoozed')
        setShowSnoozedDatePicker(false)
    }

    const handleCapacityConfirm = () => {
        if (capacityAvailableDate) {
            toggleStatus('noCapacity')
            setShowCapacityDatePicker(false)
        }
    }

    return (
        <div className="relative">
            {/* Glassmorphic Card with Gradient Border */}
            <div className="relative bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#044866]/3 via-transparent to-[#F7A619]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Premium Status Banner */}
                <StatusBanner
                    industryStatus={industryStatus}
                    profileCompletion={profileCompletion}
                    isPlacementReady={isPlacementReady}
                    snoozedStartDate={snoozedStartDate}
                    snoozedEndDate={snoozedEndDate}
                    capacityAvailableDate={capacityAvailableDate}
                />

                {/* Main Header Content */}
                <div className="relative px-2 py-2">
                    <div className="flex items-start justify-between">
                        {/* Left: Company Info */}
                        <CompanyInfo
                            companyName={companyName}
                            location={companyLocation}
                            badges={badges}
                            onToggleBadge={toggleBadge}
                        />

                        {/* Right: Action Buttons */}
                        <ActionButtons
                            emailVerified={emailVerified}
                            industryStatus={industryStatus}
                            showAddMenu={showAddMenu}
                            showMenu={showMenu}
                            branchLocationsCount={0} // Updated to 0 or dynamic if we want, but keeping it simple for now as we removed static data access here
                            onEmailVerificationClick={() =>
                                setShowEmailVerificationModal(true)
                            }
                            onEditProfileClick={() =>
                                setShowEditProfileModal(true)
                            }
                            onContactBioClick={() =>
                                setShowContactBioModal(true)
                            }
                            onToggleMenu={() => setShowMenu(!showMenu)}
                            onCloseAddMenu={() => setShowAddMenu(false)}
                            onCloseMenu={() => setShowMenu(false)}
                        />
                    </div>
                </div>

                {/* Industry Status Buttons - Enhanced Design */}
                <StatusControls
                    industryStatus={industryStatus}
                    snoozedStartDate={snoozedStartDate}
                    snoozedEndDate={snoozedEndDate}
                    capacityAvailableDate={capacityAvailableDate}
                    onToggleHiring={() => toggleStatus('hiring')}
                    onTogglePartner={() => toggleStatus('partner')}
                    onSnoozedClick={handleSnoozedClick}
                    onNoCapacityClick={() => toggleStatus('noCapacity')}
                />
            </div>

            <ContactBiographyModal
                isOpen={showContactBioModal}
                onClose={() => setShowContactBioModal(false)}
            />

            <EditProfileModal
                isOpen={showEditProfileModal}
                onClose={() => setShowEditProfileModal(false)}
            />

            <EmailVerificationDialog
                open={showEmailVerificationModal}
                emailVerified={emailVerified}
                industryEmail={industryEmail}
                onOpenChange={setShowEmailVerificationModal}
                onVerified={() => setEmailVerified(true)}
            />

            <CapacityDatePickerDialog
                open={showCapacityDatePicker}
                capacityAvailableDate={capacityAvailableDate}
                onOpenChange={setShowCapacityDatePicker}
                onDateChange={setCapacityAvailableDate}
                onConfirm={handleCapacityConfirm}
            />
        </div>
    )
}
