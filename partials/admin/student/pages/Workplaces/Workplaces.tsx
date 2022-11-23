import React, { useEffect, useState } from 'react'

// Icons
import { FaBriefcase } from 'react-icons/fa'
import { AiFillRedEnvelope } from 'react-icons/ai'
import { ImPhone, ImLocation } from 'react-icons/im'
import { MdPhone } from 'react-icons/md'

// components
import { Card, Typography, DescriptiveInfo } from '@components'

export const Workplaces = ({ workplaces }: any) => {
  const [workplace, setWorkplace] = useState<any | null>(null)

  useEffect(() => {
    if (workplaces) {
      setWorkplace(workplaces[0].industries.find((i: any) => i.applied))
    }
  }, [workplaces])

  return (
    <Card>
      {workplace ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <FaBriefcase />
              <Typography color={'gray'}>Workplaces</Typography>
            </div>
            <Typography variant={'muted'} color={'primary'}>
              <span className="cursor-pointer">View Second {'>'}</span>
            </Typography>
          </div>
          <div className="my-2 border border-secondary-dark rounded-lg">
            <div className="p-1">
              <DescriptiveInfo
                title={'Name'}
                description={''}
                Icon={AiFillRedEnvelope}
              />
              <div>
                <Typography variant={'subtitle'}>
                  {workplace?.industry?.businessName}
                </Typography>
                <Typography variant={'label'} color={'gray'}>
                  {workplace?.industry?.user?.email}
                </Typography>
              </div>
            </div>

            {/*  */}
            <div className="flex justify-between items-center h-full border-t border-secondary-dark">
              <div className="w-full h-full flex justify-center px-1 py-1.5">
                <DescriptiveInfo
                  title={'Phone'}
                  description={workplace?.industry?.phoneNumber}
                  Icon={MdPhone}
                />
              </div>
              <div className="w-full h-full flex justify-center  px-1 py-1.5 border-r border-l border-secondary-dark">
                <DescriptiveInfo
                  title={'Address'}
                  description={`${workplace?.industry?.addressLine1}, ${workplace?.industry?.addressLine2}`}
                  Icon={ImLocation}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Typography variant={'label'}> Not Applied for workplace </Typography>
        </div>
      )}
    </Card>
  )
}
