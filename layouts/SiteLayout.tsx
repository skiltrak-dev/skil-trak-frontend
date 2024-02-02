import React from 'react'

import { Header } from '../components/site/Header'
import { Footer } from '../components/site/Footer'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'
import { Navbar2 } from '@components/site/navbar/Navbar2'
import { Footer3 } from '@components/site/Footer3'
import { DisplayNotifications } from '@components'

export const SiteLayout = ({ children, title }: any) => {
    const tawkMessengerRef = useRef<any>()

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize()
    }


    return (
        <div>
            <title>{`${title || "Home"}`}</title>
            <Navbar2 />
            <DisplayNotifications />
            <main>{children}</main>
            <Footer3 />
            <TawkMessengerReact
                propertyId={'61b1f52ec82c976b71c091e2'}
                widgetId={'1fmfibg61'}
                useRef={tawkMessengerRef}
            />
        </div>
    )
}
