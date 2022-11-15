import { useEffect } from 'react'

// Components
import { Card, CircularProgresbar, Typography } from 'components'

// Context
import { useContextBar } from 'hooks'

// Colors

import { Animations } from 'assets'
// import { PrimaryActionLink } from "components";
import { DisplayPrimaryActions } from 'components'
import { AdForRPL } from 'pages/ApplyForRPL'

export const TaskPrimaryActions = [
    {
        link: 'add-a-schedule',
        title: 'Add Schedule',
        description: 'Some helping text',
        image: null, //"./images/Schedule.png",
        animation: Animations.MyTasks.Scheduling,
    },
    {
        link: 'add-a-schedule',
        title: 'Available Shifts',
        description: 'Some helping text',
        image: null, //"./images/dashboardbtn.png",
        animation: Animations.MyTasks.AvailableShift,
    },
]

export const MyTasks = () => {
    const { setContent } = useContextBar()

    useEffect(() => {
        setContent(null)
    }, [setContent])

    return (
        <div>
            {/* Links */}
            <div className="w-full flex justify-between">
                <div className="w-[59%] ">
                    <Typography variant={'title'}>Get Started</Typography>
                    {/*  */}
                    <Card px={9} mt={2}>
                        {/* <div className="flex flex-col justify-center items-center gap-y-2">
							{TaskPrimaryActions.map((action, i) => (
								<PrimaryActionLink
									key={i}
									link={action.link}
									title={action.title}
									description={action.description}
									image={action.image}
									animation={action.animation}
								/>
							))}
						</div> */}
                        <DisplayPrimaryActions actions={TaskPrimaryActions} />
                    </Card>
                </div>
                <div className="w-[36%]">
                    <div className="w-full flex justify-between">
                        <Typography variant={'title'}>
                            Total Students
                        </Typography>
                        <Typography variant={'links'} color={'textLink'}>
                            View All
                        </Typography>
                    </div>

                    {/*  */}
                    <Card px={9} mt={2}>
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
                <Card mt={2} px={9}>
                    <AdForRPL />
                </Card>
            </div>
        </div>
    )
}
