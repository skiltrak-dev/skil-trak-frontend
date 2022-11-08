import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'

type Props = {
    onClick?: any
    savedJob?: boolean
}

export const ApplyNowButton = ({ onClick, savedJob }: Props) => {
    const [isSaved, setIsSaved] = useState('')
    return (
        <div>
            <div className="flex gap-x-2 items-center">
                <div
                    onClick={() => {
                        onClick()
                    }}
                    className={`py-[6px] px-2 ${
                        savedJob ? 'bg-red-600' : 'bg-white border'
                    } rounded cursor-pointer`}
                >
                    <AiFillHeart
                        className={`${
                            savedJob ? 'text-white' : 'text-red-600'
                        }`}
                    />
                </div>
                <div className="bg-[#D3F3C6] rounded py-1.5 px-4 cursor-pointer">
                    <p className="text-[#30AF22] font-medium text-xs text-center whitespace-nowrap">
                        APPLY NOW
                    </p>
                </div>
            </div>
        </div>
    )
}
