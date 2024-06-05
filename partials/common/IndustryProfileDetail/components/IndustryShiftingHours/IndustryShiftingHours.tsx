import { Card, Typography } from '@components'
import React from 'react'
import { FreeShifts, TradingHours } from './components'
import { Waypoint } from 'react-waypoint'

export const IndustryShiftingHours = () => {
    return (
        <Waypoint onEnter={() => {}}>
            <div>
                <Card fullHeight shadowType="profile" noPadding>
                    <div className="px-4 py-3.5 border-b border-secondary-dark">
                        <Typography semibold>
                            <span className="text-[15px]">Overview</span>
                        </Typography>
                    </div>

                    {/*  */}

                    <TradingHours />
                    <FreeShifts />
                </Card>
            </div>
        </Waypoint>
    )
}
