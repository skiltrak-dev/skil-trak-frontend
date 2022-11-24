import React from 'react'
import { useRouter } from 'next/router'
import { ReactTable, Button, ActionDropDown, Typography } from '@components'

import {
  useGetRtoMOUListQuery,
  useRejectMOUByRTOMutation,
  useCancelMOUByRTOMutation,
} from '@queries'

// utils
import {  ThemeColors, userStatus } from '@utils'

const Colors = ThemeColors

export const RtoMOUContainer = () => {
  const router = useRouter()

  const [cancelMouByRto, cancelMouByRtoResult] = useCancelMOUByRTOMutation()
  const [rejectMouByRto, rejectMouByRtoResult] = useRejectMOUByRTOMutation()
  const Columns = [
    {
      Header: 'Name',
      accessor: 'user',
      sort: true,
      Cell: ({ row }: any) => {
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
          if (mou.status === userStatus.PENDING && mou.initiatedBy === 'rto') {
            return (
              <span className="font-semibold text-info whitespace-pre">
                Initiated
              </span>
            )
          }
          if (
            mou.status === userStatus.PENDING &&
            mou.initiatedBy === 'industry'
          ) {
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
      Cell: ({ row }: any) => {
        const { mous, id } = row.original
        const mou = mous[0] || {}
        const actions = () => {
          if (mou.status === userStatus.PENDING && mou.initiatedBy === 'rto') {
            return (
              <ActionDropDown
                title={'More'}
                loading={cancelMouByRtoResult.isLoading}
                dropDown={[
                  {
                    text: 'View',
                    action: () => {
                      router.push(
                        `/portals/industry/general-information/mou/${mou.id}`
                      )
                    },
                    Icon: '',
                    color: Colors.info,
                  },
                  {
                    text: 'Cancel',
                    action: async () => {
                      await cancelMouByRto(mou.id)
                    },
                    Icon: '',
                    color: Colors.error,
                  },
                ]}
              />
            )
          }
          if (
            mou.status === userStatus.PENDING &&
            mou.initiatedBy === 'industry'
          ) {
            return (
              <ActionDropDown
                title={'More'}
                loading={rejectMouByRtoResult.isLoading}
                dropDown={[
                  {
                    text: 'Sign',
                    action: () => {
                      router.push(`/portals/rto/industries/mous/${mou.id}`)
                    },
                    Icon: '',
                    color: Colors.error,
                  },
                  {
                    text: 'Reject',
                    action: async () => {
                      await rejectMouByRto(mou.id)
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
                      router.push(
                        `/portals/industry/general-information/memorendum-ou/${mou.id}`
                      )
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
                      await cancelMouByRto(mou.id)
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
              onClick={() => router.push(`/portals/rto/industries/mous/${id}`)}
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
  return (
    <div>
      <ReactTable
        action={useGetRtoMOUListQuery}
        Columns={Columns}
        querySort={'title'}
        pagination
        pagesize
      />
    </div>
  )
}
