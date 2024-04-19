import classNames from 'classnames'
import React, { ReactNode } from 'react'

export enum TooltipPosition {
    left = 'left',
    right = 'right',
}

// interface Position {
//     left: boolean
//     right: boolean
// }

export const Tooltip = ({
    children,
    position,
}: {
    children: ReactNode
    position?: TooltipPosition
}) => {
    const positionClasses = classNames({
        'right-0': position === TooltipPosition.right || !position,
        'left-0': position === TooltipPosition.left,
    })
    return (
        <div
            className={`hidden group-hover:block absolute whitespace-nowrap ${positionClasses} z-50 bg-gray-700 mt-4 text-xs text-white px-3 py-1 rounded`}
        >
            {children}
        </div>
        //  <div className="hidden group-hover:block absolute whitespace-nowrap left-0 -ml-[50%] bottom-full z-50 bg-gray-700 mt-4 text-xs text-white px-3 py-1 rounded">
        //     {children}
        // </div>
    )
}
