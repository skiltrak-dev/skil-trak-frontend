import React from 'react'
import { Typography } from '@components'

export const DocumentScrollArrow = () => {
    // return (
    //     <div className="relative cursor-pointer w-[40px] h-[20px] bg-[orange] rounded-l-lg flex items-center justify-center">
    //         <div className="absolute top-1/2 -right-[19px] transform -translate-y-1/2 border-[10px] h-full border-t-transparent border-b-transparent border-r-transparent border-[orange]"></div>
    //         <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
    //             <p className="text-sm text-white">Next</p>
    //         </div>
    //     </div>
    // )
    return (
        <div className="relative cursor-pointer w-[75px] h-[38px] bg-[orange] rounded-l-lg flex items-center justify-center">
            <div className="absolute top-1/2 -right-[37px] transform -translate-y-1/2 border-[19px] h-full border-t-transparent border-b-transparent border-r-transparent border-[orange]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <p className="text-sm text-white">Next</p>
            </div>
        </div>
    )
}
