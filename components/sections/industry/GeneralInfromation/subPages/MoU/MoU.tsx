import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// components
import {
  Card,
  Button,
  ReactTable,
  Typography,
  BackButton,
  // ActionDropDown,
} from 'components'
import { RightSidebarData, RTOFilter } from './components'

// Context
import { useContextBar } from '@hooks'

// colors
import { getThemeColors } from '@theme'
const Colors = getThemeColors()

// redux query
import {
  useGetIndustryMOUQuery,
  useCancelIndustryMOUMutation,
  useRejectIndustryMOUMutation,
} from '@queries'

// filter
import { Filter } from '@hoc'

// functions
import { userStatus } from '@utils'

export const SelectRtoData = createContext(null)

export const MoUContainer = () => {
  const router = useRouter()
  const [queryFilters, setQueryFilters] = useState({})
  const [filterActionButton, setFilterActionButton] = useState(null)

  // Redux Query
  const [cancelMou, cancelMouData] = useCancelIndustryMOUMutation()
  const [rejectMou, rejectMouData] = useRejectIndustryMOUMutation()

  const { setContent } = useContextBar()
  // useEffect(() => {
  //   setContent(
  //     <>
  //       <RightSidebarData />
  //     </>
  //   )
  // }, [setContent])
  //
  const Columns = [
    {
      Header: 'Name',
      accessor: 'user',
      sort: true,
      Cell: ({ row }) => {
        const {
          user: { name, email, image },
        } = row.original
        return (
          <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
              <img
                className="rounded-full w-7 h-7"
                src={image || 'https://placeimg.com/100/100/any'}
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
      Header: 'Code',
      accessor: 'rtoCode',
      disableFilters: true,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
    {
      Header: 'Status',
      accessor: 'user.status',
      Cell: ({ row }) => {
        const { mous } = row.original
        const mou = mous[0] || {}
        const status = () => {
          if (
            mou.status === userStatus.PENDING &&
            mou.initiatedBy === 'industry'
          ) {
            return (
              <span className="font-semibold text-info whitespace-pre">
                Initiated
              </span>
            )
          }
          if (mou.status === userStatus.PENDING && mou.initiatedBy === 'rto') {
            return (
              <span className="font-semibold text-primary whitespace-pre">
                Requested
              </span>
            )
          }
          if (mou.status === 'signed') {
            return (
              <span className="font-semibold text-success whitespace-pre">
                Signed
              </span>
            )
          }
          if (mou.status === 'cancelled') {
            return (
              <span className="font-semibold text-error whitespace-pre">
                Cancelled
              </span>
            )
          }
          if (mou.status === userStatus.REJECTED) {
            return (
              <span className="font-semibold text-error whitespace-pre">
                Rejected
              </span>
            )
          }

          // action Return
          return (
            <span className="font-semibold text-black whitespace-pre">
              Not Initiated
            </span>
          )
        }

        // Cell Return
        return status()
      },
      disableFilters: true,
    },
    {
      Header: 'Action',
      accessor: 'Action',
      Cell: ({ row }) => {
        const { mous, id } = row.original
        const mou = mous[0] || {}
        const actions = () => {
          // if (
          //   mou.status === userStatus.PENDING &&
          //   mou.initiatedBy === 'industry'
          // ) {
          //   return (
          //     <ActionDropDown
          //       title={'More'}
          //       loading={cancelMouData.isLoading}
          //       dropDown={[
          //         {
          //           text: 'Cancel',
          //           action: async () => {
          //             await cancelMou(mou.id)
          //           },
          //           Icon: '',
          //           color: Colors.error,
          //         },
          //       ]}
          //     />
          //   )
          // }
          // if (mou.status === userStatus.PENDING && mou.initiatedBy === 'rto') {
          //   return (
          //     <ActionDropDown
          //       title={'More'}
          //       loading={rejectMouData.isLoading}
          //       dropDown={[
          //         {
          //           text: 'Sign',
          //           action: () => {
          //             router.push(
          //               `/portals/industry/general-information/memorendum-ou/${mou.id}`
          //             )
          //           },
          //           Icon: '',
          //           color: Colors.error,
          //         },
          //         {
          //           text: 'Reject',
          //           action: async () => {
          //             await rejectMou(mou.id)
          //           },
          //           color: Colors.error,
          //         },
          //       ]}
          //     />
          //   )
          // }
          // if (mou.status === 'signed') {
          //   return (
          //     <ActionDropDown
          //       title={'More'}
          //       dropDown={[
          //         {
          //           text: 'View',
          //           action: () => {
          //             router.push(
          //               `/portals/industry/general-information/memorendum-ou/${mou.id}`
          //             )
          //           },
          //           Icon: '',
          //           color: Colors.info,
          //         },
          //         {
          //           text: (
          //             <a
          //               href={`${process.env.NEXT_PUBLIC_END_POINT}industries/mou/download/${mou.id}`}
          //               target="_blank"
          //               rel="noreferrer"
          //             >
          //               Download
          //             </a>
          //           ),
          //           color: Colors.info,
          //         },
          //         {
          //           text: 'Cancel',
          //           action: async () => {
          //             await cancelMou(mou.id)
          //           },
          //           color: Colors.error,
          //         },
          //       ]}
          //     />
          //   )
          // }
          // if (mou.status === 'cancelled') {
          //   return <span className="text-error">Cancelled</span>
          // }
          // if (mou.status === userStatus.REJECTED) {
          //   return <span className="text-error">Rejected</span>
          // }
          // action Return
          return (
            <Button
              onClick={() =>
                router.push(`/portals/industry/general-information/mou/${id}`)
              }
              variant={'secondary'}
              text={'Sign'}
            />
          )
        }

        // Cell Return
        return actions()
      },
    },
  ]

  const filterInitialValues = {
    name: '',
    email: '',
    rtoCode: '',
    status: '',
  }
  return (
    <div>
      <BackButton text={'Back To MoU Instructions'} />

      {/* Title */}
      <div className="flex justify-between items-center py-4">
        <div>
          <Typography variant={'title'}>All MOU</Typography>
          <Typography variant={'muted'} color={'gray'}>
            You can find all RTOs here as well as requests
          </Typography>
        </div>
        <div className="flex items-center gap-x-2">
          {filterActionButton}
          <Button variant={'dark'} text={'Archived'} />
        </div>
      </div>

      {/* Filter */}
      <Filter
        component={RTOFilter}
        setQueryFilters={setQueryFilters}
        setFilterAction={setFilterActionButton}
        filterInitialValues={filterInitialValues}
      />

      {/* Data */}
      <ReactTable
        pagesize
        pagination
        Columns={Columns}
        querySort={'name'}
        action={useGetIndustryMOUQuery}
        queryFilters={queryFilters}
      />

      {/* <div className="mt-4">
          <Button
            disabled={!Object.keys(selectedRow).length}
            onClick={() => router.push("/general-information/memorendum-ou")}
          >
            Continue
          </Button>
        </div> */}
    </div>
  )
}
