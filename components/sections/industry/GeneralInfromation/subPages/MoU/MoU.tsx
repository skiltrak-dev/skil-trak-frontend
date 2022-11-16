import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// components
import {
  Card,
  Button,
  ReactTable,
  Typography,
  GoBackButton,
  ActionDropDown,
} from 'components'
import { RightSidebarData, RTOFilter } from './components'

// Context
import { useContextBar } from 'hooks'
import { Colors } from 'utills'

// redux query
import {
  useGetMOUQuery,
  useCancelMOUMutation,
  useRejectMOUMutation,
} from 'redux/query'

// filter
import { Filter } from 'HigherOrderComponents'

// functions
import { userStatus } from 'utills'

export const SelectRtoData = createContext(null)

export const MoU = () => {
  const navigate = useNavigate()
  const [queryFilters, setQueryFilters] = useState({})
  const [filterActionButton, setFilterActionButton] = useState(null)

  // Redux Query
  const [cancelMou, cancelMouData] = useCancelMOUMutation()
  const [rejectMou, rejectMouData] = useRejectMOUMutation()

  const { setContent } = useContextBar()
  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    )
  }, [setContent])
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
          if (
            mou.status === userStatus.PENDING &&
            mou.initiatedBy === 'industry'
          ) {
            return (
              <ActionDropDown
                title={'More'}
                loading={cancelMouData.isLoading}
                dropDown={[
                  {
                    text: 'Cancel',
                    action: async () => {
                      await cancelMou(mou.id)
                    },
                    Icon: '',
                    color: Colors.error,
                  },
                ]}
              />
            )
          }
          if (mou.status === userStatus.PENDING && mou.initiatedBy === 'rto') {
            return (
              <ActionDropDown
                title={'More'}
                loading={rejectMouData.isLoading}
                dropDown={[
                  {
                    text: 'Sign',
                    action: () => {
                      navigate(`/general-information/memorendum-ou/${mou.id}`)
                    },
                    Icon: '',
                    color: Colors.error,
                  },
                  {
                    text: 'Reject',
                    action: async () => {
                      await rejectMou(mou.id)
                    },
                    color: Colors.error,
                  },
                ]}
              />
            )
          }
          if (mou.status === 'signed') {
            return (
              <ActionDropDown
                title={'More'}
                dropDown={[
                  {
                    text: 'View',
                    action: () => {
                      navigate(`/general-information/memorendum-ou/${mou.id}`)
                    },
                    Icon: '',
                    color: Colors.info,
                  },
                  {
                    text: (
                      <a
                        href={`${process.env.NEXT_PUBLIC_END_POINT}industries/mou/download/${mou.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                    ),
                    color: Colors.info,
                  },
                  {
                    text: 'Cancel',
                    action: async () => {
                      await cancelMou(mou.id)
                    },
                    color: Colors.error,
                  },
                ]}
              />
            )
          }
          if (mou.status === 'cancelled') {
            return <span className="text-error">Cancelled</span>
          }
          if (mou.status === userStatus.REJECTED) {
            return <span className="text-error">Rejected</span>
          }
          // action Return
          return (
            <Button
              onClick={() =>
                navigate(`/general-information/memorendum-ou/${id}`)
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
      <GoBackButton>Back To MoU Instructions</GoBackButton>

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
          <Button variant={'dark'}>Archived</Button>
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
      <Card px={'none'} mt={6}>
        <ReactTable
          pagesize
          pagination
          borderBottom={1}
          Columns={Columns}
          querySort={'name'}
          action={useGetMOUQuery}
          queryFilters={queryFilters}
        />

        {/* <div className="mt-4">
          <Button
            disabled={!Object.keys(selectedRow).length}
            onClick={() => navigate("/general-information/memorendum-ou")}
          >
            Continue
          </Button>
        </div> */}
      </Card>
    </div>
  )
}
