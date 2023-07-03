import { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

export const Tablet = ({ children }: { children: ReactNode }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
