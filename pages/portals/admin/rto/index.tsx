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
  ApprovedRto,
  PendingRto,
  RejectedRto,
  BlockedRto,
  ArchivedRto,
} from '@partials'
import { AdminApi } from '@queries/portals'

const RtoList: NextPageWithLayout = () => {
  const navBar = useNavbar()
  const contextBar = useContextBar()

  const { isLoading, data } = AdminApi.rto.useRtosCountQuery()

  useEffect(() => {
    navBar.setTitle('RTO')
    contextBar.hide()
    // contextBar.setContent(<UserProfile />)
  }, [])

  const tabs: TabProps[] = [
    {
      label: 'Pending',
      href: { pathname: 'rto', query: { tab: 'pending' } },
      badge: {
        text: data?.pending,
        loading: isLoading,
      },
      element: <PendingRto />,
    },
    {
      label: 'Approved',
      href: { pathname: 'rto', query: { tab: 'approved' } },
      badge: {
        text: data?.approved,
        loading: isLoading,
      },
      element: <ApprovedRto />,
    },
    {
      label: 'Rejected',
      href: { pathname: 'rto', query: { tab: 'rejected' } },
      badge: {
        text: data?.rejected,
        loading: isLoading,
      },
      element: <RejectedRto />,
    },
    {
      label: 'Blocked',
      href: { pathname: 'rto', query: { tab: 'blocked' } },
      badge: {
        text: data?.blocked,
        loading: isLoading,
      },
      element: <BlockedRto />,
    },
    {
      label: 'Archived',
      href: { pathname: 'rto', query: { tab: 'archived' } },
      badge: {
        text: data?.archived,
        loading: isLoading,
      },
      element: <ArchivedRto />,
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
