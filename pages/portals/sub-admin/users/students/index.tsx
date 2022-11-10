import { ReactElement, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { Button, ReactTable, RtoContextBarData, SidebarCalendar, Typography } from '@components'
// queries
import { useGetSubAdminStudentsQuery } from '@queries'
// icons
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
// hooks
import { useContextBar } from '@hooks'

type Props = {}

const Students: NextPageWithLayout = (props: Props) => {
  const { data, isLoading } = useGetSubAdminStudentsQuery()
  console.log("students___________table", data);
  
  const { setContent } = useContextBar()
  useEffect(() => {
    setContent(
      <>
        <Button variant={'dark'} text={'My Schedule'} />
        <SidebarCalendar />
        <RtoContextBarData />
      </>
    )
  }, [setContent])
  const Columns = [
    {
      Header: 'Name',
      accessor: 'user',
      sort: true,
      Cell: ({ row }: any) => {
        const {
          phone,
          workplace,
          industries,
          user: { name, email, image },
        } = row.original
        console.log('isCompleted', industries)

        return (
          <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
              <Image
                className="rounded-full w-7 h-7"
                src={
                  'https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' ||
                  ' '
                }
                alt={''}
                width={50}
                height={50}
              />
              <Link  href={`/portals/sub-admin/users/students/profile/${row.original.id}?tab=overview`}>
                <a>
                  <div className="flex items-center gap-x-2">
                    <Typography variant={'muted'}>
                      {phone}
                    </Typography>
                    <div className="flex items-center gap-x-2 ">
                      <div className={`w-1 h-1 rounded-full ${industries === null? "bg-red-400": 'bg-green-400'} `}></div>
                      <Typography variant="muted" color="text-green-400">
                        Completed
                      </Typography>
                    </div>
                  </div>
                  <Typography color={'black'}>
                    {name}
                  </Typography>
                  <div className="flex items-center gap-x-2">
                    <FaEnvelope />
                    <Typography
                      variant={'muted'}
                      color={'gray'}
                    >
                      {email}
                    </Typography>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        )
      },
    },
    // {
    //     Header: 'Type',
    //     accessor: 'employmentType',
    //     Cell: ({ row }) => {
    //         const { employmentType } = row.original
    //         switch (employmentType) {
    //             case 'fullTime':
    //                 return 'Full Time'

    //             case 'partTime':
    //                 return 'Part Time'

    //             default:
    //                 return 'Temporary'
    //         }
    //     },
    //     disableFilters: true,
    // },
    {
      Header: 'Phone #',
      accessor: 'phone',
      Cell: ({ row }: any) => {
        const { phone } = row.original
        return (
          <div className='flex justify-center'>
            <Typography variant={'muted'} color={'gray'}>
              {phone}
            </Typography>
          </div>
        )
      },
    },

    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ row }: any) => {
        const { address, city, state, zipCode } = row.original
        return (
          <div className='flex justify-center'>
            <Typography color={'black'}>{address}</Typography>
            <Typography color={'black'}>
              {state}
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'RTO Name',
      accessor: 'rto',
      Cell({ row }: any) {
        const { rto } = row.original

        return (
          <div className='flex justify-center'>
            <Typography variant='body' color={'black'}>
              {rto.user.name}
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'Progress',
      accessor: 'progress',
      Cell: ({ }) => {
        return (
          <div className="flex justify-center">
            <Typography variant="muted" color="text-blue-400">
              Request
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'Action',
      accessor: 'Action',
      Cell: ({ }) => {
        return (
          <div className="flex justify-center">
            <Typography variant="muted" color="text-blue-400">
              More
            </Typography>
          </div>
        )
      },
    },
  ]
  // console.log("useGetSubAdminStudentsQuery", useGetSubAdminStudentsQuery());

  return (
    <>
      <ReactTable
        action={useGetSubAdminStudentsQuery}
        Columns={Columns}
        querySort={'title'}
        pagination
        pagesize
      />
    </>
  )
}
Students.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="Students">{page}</SubAdminLayout>
}

export default Students
