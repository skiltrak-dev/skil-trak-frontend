import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { EmploymentHub } from '@partials/frontPages'
import Head from 'next/head'

const EmploymentHubPage = () => {
    return (
        <>
            <Head>
                <title> Employment Hub </title>
            </Head>
            <div>
                <Navbar2 />
                <EmploymentHub />
                <Footer4 />
            </div>
        </>
    )
}

export default EmploymentHubPage
