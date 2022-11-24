import { useEffect } from 'react'

// Components
import {
  Card,
  CircularProgresbar,
  Typography,
  DisplayPrimaryActions,
} from '@components'

// Context
import { useContextBar } from 'hooks'
import { ContextBarContent } from './ContextbarContent'
import { Animations } from '@animations'
import { AdForRPL } from '@components/sections/industry'

export const PrimaryActions = [
  {
    link: 'industry/required-documents',
    title: 'Documentation Required',
    description: 'Some helping text',
    animation: Animations.Industry.Dashboard.RequiredDocuments,
  },
  {
    link: '/under-construction',
    title: 'Request a Volunteer',
    description: 'Some helping text',
    animation: Animations.Industry.Dashboard.RequestVolunteer,
  },
]

export const IndustryDashboardContainer = () => {
  const { setContent } = useContextBar()

  useEffect(() => {
    setContent(<ContextBarContent />)
  }, [setContent])

  // const router= useRouter();
  // useEffect(() => {
  //   if (!AuthUtils.isAuthenticated()) {
  //     navigate("/login");
  //   }
  // }, [AuthUtils.isAuthenticated]);

  return (
    <div className="flex flex-col gap-y-6">
      {/* Links */}
      <div className="w-full flex flex-col lg:flex-row justify-between gap-y-3">
        <div className="w-full flex-shrink-0 lg:w-[62%]">
          <Typography variant={'title'}>Get Started</Typography>
          <Card>
            <DisplayPrimaryActions actions={PrimaryActions} />
          </Card>
        </div>
        <div className="w-full lg:w-[36%]">
          <div className="w-full flex justify-between items-center">
            <Typography variant={'title'}>Total Students</Typography>
            <Typography variant={'muted'} color={'textLink'}>
              View All
            </Typography>
          </div>

          {/*  */}
          <Card>
            <div className="w-full flex flex-col gap-y-2">
              <CircularProgresbar />
            </div>
          </Card>
        </div>
      </div>

      {/* Others */}
      <div className="w-full">
        <Typography variant={'title'}>Others</Typography>

        {/*  */}
        <Card>
          <AdForRPL />
        </Card>
      </div>
    </div>
  )
}
