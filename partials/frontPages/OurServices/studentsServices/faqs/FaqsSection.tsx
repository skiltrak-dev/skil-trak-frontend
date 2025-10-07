import Image from 'next/image'
import React from 'react'
import { StudentServicesAccordion } from './StudentServicesAccordion'
import { Typography } from '@components'

export const FaqsSection = () => {
    return (
        <section className="md:max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center mx-auto md:gap-10 gap-5 px-4 md:px-0 py-10 md:py-20">
            <StudentServicesAccordion />
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
                        '/images/site/services/student-services/student-features/faqs-img.png'
                    }
                />
            </div>
        </section>
    )
}
