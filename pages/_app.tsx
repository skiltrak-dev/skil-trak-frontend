import {
    AlertProvider,
    AutoLogoutProvider,
    ContextBarProvider,
    JoyRideProvider,
    NavbarProvider,
    NotificationProvider,
    SocketListenerProvider,
} from '@hooks'
import { Theme, applyTheme, getCurrentTheme } from '@theme'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ErrorBoundaryContext } from 'react-use-error-boundary'
import '../styles/globals.css'

import { NextPageWithLayout } from '@types'
import { store } from '../redux/store'

import { HeadWrapper } from '@layouts'

import { Socket } from '@components'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    // Apply theme from local storage
    useEffect(() => {
        applyTheme((Theme as any)[getCurrentTheme()].theme)
    }, [])

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <Provider store={store}>
            <AutoLogoutProvider>
                <ErrorBoundaryContext>
                    <JoyRideProvider>
                        <AlertProvider>
                            <NotificationProvider>
                                <NavbarProvider>
                                    <ContextBarProvider>
                                        {/* <Component {...pageProps} /> */}
                                        {/* <SocketListenerProvider>
                                            <Socket> */}
                                        <HeadWrapper>
                                            {getLayout(
                                                <Component {...pageProps} />
                                            )}
                                        </HeadWrapper>
                                        {/* </Socket>
                                        </SocketListenerProvider> */}
                                    </ContextBarProvider>
                                </NavbarProvider>
                            </NotificationProvider>
                        </AlertProvider>
                    </JoyRideProvider>
                </ErrorBoundaryContext>
            </AutoLogoutProvider>
        </Provider>
    )
}

export default MyApp
//
