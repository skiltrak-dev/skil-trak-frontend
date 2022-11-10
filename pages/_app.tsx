import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { applyTheme, getCurrentTheme, Theme } from '@theme'
import {
    AlertProvider,
    ContextBarProvider,
    NavbarProvider,
    NotificationProvider,
} from '@hooks'

import { store } from '../redux/store'
import { NextPageWithLayout } from '@types'


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
            <AlertProvider>
                <NotificationProvider>
                    <NavbarProvider>
                        <ContextBarProvider>
                            {/* <Component {...pageProps} /> */}
                            {getLayout(<Component {...pageProps} />)}
                        </ContextBarProvider>
                    </NavbarProvider>
                </NotificationProvider>
            </AlertProvider>
        </Provider>

    )
}

export default MyApp
