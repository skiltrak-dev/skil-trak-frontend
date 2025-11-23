import { AlertCircle, Sparkles } from 'lucide-react'

export function ActionBanner() {
    return (
        <div className="mt-3.5 relative overflow-hidden bg-gradient-to-r from-[#F7A619]/10 via-[#F7A619]/5 to-transparent border-l-4 border-[#F7A619] rounded-2xl p-3.5 shadow-lg hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#F7A619]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F7A619] to-[#F7A619]/80 flex items-center justify-center shadow-xl shadow-[#F7A619]/30">
                            <AlertCircle className="w-4.5 h-4.5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#044866] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs">2</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-slate-900 text-[15px]">
                                Action Required: You have 2 pending documents
                            </p>
                            <Sparkles className="w-3 h-3 text-[#F7A619]" />
                        </div>
                        <p className="text-sm text-slate-600">
                            Please review and complete the outstanding documents
                            to stay on track
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
