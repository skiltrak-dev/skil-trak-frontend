import {
    Badge,
    Button,
    Card,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { useContextBar } from '@hooks'
import {
    Activity,
    AlertCircle,
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    FileText,
    Handshake,
    Link as LinkIcon,
    Mail,
    MessageSquare,
    Monitor,
    Send,
    Video,
    XCircle,
    Zap,
} from 'lucide-react'
import { ReactElement, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { AttachIndustryModal, CloseEnquiryModal } from '../modal'
import { AdminApi } from '@queries'
import { PremiumFeatureTypes } from '@partials/rto-v2/dashboard/enum'
import { GetStatusBadge } from '../components'

export const ViewEnquiryCB = ({
    selectedEnquiry,
}: {
    selectedEnquiry: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const contextBar = useContextBar()

    const getRtoEnquiryDetail = AdminApi.RtoEnquiry.getRtoEnquiryDetail(
        Number(selectedEnquiry?.id),
        {
            skip: !selectedEnquiry?.id,
        }
    )

    const iconMap: Record<string, any> = {
        [PremiumFeatureTypes.ExpertIndustryConsultation]: Handshake,
        [PremiumFeatureTypes.MouLegalService]: FileText,
        [PremiumFeatureTypes.AdvancedSimulationTools]: Monitor,
        [PremiumFeatureTypes.ProfessionalIndustrySpeaker]: Video,
    }
    const getStatusBadge = (status: string) => {
        const config: Record<
            string,
            { color: string; label: string; icon: any }
        > = {
            pending: { color: '#F7A619', label: 'New', icon: Clock },
            'in-progress': {
                color: '#0D5468',
                label: 'In Progress',
                icon: Send,
            },
            matched: { color: '#52c41a', label: 'Matched', icon: CheckCircle },
            closed: { color: '#8c8c8c', label: 'Closed', icon: XCircle },
        }

        const s = config[status] || config.pending
        const Icon = () => <s.icon size={12} />

        return (
            <Badge
                text={s.label}
                variant="primary"
                Icon={Icon}
                className="gap-1 text-white bg-primary"
            />
        )
    }

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

    const Icon = iconMap[selectedEnquiry?.premiumFeature?.type] || FileText
    const priority = getPriorityIndicator(selectedEnquiry.dateSubmitted)
    const PriorityIcon = priority.icon

    const onCloseContext = () => {
        contextBar.setContent(null)
        contextBar.hide()
        contextBar.setContextWidth('')
    }

    const onCancel = () => setModal(null)

    const onCloseEnquiry = () => {
        setModal(
            <CloseEnquiryModal
                onClose={onCancel}
                enquiryId={getRtoEnquiryDetail?.data?.id}
            />
        )
    }
    const onAttachIndustryClick = () => {
        setModal(
            <AttachIndustryModal
                onClose={onCancel}
                enquiryId={getRtoEnquiryDetail?.data?.id}
                premiumFeatureId={getRtoEnquiryDetail?.data?.premiumFeature?.id}
            />
        )
    }

    return (
        <>
            {modal}
            <div className="w-full sm:max-w-2xl overflow-y-auto !p-2">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-start gap-4">
                        <div
                            className="p-4 rounded-xl flex-shrink-0"
                            style={{
                                backgroundColor: `${priority.color}15`,
                            }}
                        >
                            <Icon
                                className="h-8 w-8"
                                style={{
                                    color: priority.color,
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <div>
                                <Typography variant="title" semibold>
                                    {selectedEnquiry?.rto?.user?.name}
                                </Typography>
                                <MdCancel
                                    onClick={() => {
                                        onCloseContext()
                                    }}
                                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <GetStatusBadge
                                    status={selectedEnquiry?.status}
                                />
                                <Badge
                                    text={`${priority.label} Priority`}
                                    variant="primary"
                                    outline
                                    Icon={() => <PriorityIcon size={11} />}
                                    className="bg-primary-light/40"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {getRtoEnquiryDetail?.isError ? (
                    <NoData isError text="There is some technical issue!" />
                ) : null}
                {getRtoEnquiryDetail?.isLoading ||
                getRtoEnquiryDetail?.isFetching ? (
                    <LoadingAnimation />
                ) : getRtoEnquiryDetail?.data &&
                  getRtoEnquiryDetail?.isSuccess ? (
                    <div className="mt-8 space-y-6">
                        {/* Service Details Card */}
                        <Card className="border-2 border-[#0D5468]/20">
                            <div className="pb-3">
                                <Typography
                                    variant="title"
                                    className="flex items-center gap-2 text-[#0D5468]"
                                >
                                    <FileText className="h-4 w-4" />
                                    Service Details
                                </Typography>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="text-[#8c8c8c]"
                                        >
                                            Service Type
                                        </Typography>
                                        <p className="text-sm text-[#262626] mt-1">
                                            {
                                                selectedEnquiry?.premiumFeature
                                                    ?.type
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="text-[#8c8c8c]"
                                        >
                                            Submitted
                                        </Typography>
                                        <p className="text-sm text-[#262626] mt-1">
                                            {new Date(
                                                selectedEnquiry?.createdAt
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                                {selectedEnquiry?.timeLine && (
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="text-[#8c8c8c]"
                                        >
                                            Preferred Timeline
                                        </Typography>
                                        <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5 text-[#F7A619]" />
                                            {selectedEnquiry?.timeLine}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* RTO Information */}
                        <Card className="!bg-primary/5 border-[#F7A619]/30 space-y-3">
                            <div className="pb-3">
                                <Typography
                                    variant="title"
                                    className="flex items-center gap-2 text-[#F7A619]"
                                >
                                    <Building2 className="h-4 w-4" />
                                    RTO Information
                                </Typography>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Typography
                                        variant="small"
                                        className="text-[#8c8c8c]"
                                    >
                                        Organization Name
                                    </Typography>
                                    <p className="text-sm text-[#262626] mt-1">
                                        {selectedEnquiry?.rto?.user?.name}
                                    </p>
                                </div>

                                <div>
                                    <Typography
                                        variant="small"
                                        className="text-[#8c8c8c]"
                                    >
                                        Email Address
                                    </Typography>
                                    <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                                        <Mail className="h-3.5 w-3.5 text-[#F7A619]" />
                                        {selectedEnquiry?.rto?.user?.email}
                                    </p>
                                </div>
                                {selectedEnquiry.contactPersonName && (
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="text-[#8c8c8c]"
                                        >
                                            Contact Person
                                        </Typography>
                                        <p className="text-sm text-[#262626] mt-1">
                                            {selectedEnquiry.contactPersonName}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Requirements */}
                        {selectedEnquiry?.summary && (
                            <Card className="border space-y-3">
                                <div className="pb-3">
                                    <Typography
                                        variant="title"
                                        className="text-base flex items-center gap-2"
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        Requirements & Details
                                    </Typography>
                                </div>
                                <div>
                                    <p className="text-sm text-[#262626] leading-relaxed whitespace-pre-line">
                                        {selectedEnquiry?.summary}
                                    </p>
                                </div>
                            </Card>
                        )}

                        {/* Attached Industry */}
                        {getRtoEnquiryDetail?.data?.industry && (
                            <Card className="!bg-secondary border border-[#0D5468]/30">
                                <div className="pb-3">
                                    <Typography
                                        variant="h4"
                                        className="flex items-center gap-2 text-[#0D5468]"
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                        Matched Industry Partner
                                    </Typography>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="text-[#8c8c8c]"
                                        >
                                            Company Name
                                        </Typography>
                                        <p className="text-sm text-[#262626] mt-1">
                                            {
                                                getRtoEnquiryDetail?.data
                                                    ?.industry?.user?.name
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="text-[#8c8c8c]"
                                        >
                                            Contact Email
                                        </Typography>
                                        <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 text-[#0D5468]" />
                                            {
                                                getRtoEnquiryDetail?.data
                                                    ?.industry?.user?.email
                                            }
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <Button
                                            variant="primaryNew"
                                            text="Send Update Email"
                                            Icon={Mail}
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Closure Information */}
                        {selectedEnquiry.status === 'closed' && (
                            <Card className="bg-[#8c8c8c]/5 border-[#8c8c8c]/30">
                                <div className="pb-3">
                                    <Typography
                                        variant="h4"
                                        className="flex items-center gap-2 text-[#8c8c8c]"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Closure Information
                                    </Typography>
                                </div>
                                <div className="space-y-3">
                                    {selectedEnquiry.closedDate && (
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="text-[#8c8c8c]"
                                            >
                                                Closed Date
                                            </Typography>
                                            <p className="text-sm text-[#262626] mt-1">
                                                {new Date(
                                                    selectedEnquiry.closedDate
                                                ).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    )}
                                    {selectedEnquiry.closedBy && (
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="text-[#8c8c8c]"
                                            >
                                                Closed By
                                            </Typography>
                                            <p className="text-sm text-[#262626] mt-1">
                                                {selectedEnquiry.closedBy}
                                            </p>
                                        </div>
                                    )}
                                    {selectedEnquiry.notes && (
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="text-[#8c8c8c]"
                                            >
                                                Notes
                                            </Typography>
                                            <p className="text-sm text-[#262626] mt-1 whitespace-pre-line">
                                                {selectedEnquiry.notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}

                        {/* Admin Actions */}
                        {selectedEnquiry.status !== 'closed' && (
                            <Card className="border-2">
                                <div className="pb-3">
                                    <Typography
                                        variant="h4"
                                        className="text-base"
                                    >
                                        Admin Actions
                                    </Typography>
                                </div>
                                <div className="space-y-3">
                                    {!selectedEnquiry.attachedIndustry && (
                                        <Button
                                            text="Attach Industry Partner"
                                            Icon={LinkIcon}
                                            variant="primaryNew"
                                            fullWidth
                                            onClick={() =>
                                                onAttachIndustryClick()
                                            }
                                        />
                                    )}

                                    <Button
                                        text="Close Enquiry"
                                        Icon={XCircle}
                                        variant="secondary"
                                        fullWidth
                                        onClick={() => onCloseEnquiry()}
                                    />
                                </div>
                            </Card>
                        )}
                    </div>
                ) : getRtoEnquiryDetail?.isSuccess ? (
                    <NoData text="No Enquiry was found" />
                ) : null}
            </div>
        </>
    )
}
