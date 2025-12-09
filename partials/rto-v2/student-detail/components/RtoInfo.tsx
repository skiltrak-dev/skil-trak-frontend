import { InitialAvatar } from '@components'
import { RtoApi } from '@queries'
import React from 'react'

export const RtoInfo = () => {
    const rtoProfile = RtoApi.Rto.useProfile()

    const rtoCoordinator = rtoProfile?.data?.subadmin?.find(
        (subadmin: any) => subadmin?.isAssociatedWithRto
    )

    return (
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
            <div className="w-full mx-auto px-[13.25px] sm:px-[19.87px] lg:px-[26.5px] py-[13.25px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[9.94px]">
                        <div className="w-[33.12px] h-[33.12px] rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20">
                            <span className="text-white text-[14.9px]">📚</span>
                        </div>
                        <div>
                            <h1 className="text-slate-900 text-[19.87px]">
                                {rtoProfile?.data?.user?.name || '---'}
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
                                {rtoCoordinator?.user?.name || '---'}
                            </p>
                        </div>
                        {rtoCoordinator?.user?.name && (
                            <InitialAvatar
                                imageUrl={rtoCoordinator?.user?.avatar}
                                name={rtoCoordinator?.user?.name || '---'}
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
