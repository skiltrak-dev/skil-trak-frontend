import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'

type Props = {
    variant: string
}

export const PackagesCard = ({
    variant,

}: Props) => {
    return (
        <div>
            <div className="card-bg w-96 h-[50rem] shadow-md hover:shadow-lg hover:-translate-y-4 relative bg-slate-100 overflow-hidden mb-24 py-6 px-10">
                <div className="flex gap-x-2">
                    <div className=''>
                        <Image
                            src='images/icons/progress.png'
                            alt="Illustration for online education"
                            className=""
                            width={300}
                            height={300}
                            // sizes={'100vw'}
                        />
                    </div>
                    <div>
                        <Typography variant="title">
                            Placement Management Portal
                        </Typography>
                        <Typography variant="subtitle">Do it yourself.</Typography>
                        <div className='mt-4'>
                            <Typography variant="subtitle">
                                For classes that can be self-managed.
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className='my-12 text-center'>
                    <Typography variant="subtitle">From $7 per month</Typography>
                    <Typography variant="muted">Per user</Typography>
                </div>
                <div className='flex flex-col gap-y-6 items-center mb-8'>
                    <Typography variant="subtitle">Packages includes:</Typography>
                    <div className='flex flex-col gap-y-4 items-center '>
                        <Typography variant="muted">
                            Automated email and communication records
                        </Typography>
                        <Typography variant="muted">E-signature</Typography>
                        <Typography variant="muted">
                            Appointment booking system
                        </Typography>
                        <Typography variant="muted">
                            Student Progress Tracking
                        </Typography>
                        <Typography variant="muted">
                            Online assessing system
                        </Typography>
                    </div>
                </div>
                {/* <div className={`rotate-[45deg] absolute ${variant} mt-[5rem] w-full h-full -ml-24`}>
                    <div className='bg-white absolute w-full h-full top-8 left-8'>
                        <div className='-rotate-45 -bottom-32'>
                            <Typography>Start</Typography>
                        </div>
                    </div>
                </div> */}
                <div className={`arrow-clr bg-white h-56 w-[390px] -right-0.5 absolute z-10 -bottom-0.5 text-center`}>

                </div>
                <div className='absolute bottom-10 z-20 left-36 rounded-lg cursor-pointer hover:bg-orange-200 px-6 py-2'>
                    <Typography variant='title' color='text-orange-400 hover:text-orange-500'>Start</Typography>
                </div>
                <div className={`h-56 arrow ${variant} absolute bottom-0 left-0 w-full`}>
                    adadadfafaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </div>

            </div>
        </div>
    )
}
