import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// components
import { Button, BackButton, ReactTable } from '@components'
import { RightSidebarData } from '../../components'

// hooks
import { useContextBar } from 'hooks'
import { useGetStudentsQuery } from '@queries'

export const IndustryAppointments = () => {
  const router = useRouter()
  const [queryFilters, setQueryFilters] = useState({})
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
      Header: 'Placement Coordinator',
      accessor: 'PlacementCoordinator',
    },
    {
      Header: 'Type',
      accessor: 'Type',
      disableFilters: true,
    },
    {
      Header: 'Date',
      accessor: 'Date',
    },
    {
      Header: 'Time',
      accessor: 'Time',
    },
  ]
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <BackButton text={'Back To Students'} />
        <Button
          text={'Book Appointment'}
          variant={'info'}
          onClick={() => {
            router.push(
              '/portals/industry/students/appointments/book-appointments'
            )
          }}
        />
      </div>

      <ReactTable
        pagesize
        pagination
        Columns={Columns}
        querySort={'name'}
        action={useGetStudentsQuery}
        queryFilters={queryFilters}
      />
    </div>
  )
}
