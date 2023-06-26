import { ReactNode, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export const Mobile = ({ children }: { children: any }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    return isMobile && mounted ? children : null
}
