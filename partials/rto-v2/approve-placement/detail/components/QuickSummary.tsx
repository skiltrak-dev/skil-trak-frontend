import { Card, LoadingAnimation, NoData, Typography } from '@components'
import { RtoV2Api } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import {
    Building2,
    MapPin,
    Globe,
    Mail,
    Phone,
    User,
    ExternalLink,
    Info,
} from 'lucide-react'

interface QuickSummaryProps {
    data: {
        organizationName: string
        tradingName?: string
        abn: string
        industrySector: string
        address: string
        website: string
        email: string
        phone: string
        primaryContact: string
        bio: string
    }
}

export function QuickSummary({ data }: { data: RtoApprovalWorkplaceRequest }) {
    const industry = data?.industry

    const industryApprovalCourse =
        RtoV2Api.ApprovalRequest.rtoApprovalRequestCourse(
            {
                industryId: industry?.id,
                courseId: Number(data?.workplaceRequest?.courses?.[0]?.id),
            },
            {
                skip:
                    !industry?.id || !data?.workplaceRequest?.courses?.[0]?.id,
            }
        )

    console.log({ industryApprovalCourse })

    const detailsData = [
        {
            icon: Building2,
            label: 'Industry Sector',
            value: data?.workplaceRequest?.courses?.[0]?.sector?.name,
        },
        {
            icon: Building2,
            label: 'ABN',
            value: industry?.abn,
        },
        {
            icon: MapPin,
            label: 'Address',
            value: industry?.addressLine1,
        },
        {
            icon: Globe,
            label: 'Website',
            value: industry?.website,
            isLink: true,
        },
        {
            icon: User,
            label: 'Primary Contact',
            value: industry?.phoneNumber,
        },
        {
            icon: Phone,
            label: 'Phone',
            value: industry?.contactPersonNumber,
        },
        {
            icon: Mail,
            label: 'Email',
            value: industry?.user?.email,
            isEmail: true,
            fullWidth: true,
        },
    ]

    return (
        <div className="space-y-1.5">
            {/* Organization Info */}
            <Card className="shadow-xl border-2 border-[#044866]/10 hover:shadow-2xl hover:border-[#044866]/20 transition-all overflow-hidden space-y-2.5">
                <div className="bg-gradient-to-r from-[#044866]/5 via-[#0D5468]/5 to-[#044866]/5 px-5 py-3 border-b-2 border-slate-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-[#044866] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[#044866] mb-0.5 truncate text-[0.95rem]">
                                {data?.industry?.user?.name}
                            </h3>
                            {data?.industry?.workplaceType && (
                                <p className="text-[0.8rem] text-slate-600">
                                    Workplace type:{' '}
                                    {data?.industry?.workplaceType?.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="space-y-2.5">
                        {/* Bio */}
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                            {industryApprovalCourse?.isError ? (
                                <NoData
                                    isError
                                    simple
                                    text="There is some technical error!"
                                />
                            ) : null}
                            {industryApprovalCourse?.isLoading ? (
                                <div>
                                    <LoadingAnimation size={25} />
                                    <Typography variant="small" semibold center>
                                        Course Info Loading...
                                    </Typography>
                                </div>
                            ) : industryApprovalCourse?.data?.description &&
                              industryApprovalCourse?.isSuccess ? (
                                <p
                                    className="text-[0.8rem] text-slate-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: industryApprovalCourse?.data
                                            ?.description,
                                    }}
                                />
                            ) : industryApprovalCourse?.isSuccess ? (
                                <NoData
                                    simple
                                    text="There is no description for the course"
                                />
                            ) : null}
                        </div>

                        {/* Key Details Grid */}
                        <div className="grid sm:grid-cols-2 gap-3 px-2.5">
                            {detailsData.map((detail, index) => {
                                const Icon = detail.icon
                                return (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-2.5 rounded-lg hover:bg-slate-50 transition-colors ${
                                            detail.fullWidth
                                                ? 'sm:col-span-2'
                                                : ''
                                        }`}
                                    >
                                        <div className="w-7 h-7 bg-[#044866]/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Icon className="w-3.5 h-3.5 text-[#0D5468]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[0.7rem] text-slate-500 mb-0.5">
                                                {detail.label}
                                            </div>
                                            {detail.isLink ? (
                                                <a
                                                    href={detail.value}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[0.8rem] text-[#044866] hover:underline inline-flex items-center gap-1"
                                                >
                                                    Visit Website
                                                    <ExternalLink className="w-2.5 h-2.5" />
                                                </a>
                                            ) : detail.isEmail ? (
                                                <a
                                                    href={`mailto:${detail.value}`}
                                                    className="text-[0.8rem] text-[#044866] hover:underline break-all"
                                                >
                                                    {detail.value}
                                                </a>
                                            ) : (
                                                <div className="text-[0.8rem] text-slate-900">
                                                    {detail.value}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Important Note */}
            <Card className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-2 border-amber-300 shadow-md">
                <div className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8.5 h-8.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                            <Info className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-amber-900 mb-1.5 text-[0.95rem]">
                                Important: Website Note
                            </h4>
                            <p className="text-[0.8rem] text-amber-900 leading-relaxed">
                                Organization websites may not always be fully
                                updated. Base your decision on the{' '}
                                <strong>full evidence in this account</strong>,
                                including compliance checklists and verified
                                documentation, not solely on the website.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
