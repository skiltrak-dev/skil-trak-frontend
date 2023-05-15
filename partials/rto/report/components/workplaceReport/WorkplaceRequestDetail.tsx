import {
  ActionButton,
  EmptyData,
  InitialAvatar,
  LoadingAnimation,
  Table,
  TechnicalError,
  Typography,
} from '@components'
import { CourseDot } from '@partials/rto/student/components'
import { RtoApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { FilterReport } from '../../FilterReport'
import { ViewFullListReport } from '../../ViewFullListReport'
import { Course, ReportOptionsEnum } from '@types'

type Props = {};

export const WorkplaceRequestDetail = (props: Props) => {
  const { data, isLoading, isError } =
    RtoApi.Students.useWorkplaceRequestReport({})
    console.log(data)
  const columns: ColumnDef<any>[] = [
    {
      header: () => <span>Name</span>,
      accessorKey: 'user',
      cell: (info: any) => {
        const {
          id,
          student: {
            user: { name, avatar },
          },
        } = info.row.original || {}

        return (
          <a className="flex items-center gap-x-2">
            <InitialAvatar name={name} imageUrl={avatar} />
            <div className="flex flex-col">
              <span>{id}</span>
              <span>{name}</span>
            </div>
          </a>
        )
      },
    },
    {
      accessorKey: 'email',
      header: () => <span>Email</span>,
      cell: (info) => {
        const {
          student: {
            user: { email },
          },
        } = info.row.original || {}
        return <span>{email}</span>
      },
    },
    {
      accessorKey: 'phone',
      header: () => <span>Phone</span>,
      cell: (info) => {
        const {
          student: { phone },
        } = info.row.original || {}
        return <span>{phone}</span>
      },
    },
    {
      accessorKey: 'courses',
      header: () => <span>Courses</span>,
      cell: (info) => {
        return info?.row?.original?.courses?.map((c: Course) => (
          <CourseDot key={c?.id} course={c} />
        ))
      },
    },
  ]
  const count = data?.data?.length
  return (
    <>
      <div className="flex justify-between">
        <div className="">
          <Typography variant="title" color="text-gray-400">
            Workplace Requests
          </Typography>
          <Typography variant="h3">{count || 0}</Typography>
        </div>
      </div>
      {isError && <TechnicalError />}
      {isLoading ? (
        <LoadingAnimation height="h-[60vh]" />
      ) : data?.data && data?.data?.length ? (
        <Table columns={columns} data={data?.data}>
          {({ table, pagination, pageSize, quickActions }: any) => {
            return (
              <div>
                <div className="px-6">{table}</div>
              </div>
            )
          }}
        </Table>
      ) : (
        !isError && (
          <EmptyData
            title={'No Workplace Requests Found'}
            description={'There is no New Workplace Request yet'}
            height={'50vh'}
          />
        )
      )}
    </>
  )
};
