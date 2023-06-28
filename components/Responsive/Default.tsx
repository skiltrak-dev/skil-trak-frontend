import { ReactNode } from 'react'
import { useMediaQuery } from 'react-responsive'

export const Default = ({ children }: { children: ReactNode }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
}
