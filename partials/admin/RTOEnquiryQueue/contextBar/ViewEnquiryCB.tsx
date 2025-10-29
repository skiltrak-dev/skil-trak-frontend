import {
    ActionButton,
    Badge,
    Button,
    Card,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { DocumentsView, useContextBar } from '@hooks'
import {
    Activity,
    AlertCircle,
    Briefcase,
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    FileCheck,
    FileText,
    Handshake,
    Link as LinkIcon,
    Mail,
    MessageSquare,
    Monitor,
    Paperclip,
    Send,
    User,
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
import { getSectors } from '@utils'
import { Course } from '@types'
import {
    AdvancedSimulationRoomOtherDetails,
    ProfessionalWebinarPlatformOtherDetail,
    ServiceDetail,
} from './components'
import { DetailViewCard } from './cards'
import moment from 'moment'

export const ViewEnquiryCB = ({
    selectedEnquiry,
}: {
    selectedEnquiry: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const contextBar = useContextBar()

    const { onFileClicked, documentsViewModal } = DocumentsView()

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
            {documentsViewModal}
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
                                        {
                                            getRtoEnquiryDetail?.data?.rto?.user
                                                ?.name
                                        }
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
                                        {
                                            getRtoEnquiryDetail?.data?.rto?.user
                                                ?.email
                                        }
                                    </p>
                                </div>
                                {getRtoEnquiryDetail?.data
                                    .contactPersonName && (
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="text-[#8c8c8c]"
                                        >
                                            Contact Person
                                        </Typography>
                                        <p className="text-sm text-[#262626] mt-1">
                                            {
                                                getRtoEnquiryDetail?.data
                                                    .contactPersonName
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Card>
                        {/* Your Contact Details */}
                        <Card className="!bg-[#F7A619]/5 border-[#F7A619]/30 !py-6">
                            <div className="pb-3">
                                <div className="flex items-center gap-2 text-[#F7A619] font-bold">
                                    <User className="h-4 w-4" />
                                    Your Contact Details
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-[#8c8c8c]">
                                        Person making this enquiry
                                    </label>
                                    <p className="text-sm text-[#262626] mt-1">
                                        {
                                            getRtoEnquiryDetail?.data
                                                ?.contactPersonName
                                        }
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-[#8c8c8c]">
                                            Role
                                        </label>
                                        <p className="text-sm text-[#262626] mt-1">
                                            {getRtoEnquiryDetail?.data?.role}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-[#8c8c8c]">
                                            Email
                                        </label>
                                        <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                                            <Mail className="h-3.5 w-3.5 text-[#F7A619]" />
                                            {getRtoEnquiryDetail?.data?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        {/* Service Details */}
                        <Card className="border-2 border-[#0D5468]/20">
                            <div className="pb-3">
                                <div className="flex items-center gap-2 text-[#0D5468] font-bold">
                                    <Briefcase className="h-4 w-4" />
                                    Course Details
                                </div>
                                <p className="text-xs text-[#8c8c8c] mt-1">
                                    Please provide the following information
                                </p>
                            </div>
                            <div className="space-y-4">
                                {Object.entries(
                                    getSectors(
                                        getRtoEnquiryDetail?.data?.courses
                                    )
                                )?.map(
                                    ([sector, courses]: any, idx: number) => {
                                        console.log({
                                            sector: getRtoEnquiryDetail?.data
                                                ?.courses,
                                        })
                                        return (
                                            <div
                                                key={idx}
                                                className="space-y-2"
                                            >
                                                <h4 className="text-[#262626]">
                                                    {sector}
                                                </h4>
                                                <ul className="space-y-1 pl-4">
                                                    {courses?.map(
                                                        (
                                                            course: Course,
                                                            qIdx: number
                                                        ) => (
                                                            <li
                                                                key={qIdx}
                                                                className="text-sm text-[#595959] flex items-start gap-2"
                                                            >
                                                                <FileCheck className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#0D5468]" />
                                                                <span>
                                                                    {
                                                                        course?.title
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                    }
                                )}

                                {getRtoEnquiryDetail?.data?.description && (
                                    <div className="pt-4 border-t">
                                        <label className="text-xs text-[#8c8c8c]">
                                            Description
                                        </label>
                                        <p className="text-sm text-[#262626] leading-relaxed mt-2 whitespace-pre-line">
                                            {
                                                getRtoEnquiryDetail?.data
                                                    ?.description
                                            }
                                        </p>
                                        <p className="text-xs text-[#8c8c8c] mt-2">
                                            {
                                                getRtoEnquiryDetail?.data
                                                    ?.description?.length
                                            }
                                            /1000 characters
                                        </p>
                                    </div>
                                )}

                                {getRtoEnquiryDetail?.data?.timeLine && (
                                    <div className="pt-2">
                                        <label className="text-xs text-[#8c8c8c]">
                                            Select timeline
                                        </label>
                                        <p className="text-sm text-[#262626] mt-1 flex items-center gap-2">
                                            <Calendar className="h-3.5 w-3.5 text-[#0D5468]" />
                                            {
                                                getRtoEnquiryDetail?.data
                                                    ?.timeLine
                                            }
                                        </p>
                                    </div>
                                )}

                                {getRtoEnquiryDetail?.data?.attachments &&
                                    getRtoEnquiryDetail?.data?.attachments
                                        .length > 0 && (
                                        <div className="pt-2">
                                            <label className="text-xs text-[#8c8c8c] mb-2 block">
                                                Upload files
                                            </label>
                                            <div className="space-y-2">
                                                {getRtoEnquiryDetail?.data?.attachments?.map(
                                                    (
                                                        file: string,
                                                        fIdx: number
                                                    ) => (
                                                        <div
                                                            key={fIdx}
                                                            className="flex items-center justify-between gap-2 text-sm text-[#262626] bg-[#f0f2f5] px-3 py-2 rounded"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Paperclip className="h-4 w-4 text-[#0D5468]" />
                                                                <span>
                                                                    File
                                                                </span>
                                                            </div>
                                                            <ActionButton
                                                                text="View File"
                                                                onClick={() =>
                                                                    onFileClicked(
                                                                        {
                                                                            file: file
                                                                                .replaceAll(
                                                                                    '{"',
                                                                                    ''
                                                                                )
                                                                                .replaceAll(
                                                                                    '"}',
                                                                                    ''
                                                                                ),
                                                                            extension:
                                                                                file
                                                                                    ?.split(
                                                                                        '.'
                                                                                    )
                                                                                    ?.reverse()[0],
                                                                            type: 'all',
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </Card>

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
                        {getRtoEnquiryDetail?.data.status === 'closed' && (
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
                                    {getRtoEnquiryDetail?.data.closedDate && (
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="text-[#8c8c8c]"
                                            >
                                                Closed Date
                                            </Typography>
                                            <p className="text-sm text-[#262626] mt-1">
                                                {new Date(
                                                    getRtoEnquiryDetail?.data.closedDate
                                                ).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    )}
                                    {getRtoEnquiryDetail?.data.closedBy && (
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="text-[#8c8c8c]"
                                            >
                                                Closed By
                                            </Typography>
                                            <p className="text-sm text-[#262626] mt-1">
                                                {
                                                    getRtoEnquiryDetail?.data
                                                        .closedBy
                                                }
                                            </p>
                                        </div>
                                    )}
                                    {getRtoEnquiryDetail?.data.notes && (
                                        <div>
                                            <Typography
                                                variant="small"
                                                className="text-[#8c8c8c]"
                                            >
                                                Notes
                                            </Typography>
                                            <p className="text-sm text-[#262626] mt-1 whitespace-pre-line">
                                                {
                                                    getRtoEnquiryDetail?.data
                                                        .notes
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}
                        {/* Admin Actions */}
                        {getRtoEnquiryDetail?.data.status !== 'closed' && (
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
                                    {!getRtoEnquiryDetail?.data
                                        .attachedIndustry && (
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
