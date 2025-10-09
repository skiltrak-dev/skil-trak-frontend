import { SiteLayout } from '@layouts'
import { useEffect, useRef, useState } from 'react'

import { Typography } from '@components'
import { ContactUs } from '@components/site/ContactUs'
import { SharedHeroSection } from '@partials/frontPages'

const Page = ({ location }: any) => {
    const [scrollTo, setScrollTo] = useState(location?.state?.scorllToForm)
    const refs = useRef<any>([])

    useEffect(() => {
        if (scrollTo && refs && refs.current) {
            refs.current[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
            refs.current[1].focus()
        }

        return () => {
            setScrollTo(false)
        }
    }, [])

    return (
        <SiteLayout title={'Contact Us'}>
            {/* <div className="h-80 jumbo-bg w-full">
                <div className="h-full max-w-3xl mx-auto flex flex-col gap-y-1 justify-center items-center">
                    <div className="text-center">
                        <Typography variant={'h1'} color="text-white">
                            GET IN TOUCH WITH SKILTRAK
                        </Typography>
                    </div>
                    <Typography
                        variant={'subtitle'}
                        color={'text-white'}
                        center
                    >
                        We have knowledgeable and friendly professionals
                        available to schedule an appointment or answer any
                        questions you may have in relation to Work Placement .
                        Call us today!
                    </Typography>
                </div>
            </div> */}
            <SharedHeroSection
                title={'GET IN TOUCH WITH SKILTRAK'}
                description={
                    'We have knowledgeable and friendly professionals available to schedule an appointment or answer any questions you may have in relation to Work Placement. Call us today!'
                }
                // button
            />

            <ContactUs />

            <div className="map w-full h-60 mx-auto bg-white">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d367336.84738445684!2d144.80684022100706!3d-37.831360359022796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2snl!4v1624881761467!5m2!1sen!2snl"
                    className="w-full h-60"
                    loading="lazy"
                ></iframe>
            </div>
        </SiteLayout>
    )
}

export async function getStaticProps() {
    return {
        props: {
            data: [],
        },
    }
}

export default Page
