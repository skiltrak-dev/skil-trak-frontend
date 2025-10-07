import Image from 'next/image'
import React from 'react'
import { IndustryServicesAccordion } from './IndustryServicesAccordion'
import { Typography } from '@components'

export const IndustryServicesFaqsSection = () => {
    return (
        <section className="md:max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center mx-auto md:gap-10 gap-5 px-4 md:px-0 py-10 md:py-20">
            <IndustryServicesAccordion />
            <div className="flex flex-col gap-y-8 items-center justify-center">
                <Typography variant="h2" bold>
                    Frequently Asked Question
                </Typography>
                <Image
                    width={350}
                    height={64}
                    // sizes="100vw"
                    alt="Testimonial Background"
                    className="w-full"
                    src={
                        '/images/site/services/industry-services/industry-faq.png'
                    }
                />
            </div>
        </section>
    )
}
