import React from 'react'

export const RtoInfo = () => {
    return (
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-[13.25px] sm:px-[19.87px] lg:px-[26.5px] py-[13.25px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[9.94px]">
                        <div className="w-[33.12px] h-[33.12px] rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20">
                            <span className="text-white text-[14.9px]">📚</span>
                        </div>
                        <div>
                            <h1 className="text-slate-900 text-[19.87px]">
                                ITEC International
                            </h1>
                            <p className="text-slate-600 text-[11.59px] mt-[1.66px]">
                                Training & Education Counsel
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[9.94px]">
                        <div className="text-right">
                            <p className="text-[11.59px] text-slate-600">
                                Coordinator
                            </p>
                            <p className="text-slate-900 text-[13.25px]">
                                Daniel
                            </p>
                        </div>
                        <div className="w-[33.12px] h-[33.12px] rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center text-white shadow-lg shadow-[#044866]/20 ring-2 ring-white text-[13.25px]">
                            DC
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
