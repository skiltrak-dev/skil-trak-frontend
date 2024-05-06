import { useHeaderWrapperTitle } from '@hooks'
import Head from 'next/head'

export const HeadWrapper = ({ children }: any) => {
    const { title } = useHeaderWrapperTitle()
    return (
        <>
            <Head>
                <title>{title ? title : ''}</title>
            </Head>
            {children}
        </>
    )
}
