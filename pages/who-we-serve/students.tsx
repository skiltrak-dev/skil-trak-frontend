import { FooterVIII } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { StudentsServices } from '@partials/frontPages'
import Head from 'next/head'

const StudentsServicesPage = () => {
    return (
        <>
            <Head>
                <title> Students Services </title>
            </Head>
            <div>
                <Navbar2 />
                <StudentsServices />

                <FooterVIII />
            </div>
        </>
    )
}

export default StudentsServicesPage
