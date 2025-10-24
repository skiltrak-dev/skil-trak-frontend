import { Badge } from '@components/Badge/Badge'
import { Button } from '@components/buttons/Button/Button'
import { Card } from '@components/cards/Card/Card'
import {
    Activity,
    AlertCircle,
    CheckCircle,
    Clock,
    Eye,
    FileText,
    Handshake,
    Link as LinkIcon,
    Monitor,
    Send,
    Video,
    XCircle,
    Zap,
} from 'lucide-react'
// import { toast } from 'react-hot-toast'
import { useContextBar } from '@hooks'
import { motion } from 'framer-motion'
import { ViewEnquiryCB } from '../contextBar'
import { GetStatusBadge } from '../components'
import moment from 'moment'
import { PremiumFeatureTypes } from '@partials/rto-v2/dashboard/enum'

export const EnquiryCard = ({ enquiry }: { enquiry: any }) => {
    const contextBar = useContextBar()

    const getPriorityIndicator = (dateSubmitted: string) => {
        const daysOld = Math.floor(
            (new Date().getTime() - new Date(dateSubmitted).getTime()) /
                (1000 * 60 * 60 * 24)
        )
        if (daysOld > 7) return { color: '#ff4d4f', label: 'Urgent', icon: Zap }
        if (daysOld > 3)
            return { color: '#F7A619', label: 'High', icon: AlertCircle }
        return { color: '#52c41a', label: 'Normal', icon: Activity }
    }

    const iconMap: Record<string, any> = {
        [PremiumFeatureTypes.ExpertIndustryConsultation]: Handshake,
        [PremiumFeatureTypes.MouLegalService]: FileText,
        [PremiumFeatureTypes.AdvancedSimulationTools]: Monitor,
        [PremiumFeatureTypes.ProfessionalIndustrySpeaker]: Video,
    }

    const Icon = iconMap[enquiry?.premiumFeature?.type] || FileText
    const priority = getPriorityIndicator(enquiry.dateSubmitted)

    const onViewEnquiryCB = (enquiry: any) => {
        contextBar.show()
        contextBar.setContent(<ViewEnquiryCB selectedEnquiry={enquiry} />)
        contextBar.setContextWidth('min-w-[600px] max-w-[650px]')
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
        >
            <div
                onClick={() => {
                    onViewEnquiryCB(enquiry)
                }}
            >
                <Card
                    className={`group hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 hover:border-l-[#0D5468] ${
                        enquiry.status === 'pending'
                            ? 'border-l-[#F7A619]'
                            : 'border-l-transparent'
                    }`}
                >
                    <div className="p-4">
                        <div className="grid grid-cols-12 gap-3 items-center">
                            {/* Icon */}
                            <div className="col-span-1">
                                <div
                                    className="p-2 rounded-lg w-fit"
                                    style={{
                                        backgroundColor: `${priority.color}15`,
                                    }}
                                >
                                    <Icon
                                        className="h-4 w-4"
                                        style={{ color: priority.color }}
                                    />
                                </div>
                            </div>

                            {/* RTO Name + Service Type */}
                            <div className="col-span-3 min-w-0">
                                <p className="text-sm text-[#262626] truncate">
                                    {enquiry?.rto?.user?.name}
                                </p>
                                <p className="text-xs text-[#8c8c8c] truncate">
                                    {enquiry?.premiumFeature?.type}
                                </p>
                            </div>

                            {/* Status + Match */}
                            <div className="col-span-2 flex flex-col gap-1">
                                <GetStatusBadge status={enquiry?.status} />
                                {/* {enquiry.attachedIndustry && (
                                    <Badge
                                        text="Matched"
                                        variant="info"
                                        outline
                                        Icon={() => <LinkIcon size={12} />}
                                        className="gap-1 text-primaryNew bg-gray-100 w-fit"
                                    />
                                )} */}
                            </div>

                            {/* Requirements */}
                            <div className="col-span-3 min-w-0">
                                <p className="text-sm text-[#8c8c8c] truncate">
                                    {enquiry.summary || 'No additional details'}
                                </p>
                            </div>

                            {/* Industry Partner / Email */}
                            <div className="col-span-2 min-w-0">
                                {enquiry?.industry ? (
                                    <>
                                        <p className="text-sm text-[#0D5468] truncate">
                                            {enquiry?.industry?.user?.name}
                                        </p>
                                        <p className="text-xs text-[#8c8c8c] truncate">
                                            {enquiry?.industry?.user?.email}
                                        </p>
                                    </>
                                ) : enquiry?.email ? (
                                    <p className="text-sm text-[#8c8c8c] truncate">
                                        {enquiry?.email}
                                    </p>
                                ) : (
                                    <p className="text-sm text-[#8c8c8c]">-</p>
                                )}
                            </div>

                            {/* Time + Timeline + Action */}
                            <div className="col-span-1 flex flex-col items-end gap-1">
                                <p className="text-xs text-[#8c8c8c] whitespace-nowrap">
                                    {moment(enquiry?.createdAt).fromNow()}
                                </p>
                                {enquiry?.timeline && (
                                    <p className="text-xs text-[#8c8c8c] truncate">
                                        {enquiry?.timeline}
                                    </p>
                                )}
                                <Button
                                    variant="secondary"
                                    mini
                                    Icon={Eye}
                                    onClick={() => {
                                        onViewEnquiryCB(enquiry)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </motion.div>
    )
}
