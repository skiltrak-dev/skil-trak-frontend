import { ReactElement, useEffect } from 'react'

import { BackButton, Card, TabNavigation, TabProps } from '@components'
import { useAlert, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, Sector } from '@types'
import { SectorForm } from '@partials/admin/sector/form'
import { PageHeading } from '@components/headings'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'

const SectorAddPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { alert } = useAlert()
  const { notification } = useNotification()
  const navBar = useNavbar()

  const [add, addResult] = AdminApi.Sectors.useAddMutation()

  useEffect(() => {
    navBar.setTitle('Sectors')
  }, [])

  const onSubmit = async (values: Sector) => {
    await add(values)
  }

  useEffect(() => {
    if (!addResult.isUninitialized) {
      if (addResult.isSuccess) {
        router.push('/portals/admin/sectors?tab=sectors')
        alert.success({
          title: 'Sector Added',
          description: 'A new sector has been created',
        })
      }

      if (addResult.isError) {
        notification.error({
          title: 'Failed to add sector',
          description: 'New sector add failed',
        })
      }
    }
  }, [addResult])

  return (
    <div className="p-6 flex flex-col gap-y-4">
      <BackButton text="Sectors" />
      <PageHeading
        title={'Add Sector'}
        subtitle={`You are creating a sector`}
      ></PageHeading>
      <Card layout='wrap'>
        <div className='w-96'>
          <SectorForm onSubmit={onSubmit} />
        </div>
      </Card>
    </div>
  )
}

SectorAddPage.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default SectorAddPage
