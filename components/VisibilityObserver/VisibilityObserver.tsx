import React, { useState, useEffect, useRef, ReactNode } from 'react'

interface VisibilityObserverProps {
    children: ReactNode
    rootMargin?: string
    threshold?: number
}

export const VisibilityObserver = ({
    children,
    rootMargin = '0px',
    threshold = 0,
}: VisibilityObserverProps) => {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting)
                })
            },
            {
                rootMargin,
                threshold,
            }
        )

        if (elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current)
            }
        }
    }, [rootMargin, threshold])

    return <div ref={elementRef}>{isVisible && children}</div>
}
