import { ReactElement, useEffect } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { Button, ReactTable, RtoContextBarData, SidebarCalendar, Typography } from '@components'
// queries
import { useGetSubAdminIndustriesQuery } from '@queries'
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useContextBar } from '@hooks'

type Props = {}

const Industries: NextPageWithLayout = (props: Props) => {
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
          phoneNumber,
          user: { name, email, image },
        } = row.original
        // console.log('row', row.original)

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
              <Link href={`/portals/sub-admin/users/industries/profile/${row.original.id}?tab=overview`}>
                <a>

                  <Typography color={'black'}>
                    {' '}
                    {name}{' '}
                  </Typography>
                  <div className="flex items-center gap-x-2">
                    <FaPhoneSquareAlt className='text-gray' />
                    <Typography variant={'muted'}>
                      {phoneNumber}
                    </Typography>
                  </div>
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
      Header: 'Phone',
      accessor: 'phoneNumber',
      Cell: ({ row }: any) => {
        const { phoneNumber } = row.original
        return (
          <div className='flex justify-center'>
            <Typography variant={'muted'} color={'gray'}>
              {phoneNumber}
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ row }: any) => {
        const { addressLine1, addressLine2, city, state, zipCode } = row.original
        return (
          <div className='flex justify-center gap-x-2'>
            <Typography color={'black'}>{addressLine1}</Typography>
            <Typography color={'black'}>
              {addressLine2}
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'Student Capacity',
      accessor: 'studentCapacity',
      Cell: ({ row }: any) => {
        const { studentCapacity } = row.original
        return (
          <div className='flex justify-center'>
            <Typography variant={'muted'} color={'gray'}>
              {studentCapacity}
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'Contact Person',
      accessor: 'contactPersonNumber',
      Cell: ({ row }: any) => {
        const { contactPersonNumber } = row.original
        return (
          <div className='flex justify-center'>
            <Typography variant={'muted'} color={'gray'}>
              {contactPersonNumber}
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
  // console.log("useGetSubAdminIndustriesQuery", useGetSubAdminIndustriesQuery());

  return (
    <>
      <ReactTable
        action={useGetSubAdminIndustriesQuery}
        Columns={Columns}
        querySort={'title'}
        pagination
        pagesize
      />
    </>
  )
}
Industries.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="Industries">{page}</SubAdminLayout>
}

export default Industries
