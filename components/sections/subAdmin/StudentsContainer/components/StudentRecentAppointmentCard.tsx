import { Button } from '@components/buttons'
import React from 'react'
import { BsCalendarDateFill } from 'react-icons/bs'
import { IoLocationSharp, IoTime } from 'react-icons/io5'

type Props = {}

export const StudentRecentAppointmentCard = (props: Props) => {
  return (
    <div className='w-full'>
      <div className="bg-gradient-to-r from-[#3883F3] to-[#5D1BE0] rounded-2xl p-4">
        <div className="flex gap-x-16 justify-between items-center mb-1.5">
          <div>
            <p className="font-medium text-sm text-white">
              Recent Appointment
            </p>
          </div>
          <div>
            <Button variant={"secondary"} rounded>
              <span className='text-[#3883F3]'>View All</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <div className="mb-4">
              <h2 className="text-[#0644AF] font-semibold text-lg">
                Appointment Title
              </h2>
              <p className="text-[#8CD2F9] font-medium ">
                John Doe
              </p>
            </div>
            <div>
              <div className="flex items-center gap-x-2.5 mb-2">
                <IoTime className="text-[#E3F2FF]" />
                <p className="text-[#E3F2FF] font-bold text-sm">
                  11:30 am - 12:30 pm
                </p>
              </div>
              <div className="flex items-center gap-x-2.5 mb-2">
                <BsCalendarDateFill className="text-[#E3F2FF]" />
                <p className="text-[#E3F2FF] font-bold text-sm">
                  Wednesday, 5 October, 2022
                </p>
              </div>
              <div className="flex items-center gap-x-2.5 mb-2">
                <IoLocationSharp className="text-[#E3F2FF]" />
                <p className="text-[#E3F2FF] font-bold text-sm">
                  11:30 am - 12:30 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
