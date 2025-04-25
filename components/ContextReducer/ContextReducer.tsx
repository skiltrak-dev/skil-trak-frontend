import React, { ReactNode, useEffect } from 'react'
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
    SubadminProfileProvider,
    WorkplaceProvider,
} from '@hooks'
import { GoogleAnalyticsScript } from '@scripts'
import { Provider } from 'react-redux'
import { CrudModal, ModalProvider } from '@partials/admin/departments'
import SessionManager from '@hooks/SessionManager'
import { ErrorBoundaryContext } from 'react-use-error-boundary'
import { Socket } from '@components/Socket'
import { HeadWrapper } from '@layouts'
import { store } from 'redux/store'
import { Poppins } from 'next/font/google'
import { Theme, applyTheme, getCurrentTheme } from '@theme'
import AOS from 'aos'

// styles
import 'aos/dist/aos.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-tooltip/dist/react-tooltip.css'
import '../../styles/globals.css'
import '../../styles/site.css'
import '../../styles/animations.css'

export const ContextReducer = ({ children }: { children: ReactNode }) => {
    const poppins = Poppins({
        subsets: ['latin'],
        weight: ['400', '500', '600', '700'],
    })

    useEffect(() => {
        applyTheme((Theme as any)[getCurrentTheme()].theme)
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
        })
    }, [])
    return (
        <>
            <GoogleAnalyticsScript />
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
                                                                        <SocketListenerProvider>
                                                                            <Socket>
                                                                                <NetworkProvider>
                                                                                    <HeadWrapper>
                                                                                        {/* <LogoutAfterHours> */}
                                                                                        {
                                                                                            children
                                                                                        }
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
        </>
    )
}
