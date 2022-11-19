import { useEffect, useState } from 'react'

// components
import { Card, BackButton, ReactTable } from 'components'
import { RightSidebarData } from '../../components'

// hooks
import { useContextBar } from 'hooks'
import { useGetStudentsQuery } from '@queries'

export const Appointments = () => {
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
      <BackButton text={'Back To Students'} />

      <Card>
        <ReactTable
          pagesize
          pagination
          Columns={Columns}
          querySort={'name'}
          action={useGetStudentsQuery}
          queryFilters={queryFilters}
        />
      </Card>
    </div>
  )
}
