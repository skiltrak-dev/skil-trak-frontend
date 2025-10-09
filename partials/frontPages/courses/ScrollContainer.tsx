// src/components/ScrollContainer.tsx
import React, { useRef } from 'react'

interface ScrollContainerProps {
    children: React.ReactNode
}

export const ScrollContainer: React.FC<ScrollContainerProps> = ({
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'up' | 'down') => {
        const container = containerRef.current
        if (container) {
            const scrollAmount = 200
            container.scrollBy({
                top: direction === 'up' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            <div
                ref={containerRef}
                className="h-full overflow-y-scroll pr-2 scroll-smooth custom-scrollbar"
            >
                {children}
            </div>

            {/* Scroll buttons */}
            <button
                onClick={() => scroll('up')}
                className="absolute top-2 right-2 bg-white rounded-full shadow p-1"
            >
                ↑
            </button>
            <button
                onClick={() => scroll('down')}
                className="absolute bottom-2 right-2 bg-white rounded-full shadow p-1"
            >
                ↓
            </button>
        </div>
    )
}
