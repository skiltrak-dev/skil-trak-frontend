import { NextPageWithLayout } from '@types'
import type { AppProps } from 'next/app'

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

import { ContextReducer } from '@components'

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <ContextReducer>
            {getLayout(<Component {...pageProps} />)}
        </ContextReducer>
    )
}

export default MyApp
