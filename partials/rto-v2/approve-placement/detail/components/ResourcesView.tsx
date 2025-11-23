import { Card, LoadingAnimation, NoData } from '@components'
import { IndustryApi } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import {
    Construction,
    Download,
    FileText,
    Image as ImageIcon,
} from 'lucide-react'
import moment from 'moment'

export function ResourcesView({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) {
    const gallery = IndustryApi.Gallery.industryGallery(
        {
            userId: Number(approval?.industry?.user?.id),
        },
        {
            skip: !approval?.industry?.user?.id,
        }
    )

    const infoCards = [
        {
            title: 'Using Additional Resources',
            description:
                'When available, these resources should be considered alongside formal checklists and placement requirements when assessing workplace suitability.',
            cardClassName: 'bg-blue-50 border-2 border-blue-200',
            titleClassName: 'text-blue-900',
            textClassName: 'text-blue-800',
        },
        {
            title: 'Privacy & Confidentiality',
            description:
                'All materials are subject to privacy requirements. No identifiable client information is included in any uploaded documents.',
            cardClassName: 'bg-purple-50 border-2 border-purple-200',
            titleClassName: 'text-purple-900',
            textClassName: 'text-purple-800',
        },
    ]

    return (
        <div className="space-y-3">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-xl border-2 border-amber-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30 animate-scale-in">
                        <Construction className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-amber-900 text-sm">
                            Feature Rolling Out Soon
                        </h3>
                        <p className="text-[13px] text-amber-800 leading-relaxed">
                            SkilTrak is deploying a dedicated resources folder
                            for Industry Accounts. Once available, host
                            employers and RTOs can store and view supporting
                            materials including brochures, facility photos, and
                            program documentation.
                        </p>
                    </div>
                </div>
            </div>

            <Card className="border-2 border-slate-100">
                <div className="bg-slate-50">
                    <div className="text-[#044866] text-sm flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Preview: Available Resources
                    </div>
                    <p className="text-[13px] text-slate-600 mt-2">
                        Example resources that will be accessible once this
                        feature is fully deployed
                    </p>
                </div>
                <div className="pt-5">
                    <div className="space-y-3">
                        {gallery?.isError && (
                            <NoData
                                isError
                                text="There is some technical error!"
                            />
                        )}
                        {gallery?.isLoading || gallery?.isFetching ? (
                            <LoadingAnimation size={80} />
                        ) : gallery?.data &&
                          gallery?.data?.length > 0 &&
                          gallery?.isSuccess ? (
                            gallery?.data?.map((resource: any) => (
                                <div
                                    key={resource?.id}
                                    className="group flex items-center justify-between p-2 border-2 border-slate-100 rounded-lg hover:border-[#044866]/20 hover:bg-slate-50 transition-all"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-10 h-10 bg-[#044866]/5 rounded-lg flex items-center justify-center group-hover:bg-[#044866]/10 transition-colors">
                                            {resource?.category ===
                                            'Facility Images' ? (
                                                <ImageIcon className="w-4 h-4 text-[#044866]" />
                                            ) : (
                                                <FileText className="w-4 h-4 text-[#044866]" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-slate-900 text-sm mb-1">
                                                {resource?.title}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {
                                                    resource?.file
                                                        ?.split('.')
                                                        ?.reverse()[0]
                                                }{' '}
                                                • {resource?.fileSize} MB •
                                                Uploaded{' '}
                                                {moment(
                                                    resource?.createdAt
                                                ).format('MMM DD, YYYY')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="p-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-colors opacity-50 "
                                            onClick={() => {
                                                window.open(resource?.file)
                                            }}
                                        >
                                            <Download className="w-4 h-4 text-slate-400" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            gallery?.isSuccess && (
                                <NoData text="There is no gallery found!" />
                            )
                        )}
                    </div>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
                {infoCards.map((card) => (
                    <Card
                        key={card.title}
                        className={`${card.cardClassName} space-y-1`}
                    >
                        <h4 className={`text-sm ${card.titleClassName}`}>
                            {card.title}
                        </h4>
                        <p
                            className={`text-sm leading-relaxed ${card.textClassName}`}
                        >
                            {card.description}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    )
}
