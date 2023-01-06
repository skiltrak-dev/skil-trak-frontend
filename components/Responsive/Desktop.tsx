import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const Desktop = ({ children }: { children: any }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    return isDesktop && mounted ? children : null
}
