import { FooterVIII } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { SkiltrakSectors } from '@partials/frontPages'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'

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

                <FooterVIII />
            </div>
        </div>
    )
}
// Sectors.getLayout = (page: ReactElement) => {
//     return <SiteLayout>{page}</SiteLayout>
// }

export default Sectors
