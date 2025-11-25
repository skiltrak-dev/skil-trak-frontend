'use client'

import { useEffect, useState } from 'react'

export const Counter = ({ to, duration = 1500 }: { to: number; duration?: number }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const end = Number(to)
        const incrementTime = 16 // ~60fps
        const totalSteps = duration / incrementTime
        const increment = end / totalSteps

        const timer = setInterval(() => {
            start += increment
            if (start >= end) {
                start = end
                clearInterval(timer)
            }
            setCount(Math.floor(start))
        }, incrementTime)

        return () => clearInterval(timer)
    }, [to, duration])

    return <span>{count}</span>
}
