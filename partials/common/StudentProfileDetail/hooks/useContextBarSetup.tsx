import { useEffect, useState } from 'react'
import { ProfileViewCB } from '../ContextBar'
import { SubAdmin } from '@types'

export const useContextBarSetup = (
    contextBar: any,
    profile: any,
    router: any,
    subadmin: SubAdmin
) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (event: any) => {
        if (!contextBar.content) {
            setMousePosition({ x: event.clientX, y: event.clientY })
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [contextBar])

    useEffect(() => {
        if (profile?.isSuccess && profile?.data && !router.query?.tab) {
            contextBar.show(false)
            contextBar.setContent(<ProfileViewCB profile={profile?.data} />)
        }

        return () => {
            contextBar.hide()
            contextBar.setContent(null)
        }
    }, [profile, mousePosition, subadmin])

    return { mousePosition }
}
