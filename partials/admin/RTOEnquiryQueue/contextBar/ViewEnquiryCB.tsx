import { Badge, Card, LoadingAnimation, NoData, Typography } from '@components'
import { useContextBar } from '@hooks'
import { PremiumFeatureTypes } from '@partials/rto-v2/dashboard/enum'
import { AdminApi } from '@queries'
import {
    Activity,
    AlertCircle,
    FileText,
    Handshake,
    MessageSquare,
    Monitor,
    Video,
    Zap,
} from 'lucide-react'
import { MdCancel } from 'react-icons/md'
import { GetStatusBadge } from '../components'
import {
    AdvancedSimulationRoomOtherDetails,
    AttachedIndustryDetail,
    CloseEnquiryDetail,
    ContactDetail,
    CourseDetails,
    EnquiryActions,
    ProfessionalWebinarPlatformOtherDetail,
    RtoInfo,
    ServiceDetail,
} from './components'

export const ViewEnquiryCB = ({
    selectedEnquiry,
}: {
    selectedEnquiry: any
}) => {
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

    return (
        <>
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
                        <ServiceDetail
                            enquiryDetails={getRtoEnquiryDetail?.data}
                        />
                        {/* RTO Information */}
                        <RtoInfo enquiryDetails={getRtoEnquiryDetail?.data} />

                        {/* Your Contact Details */}
                        <ContactDetail
                            enquiryDetails={getRtoEnquiryDetail?.data}
                        />

                        {/* Service Details */}
                        <CourseDetails
                            enquiryDetails={getRtoEnquiryDetail?.data}
                        />

                        {/* Other Details */}
                        {getRtoEnquiryDetail?.data?.premiumFeature?.type ===
                            PremiumFeatureTypes.ProfessionalIndustrySpeaker && (
                            <ProfessionalWebinarPlatformOtherDetail
                                enquiryDetails={getRtoEnquiryDetail?.data}
                            />
                        )}

                        {/* Other Details */}
                        {getRtoEnquiryDetail?.data?.premiumFeature?.type ===
                            PremiumFeatureTypes.AdvancedSimulationTools && (
                            <AdvancedSimulationRoomOtherDetails
                                enquiryDetails={getRtoEnquiryDetail?.data}
                            />
                        )}

                        {/* Requirements */}
                        {getRtoEnquiryDetail?.data?.summary && (
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
                            <AttachedIndustryDetail
                                industry={getRtoEnquiryDetail?.data?.industry}
                            />
                        )}
                        {/* Closure Information */}
                        {getRtoEnquiryDetail?.data.status === 'closed' && (
                            <CloseEnquiryDetail
                                enquiryDetails={getRtoEnquiryDetail?.data}
                            />
                        )}
                        {/* Admin Actions */}
                        {getRtoEnquiryDetail?.data.status !== 'closed' && (
                            <EnquiryActions
                                enquiryDetails={getRtoEnquiryDetail?.data}
                            />
                        )}
                    </div>
                ) : getRtoEnquiryDetail?.isSuccess ? (
                    <NoData text="No Enquiry was found" />
                ) : null}
            </div>
        </>
    )
}
