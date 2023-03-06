import React from 'react'

import { Header } from '../components/site/Header'
import { Footer } from '../components/site/Footer'

import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'

export const SiteLayout = ({ children, title }: any) => {
    const tawkMessengerRef = useRef<any>()

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize()
    }

    return (
        <div>
            <title>Home | SkilTrak</title>
            <Header />
            <main>{children}</main>
            <Footer />
            <TawkMessengerReact
                propertyId={'61b1f52ec82c976b71c091e2'}
                widgetId={'1fmfibg61'}
                useRef={tawkMessengerRef}
            />
        </div>
    )
}
