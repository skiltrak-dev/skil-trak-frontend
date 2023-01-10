import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Icons
import { AiFillEye } from 'react-icons/ai'

// components
import {
  BackButton,
  Card,
  ReactTable,
  Typography,
  Button,
  // ActionDropDown,
} from 'components'
import { RightSidebarData } from '../../components'

// query

import { useGetFutureCandidatesQuery } from '@queries'
// Context
import { useContextBar } from '@hooks'

// utils
import { ThemeColors, getAge } from '@utils'

const Colors = ThemeColors

export const FutureCandidatesContainer = () => {
  const router = useRouter()
  const { setContent } = useContextBar()
  const [queryFilters, setQueryFilters] = useState({})
  const [filterActionButton, setFilterActionButton] = useState(null)

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    )
  }, [setContent])
  //

  const TableActionOption = (id: string) => {
    const actions = [
      {
        text: 'View',
        Icon: AiFillEye,
        action: () => {
          router.push(`/portals/industry/students/${id}`)
        },
        color: Colors.secondary,
      },
    ]
    return actions
  }

  const Columns = [
    {
      Header: 'Student Name',
      accessor: 'name',
      Cell: ({ row }:any) => {
        const { name, email, image } = row.original.user
        return (
          <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
              <img
                className="rounded-full w-7 h-7"
                src={image || 'https://picsum.photos/400/400'}
                alt={name}
              />
              <div>
                <Typography color={'black'}> {name} </Typography>
                <Typography variant={'muted'} color={'gray'}>
                  {email}
                </Typography>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ row }: any) => {
        const { addressLine1, addressLine2 } = row.original
        return `${addressLine1}, ${addressLine2}`
      },
    },
    {
      Header: 'RTO',
      accessor: 'rto',
      Cell: ({ row }: any) => {
        const {
          user: { name, email, image },
        } = row.original.rto
        return (
          <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
              <img
                className="rounded-full w-7 h-7"
                src={image || 'https://picsum.photos/400/400'}
                alt={name}
              />
              <div>
                <Typography color={'black'}> {name} </Typography>
                <Typography variant={'muted'} color={'gray'}>
                  {email}
                </Typography>
              </div>
            </div>
          </div>
        )
      },
    },
  ]

  const filterInitialValues = {
    name: '',
    email: '',
  }
  return (
    <div>
      <BackButton link={'Back To Students'} />
      <div className="flex md:gap-x-2 gap-x-4 justify-between items-center py-4">
        <div>
          <Typography variant={'title'}>All Future Candidates</Typography>
          <Typography variant={'muted'} color={'gray'}>
            You can find all Future Candidates here as well as requests
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant={'dark'}>Archived</Button>
        </div>
      </div>
      {/*  filters */}
      <div className="flex flex-col gap-y-4">
        <ReactTable
          pagesize
          pagination
          Columns={Columns}
          querySort={'name'}
          queryFilters={queryFilters}
          action={useGetFutureCandidatesQuery}
        />
      </div>
    </div>
  )
}
