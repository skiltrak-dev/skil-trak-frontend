import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

export const IndustryServicesEmployeeScheduling = () => {
  return (
    <div className='max-w-7xl mx-auto md:px-0 px-4 flex flex-col md:items-center md:justify-center gap-y-4 md:flex-row gap-x-12'>
        <div className="md:w-1/2">
            <Typography variant='body' color='text-primary'>Employee Scheduling</Typography>

           <div className="flex flex-col gap-y-10">
            <div className="md:space-y-10 space-y-5">
                 <Typography variant='h2'>Employee Scheduling</Typography>
                 <p className='leading-6'>Manage your Employee Schedule with ease using SkilTrak. Industries can assign shifts, monitor staff availability, and track performance all from a centralised, easy-to-use dashboard. Stay organised, reduce scheduling conflicts, and ensure smooth operations.</p>
            </div>
           <div className="md:space-y-10 space-y-5">
            <Typography variant='h2' capitalize>hire from our talent pool</Typography>
                 <p className='leading-6'>Gain instant access to a dynamic pool of qualified, job-ready students with SkilTrak’s Talent Pool. Our platform empowers industries to efficiently identify, shortlist, and schedule top candidates for placements, internships, part-time roles, or long-term employment, all aligned with your organisation’s specific needs, compliance standards, and workforce goals. With real-time insights, seamless communication, and streamlined processes, SkilTrak makes talent acquisition faster, smarter, and more strategic.</p>
           </div>
           </div>
        </div>
        <div className='md:w-1/2'> <Image src={"/images/site/services/industry-services/employee-scheduling.png"} alt="" width={800} height={500} className='' /></div>
        
    </div>
  )
}
