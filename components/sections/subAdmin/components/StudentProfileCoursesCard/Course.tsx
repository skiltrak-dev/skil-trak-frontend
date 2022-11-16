import { useState } from 'react'

// Icons
import { BiCheck } from 'react-icons/bi'

// components
import { Typography, Button, TextInput } from '@components'
import { IoClose } from 'react-icons/io5'

// queries
import { useUpdateSubAdminCourseDurationMutation } from '@queries'
import { useRouter } from 'next/router'

export const Course = ({ course }: any) => {
   const [timeDuration] = useUpdateSubAdminCourseDurationMutation()
   const pathname = useRouter()
   const profileId: any = pathname.query.profileId
   const [addDate, setAddDate] = useState(false)
   const [duration, setDuration] = useState({
      startTime: '',
      endTime: '',
   })

   const badge = (text: string, outline?: boolean) => {
      return (
         <Typography variant={'badge'}>
            <span
               className={`p-1 rounded ${outline ? 'border border-success' : 'bg-success'
                  }`}
            >
               {text}
            </span>
         </Typography>
      )
   }
   return (
      <div className="px-2 py-2.5 flex justify-between items-center bg-gray-50">
         <div className="border-l-4 border-red-500 px-1">
            <div className="flex gap-x-2">
               <Typography variant={'small'} color={'text-gray-500'}>
                  SITHCCC020
               </Typography>
               {badge('COMPLETED', true)}
               {badge('COMPETENT')}
            </div>
            <Typography variant={'label'}>
               Work effectively as a cook
            </Typography>
         </div>
         <div>
            {addDate ? (
               <div className="flex items-center gap-x-2.5">
                  <TextInput
                     label={'Start Date'}
                     type={'date'}
                     name={'startDate'}
                     onChange={(e: any) => { setDuration({ ...duration, startTime: e.target.value }) }}
                  />
                  <TextInput
                     label={'End Date'}
                     type={'date'}
                     name={'endDate'}
                     onChange={(e: any) => { setDuration({ ...duration, endTime: e.target.value }) }}
                  />
                  <div onClick={() => { timeDuration({ id: String(profileId), body: { course: course?.id, startTime: duration.startTime, endTime: duration.endTime } }) }} className="p-2 rounded bg-success-light cursor-pointer">
                     <BiCheck className="text-2xl text-success-dark" />
                  </div>
                  <div
                     className="p-2 rounded bg-red-100 cursor-pointer"
                     onClick={() => {
                        setAddDate(false)
                     }}
                  >
                     <IoClose className="text-2xl text-red-800" />
                  </div>
               </div>
            ) : (
               <Button
                  variant={'secondary'}
                  text={'ADD START & FINISH DATE'}
                  onClick={() => {
                     setAddDate(true)
                  }}
               />
            )}
         </div>
      </div>
   )
}
