import { useState } from 'react'
import { FaCodeBranch, FaMobileAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
export const BranchDot = ({ branch }: any) => {
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
                <div className="flex items-center gap-x-2">
                    <FaCodeBranch className="text-slate-200" />
                    <p className="text-[11px] text-slate-300 whitespace-nowrap">
                        {branch?.user?.name}
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdEmail className="text-slate-200" />
                    <p className="text-xs font-medium text-slate-200 whitespace-nowrap">
                        {branch?.user?.email}
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    <FaMobileAlt className="text-slate-200" />
                    <p className="text-xs font-medium text-slate-200 whitespace-nowrap">
                        {branch?.phoneNumber}
                    </p>
                </div>
                <div className="flex items-center gap-x-2">
                    <MdLocationOn className="text-slate-200" />
                    <p className="text-xs font-medium text-slate-200 whitespace-nowrap">
                        {branch?.suburb}
                    </p>
                </div>
                {/* <p className="text-[10px] font-medium text-white bg-green-500 px-1 rounded-full">
                    Active
                </p> */}
            </div>
        </div>
    )
}
