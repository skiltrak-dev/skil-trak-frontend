import { useState } from 'react'
import { BsFillQuestionCircleFill } from 'react-icons/bs'

import { Typography } from '@components'

export const Tooltip = ({ text }: { text: string | undefined }) => {
    const [showTooltip, setShowTooltip] = useState(false)

    return text ? (
        <div className="relative">
            <BsFillQuestionCircleFill
                className="transition-all text-muted hover:text-muted-dark cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
                <>
                    <div className="absolute top-7 mb-2 -right-3 min-w-[150px] h-auto p-2 bg-black rounded-md z-50">
                        <div className="absolute -top-[8px] right-2 h-0 w-0 border-x-8 border-x-transparent border-b-[8px] border-b-black"></div>
                        <Typography variant={'muted'} color={'text-white'}>
                            {text}
                        </Typography>
                    </div>
                </>
            )}
        </div>
    ) : null
}
