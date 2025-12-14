import { Badge } from "@components"
import { BadgeState } from "../types"

interface CompanyBadgesProps {
    badges: BadgeState
    onToggleBadge: (badgeType: 'verified' | 'premium' | 'topRated') => void
}

export function CompanyBadges({ badges, onToggleBadge }: CompanyBadgesProps) {
    return (
        <div className="flex items-center gap-1 flex-wrap mb-1">
            {badges.verified && (
                <Badge
                    onClick={() => onToggleBadge('verified')}
                    className="px-1.5 py-0.5 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-full text-[8px] font-medium shadow-lg shadow-[#10B981]/20 border border-[#10B981]/20 hover:from-[#059669] hover:to-[#10B981] transition-all active:scale-95 cursor-pointer h-auto"
                >
                    ✓ Verified Partner
                </Badge>
            )}
            {badges.premium && (
                <Badge
                    onClick={() => onToggleBadge('premium')}
                    className="px-1.5 py-0.5 bg-gradient-to-r from-[#F7A619] to-[#EA580C] text-white rounded-full text-[8px] font-medium shadow-lg shadow-[#F7A619]/20 hover:from-[#EA580C] hover:to-[#F7A619] transition-all active:scale-95 cursor-pointer h-auto"
                >
                    ⭐ Premium Member
                </Badge>
            )}
            {badges.topRated && (
                <Badge
                    onClick={() => onToggleBadge('topRated')}
                    className="px-1.5 py-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-full text-[8px] font-medium shadow-lg shadow-[#8B5CF6]/20 hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all active:scale-95 cursor-pointer h-auto"
                >
                    🏆 Top Rated
                </Badge>
            )}
            {!badges.verified && !badges.premium && !badges.topRated && (
                <span className="text-[8px] text-[#94A3B8] italic">
                    No badges active
                </span>
            )}
        </div>
    )
}
