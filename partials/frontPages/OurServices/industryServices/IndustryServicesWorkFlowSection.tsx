import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const IndustryServicesWorkFlowSection = () => {
  return (
    <div className='mx-auto max-w-7xl md:my-20 my-10 px-4 md:px-0 '>
        <div className="space-y-4">
            <Typography variant='body' color='text-primary'>WorkFlow</Typography>
            <Typography variant='h2'>Our Professional WorkFlow</Typography>
        </div>
        <div className='md:mt-20 mt-10'>
            <Image src={"/images/site/services/industry-services/our-professional-workflow.svg"} alt="" width={800} height={500} className='w-full' />
        </div>
    </div>
  )
}
