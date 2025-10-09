import { Select, TextInput } from '@components/inputs'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BookADemoForm } from './BookADemoForm'

export const BookADemoModal = () => {
    return (
        <div className="flex w-full remove-scrollbar min-w-[860px]">
            <div className="pt-5">
                <div className="flex items-end justify-end gap-x-2 px-4">
                    <Typography variant="small" color="text-gray-400">
                        Want to Open An Account ?
                    </Typography>
                    <Link
                        href={'/auth/signup'}
                        className="rounded-lg border-red-800 border text-primaryNew px-6 py-2 font-semibold"
                    >
                        Sign Up
                    </Link>
                </div>

                <div className="px-11 py-12">
                    <div className="mb-6">
                        <Typography variant="h2" color="text-[#24556D]">
                            Schedule For Demo
                        </Typography>
                        <Image
                            src={
                                '/images/site/home-page-v3/who-we-serve/title-line.svg'
                            }
                            alt={`title line`}
                            height={550}
                            width={280}
                            className=""
                        />
                    </div>
                    <BookADemoForm />
                </div>
            </div>
            <div className=" py-14 px-11 bg-gradient-to-b from-[#055b80]/90 to-[#044866]/80 shadow-[0_0_40px_10px_rgba(4,72,102,0.4)] rounded-r-2xl">
                <Typography variant="h4" color="text-white mb-4 font-semibold">
                    SkilTrak Demo
                </Typography>
                <Typography color="text-white/90 leading-relaxed">
                    Book a one-on-one consultation to discover how SkilTrak
                    empowers RTOs to streamline student placements and ensure
                    seamless compliance. In this personalised session, our team
                    will walk you through the platform’s key features, including
                    end-to-end placement automation, integrated document and
                    timesheet management, real-time student tracking and
                    reporting, and audit-ready compliance workflows. Schedule a
                    time that suits you using the calendar form and learn how
                    SkilTrak can optimise your training delivery and operational
                    efficiency.
                </Typography>
            </div>
        </div>
    )
}
