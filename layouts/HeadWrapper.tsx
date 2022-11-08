import Head from 'next/head'

export const HeadWrapper = ({ children }: any) => {
    return (
        <>
            <Head>
                <title>SkilTrak 2.0</title>
            </Head>
            {children}
        </>
    )
}
