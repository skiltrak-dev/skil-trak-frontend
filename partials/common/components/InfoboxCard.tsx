import React from 'react'

export const InfoboxCard = ({ children }: any) => {
    return (
        <div className="border border-[#6B7280] bg-[#95C6FB26] bg-opacity-15 rounded-md py-2 px-4 flex flex-col gap-y-1">
            {children}
        </div>
    )
}
