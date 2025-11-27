import { Clock, Star } from 'lucide-react'
import React from 'react'

export const StudentTimeline = () => {
    return (
        <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#044866]/5 via-[#0D5468]/5 to-transparent border border-[#044866]/20 p-3.5 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/25">
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F7A619] animate-ping"></div>
                    </div>
                    <div>
                        <p className="text-slate-900 mb-0.5">
                            Time Remaining:{' '}
                            <span className="font-medium text-[#044866]">
                                32d 11h
                            </span>{' '}
                            until December 14, 2025
                        </p>
                        <p className="text-sm text-slate-600">
                            Course completion deadline
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-[#044866]/20">
                    <Star className="w-3.5 h-3.5 text-[#044866] fill-[#044866]" />
                    <span className="text-sm text-[#044866]">On Track</span>
                </div>
            </div>
        </div>
    )
}
