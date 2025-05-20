import { Portal } from '@components/Portal'
import classNames from 'classnames'
import React, { ReactNode, useRef, useEffect, useState } from 'react'

export enum TooltipPosition {
    left = 'left',
    right = 'right',
    center = 'center',
}

export const Tooltip = ({
    children,
    position = TooltipPosition.right,
}: {
    children: ReactNode
    position?: TooltipPosition
}) => {
    const tooltipRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [tooltipWidth, setTooltipWidth] = useState(0)
    const [tooltipHeight, setTooltipHeight] = useState(0)

    // Create an invisible clone to measure dimensions
    useEffect(() => {
        if (!tooltipRef.current) return

        // Create a clone of the tooltip for measurement
        const clone = tooltipRef.current.cloneNode(true) as HTMLDivElement

        // Style the clone to be visible but not affect layout
        clone.style.position = 'absolute'
        clone.style.visibility = 'hidden'
        clone.style.display = 'block' // Force display block for measurement
        clone.style.top = '-9999px'
        clone.style.left = '-9999px'

        // Add to DOM temporarily
        document.body.appendChild(clone)

        // Measure dimensions
        const width = clone.offsetWidth
        const height = clone.offsetHeight

        // Save measurements
        setTooltipWidth(width)
        setTooltipHeight(height)

        // Clean up
        document.body.removeChild(clone)
    }, [children])

    // Generate position styles based on measured width
    const getPositionStyles = () => {
        if (position === TooltipPosition.left) {
            return { left: 0 }
        } else if (position === TooltipPosition.right) {
            return { right: 0 }
        } else if (position === TooltipPosition.center) {
            return { left: '50%', marginLeft: `-${tooltipWidth / 2}px` }
        }
        return {}
    }

    return (
        <div ref={containerRef} className="relative">
            <div
                ref={tooltipRef}
                className="hidden group-hover:block absolute whitespace-nowrap z-50 bg-gray-700 mt-4 text-xs text-white px-3 py-1 rounded"
                style={getPositionStyles()}
            >
                {children}
            </div>
        </div>
    )
}
