import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const SkiltrakAppSection = () => {
    return (
        <div
            style={{
                backgroundImage:
                    'url(/images/site/services/student-services/mobile/mobile-sec-bg.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className=""
        >
            <div className="mx-auto max-w-7xl py-4 md:py-8 flex items-center justify-center flex-col md:flex-row">
                <div className="relative z-30">
                    <Image
                        src={
                            '/images/site/services/student-services/mobile/app-mockup-1.png'
                        }
                        alt="student"
                        width={300}
                        height={638}
                        className=""
                    />
                    <div className="absolute top-56 left-24 bg-white/10 p-4 rounded-tr-2xl size-60 rotate-45 z-10 hidden md:block"></div>
                    <div className="absolute top-60 left-36 bg-white/10 p-4 rounded-tr-2xl size-60 rotate-45 z-10 hidden md:block"></div>
                </div>
                <div className="bg-[#F7A619]/80 px-10 py-14 flex items-center justify-center gap-4 flex-col md:flex-row">
                    <div className="p-5 leadi">
                        <Typography variant="h1" bold color={'text-white'}>
                            3 easy Step to <br /> Sign-Up on
                            <br /> SkilTrak App
                        </Typography>
                    </div>
                    <div className="px-10 py-6 bg-gray-300 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="132"
                            height="132"
                            viewBox="0 0 132 132"
                            fill="none"
                        >
                            <path
                                d="M132 66C132 102.451 102.451 132 66 132C29.5492 132 0 102.451 0 66C0 29.5492 29.5492 0 66 0C102.451 0 132 29.5492 132 66ZM23.462 66C23.462 89.4931 42.5069 108.538 66 108.538C89.4931 108.538 108.538 89.4931 108.538 66C108.538 42.5069 89.4931 23.462 66 23.462C42.5069 23.462 23.462 42.5069 23.462 66Z"
                                fill="#F7A619"
                            />
                            <path
                                d="M78 64.2679C79.3333 65.0377 79.3333 66.9622 78 67.732L61.5 77.2583C60.1667 78.0281 58.5 77.0659 58.5 75.5262L58.5 56.4737C58.5 54.9341 60.1667 53.9719 61.5 54.7417L78 64.2679Z"
                                fill="#F7A619"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
