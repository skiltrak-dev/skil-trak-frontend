import {
    AlertProvider,
    ContextBarProvider,
    DownloadAssessmentProvider,
    HeaderWrapperProvider,
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
import { Provider } from 'react-redux'
import 'react-tooltip/dist/react-tooltip.css'
import { ErrorBoundaryContext } from 'react-use-error-boundary'
import '../styles/globals.css'

import { NextPageWithLayout } from '@types'
import { store } from '../redux/store'

import { HeadWrapper } from '@layouts'

import 'swiper/css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'swiper/css/bundle'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Socket } from '@components'
import 'react-datepicker/dist/react-datepicker.css'

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
        })

        // Reinitialize AOS every time the user scrolls
        // window.addEventListener('scroll', () => {
        //     AOS.refresh()
        // })

        // return () => {
        //     window.removeEventListener('scroll', () => {
        //         AOS.refresh()
        //     })
        // }
    }, [])

    const getLayout = Component.getLayout ?? ((page) => page)

    // console.clear()

    return (
        <>
            <GoogleAnalyticsScript />
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
                                                <HeaderWrapperProvider>
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
                                                </HeaderWrapperProvider>
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
        </>
    )
}

export default MyApp
