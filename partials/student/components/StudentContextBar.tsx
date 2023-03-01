import { MediaQueries } from '@constants'
import { useContextBar } from '@hooks'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { ViewProfileCB } from '../contextBar'

export const StudentContextBar = () => {
    const contextBar = useContextBar()
    const handleMediaQueryChange = (matches: any) => {
        if (matches) {
            if (contextBar.isVisible) contextBar.hide()
        } else {
            // contextBar.setContent(<ViewProfileCB />)
            if (!contextBar.isVisible) contextBar.show(false)
        }
    }
    const isMobile = useMediaQuery(
        MediaQueries.Mobile,
        undefined,
        handleMediaQueryChange
    )

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        if (mounted && !isMobile && !contextBar.isVisible) {
            contextBar.setContent(<ViewProfileCB />)
            contextBar.show(false)
        }

        return () => {
            contextBar.hide()
        }
    }, [isMobile, mounted])

    return <></>
}
