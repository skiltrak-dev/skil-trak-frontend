import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { applyTheme, getCurrentTheme, Theme } from '@theme'
import {
    AlertProvider,
    ContextBarProvider,
    JoyRideProvider,
    NavbarProvider,
    NotificationProvider,
    useActionModal,
} from '@hooks'

import { store } from '../redux/store'
import { NextPageWithLayout } from '@types'

import { HeadWrapper } from '@layouts'

import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Socket } from '@components'

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
            <JoyRideProvider>
                <AlertProvider>
                    <NotificationProvider>
                        <NavbarProvider>
                            <ContextBarProvider>
                                {/* <Component {...pageProps} /> */}
                                <Socket>
                                    <HeadWrapper>
                                        {getLayout(
                                            <Component {...pageProps} />
                                        )}
                                    </HeadWrapper>
                                </Socket>
                            </ContextBarProvider>
                        </NavbarProvider>
                    </NotificationProvider>
                </AlertProvider>
            </JoyRideProvider>
        </Provider>
    )
}

export default MyApp
//
