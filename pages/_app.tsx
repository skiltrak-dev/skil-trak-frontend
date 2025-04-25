import type { AppProps } from 'next/app'
import { NextPageWithLayout } from '@types'

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

import { ContextReducer } from '@components'
import { Poppins } from 'next/font/google'

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const poppins = Poppins({
        subsets: ['latin'],
        weight: ['400', '500', '600', '700'],
    })

    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <div className={`${poppins.className} `}>
            <ContextReducer>
                {getLayout(<Component {...pageProps} />)}
            </ContextReducer>
        </div>
    )
}

export default MyApp
