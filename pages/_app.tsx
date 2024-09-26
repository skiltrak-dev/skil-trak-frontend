import {
    AlertProvider,
    ContextBarProvider,
    DownloadAssessmentProvider,
    GoogleMapsProvider,
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
import { useEffect, useState } from 'react'
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

import { PrePageLoading, Socket } from '@components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

//test
import { GoogleAnalyticsScript } from '@scripts'
import { isBrowser } from '@utils'

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const [loading, setLoading] = useState<boolean>(true)

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

    // useEffect(() => {
    //     setLoading(false)
    // }, [])
    useEffect(() => {
        const handleComplete = () => setLoading(false)

        // Check if window is defined to avoid SSR issues
        if (isBrowser()) {
            if (document.readyState === 'complete') {
                handleComplete()
            } else {
                window.addEventListener('load', handleComplete)
                return () => window.removeEventListener('load', handleComplete)
            }
        }
    }, [])

    const getLayout = Component.getLayout ?? ((page) => page)

    if (loading) return <PrePageLoading />

    return (
        <>
            <GoogleAnalyticsScript />
            {/* <SessionProvider session={pageProps?.session}> */}
            <Provider store={store}>
                {/* <AutoLogoutProvider> */}
                <ErrorBoundaryContext>
                    <JoyRideProvider>
                        <GoogleMapsProvider>
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
                                                                        {/* <LogoutAfterHours> */}
                                                                        {getLayout(
                                                                            <Component
                                                                                {...pageProps}
                                                                            />
                                                                        )}
                                                                        {/* </LogoutAfterHours> */}
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
                        </GoogleMapsProvider>
                    </JoyRideProvider>
                </ErrorBoundaryContext>

                {/* </AutoLogoutProvider> */}
            </Provider>
            {/* </SessionProvider> */}
        </>
    )
}

export default MyApp
