import { ReactElement, useEffect } from 'react'

import {
   TabNavigation,
   TabProps
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
   ApprovedStudent, ArchivedStudent, BlockedStudent, PendingStudent,
   RejectedStudent
} from '@partials/admin/student'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'

const RtoList: NextPageWithLayout = () => {
   const navBar = useNavbar()
   const contextBar = useContextBar()

   const { isLoading, data } = AdminApi.Students.useCountQuery()

   useEffect(() => {
      navBar.setTitle('Students')
      contextBar.hide()
      // contextBar.setContent(<UserProfile />)
   }, [])

   const tabs: TabProps[] = [
      {
         label: 'Pending',
         href: { pathname: 'student', query: { tab: 'pending' } },
         badge: {
            text: data?.pending,
            loading: isLoading,
         },
         element: <PendingStudent />,
      },
      {
         label: 'Approved',
         href: { pathname: 'student', query: { tab: 'approved' } },
         badge: {
            text: data?.approved,
            loading: isLoading,
         },
         element: <ApprovedStudent />,
      },
      {
         label: 'Rejected',
         href: { pathname: 'student', query: { tab: 'rejected' } },
         badge: {
            text: data?.rejected,
            loading: isLoading,
         },
         element: <RejectedStudent />,
      },
      {
         label: 'Blocked',
         href: { pathname: 'student', query: { tab: 'blocked' } },
         badge: {
            text: data?.blocked,
            loading: isLoading,
         },
         element: <BlockedStudent />,
      },
      {
         label: 'Archived',
         href: { pathname: 'student', query: { tab: 'archived' } },
         badge: {
            text: data?.archived,
            loading: isLoading,
         },
         element: <ArchivedStudent />,
      },
   ]

   return (
      <div>
         <TabNavigation tabs={tabs}>
            {({ header, element }: any) => {
               return (
                  <div>
                     <div>{header}</div>
                     <div className="p-4">{element}</div>
                  </div>
               )
            }}
         </TabNavigation>
      </div>
   )
}

RtoList.getLayout = (page: ReactElement) => {
   return <AdminLayout>{page}</AdminLayout>
}

export default RtoList
