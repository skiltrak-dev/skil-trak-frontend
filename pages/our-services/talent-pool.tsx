import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { TalentPool } from '@partials/frontPages'
import Head from 'next/head'

const TalentPoolPage = () => {
    return (
        <>
            <Head>
                <title> Talent Pool </title>
            </Head>
            <div>
                <Navbar2 />
                <TalentPool />
                <Footer4 />
            </div>
        </>
    )
}

export default TalentPoolPage
