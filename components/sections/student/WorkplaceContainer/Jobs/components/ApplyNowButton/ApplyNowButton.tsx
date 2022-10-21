import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'

type Props = {
    status?: 'saved' | 'unsaved'
}

export const ApplyNowButton = ({ status }: Props) => {
    const [isSaved, setIsSaved] = useState(status)
    return (
        <div>
            <div className="flex gap-x-2 items-center">
                <div
                    onClick={() => {setIsSaved(isSaved === 'saved' ? 'unsaved' : 'saved')}}
                    className={`py-[6px] px-2 ${
                        isSaved === 'saved' ? 'bg-red-600' : 'bg-white border'
                    } rounded cursor-pointer`}
                >
                    <AiFillHeart
                        className={`${
                            isSaved === 'saved' ? 'text-white' : 'text-red-600'
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
