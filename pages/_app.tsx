import {
    AlertProvider,
    AutoLogoutProvider,
    ContextBarProvider,
    DownloadAssessmentProvider,
    JoyRideProvider,
    NavbarProvider,
    NetworkProvider,
    NotificationProvider,
    SocketListenerProvider,
} from '@hooks'
import { Theme, applyTheme, getCurrentTheme } from '@theme'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ErrorBoundaryContext } from 'react-use-error-boundary'
import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

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

    // console.clear()

    return (
        <Provider store={store}>
            <AutoLogoutProvider>
                <ErrorBoundaryContext>
                    <JoyRideProvider>
                        <DownloadAssessmentProvider>
                            <AlertProvider>
                                <NotificationProvider>
                                    <NavbarProvider>
                                        <ContextBarProvider>
                                            <SocketListenerProvider>
                                                <Socket>
                                                    <NetworkProvider>
                                                        <HeadWrapper>
                                                            {getLayout(
                                                                <Component
                                                                    {...pageProps}
                                                                />
                                                            )}
                                                        </HeadWrapper>
                                                    </NetworkProvider>
                                                </Socket>
                                            </SocketListenerProvider>
                                        </ContextBarProvider>
                                    </NavbarProvider>
                                </NotificationProvider>
                            </AlertProvider>
                        </DownloadAssessmentProvider>
                    </JoyRideProvider>
                </ErrorBoundaryContext>
            </AutoLogoutProvider>
        </Provider>
    )
}

export default MyApp
