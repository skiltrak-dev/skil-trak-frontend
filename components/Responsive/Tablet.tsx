import { useMediaQuery } from 'react-responsive'

export const Tablet = ({ children }: { children: any }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
}
