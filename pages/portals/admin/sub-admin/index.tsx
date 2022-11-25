import { ReactElement, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AdminLayout, StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import {
   Badge,
   Card,
   DocumentCard,
   HelpQuestionSet,
   InitialAvatar,
   LottieAnimation,
   TabNavigation,
   TabProps,
   UserProfile,
} from '@components'
import { FaBook, FaMapMarker, FaMapMarkerAlt, FaSchool } from 'react-icons/fa'
import { Animations } from '@animations'
import { MdPermContactCalendar, MdPhone, MdVerified } from 'react-icons/md'
import { IoBriefcase } from 'react-icons/io5'
import { useContextBar, useNavbar } from '@hooks'
import { InitialAvatarContainer } from '@components/InitialAvatar/InitialAvatarContainer'
import {
   ApprovedStudent,
   PendingStudent,
   RejectedStudent,
   BlockedStudent,
   ArchivedStudent,
} from '@partials'
import { AdminApi } from '@queries'
import { ApprovedSubAdmin, ArchivedSubAdmin, BlockedSubAdmin, PendingSubAdmin, RejectedSubAdmin } from '@partials/admin/sub-admin'

const SubAdminList: NextPageWithLayout = () => {
   const navBar = useNavbar()
   const contextBar = useContextBar()

   const { isLoading, data } = AdminApi.SubAdmins.useCountQuery()
   // console.log("count sub admins",data);
   
   useEffect(() => {
      navBar.setTitle('Sub-Admins')
      contextBar.hide()
      // contextBar.setContent(<UserProfile />)
   }, [])

   const tabs: TabProps[] = [
      {
         label: 'Pending',
         href: { pathname: 'sub-admin', query: { tab: 'pending' } },
         badge: {
            text: data?.pending,
            loading: isLoading,
         },
         element: <PendingSubAdmin />,
      },
      {
         label: 'Approved',
         href: { pathname: 'sub-admin', query: { tab: 'approved' } },
         badge: {
            text: data?.approved,
            loading: isLoading,
         },
         element: <ApprovedSubAdmin />,
      },
      {
         label: 'Rejected',
         href: { pathname: 'sub-admin', query: { tab: 'rejected' } },
         badge: {
            text: data?.rejected,
            loading: isLoading,
         },
         element: <RejectedSubAdmin />,
      },
      {
         label: 'Blocked',
         href: { pathname: 'sub-admin', query: { tab: 'blocked' } },
         badge: {
            text: data?.blocked,
            loading: isLoading,
         },
         element: <BlockedSubAdmin />,
      },
      {
         label: 'Archived',
         href: { pathname: 'sub-admin', query: { tab: 'archived' } },
         badge: {
            text: data?.archived,
            loading: isLoading,
         },
         element: <ArchivedSubAdmin />,
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

SubAdminList.getLayout = (page: ReactElement) => {
   return <AdminLayout>{page}</AdminLayout>
}

export default SubAdminList
