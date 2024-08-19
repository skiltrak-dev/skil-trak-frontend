import { DisplayNotifications } from '@components'
import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import Head from 'next/head'
import { useRef } from 'react'

export const SiteLayout = ({ children, title }: any) => {
    const tawkMessengerRef = useRef<any>()

    const handleMinimize = () => {
        tawkMessengerRef?.current?.minimize()
    }

    return (
        <div>
            <Head>
                <title>{`${title || 'Home'}`}</title>
                <meta name="description" content="SkilTrak" key="desc" />
            </Head>
            <Navbar2 />
            <DisplayNotifications />
            <main>{children}</main>
            <Footer4 />
            <div>
                <TawkMessengerReact
                    propertyId={'61b1f52ec82c976b71c091e2'}
                    widgetId={'1fmfibg61'}
                    useRef={tawkMessengerRef}
                />
            </div>
        </div>
    )
}
