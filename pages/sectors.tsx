import { Typography } from '@components'
import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { SiteLayout } from '@layouts'
import { RtoServices, SkiltrakSectors } from '@partials/frontPages'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'
import React, { ReactElement } from 'react'

const Sectors: NextPageWithLayout = () => {
    return (
        <div
            className="h-[600px] "
            style={{
                backgroundImage:
                    'url(/images/site/sectors/bg-hero-section.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Head>
                <title>Sectors</title>
            </Head>
            <div>
                <Navbar2 />
                <SkiltrakSectors />

                <Footer4 />
            </div>
        </div>
    )
}
// Sectors.getLayout = (page: ReactElement) => {
//     return <SiteLayout>{page}</SiteLayout>
// }

export default Sectors
