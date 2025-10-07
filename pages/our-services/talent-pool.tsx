import { FooterVIII } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { TalentPoolSections } from '@partials/frontPages'
import { NextPageWithLayout } from '@types'
import Head from 'next/head'

const Sectors: NextPageWithLayout = () => {
    return (
        <div>
            <Head>
                <title>Talent Pool</title>
            </Head>
            <div>
                <Navbar2 />
                <TalentPoolSections />

                <FooterVIII />
            </div>
        </div>
    )
}
// Sectors.getLayout = (page: ReactElement) => {
//     return <SiteLayout>{page}</SiteLayout>
// }

export default Sectors
