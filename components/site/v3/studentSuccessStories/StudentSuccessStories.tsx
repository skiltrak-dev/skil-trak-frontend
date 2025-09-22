import React from 'react'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import { StudentsOnGlobe } from './StudentsOnGlobe'
import { StudentReviews } from './StudentReviews'

export const StudentSuccessStories = () => {
  return (
      <div className='bg-[#044866] w-full bg-cover bg-no-repeat py-8'
        style={{
            backgroundImage: 'url(/images/site/home-page-v3/student-success-stories/bg-dots.png)'
            
        }}
      >
        <div className='max-w-7xl mx-auto'>
            <div className="flex flex-col justify-center items-center mb-5">
                    <Typography variant="h2" color="text-white">
                        Collaboration Add-Ons
                    </Typography>
                    <Image
                       src="/images/site/home-page-v3/who-we-serve/title-line.svg"
                        alt={`title line`}
                        height={700}
                        width={400}
                        className=""
                    />
            </div>
            <div className="flex justify-between items-center w-full">
                <StudentsOnGlobe />
                <StudentReviews />
            </div>
        </div>
    </div>
  )
}
