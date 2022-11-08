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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HeadWrapper } from '@layouts'

const queryClient = new QueryClient()

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
        // <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <AlertProvider>
                <NotificationProvider>
                    <NavbarProvider>
                        <ContextBarProvider>
                            {/* <Component {...pageProps} /> */}
                            <HeadWrapper>
                                {getLayout(<Component {...pageProps} />)}
                            </HeadWrapper>
                        </ContextBarProvider>
                    </NavbarProvider>
                </NotificationProvider>
            </AlertProvider>
        </Provider>
        // </QueryClientProvider>
    )
}

export default MyApp
