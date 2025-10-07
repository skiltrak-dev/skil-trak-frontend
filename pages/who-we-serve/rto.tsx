import { FooterVIII } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { RtoServices } from '@partials/frontPages'
import Head from 'next/head'

const RtosServicesPage = () => {
    return (
        <>
            <Head>
                <title>RTO Services </title>
            </Head>
            <div>
                <Navbar2 />
                <RtoServices />

                <FooterVIII />
            </div>
        </>
    )
}

export default RtosServicesPage
