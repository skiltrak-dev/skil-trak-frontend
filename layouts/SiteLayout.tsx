import { DisplayNotifications, ErrorBoundary } from '@components'
import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar/Navbar2'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { useRef } from 'react'

export const SiteLayout = ({ children, title }: any) => {
    const tawkMessengerRef = useRef<any>()

    const handleMinimize = () => {
        tawkMessengerRef?.current?.minimize()
    }

    return (
        <div>
            <title>{`${title || 'Home'}`}</title>
            <Navbar2 />
            <DisplayNotifications />
            <main>{children}</main>
            <ErrorBoundary>
                <Footer4 />
            </ErrorBoundary>
            <TawkMessengerReact
                propertyId={'61b1f52ec82c976b71c091e2'}
                widgetId={'1fmfibg61'}
                useRef={tawkMessengerRef}
            />
        </div>
    )
}
