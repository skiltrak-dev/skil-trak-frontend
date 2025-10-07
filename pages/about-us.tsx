import { Typography } from '@components'
import { FooterVIII } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { SiteLayout } from '@layouts'
import { AboutUsV3, RtoServices, SkiltrakSectors } from '@partials/frontPages'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'
import React, { ReactElement } from 'react'

const Sectors: NextPageWithLayout = () => {
    return (
        <div>
            <Head>
                <title>About Us</title>
            </Head>
            <div>
                <Navbar2 />
                <AboutUsV3 />

                <FooterVIII />
            </div>
        </div>
    )
}
// Sectors.getLayout = (page: ReactElement) => {
//     return <SiteLayout>{page}</SiteLayout>
// }

export default Sectors
