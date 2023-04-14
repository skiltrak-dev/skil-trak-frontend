import { Typography } from '@components/Typography'
import React from 'react'
import { BsFacebook, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs'
import { Wrapper } from './wrapper'

type Props = {}

export const Footer2 = (props: Props) => {
    return (
        <>
            <div className="bg-[#FAFAFA] py-12 px-56 w-full">
                <div className="flex flex-col gap-y-4 md:flex-row md:justify-between items-center">
                    <div className="flex flex-col items-center gap-y-3">
                        <Typography variant="muted">
                            Melbourne, Vic, Australia 3000
                        </Typography>
                        <Typography variant="muted">+61 3 9999 9999</Typography>
                        <Typography variant="muted">
                            {' '}
                            info@skiltrak.com.au
                        </Typography>
                    </div>
                    <div className="flex flex-col justify-center gap-y-4 items-center">
                        <div>
                            <Typography variant="body">Quick Links</Typography>
                        </div>
                        <div className="flex flex-col justify-center gap-y-2 items-center">
                            <a href="https://www.skiltrak.com.au/">
                                <Typography variant="muted">Home</Typography>
                            </a>
                            <a href="https://www.skiltrak.com.au/features">
                                <Typography variant="muted">
                                    Features
                                </Typography>
                            </a>
                            <a href="https://www.skiltrak.com.au/about">
                                <Typography variant="muted">
                                    About Us
                                </Typography>
                            </a>
                            <a href="https://www.skiltrak.com.au/contact">
                                <Typography variant="muted">
                                    Contact Us
                                </Typography>
                            </a>
                            <a href="https://www.skiltrak.com.au/terms">
                                <Typography variant="muted">
                                    Terms & Conditions
                                </Typography>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 items-center">
                        <a href="#">
                            <BsLinkedin className="text-blue-600" size={25} />
                        </a>
                        <a href="#">
                            <BsTwitter className="text-blue-500" size={25} />
                        </a>
                        <a href="#">
                            <BsFacebook className="text-blue-500" size={25} />
                        </a>
                        <a href="#">
                            <BsYoutube className="text-red-500" size={25} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
