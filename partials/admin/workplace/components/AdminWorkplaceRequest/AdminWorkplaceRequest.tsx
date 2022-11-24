import { Card, Select, Typography } from '@components'
import {
  AssignToMe,
  Industries,
  RequestType,
  StudentDetail,
} from '@components/sections/subAdmin/WorkplaceRequest/components'
import React from 'react'
import { RiBook2Fill } from 'react-icons/ri'
import { AdminApi, useAssignToSubAdminMutation } from '@queries'
import { useEffect, useState } from 'react'
import { Notes } from '@components/sections'
type Props = {
  workplace: any
}

export const AdminWorkplaceRequest = ({ workplace }: Props) => {
  const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
  const [subAdminOptions, setSubAdminOptions] = useState([])

  const { isLoading, data } = AdminApi.Workplace.useListQuery({ createdBy: "admin" })
  const [assignSubAdmin] = AdminApi.Workplace.useWorkplaceMutation()
  console.log('ccccccccc', workplace)
  useEffect(() => {
    setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
  }, [workplace])
  useEffect(() => {
    if (data?.data.length) {
      const options = data?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.id,
      }))
      setSubAdminOptions(options)
    }
  }, [data?.data])

  const onAssignSubAdmin = (e: any) => {
    assignSubAdmin({ subadmin: e.value, workplace: workplace.id })
    console.log("cccc", e.value, workplace.id)
    console.log("Selected Admin")
  }

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center pb-2.5 border-b border-dashed">
          {/* <AssignToMe
          workplace={workplace}
          appliedIndustry={appliedIndustry}
        /> */}
          <Select
            label={'Sub Admin'}
            name={'subAdmin'}
            placeholder={'Select Sub Admin'}
            options={subAdminOptions}
            loading={data?.isLoading}
            onChange={(e: any) => {
              onAssignSubAdmin(e)
            }}
          />

          <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
              <img
                className="rounded-full w-8 h-8"
                src={'https://picsum.photos/100/100'}
                alt={''}
              />
              <div>
                <Typography color={'black'} variant={'small'}>
                  {workplace?.student?.user?.name}
                </Typography>
                <div className="flex items-center gap-x-2">
                  <Typography
                    variant={'muted'}
                    color={'text-gray-400'}
                  >
                    {workplace?.student?.user?.email}
                  </Typography>
                  <span className="text-gray-400">|</span>
                  <Typography
                    variant={'muted'}
                    color={'text-gray-400'}
                  >
                    {workplace?.student?.phone}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
              <RiBook2Fill className="text-gray-400 text-2xl" />
              <div>
                <Typography color={'black'} variant={'xs'}>
                  course title
                </Typography>
                <Typography variant={'muted'}>
                  course code - workplace course description
                </Typography>
              </div>
            </div>
          </div>

          {/* Request Type Selection */}
          <RequestType data={appliedIndustry} />
        </div>

        {/* Student Small Details */}
        <div className="mt-3 flex justify-between items-center">
          <StudentDetail data={workplace?.student} />

          {/*  */}
          <div className="flex items-center gap-x-5">
            <div className="flex flex-col items-end gap-y-1">
              <Typography variant={'small'}>
                <span className="bg-primary-light text-primary rounded-md p-1">
                  Documents Pending
                </span>
              </Typography>
              <Typography variant={'small'} color={'text-info'}>
                <span className="font-semibold">
                  View Folders
                </span>
              </Typography>
            </div>
            <div>
              <Typography variant={'xs'}>Recieved On:</Typography>
              <Typography variant={'small'}>
                {/* <span className="font-semibold">
                {moment(
                  20-30-200
                  'YYYY-MM-DD hh:mm:ss Z'
                ).format('Do MMM, YYYY')}
              </span> */}
                Date
              </Typography>
            </div>
          </div>
        </div>

        {/* Industries and notes */}
        <div className="grid grid-cols-2 gap-x-3 mt-4">
          {/* Industries */}
          <Industries
            appliedIndustry={appliedIndustry}
            industries={workplace?.industries}
            workplaceId={workplace?.id}
          />

          {/* Notes */}
          {/* <Notes /> */}
        </div>
      </Card>
    </div>
  )
}
