import {
    AlertTriangle,
    BarChart3,
    BookOpen,
    Building2,
    Bus,
    Calendar,
    CheckCircle2,
    Heart,
    MapPin,
    Shield,
    Sparkles,
    Target,
    TrendingUp,
    Users,
    X
} from 'lucide-react'
import { useState } from 'react'

interface MatchingCriteria {
    id: number
    title: string
    icon: any
    status: 'passed' | 'failed'
    description: string
    score: number
}

interface WorkplaceApprovalProps {
    isVisible: boolean
    onCancel: () => void
}

export const WPProcessingList = () => {
    const [hoveredCriteria, setHoveredCriteria] = useState<number | null>(null)

    // Enhanced matching criteria results with scores
    const matchingResults: MatchingCriteria[] = [
        {
            id: 1,
            title: 'Location Analysis',
            icon: MapPin,
            status: 'passed',
            description: 'Found workplaces within preferred distance',
            score: 95,
        },
        {
            id: 2,
            title: 'Schedule Matching',
            icon: Calendar,
            status: 'passed',
            description: 'Compatible availability found',
            score: 88,
        },
        {
            id: 3,
            title: 'Transport Access',
            icon: Bus,
            status: 'failed',
            description: 'Limited public transport options',
            score: 45,
        },
        {
            id: 4,
            title: 'Partnership Status',
            icon: CheckCircle2,
            status: 'passed',
            description: 'Verified partnership confirmed',
            score: 100,
        },
        {
            id: 5,
            title: 'Capacity Check',
            icon: Users,
            status: 'passed',
            description: 'Available positions confirmed',
            score: 92,
        },
        {
            id: 6,
            title: 'Workplace Type',
            icon: Building2,
            status: 'passed',
            description: 'Matching workplace categories found',
            score: 85,
        },
        {
            id: 7,
            title: 'Course Alignment',
            icon: BookOpen,
            status: 'failed',
            description: 'Partial course alignment only',
            score: 62,
        },
        {
            id: 8,
            title: 'Partnership Quality',
            icon: Heart,
            status: 'passed',
            description: 'High-quality partnerships identified',
            score: 94,
        },
        {
            id: 9,
            title: 'Insurance & Safety',
            icon: Shield,
            status: 'passed',
            description: 'Compliance requirements met',
            score: 100,
        },
        {
            id: 10,
            title: 'Final Matching',
            icon: Target,
            status: 'passed',
            description: 'Successful preference synthesis',
            score: 89,
        },
    ]

    const passedCriteria = matchingResults.filter(
        (c) => c.status === 'passed'
    ).length
    const failedCriteria = matchingResults.filter(
        (c) => c.status === 'failed'
    ).length
    const averageScore = Math.round(
        matchingResults.reduce((sum, c) => sum + c.score, 0) /
            matchingResults.length
    )

    return (
        <>
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-15px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0) scale(1);
                    }
                }

                @keyframes spinSlow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes pulseCustom {
                    0%,
                    100% {
                        transform: scale(1);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                }

                @keyframes bounceGentle {
                    0%,
                    100% {
                        transform: scale(1) rotate(0deg);
                    }
                    25% {
                        transform: scale(1.05) rotate(-10deg);
                    }
                    75% {
                        transform: scale(1.05) rotate(10deg);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        max-height: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        max-height: 1000px;
                        transform: translateY(0);
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out;
                }
                .animate-fadeInLeft {
                    animation: fadeInLeft 0.4s ease-out forwards;
                }
                .animate-spinSlow {
                    animation: spinSlow 20s linear infinite;
                }
                .animate-pulseCustom {
                    animation: pulseCustom 2s ease-in-out infinite;
                }
                .animate-bounceGentle {
                    animation: bounceGentle 0.5s ease-in-out;
                }
                .animate-slideDown {
                    animation: slideDown 0.4s ease-in-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .stagger-1 {
                    animation-delay: 0.08s;
                }
                .stagger-2 {
                    animation-delay: 0.16s;
                }
                .stagger-3 {
                    animation-delay: 0.24s;
                }
                .stagger-4 {
                    animation-delay: 0.32s;
                }
                .stagger-5 {
                    animation-delay: 0.4s;
                }
                .stagger-6 {
                    animation-delay: 0.48s;
                }
                .stagger-7 {
                    animation-delay: 0.56s;
                }
                .stagger-8 {
                    animation-delay: 0.64s;
                }
                .stagger-9 {
                    animation-delay: 0.72s;
                }
                .stagger-10 {
                    animation-delay: 0.8s;
                }

                .delay-100 {
                    animation-delay: 0.1s;
                }
                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-500 {
                    animation-delay: 0.5s;
                }
                .delay-800 {
                    animation-delay: 0.8s;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }

                .float-delayed {
                    animation: float 3s ease-in-out infinite;
                    animation-delay: 1s;
                }
            `}</style>

            <div className="w-full max-w-3xl mx-auto space-y-4 animate-fadeInUp">
                {/* Enhanced Matching Analysis Section */}
                <div className="animate-fadeInUp delay-100">
                    <div className="border-0 shadow-lg bg-white/95 backdrop-blur-md relative overflow-hidden rounded-md p-0.5">
                        {/* Floating gradient orbs */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-teal-500/20 rounded-full blur-xl animate-float"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-teal-700/20 to-orange-500/20 rounded-full blur-lg float-delayed"></div>

                        <div className="p-2 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md animate-spinSlow">
                                            <BarChart3 className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-pulseCustom"></div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-teal-700 mb-1">
                                            AI Matching Analysis
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-teal-600 animate-fadeInUp delay-300">
                                                {passedCriteria} of{' '}
                                                {matchingResults.length}{' '}
                                                criteria successfully matched
                                            </p>
                                            <div className="animate-scaleIn delay-500">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-500 to-teal-700 text-white border-0 shadow-md">
                                                    <Sparkles className="h-2 w-2 mr-1" />
                                                    {averageScore}% Overall
                                                    Score
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="hover:scale-105 transition-transform duration-200">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300 shadow-sm">
                                                <CheckCircle2 className="h-2 w-2 mr-1" />
                                                {passedCriteria} Matched
                                            </span>
                                        </div>
                                        <div className="hover:scale-105 transition-transform duration-200">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-300 shadow-sm">
                                                <X className="h-2 w-2 mr-1" />
                                                {failedCriteria} Alternative
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Collapsible Results */}
                    <div className="animate-slideDown overflow-hidden">
                        <div className="border-0 shadow-lg bg-white/95 backdrop-blur-md mt-3 relative overflow-hidden rounded-md p-0.5">
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 10px 10px, rgb(20 184 166) 1px, transparent 0)`,
                                        backgroundSize: '20px 20px',
                                    }}
                                ></div>
                            </div>

                            <div className="p-4 relative z-10">
                                <div className="space-y-2 max-h-[50vh] overflow-auto custom-scrollbar">
                                    {matchingResults.map((criteria, index) => {
                                        const Icon = criteria.icon
                                        const isPassed =
                                            criteria.status === 'passed'
                                        const staggerClass = `stagger-${
                                            index + 1
                                        }`

                                        return (
                                            <div
                                                key={criteria.id}
                                                className={`group relative flex items-center justify-between p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-101 hover:-translate-y-0.5 animate-fadeInLeft ${staggerClass} ${
                                                    isPassed
                                                        ? 'bg-gradient-to-r from-green-50 to-green-50/50 border-green-200 hover:from-green-100 hover:to-green-100/50 hover:border-green-300 hover:shadow-md'
                                                        : 'bg-gradient-to-r from-red-50 to-red-50/50 border-red-200 hover:from-red-100 hover:to-red-100/50 hover:border-red-300 hover:shadow-md'
                                                }`}
                                                onMouseEnter={() =>
                                                    setHoveredCriteria(
                                                        criteria.id
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setHoveredCriteria(null)
                                                }
                                            >
                                                {/* Progress indicator */}
                                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-current to-transparent opacity-30"></div>

                                                <div className="flex items-center gap-3 flex-1">
                                                    <div
                                                        className={`relative p-2 rounded-lg shadow-sm transition-transform duration-300 ${
                                                            hoveredCriteria ===
                                                            criteria.id
                                                                ? 'animate-bounceGentle'
                                                                : ''
                                                        } ${
                                                            isPassed
                                                                ? 'bg-green-100'
                                                                : 'bg-red-100'
                                                        }`}
                                                    >
                                                        <Icon
                                                            className={`h-3 w-3 ${
                                                                isPassed
                                                                    ? 'text-green-600'
                                                                    : 'text-red-600'
                                                            }`}
                                                        />

                                                        {/* Floating sparkles on hover */}
                                                        {hoveredCriteria ===
                                                            criteria.id && (
                                                            <div className="absolute -top-0.5 -right-0.5 animate-scaleIn">
                                                                <Sparkles className="h-2 w-2 text-orange-500" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex-1">
                                                        <h4
                                                            className={`font-semibold text-sm mb-0.5 ${
                                                                isPassed
                                                                    ? 'text-green-800'
                                                                    : 'text-red-800'
                                                            }`}
                                                        >
                                                            {criteria.title}
                                                        </h4>
                                                        <p
                                                            className={`text-xs transition-opacity duration-200 ${
                                                                hoveredCriteria ===
                                                                criteria.id
                                                                    ? 'opacity-100'
                                                                    : 'opacity-80'
                                                            } ${
                                                                isPassed
                                                                    ? 'text-green-600'
                                                                    : 'text-red-600'
                                                            }`}
                                                        >
                                                            {
                                                                criteria.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {/* Score indicator */}
                                                    <div className="text-center hover:scale-110 transition-transform duration-200">
                                                        <div
                                                            className={`text-sm font-bold ${
                                                                isPassed
                                                                    ? 'text-green-700'
                                                                    : 'text-red-700'
                                                            }`}
                                                        >
                                                            {criteria.score}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Score
                                                        </div>
                                                    </div>

                                                    <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                                                                isPassed
                                                                    ? 'bg-green-100 text-green-800 border border-green-300'
                                                                    : 'bg-red-100 text-red-800 border border-red-300'
                                                            }`}
                                                        >
                                                            {isPassed ? (
                                                                <>
                                                                    <CheckCircle2 className="h-2 w-2 mr-1" />
                                                                    Matched
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <AlertTriangle className="h-2 w-2 mr-1" />
                                                                    Alternative
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Enhanced Summary */}
                                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-50 via-white to-orange-500/10 border border-green-200 relative overflow-hidden animate-fadeInUp delay-800">
                                    <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-lg animate-float"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className="animate-spinSlow">
                                                <TrendingUp className="h-3 w-3 text-orange-500" />
                                            </div>
                                            <h4 className="text-sm font-bold text-teal-700">
                                                Analysis Summary
                                            </h4>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div className="text-center p-2 rounded-lg bg-white/50 border border-green-200 hover:scale-105 transition-transform duration-200">
                                                <div className="text-lg font-bold text-green-600 mb-0.5">
                                                    {passedCriteria}
                                                </div>
                                                <div className="text-xs text-green-700">
                                                    Criteria Matched
                                                </div>
                                            </div>
                                            <div className="text-center p-2 rounded-lg bg-white/50 border border-orange-300 hover:scale-105 transition-transform duration-200">
                                                <div className="text-lg font-bold text-orange-500 mb-0.5">
                                                    {averageScore}%
                                                </div>
                                                <div className="text-xs text-teal-600">
                                                    Overall Score
                                                </div>
                                            </div>
                                            <div className="text-center p-2 rounded-lg bg-white/50 border border-teal-300 hover:scale-105 transition-transform duration-200">
                                                <div className="text-lg font-bold text-teal-600 mb-0.5">
                                                    {failedCriteria}
                                                </div>
                                                <div className="text-xs text-teal-700">
                                                    Alternatives Found
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-xs text-teal-600 mt-2 text-center animate-fadeInUp delay-1000">
                                            Our AI has successfully identified
                                            high-quality workplace matches with
                                            strong compatibility scores.
                                            {failedCriteria > 0 &&
                                                ' Alternative solutions have been implemented for unmatched criteria.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
