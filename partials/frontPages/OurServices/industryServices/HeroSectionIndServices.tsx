import { Button, Typography } from '@components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoGift } from 'react-icons/go'
import { IoMdAlarm } from 'react-icons/io'

export const HeroSectionIndServices = () => {
    return (
        <div className="relative">
            <div
                className=""
                style={{
                    backgroundImage:
                        'url(/images/site/services/industry-services/industry-services-hero-bg.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="md:mx-auto md:max-w-7xl py-6 md:py-10 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 md:gap-10 h-full relative">
                    <div className="flex flex-col gap-y-5">
                        <h1 className="text-primaryNew font-bold text-2xl md:text-5xl lg:text-6xl leading-tight">
                            Let’s Build Talent
                            <br /> Together
                        </h1>
                        <p className={'text-primaryNew leading-8'}>
                            At SkilTrak, we help students find eligible
                            industries that align with their career goals,
                            ensuring that your placement is not just a
                            requirement but a launchpad. Through structured
                            documentation, industry connections, and
                            professional mentorship, we support you from your
                            first application to the completion of your
                            placement. With SkilTrak, your journey begins not
                            just with training but with career direction and
                            confidence.
                        </p>
                        <Link
                            href="/auth/signup/industry?step=account-info"
                            className="mt-10 ml-20 inline-block"
                        >
                            <Button text="Sign Up" />
                        </Link>
                    </div>
                    <div className="md:block hidden">
                        <Image
                            src={
                                '/images/site/services/industry-services/industry-hero-img.png'
                            }
                            alt="students"
                            width={850}
                            height={850}
                            className=""
                        />
                    </div>
                </div>
            </div>
            <div className="absolute md:-bottom-8 -bottom-12 md:right-40 ">
                <Image
                    src={
                        '/images/site/services/industry-services/hero-section-label.png'
                    }
                    alt="students"
                    width={530}
                    height={100}
                    className=""
                />
            </div>
        </div>
    )
}
