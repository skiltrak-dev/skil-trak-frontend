import { BookOpen, ArrowRight, TrendingUp, Target } from 'lucide-react'
import { Button, Badge } from '@components'

export function CourseOverview() {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-4.5 hover:shadow-2xl transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/30">
                        <BookOpen className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-slate-900 flex items-center gap-2">
                            My Courses
                            <Badge
                                variant="primaryNew"
                                text="3 Active"
                                size="xs"
                                className="border border-[#044866]/20"
                            />
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Track your learning progress
                        </p>
                    </div>
                </div>
                <Button
                    outline
                    variant="secondary"
                    className="border-slate-300 hover:border-[#044866] hover:text-[#044866] hover:bg-[#044866]/5 shadow-md hover:shadow-lg transition-all px-3.5 py-2 text-sm"
                >
                    View All Courses (2 more){' '}
                    <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#044866]/5 via-[#0D5468]/5 to-[#F7A619]/5 rounded-2xl p-4 border border-[#044866]/20 shadow-inner">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#044866]/10 to-transparent rounded-full blur-3xl"></div>
                <div className="relative">
                    <div className="flex items-center gap-2 mb-3.5">
                        <h3 className="text-slate-900">
                            Certificate III Individual Support
                        </h3>
                        <Badge
                            variant="primaryNew"
                            text="✓ Active"
                            size="xs"
                            className="border border-[#044866]/20 shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-3.5 text-sm text-slate-600">
                        <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/40">
                            CHC33021
                        </span>
                        <span className="flex items-center gap-1">
                            <Target className="w-3.5 h-3.5 text-[#044866]" />3
                            streams
                        </span>
                        <span className="text-slate-500">
                            Ageing & Disability
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
