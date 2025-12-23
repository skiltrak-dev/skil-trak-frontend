import {
    Mail,
    Edit3,
    UserCircle,
    MapPin,
    Upload,
    UserPlus,
    BookOpen,
    Ban,
    MoreVertical,
    X,
    UserCog,
    FileText,
} from 'lucide-react'
import { Button } from '@components'
import { IndustryStatus } from '../types'
import { AddMenuDropdown, MoreMenuDropdown } from '../dropdowns'
import {
    BranchLocationsDialog,
    IndustryNoteModal,
    IndustryStatusChangeModal,
} from '../modals'
import { useState } from 'react'
import { useAppSelector } from '@redux/hooks'

interface ActionButtonsProps {
    emailVerified: boolean
    industryStatus: IndustryStatus
    showAddMenu: boolean
    showMenu: boolean
    branchLocationsCount: number
    onEmailVerificationClick: () => void
    onEditProfileClick: () => void
    onContactBioClick: () => void
    onToggleMenu: () => void
    onCloseAddMenu: () => void
    onCloseMenu: () => void
}

export function ActionButtons({
    emailVerified,
    industryStatus,
    showAddMenu,
    showMenu,
    branchLocationsCount,
    onEmailVerificationClick,
    onEditProfileClick,
    onContactBioClick,

    onToggleMenu,
    onCloseAddMenu,
    onCloseMenu,
}: ActionButtonsProps) {
    const [showNoteAddModal, setShowNoteAddModal] = useState(false)
    const [showStatusChangeModal, setShowStatusChangeModal] = useState(false)
    const [showBranchLocationsDialog, setShowBranchLocationsDialog] =
        useState(false)

    const industryId = useAppSelector(
        (state) => state.industry.industryDetail?.id
    )
    const industryUserId = useAppSelector(
        (state) => state.industry.industryDetail?.user?.id
    )

    const onStatusChangeClick = () => {
        setShowStatusChangeModal(true)
    }

    const onAddNote = () => {
        setShowNoteAddModal(true)
    }

    const onBranchLocationsClick = () => {
        setShowBranchLocationsDialog(true)
    }
    return (
        <div className="flex items-center gap-1">
            {/* Email Verification Button */}
            <Button
                onClick={onEmailVerificationClick}
                className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all shadow-lg hover:shadow-xl active:scale-95 text-[10px] font-medium h-auto ${
                    emailVerified
                        ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white'
                        : 'bg-white hover:bg-[#FEF2F2] text-[#EF4444] border border-[#EF4444]/20 hover:border-[#EF4444]/40'
                }`}
                title={emailVerified ? 'Email verified' : 'Verify email'}
            >
                <Mail className="w-2.5 h-2.5" />
                {emailVerified ? 'Verified' : 'Verify Email'}
            </Button>

            <Button
                onClick={onEditProfileClick}
                className="px-2 py-1 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white rounded-lg flex items-center gap-1 transition-all shadow-lg hover:shadow-xl active:scale-95 text-[10px] font-medium h-auto"
            >
                <Edit3 className="w-2.5 h-2.5" />
                Edit Profile
            </Button>

            <Button
                onClick={onContactBioClick}
                className="px-2 py-1 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] text-white rounded-lg flex items-center gap-1 transition-all shadow-lg hover:shadow-xl active:scale-95 text-[10px] font-medium h-auto"
            >
                <UserCircle className="w-2.5 h-2.5" />
                Contact & Bio
            </Button>

            <Button
                onClick={onBranchLocationsClick}
                variant="primaryNew"
                outline
            >
                <MapPin className="w-2.5 h-2.5" />
                Branch Locations
                <span className="text-[8px] bg-[#044866]/10 text-[#044866] px-1 py-0.5 rounded-full font-bold">
                    {branchLocationsCount}
                </span>
            </Button>

            <Button
                onClick={onStatusChangeClick}
                variant="error"
                outline
                className="flex items-center gap-1"
            >
                <Ban className="w-2.5 h-2.5" />
                Blocked
            </Button>
            <Button
                onClick={onAddNote}
                variant="primary"
                outline
                className="flex items-center gap-1"
            >
                <FileText className="w-2.5 h-2.5" />
                Note
            </Button>

            {/* Add Menu Dropdown */}
            {showAddMenu && <AddMenuDropdown onClose={onCloseAddMenu} />}

            {/* <Button
                onClick={onToggleBlocked}
                className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all shadow-lg hover:shadow-xl active:scale-95 text-[10px] font-medium h-auto ${
                    industryStatus.blocked
                        ? 'bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white'
                        : 'bg-white hover:bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444]/20 hover:border-[#EF4444]/40'
                }`}
            >
                <Ban className="w-2.5 h-2.5" />
                Blocked
            </Button> */}

            {/* More Menu */}
            <div className="relative">
                <Button
                    onClick={onToggleMenu}
                    variant="primaryNew"
                    outline
                    className="px-2 py-1.5 bg-white hover:bg-[#F8FAFB] text-[#044866] border border-[#044866]/10 hover:border-[#044866]/30 rounded-lg transition-all hover:shadow-lg active:scale-95 w-auto h-auto"
                >
                    {showMenu ? (
                        <X className="w-3.5 h-3.5" />
                    ) : (
                        <MoreVertical className="w-3.5 h-3.5" />
                    )}
                </Button>

                {showMenu && <MoreMenuDropdown onClose={onCloseMenu} />}
            </div>

            <IndustryNoteModal
                open={showNoteAddModal}
                industryUserId={industryUserId!}
                onOpenChange={setShowNoteAddModal}
            />

            <IndustryStatusChangeModal
                industryId={industryId!}
                open={showStatusChangeModal}
                onOpenChange={setShowStatusChangeModal}
            />

            {/* Modals */}
            <BranchLocationsDialog
                open={showBranchLocationsDialog}
                onOpenChange={setShowBranchLocationsDialog}
            />
        </div>
    )
}
