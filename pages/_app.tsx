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
    SubadminProfileProvider,
    WorkplaceProvider,
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
import '../styles/animations.css'
import '../styles/globals.css'
import '../styles/site.css'

import { NextPageWithLayout } from '@types'
import { store } from '../redux/store'

import { HeadWrapper } from '@layouts'

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
import { CrudModal, ModalProvider } from '@partials/admin/departments'
import { GoogleAnalyticsScript } from '@scripts'

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

import SessionManager from '@hooks/SessionManager'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    // const [loading, setLoading] = useState<boolean>(true)

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
    // useEffect(() => {
    //     const handleComplete = () => setLoading(false)

    //     // Check if window is defined to avoid SSR issues
    //     if (isBrowser()) {
    //         if (document.readyState === 'complete') {
    //             handleComplete()
    //         } else {
    //             window.addEventListener('load', handleComplete)
    //             return () => window.removeEventListener('load', handleComplete)
    //         }
    //     }
    // }, [])

    const getLayout = Component.getLayout ?? ((page) => page)

    // if (loading) return <PrePageLoading />

    return (
        <>
            <GoogleAnalyticsScript />
            {/* <SessionProvider session={pageProps?.session}> */}
            <div className={`${poppins.className} `}>
                <Provider store={store}>
                    <ModalProvider>
                        {/* <AutoLogoutProvider> */}
                        <SessionManager />
                        {/* <NextAuthAutoLogoutProvider> */}
                        <ErrorBoundaryContext>
                            <JoyRideProvider>
                                <WorkplaceProvider>
                                    <GoogleMapsProvider>
                                        <SubadminProfileProvider>
                                            <NoteScrollProvider>
                                                <DownloadAssessmentProvider>
                                                    <AlertProvider>
                                                        <NotificationProvider>
                                                            <NavbarProvider>
                                                                <ContextBarProvider>
                                                                    <HeaderWrapperProvider>
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
                                                                    </HeaderWrapperProvider>
                                                                </ContextBarProvider>
                                                            </NavbarProvider>
                                                        </NotificationProvider>
                                                    </AlertProvider>
                                                </DownloadAssessmentProvider>
                                            </NoteScrollProvider>
                                        </SubadminProfileProvider>
                                    </GoogleMapsProvider>
                                </WorkplaceProvider>
                            </JoyRideProvider>
                        </ErrorBoundaryContext>
                        <CrudModal />
                        {/* </NextAuthAutoLogoutProvider> */}
                        {/* </AutoLogoutProvider> */}
                    </ModalProvider>
                </Provider>
            </div>
            {/* </SessionProvider> */}
        </>
    )
}

export default MyApp
