import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

type Props = {
  status: any
}

export const ProgressStep = ({
  status,
}: Props) => {
  const progressStep = [
    {
      id: 1,
      title: 'Industry Checks',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      title: 'Case Officer Assigned',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 3,
      title: 'Interview With Case Officer',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 4,
      title: 'Awaiting Workplace Response',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 5,
      title: 'Appointment Booked',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 6,
      title: 'Awaiting Agreement Sign',
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 7,
      title: 'Placement Started',
      imageUrl: 'https://picsum.photos/200/300',
    },
  ]
  return (
    <div className="mb-3 flex justify-between gap-x-3 items-center">
      {progressStep.map((item, index) => (
        <>
          <div className='flex items-center'>
            <div className="flex flex-col items-center w-32 mt-12">
              <div className={`w-fit ${status && 'bg-sky-100'}  overflow-hidden border-2 border-gray-400 border-dashed rounded-full`}>
                <div className="relative top-1.5 w-12 h-12">
                  <Image
                    className="rounded-full"
                    src="https://picsum.photos/200/300"
                    width={45}
                    height={45}
                    layout="fixed"
                  />
                </div>
              </div>
              <div className='text-center'>
                <Typography variant="label" color="text-gray-700">
                  {item?.title}
                </Typography>
               
                
              </div>
            </div>
            {
              index !== progressStep.length - 1 && (
                <div className="flex items-center gap-x-3">
                  <span className="text-gray-400">-</span>
                  <span className="text-gray-400">-</span>
                  <span className="text-gray-400">-</span>
                </div>
              )
            }
          </div>

        </>
      ))}
    </div>
  )
}
