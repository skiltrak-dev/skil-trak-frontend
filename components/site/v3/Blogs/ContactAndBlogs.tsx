import React from 'react'
import { ContactUsV3 } from './ContactUsV3'
import { BlogSlider } from './BlogSlider'
import { Typography } from '@components/Typography'
import Image from 'next/image'

export const ContactAndBlogs = () => {
    return (
        <div className="max-w-7xl mx-auto flex gap-4 my-10">
            {/* Left Side - Featured Blogs */}
            <div className="w-[52%]">
                <div className="flex flex-col items-center mb-12">
                    <Typography variant="h2" color="text-[#24556D]">
                        Featured Blogs
                    </Typography>
                    <Image
                        src="/images/site/home-page-v3/who-we-serve/title-line.svg"
                        alt="title line"
                        height={40}
                        width={200}
                        className="mt-2"
                    />
                </div>
                <BlogSlider />
            </div>

            {/* Divider */}
            <div className="relative h-96 bg-red-500">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-[#9B2000]" />
            </div>


            {/* Right Side - Contact Us */}
            <div className="w-[48%] flex justify-end items-center">
                <div className="">
                    <div className="flex flex-col items-center mb-12">
                        <Typography variant="h2" color="text-[#24556D]">
                            Contact Us
                        </Typography>
                        <Image
                            src="/images/site/home-page-v3/who-we-serve/title-line.svg"
                            alt="title line"
                            height={40}
                            width={200}
                            className="mt-2"
                        />
                    </div>
                    <ContactUsV3 />
                </div>
            </div>
        </div>
    )
}
