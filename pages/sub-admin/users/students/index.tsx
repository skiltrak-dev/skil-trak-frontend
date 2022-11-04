import { ReactElement } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { ReactTable, Typography } from '@components'
import { useGetStudentsQuery } from '@queries'
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'

type Props = {}

const Students: NextPageWithLayout = (props: Props) => {
  const Columns = [
    {
      Header: 'Name',
      accessor: 'user',
      sort: true,
      Cell: ({ row }: any) => {
        const {
          phone,
          user: { name, email, image },
        } = row.original
        console.log('row', row.original)

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
              <Link href={`/rto/profile/${row.original.id}`}>
                <div>
                  <div className="flex items-center gap-x-2">
                    <Typography variant={'muted'}>
                      {phone}
                    </Typography>
                    <FaPhoneSquareAlt className='text-gray' />
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
                </div>
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
      Header: 'Package',
      accessor: 'package',
      Cell: () => {
        return (
          <>
            <Typography variant={'muted'} color={'gray'}>
              Placement
            </Typography>
          </>
        )
      },
    },
    {
      Header: 'Code',
      accessor: 'code',
      Cell: ({ row }: any) => {
        return (
          <div className='flex justify-center'>
            <Typography variant={'muted'} color={'gray'}>
              {row.original.zipCode}
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'Students',
      accessor: 'students',
      Cell: ({ row }: any) => {
        return (
          <div className='flex justify-center'>
            <Typography variant={'muted'} color={'gray'}>
              150
            </Typography>
          </div>
        )
      },
    },
    {
      Header: 'Courses',
      accessor: 'courses',
      Cell: ({ row }: any) => {
        return (
          <div className='flex justify-center'>
            <Typography variant={'muted'} color='text-blue-400'>
              View
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
          <div>
            <Typography color={'black'}>{address}</Typography>
            <Typography color={'black'}>
              {state}
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
  // console.log("useGetStudentsQuery", useGetStudentsQuery());

  return (
    <>
      <ReactTable
        action={useGetStudentsQuery}
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
