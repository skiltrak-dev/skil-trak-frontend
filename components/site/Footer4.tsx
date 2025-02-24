import { Typography } from '@components/Typography'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import Link from 'next/link'
import { FiPhone } from 'react-icons/fi'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import {
    PiFacebookLogoLight,
    PiInstagramLogoLight,
    PiLinkedinLogoLight,
} from 'react-icons/pi'
import { useMediaQuery } from 'react-responsive'

export const Footer4 = () => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about-us', label: 'About Us' },
        { href: '/our-services', label: 'Services' },
        { href: '/features', label: 'Features' },
        { href: '/contact-us', label: 'Contact Us' },
        { href: '/blogs', label: 'Blogs' },
    ]

    return (
        <div className="footer-bg w-full">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-0 md:pt-12 md:pb-2">
                <div className="flex flex-col gap-y-5 md:gap-y-6">
                    <div className="flex justify-center items-center">
                        <Image
                            className=""
                            src="/images/site/skiltrak-logo.png"
                            width={175}
                            height={0}
                            alt="logo"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <Typography
                            variant={isMobile ? 'small' : 'label'}
                            color={'text-[#AEAEAE]'}
                            center
                        >
                            An easy approach to the industry with a professional
                            team that has been put together to lead you to your
                            career goals. SkilTrak prepares you from the
                            beginning of your job path, from the design of a
                            strong CV, interview tips and role plays to your
                            first day in the industry.
                        </Typography>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-y-[18px] justify-between gap-x-2 max-w-3xl mx-auto py-10">
                    <a
                        href="tel:03-9363-6378"
                        className="flex items-center gap-x-4"
                    >
                        <div>
                            <FiPhone className="text-[#F6910F]" />
                        </div>
                        <div className="cursor-pointer text-sm font-medium text-[#AEAEAE]">
                            03-9363-6378
                        </div>
                    </a>

                    <div className="flex items-center gap-x-4">
                        <div>
                            <IoLocationOutline className="text-[#F6910F]" />
                        </div>
                        <div className="cursor-pointer text-sm font-medium text-[#AEAEAE]">
                            27/101 Collins street Melbourne, 3000
                        </div>
                    </div>
                    <a
                        href="mailto:info@skiltrak.com.au"
                        className="flex items-center gap-x-4"
                    >
                        <div>
                            <MdOutlineAlternateEmail className="text-[#F6910F]" />
                        </div>
                        <div className="cursor-pointer text-sm font-medium text-[#AEAEAE]">
                            info@skiltrak.com.au
                        </div>
                    </a>
                </div>

                {/*  */}
                <div className="px-2 md:px-0 flex justify-between md:justify-center md:gap-12 gap-y-4 border-y border-[#F6910F] py-4 md:py-5">
                    {links.map((link, index) => (
                        <Link href={link.href} key={index}>
                            <Typography
                                variant={isMobile ? 'label' : 'body'}
                                color="text-gray-300"
                            >
                                <span className="whitespace-pre">
                                    {link.label}
                                </span>
                            </Typography>
                        </Link>
                    ))}
                </div>

                {/* Copyright */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-y-4 justify-between items-center py-[18px] md:py-8">
                    <div className="flex items-center gap-x-6 md:order-2">
                        <a
                            href="https://www.facebook.com/skiltrak.com.au"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <PiFacebookLogoLight className="text-[#F6910F] text-3xl" />
                        </a>
                        <a
                            href="https://www.instagram.com/skiltrak/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <PiInstagramLogoLight className="text-[#F6910F] text-3xl" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/skiltrak"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <PiLinkedinLogoLight className="text-[#F6910F] text-3xl" />
                        </a>
                    </div>

                    <div className="md:order-3">
                        <Link
                            href="/terms-and-conditions"
                            className="text-[#AEAEAE] text-xs"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                    <div className="md:-1">
                        <Typography variant="small" color="text-[#AEAEAE]">
                            All Rights Reserved - {new Date().getFullYear()}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
