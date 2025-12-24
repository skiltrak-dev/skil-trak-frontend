import { TrendingUp, MapPin } from 'lucide-react'
import { CompanyAvatar } from './CompanyAvatar'
import { CompanyBadges } from './CompanyBadges'
import { BadgeState } from '../types'
import { Typography } from '@components'
import { useAppSelector } from '@redux/hooks'

export function CompanyInfo() {
    const industryDetail = useAppSelector(
        (state) => state.industry.industryDetail
    )
    return (
        <div className="flex items-start gap-2">
            <CompanyAvatar />

            <div>
                <div className="flex items-center gap-1 mb-1">
                    <Typography variant="title" color={'text-[#1A2332]'} bold>
                        {industryDetail?.user?.name}
                    </Typography>
                    <TrendingUp className="w-2.5 h-2.5 text-[#10B981]" />
                </div>

                <CompanyBadges industry={industryDetail!} />

                <Typography
                    variant="small"
                    className="flex items-center gap-x-2 break"
                    color={'text-[#64748B]'}
                >
                    <MapPin className="w-3 h-3" />
                    {industryDetail?.addressLine1}
                </Typography>
            </div>
        </div>
    )
}
