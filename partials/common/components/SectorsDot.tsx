import { Course, Sector } from '@types'
import { useState } from 'react'

export const SectorsDot = ({ sector }: { sector: Sector }) => {
    const [overDot, setOverDot] = useState(false)
    const [overToolTip, setToolTip] = useState(false)

    return (
        <div className="relative">
            <span
                onMouseEnter={() => setOverDot(true)}
                onMouseLeave={() => setOverDot(false)}
                className="block h-2 w-2 rounded-full bg-gray-400 cursor-pointer"
            ></span>
            <div
                onMouseEnter={() => setToolTip(true)}
                onMouseLeave={() => setToolTip(false)}
                className={`bg-slate-700 px-2 py-1 rounded-md flex flex-col items-start shadow-xl min-w-[120px] top-4 absolute z-10 ${
                    overDot || overToolTip ? 'block' : 'hidden'
                }`}
            >
                <p className="text-[11px] text-slate-300 whitespace-nowrap">
                    {sector?.name}
                </p>

                <p className="text-[10px] font-medium text-white bg-green-500 px-1 rounded-full">
                    Active
                </p>
            </div>
        </div>
    )
}
