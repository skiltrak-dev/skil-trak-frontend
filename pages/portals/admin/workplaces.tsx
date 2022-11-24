import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { WorkplaceRequest } from '@components/sections/subAdmin'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

// components
import { Button, LoadingAnimation } from '@components'
import MyWorkPlaces from '../student/workplace/my-workplace'

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
  const subAdminWorkplace = useGetSubAdminWorkplacesQuery()

  return (
    <>
      {subAdminWorkplace.isError && 'Error'}
      {subAdminWorkplace.isLoading && subAdminWorkplace.isFetching ? (
        <LoadingAnimation />
      ) : subAdminWorkplace.data && subAdminWorkplace.data.length > 0 ? (
        <div className="flex flex-col gap-y-2">
          {/* {subAdminWorkplace?.data?.map((workplace: any) => ( */}
            <WorkplaceRequest key={workplace.id} workplace={workplace} />
          {/* ))} */}
        </div>
      ) : (
        !subAdminWorkplace.isError && 'Empty'
      )}
    </>
  )
}
Workplace.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="Workplace">{page}</SubAdminLayout>
}

export default Workplace
