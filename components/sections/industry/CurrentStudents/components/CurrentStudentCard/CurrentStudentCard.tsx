import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React, { useEffect, useState } from 'react'
import { RiBook2Fill } from 'react-icons/ri'
import { Notes } from '../Notes'
import { StudentAvailability } from '../StudentAvailability'
import { StudentDetail } from '../StudentDetail'
import moment from 'moment'
import { Actions } from '../Actions'

export const CurrentStudentCard = ({ workplace }: any) => {
   const [industry, setIndustry] = useState<any | null>(null)

   useEffect(() => {
      if (workplace.industries) {
         setIndustry(workplace.industries[0])
      }
   }, [workplace])

   return (
      <Card>
         <div className="flex justify-between items-center pb-2.5 border-b border-dashed">
            <div className="flex items-center gap-x-6">
               <div>
                  <Typography variant={'xs'}>Recieved On:</Typography>
                  <Typography variant={'small'}>
                     <span className="font-semibold">
                        {moment(
                           industry?.awaitingWorkplaceResponseDate,
                           'YYYY-MM-DD hh:mm:ss Z'
                        ).format('Do MMM, YYYY')}
                     </span>
                  </Typography>
               </div>
               <div className="flex items-center relative">
                  <div className="flex items-center gap-x-2">
                     <img
                        className="rounded-full w-8 h-8"
                        src={'https://picsum.photos/100/100'}
                        alt={''}
                     />
                     <div>
                        <Typography color={'black'} variant={'small'}>
                           Job Tranining Institute{' '}
                        </Typography>
                        <div className="flex items-center gap-x-2">
                           <Typography
                              variant={'muted'}
                              color={'text-gray-400'}
                           >
                              info@jti.edu.au
                           </Typography>
                           <span className="text-gray-400">|</span>
                           <Typography
                              variant={'muted'}
                              color={'text-gray-400'}
                           >
                              041 610 9825
                           </Typography>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/*  */}

            {/* Request Type Selection */}
            <Actions workplace={workplace} industry={industry} />
         </div>

         {/* Student Small Details */}
         <div className="mt-3 flex justify-between items-center">
            <StudentDetail student={workplace?.student} />

            <div className="flex items-center relative">
               <div className="flex items-center gap-x-2">
                  <RiBook2Fill className="text-gray-400 text-2xl" />
                  <div>
                     <Typography color={'black'} variant={'xs'}>
                        Commercial Cookery {'&'} Hospitality
                     </Typography>
                     <Typography variant={'muted'}>
                        SITHCCC020 - Work Effectively As A Cook
                     </Typography>
                  </div>
               </div>
            </div>

            {/*  */}
            <div className="flex items-center gap-x-5">
               <div className="flex flex-col items-end gap-y-1">
                  <Typography variant={'small'}>
                     <span className="bg-primary-light text-primary rounded-md p-1">
                        Documents Pending
                     </span>
                  </Typography>
                  <Typography variant={'small'} color={'text-info'}>
                     <span className="font-semibold">View Folders</span>
                  </Typography>
               </div>
            </div>
         </div>

         {/* Industries and notes */}
         <div className="grid grid-cols-2 gap-x-3 mt-4">
            {/* Industries */}
            <StudentAvailability
               availability={workplace?.generalAvailability}
            />
            {/* Notes */}
            <Notes />
         </div>
      </Card>
   )
}
