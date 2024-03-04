import {
    AlertProvider,
    ContextBarProvider,
    DownloadAssessmentProvider,
    JoyRideProvider,
    NavbarProvider,
    NetworkProvider,
    NoteScrollProvider,
    NotificationProvider,
    SocketListenerProvider,
} from '@hooks'
import { Theme, applyTheme, getCurrentTheme } from '@theme'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-tooltip/dist/react-tooltip.css'
import { Provider } from 'react-redux'
import { ErrorBoundaryContext } from 'react-use-error-boundary'
import '../styles/globals.css'

import { NextPageWithLayout } from '@types'
import { store } from '../redux/store'

import { HeadWrapper } from '@layouts'

import { Socket } from '@components'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'aos/dist/aos.css'
import AOS from 'aos'

//test
import { GoogleAnalyticsScript } from '@scripts'

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    // Apply theme from local storage
    useEffect(() => {
        applyTheme((Theme as any)[getCurrentTheme()].theme)
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should only happen once while scrolling down
        })
    }, [])

    const getLayout = Component.getLayout ?? ((page) => page)

    // console.clear()

    return (
        <Provider store={store}>
            {/* <AutoLogoutProvider> */}
            <ErrorBoundaryContext>
                <JoyRideProvider>
                    <NoteScrollProvider>
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
                    </NoteScrollProvider>
                </JoyRideProvider>
            </ErrorBoundaryContext>
            {/* </AutoLogoutProvider> */}
        </Provider>
    )
}

export default MyApp
