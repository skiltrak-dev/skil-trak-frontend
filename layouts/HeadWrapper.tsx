import Head from 'next/head'

export const HeadWrapper = ({ children }: any) => {
    return (
        <>
            <Head>
                <title>SkilTrak</title>
            </Head>
            {children}
        </>
    )
}
