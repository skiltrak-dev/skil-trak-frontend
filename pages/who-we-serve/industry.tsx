import { Footer4, FooterVIII } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { IndustryServices } from '@partials/frontPages'
import Head from 'next/head'

const IndustryServicesPage = () => {
    return (
        <>
            <Head>
                <title>Industry Services </title>
            </Head>
            <div>
                <Navbar2 />
                <IndustryServices />

                <FooterVIII />
            </div>
        </>
    )
}

export default IndustryServicesPage
