import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

// animations
import { Animations } from '@animations'

// components
import {
  Card,
  CircularProgresbar,
  DisplayPrimaryActions,
  Typography,
} from '@components'
import { RightSidebarData } from './components'

// Context
import { useContextBar } from 'hooks'
import { AdForRPL } from '../ApplyForRPL'

export const GeneralInfoPrimaryActions = [
  {
    link: 'unit-requirements',
    title: 'Unit Requirements',
    description: 'Some helping text',
    // image: null, //"./images/dashboardbtn3.png",
    animation: Animations.Industry.GeneralInfo.UnitRequirements,
  },
  {
    link: 'placement-workflow',
    title: 'Placement Workflow',
    description: 'Some helping text',
    // image: null, //"./images/dashboardbtn4.png",
    animation: Animations.Industry.GeneralInfo.Placement,
  },
  {
    link: 'industry-consultation',
    title: 'Industry Consultation',
    description: 'Some helping text',
    // image: null, //"./images/dashboardbtn4.png",
    animation: Animations.Industry.GeneralInfo.IndustryConsultation,
  },
  {
    link: 'mou',
    title: 'MoU',
    description: 'Some helping text',
    // image: null, //"./images/dashboardbtn4.png",
    animation: Animations.Industry.GeneralInfo.Signature,
  },
]

export const GeneralInfromationContainer = () => {
  const router = useRouter()
  const { setContent } = useContextBar()

  useEffect(() => {
    setContent(
      <>
        <RightSidebarData />
      </>
    )
  }, [setContent])
  return (
    <div>
      {/* Links */}
      <div className="w-full flex justify-between">
        <div className="w-[59%] ">
          <Typography variant={'title'}>Get Started</Typography>
          {/*  */}
          <Card>
            <DisplayPrimaryActions actions={GeneralInfoPrimaryActions} />
          </Card>
        </div>
        <div className="w-[36%]">
          <div className="w-full flex justify-between">
            <Typography variant={'title'}>Total Students</Typography>
            <Typography variant={'small'} color={'text-info'}>
              View All
            </Typography>
          </div>

          {/*  */}
          <Card>
            <div className="flex flex-col gap-y-2">
              <CircularProgresbar />
            </div>
          </Card>
        </div>
      </div>

      {/* Others */}
      <div className="w-full mt-8">
        <Typography variant={'title'}>Others</Typography>

        {/*  */}
        <Card>
          <AdForRPL />
        </Card>
      </div>
    </div>
  )
}
