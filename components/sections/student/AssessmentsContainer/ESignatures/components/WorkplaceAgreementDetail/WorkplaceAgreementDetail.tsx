import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React from 'react'

type Props = {}

export const WorkplaceAgreementDetail = (props: Props) => {
    return (
        <div>
            <Card noPadding>
                <div className="p-2 flex justify-between items-center border-b">
                    <div className="flex items-center gap-x-1">
                        <div>
                            <Typography
                                variant="subtitle"
                                color="text-neutral-900"
                            >
                                Workplace Agreement
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                variant="label"
                                color="text-neutral-400"
                            >
                                - Viewer
                            </Typography>
                        </div>
                    </div>

                    <div>
                        <Typography variant="muted" color="text-gray-400">
                            Filed On: 5th Oct, 2022
                        </Typography>
                    </div>
                </div>
                <div className="py-2 px-4">
                    <Typography variant="body" color="text-black">
                        As an user, its very simple to manage the Zoom meeting
                        by signing up in Zoom and managing the meeting through
                        Zoom console. But, as a programmer, we need to integrate
                        Zoom video meeting with our application and we need to
                        manage the Zoom meetings programmatically through our
                        application so that our application's user does not
                        required to be registered with Zoom to use Zoom meeting
                        through our application. If we want to integrate zoom
                        meeting functionality with our application, we need to
                        follow the below steps: Either purchase zoom license or
                        we can use free version also but with some limitation
                        like each meeting with only 40 minute max duration, only
                        one meeting at a time for a host, meeting auto recording
                        in Cloud etc. I am explaining here for free version.
                        Register on Zoom(https://zoom.us/signup) with one of
                        your email id. This email id will be used as host email
                        id while creating the zoom meeting programmatically from
                        your application. Login to Zoom market
                        place(https://marketplace.zoom.us/) with the credentials
                        generated after signing up in step 2. Click on the
                        dropdown "Develop" and select "Build App" as shown in
                        below screenshot
                    </Typography>
                </div>
            </Card>
        </div>
    )
}
