import { useState } from 'react'

import {
    Badge,
    Button,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@components/ui/tooltip'
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    Clock,
    Info,
} from 'lucide-react'
import {
    DecisionPanel,
    DetailedView,
    ProgressIndicator,
    QuickSummary,
} from './components'
import { RtoV2Api } from '@queries'
import { useRouter } from 'next/router'

export const PlacementApprovalDetail = () => {
    const [status, setStatus] = useState<'waiting' | 'approved' | 'rejected'>(
        'waiting'
    )
    const [showDetails, setShowDetails] = useState(true)

    const router = useRouter()

    const approvalRequestDetail =
        RtoV2Api.ApprovalRequest.approvalRequestDetail(
            Number(router?.query?.id),
            {
                skip: !router?.query?.id,
            }
        )

    // Mock data for the industry account
    const industryAccount = {
        organizationName: 'Sunnydale Community Care Services',
        tradingName: 'Sunnydale Care',
        abn: '12 345 678 901',
        industrySector: 'Community Services & Aged Care',
        address: '45 Care Street, Melbourne VIC 3000',
        website: 'https://www.sunnydalecare.com.au',
        email: 'placements@sunnydalecare.com.au',
        phone: '(03) 9876 5432',
        primaryContact: 'Sarah Mitchell',
        bio: 'Sunnydale Community Care Services is a leading provider of aged care and disability support services in metropolitan Melbourne. We serve over 200 clients across multiple programs, offering in-home care, day programs, and community support services to individuals with diverse needs.',
    }

    const handleApprove = () => {
        setStatus('approved')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleReject = () => {
        setStatus('rejected')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const StatusBadge = () => {
        if (status === 'waiting') {
            return <Badge Icon={Clock} text="Awaiting Your Review"></Badge>
        }
        if (status === 'approved') {
            return <Badge Icon={CheckCircle2} text="Approved"></Badge>
        }
        return (
            <Badge
                Icon={AlertCircle}
                text="Rejected"
                className="bg-red-500 text-white hover:bg-red-500/90 px-4 py-1.5"
            ></Badge>
        )
    }

    return (
        <>
            {approvalRequestDetail.isError && <TechnicalError />}
            {approvalRequestDetail.isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : approvalRequestDetail?.data &&
              approvalRequestDetail?.isSuccess ? (
                <TooltipProvider>
                    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
                        {/* Header */}
                        <div className="bg-[#044866] text-white sticky top-0 z-50 shadow-2xl border-b-4 border-[#F7A619]">
                            <div className="container mx-auto px-4 md:px-6 py-5 md:py-6">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className="p-2.5 hover:bg-white/20 rounded-lg transition-all hover:scale-105 flex-shrink-0 border border-white/20">
                                                    <ArrowLeft className="w-5 h-5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Back to Dashboard</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <div className="min-w-0">
                                            <div className="text-xs md:text-sm text-white/90 mb-1 flex items-center gap-2">
                                                Industry Profile Review
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Info className="w-3.5 h-3.5 text-white/70 hover:text-white" />
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs">
                                                        <p>
                                                            Review all workplace
                                                            information and make
                                                            your approval
                                                            decision
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <h1 className="text-white truncate">
                                                {
                                                    industryAccount.organizationName
                                                }
                                            </h1>
                                        </div>
                                    </div>
                                    <StatusBadge />
                                </div>

                                {/* Progress Indicator */}
                                <div className="mt-5 md:mt-6">
                                    <ProgressIndicator
                                        currentStep={
                                            status === 'waiting'
                                                ? 6
                                                : status === 'approved'
                                                ? 7
                                                : 6
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status Alert */}
                        <div className="container mx-auto px-4 md:px-6 mt-4 md:mt-6 animate-fade-in">
                            {status === 'waiting' && (
                                <div className="px-2 rounded-md border-2 border-[#F7A619] bg-gradient-to-r from-[#F7A619]/10 to-amber-50 shadow-md py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#F7A619] rounded-full flex items-center justify-center flex-shrink-0 animate-pulse shadow-lg shadow-[#F7A619]/30">
                                            <Clock className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-slate-900">
                                                <strong className="text-[#044866]">
                                                    Action Required:
                                                </strong>{' '}
                                                Review all workplace information
                                                and make your approval decision
                                                below.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {status === 'approved' && (
                                <div className="px-2 rounded-md border-2 border-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100/50 shadow-md py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                                            <CheckCircle2 className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-emerald-900">
                                                <strong>
                                                    Workplace Approved:
                                                </strong>{' '}
                                                This placement will proceed to
                                                Industry Confirmation for final
                                                acceptance.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {status === 'rejected' && (
                                <div className="px-2 rounded-md border-2 border-red-500 bg-gradient-to-r from-red-50 to-red-100/50 shadow-md py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
                                            <AlertCircle className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-red-900">
                                                <strong>
                                                    Workplace Rejected:
                                                </strong>{' '}
                                                SkilTrak has been notified and
                                                will search for an alternative
                                                placement option.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Main Content */}
                        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
                            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                                {/* Left Column - Quick Info */}
                                <div className="lg:col-span-2 space-y-6">
                                    <QuickSummary data={industryAccount} />

                                    {!showDetails ? (
                                        <div className="animate-scale-in">
                                            <Button
                                                onClick={() =>
                                                    setShowDetails(true)
                                                }
                                                className="w-full bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white h-14 md:h-16 shadow-lg hover:shadow-xl transition-all group text-base md:text-lg"
                                            >
                                                <span>
                                                    View Detailed Information
                                                </span>
                                                <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-0.5 transition-transform" />
                                            </Button>
                                            <p className="text-center text-sm text-slate-600 mt-3">
                                                Explore compliance checklists,
                                                supervisor qualifications, and
                                                placement requirements
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="animate-slide-in-right">
                                            <DetailedView
                                                data={industryAccount}
                                            />
                                            <Button
                                                onClick={() => {
                                                    setShowDetails(false)
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth',
                                                    })
                                                }}
                                                variant="primaryNew"
                                                className="w-full mt-6 border-2 h-12 text-base hover:bg-slate-50"
                                                outline
                                            >
                                                <ChevronDown className="w-5 h-5 mr-2 rotate-180" />
                                                Hide Detailed Information
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column - Decision Panel */}
                                <div className="lg:col-span-1">
                                    <div className="lg:sticky lg:top-32 space-y-4">
                                        <DecisionPanel
                                            status={status}
                                            onApprove={handleApprove}
                                            onReject={handleReject}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TooltipProvider>
            ) : (
                approvalRequestDetail?.isSuccess && (
                    <EmptyData
                        title={'No Approved Student!'}
                        description={
                            'You have not approved any Student request yet'
                        }
                        height={'50vh'}
                    />
                )
            )}
        </>
    )
}
