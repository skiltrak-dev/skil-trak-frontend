import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

// hooks
import { useContextBar } from '@hooks'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
  IndustryProfile,
    RtoProfileSidebar,
    LoadingAnimation,
    ReactTable,
    TabNavigation,
    TabProps,
    Typography,
} from '@components'

import {
  AppointmentProfile,
  FigureCard,
  RtoProfileOverview,
  SubAdminProfileTabsView,
} from '@components/sections'
import { AllNotes } from '@components/sections'
// icons
import { FaEdit } from 'react-icons/fa'
// queries
import {
  useGetSubAdminRTODetailQuery,
  useUpdateAssessmentToolArchiveMutation,
} from '@queries'
import { AssessmentTools } from '@components/sections/subAdmin/UsersContainer/SubAdminRtosContainer/SubAdminRtosProfile/AssessmentTools'

type Props = {}

const RtoProfile: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <RtoProfileSidebar />
            </>
        )
    }, [setContent])
    const pathname = useRouter()
    const profileId = pathname.query.profileId

    // query
    const rtoDetail:any = useGetSubAdminRTODetailQuery(String(profileId), {
        skip: !profileId,
    })

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
    useUpdateAssessmentToolArchiveMutation()
    const actions = (id: any) => {
        // console.log(id)
        return (
            <div className="flex gap-x-2 ">
                <a
                    href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/course/content/${id}`}
                    target="blank"
                    rel="noreferrer"
                >
                    <Typography variant="tableCell" color="text-blue-600">
                        Download
                    </Typography>
                </a>

                <div
                    className="cursor-pointer"
                    onClick={() => {
                        archiveAssessmentTool(id)
                    }}
                >
                    <Typography variant="tableCell" color="text-[#7081A0]">
                        Archive
                    </Typography>
                </div>
                <div
                    onClick={() => {
                        // console.log('Edit')
                    }}
                >
                    <FaEdit className="text-[#686DE0] cursor-pointer" />
                </div>
            </div>
        )
    }
    const tabs: TabProps[] = [
        {
            label: 'Overview',
            href: { pathname: String(profileId), query: { tab: 'overview' } },
            badge: { text: '05', color: 'text-blue-500' },
            element: (
                <RtoProfileOverview
                    rtoId={profileId}
                    userId={rtoDetail?.data?.user?.id}
                />
            ),
        },
        {
            label: 'Assessments',
            href: {
                pathname: String(profileId),
                query: { tab: 'assessments' },
            },
            badge: { text: '99+', color: 'text-error-500' },
            element: (
                <AssessmentTools
                    id={profileId}
                    courses={rtoDetail?.data?.courses}
                    role={'RTO'}
                    actions={actions}
                />
            ),
        },
        {
            label: 'Appointments',
            href: {
                pathname: String(profileId),
                query: { tab: 'appointments' },
            },
            element: <AppointmentProfile />,
        },
        {
            label: 'Mails',
            href: { pathname: String(profileId), query: { tab: 'mails' } },
            element: <div>Mails</div>,
        },
        {
            label: 'Notes',
            href: { pathname: String(profileId), query: { tab: 'notes' } },
            element: <AllNotes id={rtoDetail?.data?.user?.id} />,
        },
    ]

  return (
    <>
      {rtoDetail?.isLoading ? (
        <LoadingAnimation />
      ) : rtoDetail?.data ? (
        <TabNavigation tabs={tabs}>
          {({ header, element }: any) => {
            return (
              <div>
                <div>{header}</div>
                <div>{element}</div>
              </div>
            )
          }}
        </TabNavigation>
      ) : (
        'No RTO Were Found'
      )}
    </>
  )
}
RtoProfile.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="RTO Profile">{page}</SubAdminLayout>
}

export default RtoProfile
