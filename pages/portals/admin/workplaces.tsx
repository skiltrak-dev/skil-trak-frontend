import { ReactElement, useEffect } from 'react'

import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { WorkplaceRequest } from '@components/sections/subAdmin'

// query
import { AdminApi, useGetSubAdminWorkplacesQuery } from '@queries'

// components
import { Button, EmptyData, LoadingAnimation, TechnicalError } from '@components'
import MyWorkPlaces from '../student/workplace/my-workplace'
import { AdminWorkplaceRequest } from '@partials/admin/workplace/components/AdminWorkplaceRequest'
import { useRouter } from 'next/router'
import { useNavbar } from '@hooks'

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
  const navBar = useNavbar()

  useEffect(() => {
    navBar.setTitle('Workplace Request')
  }, [])
  // const subAdminWorkplace = useGetSubAdminWorkplacesQuery()
  const subAdminWorkplace = AdminApi.Workplace.useWorkplaceListQuery()
  // console.log("Workplaces", subAdminWorkplace);

  return (
    <>
      {subAdminWorkplace.isError && <TechnicalError />}
      {subAdminWorkplace.isLoading && subAdminWorkplace.isFetching ? (
        <LoadingAnimation />
      ) : subAdminWorkplace.data && subAdminWorkplace.data.length > 0 ? (
        <div className="flex flex-col gap-y-2">
          {subAdminWorkplace?.data?.map((workplace: any) => (
            <AdminWorkplaceRequest key={workplace?.id} workplace={workplace} />
          ))}
        </div>
      ) : (
        !subAdminWorkplace.isError && <EmptyData />
      )}
    </>
  )
}
Workplace.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Workplace
