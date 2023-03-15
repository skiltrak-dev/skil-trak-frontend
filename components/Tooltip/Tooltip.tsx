import React from 'react'

export const Tooltip = ({ children }: { children: any }) => {
    return (
        <div className="hidden group-hover:block absolute whitespace-nowrap right-0 z-50 bg-gray-700 mt-4 text-xs text-white px-3 py-1 rounded">
            {children}
        </div>
        //  <div className="hidden group-hover:block absolute whitespace-nowrap left-0 -ml-[50%] bottom-full z-50 bg-gray-700 mt-4 text-xs text-white px-3 py-1 rounded">
        //     {children}
        // </div>
    )
}
