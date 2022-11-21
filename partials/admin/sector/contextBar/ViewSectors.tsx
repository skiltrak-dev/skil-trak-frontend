import { Select, Typography } from '@components'
import { AdminApi } from '@queries'

import { Rto } from '@types'
import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

export const ViewSectors = ({ rto }: { rto: Rto }) => {
   const { data, isLoading } = AdminApi.Rtos.useSectors(rto.id)

   console.log('::: DATA', data)
   return (
      <div className="flex flex-col gap-y-6">
         {/* Context Bar Title */}
         <div className="flex justify-between items-center">
            <Typography variant="subtitle">Sectors & Courses</Typography>
            <button className="text-lg">
               <FaTimes />
            </button>
         </div>

         <div>
            <Typography variant={'muted'} color={'text-gray-400'}>
               Sectors &amp; Courses Of:
            </Typography>
            <Typography variant={'label'}>{rto.user.name}</Typography>
         </div>

         <div className={'flex flex-col gap-y-2'}>
            <Typography variant={'muted'} color={'text-gray-400'}>
               Add Sectors &amp; Courses
            </Typography>

            <Select
               name={'sectors'}
               label={'Sector'}
               options={[
                  {
                     label: 'Some Sector',
                     value: 'Some Value',
                  },
               ]}
            />

            <Select
               name={'courses'}
               label={'Courses'}
               options={[
                  {
                     label: 'Some Sector',
                     value: 'Some Value',
                  },
               ]}
            />
         </div>

         <div className={'flex flex-col gap-y-2'}>
            <Typography variant={'muted'} color={'text-gray-400'}>
               Selected Sectors &amp; Courses
            </Typography>
         </div>
      </div>
   )
}
