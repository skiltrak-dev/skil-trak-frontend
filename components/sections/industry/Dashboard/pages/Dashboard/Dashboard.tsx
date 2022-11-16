import { useEffect } from 'react'

// Components
import { Card, CircularProgresbar, Typography } from 'components'

// Context
import { useContextBar } from 'hooks'
import { ContextBarContent } from './ContextbarContent'
import { PrimaryActionLink } from 'components'
import { Animations } from 'assets'
import { AdForRPL } from '../../../ApplyForRPL/AdForRPL'

export const PrimaryActions = [
  {
    link: 'required-documents',
    title: 'Documentation Required',
    description: 'Some helping text',
    image: null, //"./images/dashboardbtn.png",
    animation: Animations.Dashboard.RequiredDocuments,
  },
  {
    link: '/under-construction',
    title: 'Request a Volunteer',
    description: 'Some helping text',
    image: null, //"./images/dashboardbtn.png",
    animation: Animations.Dashboard.RequestVolunteer,
  },
]

export const Dashboard = () => {
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
    <div className="flex flex-col gap-y-8">
      {/* Links */}
      <div className="w-full flex flex-col lg:flex-row justify-between gap-y-3">
        <div className="w-full lg:w-[59%] ">
          <Typography variant={'title'}>Get Started</Typography>
          <Card mt={2} px={9}>
            <div className="w-full flex flex-col justify-center items-center gap-y-2">
              {PrimaryActions.map((action, i) => (
                <PrimaryActionLink
                  key={i}
                  link={action.link}
                  title={action.title}
                  description={action.description}
                  image={action.image}
                  animation={action.animation}
                />
              ))}
            </div>
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
          <Card mt={2} px={9}>
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
        <Card mt={2} px={9}>
          <AdForRPL />
        </Card>
      </div>
    </div>
  )
}
