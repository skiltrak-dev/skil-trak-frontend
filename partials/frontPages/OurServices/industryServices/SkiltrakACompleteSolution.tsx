import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const SkiltrakACompleteSolution = () => {
  return (
    <div className='max-w-7xl mx-auto my-10 md:my-20 border-[18px] border-[#FFC2B2] rounded-lg'>
        <div className="bg-[#9B2000]/80 flex flex-col md:flex-row justify-center items-center gap-16 md:gap-20 md:p-14 p-4">
        <div className="md:w-1/2">
            <Image src={"/images/site/services/industry-services/complete-solution-skiltrak.png"} alt="" width={500} height={500} className='' />
        </div>
        <div className="md:space-y-10 space-y-5">
            <Typography variant='h2' color='text-white' center>SkilTrak offers a complete solution:</Typography>
            <p className="leading-8 text-white">
                Our system is designed to support strong teamwork, reduce back-and-forth communication, and ensure every placement meets curriculum With SkilTrak. you don’t just manage placements, you elevate the quality of education.
            </p>
        </div>
        </div>
    </div>
  )
}
