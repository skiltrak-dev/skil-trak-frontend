import React from 'react'
import { PulseLoader } from 'react-spinners'

export const CountCard = ({ card }: { card: any }) => {
    return (
        <div
            className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-lg p-3 hover:shadow-xl ${card.borderHoverColor} transition-all`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${card?.shadowColor} group-hover:scale-110 transition-transform`}
                    style={{
                        background: `linear-gradient(to bottom right, ${card?.gradientFrom}, ${card?.gradientTo})`,
                    }}
                >
                    <card.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-slate-600 text-xs">{card?.label}</p>
                    <p className="text-2xl text-slate-900">
                        {card?.loading ? <PulseLoader size={4} /> : card?.value}
                    </p>
                </div>
            </div>
        </div>
    )
}
