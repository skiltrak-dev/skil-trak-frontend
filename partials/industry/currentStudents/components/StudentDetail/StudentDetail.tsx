import { Typography } from '@components/Typography'
import React from 'react'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

export const StudentDetail = ({ student }: any) => {
   return (
      <div className="flex items-center gap-x-4">
         <div className="flex items-center gap-x-2">
            <img
               className="w-16 h-16 rounded-full"
               src="https://picsum.photos/200/200"
               alt=""
            />
            <div>
               <Typography variant={'small'}>
                  <span className="font-semibold">{student?.id}</span>
               </Typography>
               <Typography variant={'label'}>{student?.user?.name}</Typography>
               <Typography variant={'small'}>{student?.user?.email}</Typography>
            </div>
         </div>

         {/*  */}
         <div>
            <div className="flex items-center gap-x-2">
               <FaPhoneSquareAlt className="text-gray-400 rounded-full" />
               <Typography variant={'label'}>{student?.phone}</Typography>
            </div>
            <div className="flex items-center gap-x-2">
               <MdLocationOn className="text-gray-400 rounded-full" />
               <Typography variant={'label'}>
                  {student?.addressLine1}, {student?.addressLine2}
               </Typography>
            </div>
         </div>
      </div>
   )
}
