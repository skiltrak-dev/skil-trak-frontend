import { Typography, Button } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useMediaQuery } from 'react-responsive'

export const GetStarted = ({ contactUsRef }: { contactUsRef: any }) => {
    const router = useRouter()
    const isMobile = useMediaQuery(MediaQueries.Mobile)
    // console.log("router")
    return (
        <div className="bg-gradient-to-t from-[#0C1535] to-[#2C3E7F] py-10 px-5 md:px-0">
            <div data-aos="fade-up">
                <Typography variant="h3" bold center color={'text-white'}>
                    Get Started With Us
                </Typography>
            </div>
            <div
                data-aos="fade-up"
                className="w-full sm:max-w-[450px] mx-auto flex justify-center mt-3"
            >
                <Typography
                    variant={isMobile ? 'small' : 'label'}
                    color={'text-white'}
                    normal
                    center
                >
                    Request a demo or create your account right away to get
                    started. We are just one click away
                </Typography>
            </div>

            <div
                data-aos="fade-up"
                className="flex items-center justify-center mt-5 gap-x-2"
            >
                <Button
                    onClick={() => {
                        router.push('/auth/signup')
                    }}
                    outline
                    text="Sign up"
                />
                <Button
                    onClick={() => {
                        contactUsRef?.current?.scrollIntoView({
                            behavior: 'smooth',
                        })
                    }}
                    variant="primary"
                    text="Request a demo"
                />
            </div>

            <div data-aos="zoom-in" className="max-w-4xl mt-7 md:mt-9 mx-auto">
                <div className="">
                    <Image
                        className="w-full h-full"
                        src="/images/site/get-started-image.png"
                        sizes="100vw"
                        fill
                        alt="get-started-with-us"
                        placeholder="blur"
                        blurDataURL={'/images/get-started-with-us-blur.png'}
                    />
                </div>
            </div>
        </div>
    )
}
