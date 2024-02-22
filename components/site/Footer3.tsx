import { Typography } from '@components/Typography'
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

export const Footer3 = () => {
    return (
        <>
            <div className="w-full h-4 bg-[#F6910F]"></div>
            <div className="md:px-36 px-4 py-8 md:py-[72px] footer-bg">
                <div className="max-w-7xl mx-auto flex flex-col items-center self-stretch gap-16 md:gap-y-4 md:grid md:grid-cols-3">
                    <div className="flex flex-col  md:block">
                        <Image
                            className="mb-8"
                            src="/images/site/skiltrak-logo.png"
                            width={100}
                            height={100}
                            alt="logo"
                        />
                        <div className="flex flex-col  md:items-start gap-y-4">
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
                            <div className="flex items-center gap-x-4">
                                <div>
                                    <IoLocationOutline className="text-[#F6910F]" />
                                </div>
                                <div className="cursor-pointer text-sm font-medium text-[#AEAEAE]">
                                    Melbourne, Vic, Australia 3000
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-6 mt-8">
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
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <Typography variant="title" color="text-[#F6910F]">
                            Quick Links
                        </Typography>
                        <div className="flex flex-col gap-y-4">
                            <Link href="/">
                                <Typography
                                    variant="body"
                                    color="text-gray-300"
                                >
                                    Home
                                </Typography>
                            </Link>
                            <Link href="/features">
                                <Typography
                                    variant="body"
                                    color="text-gray-300"
                                >
                                    Features
                                </Typography>
                            </Link>
                            <Link href="/contact-us">
                                <Typography
                                    variant="body"
                                    color="text-gray-300"
                                >
                                    Contact Us
                                </Typography>
                            </Link>
                            <Link href="/about-us">
                                <Typography
                                    variant="body"
                                    color="text-gray-300"
                                >
                                    Abouts
                                </Typography>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <Typography variant="label" color="text-[#F6910F]">
                            JOIN THE JOURNEY OF PASSION AND FULFILMENT
                        </Typography>
                        <div className="">
                            <Typography variant="small" color="text-white">
                                An easy approach to the industry with a
                                professional team that has been put together to
                                lead you to your career goals. SkilTrak prepares
                                you from the beginning of your job path, from
                                the design of a strong CV, interview tips and
                                role plays to your first day in the industry.
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto border-t border-[#F6910F] my-8"></div>
                <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
                    <div>
                        <Typography variant="xs" color="text-[#AEAEAE]">
                            All Rights Reserved - {new Date().getFullYear()}
                        </Typography>
                    </div>
                    <div>
                        <Link
                            href="/terms-and-conditions"
                            className="text-[#AEAEAE] text-xs"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
