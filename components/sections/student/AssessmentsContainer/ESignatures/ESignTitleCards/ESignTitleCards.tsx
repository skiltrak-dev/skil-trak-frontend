import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React from 'react'
import { ESignTitleCard } from '../components'

type Props = {}

export const ESignTitleCards = (props: Props) => {
    const eSignTitleCardData = [
        {
            courseName: 'Work Effectively As Cook',
            status: 'Not Signed',
        },
        {
            courseName: 'Coordinate Cooking Operations',
            status: 'Signed',
        },
    ]
    return (
        <>
            <Card noPadding>
                <div className='min-h-[370px]'>
                    <div className="p-2">
                        <Typography variant="muted" color="text-gray-400">
                            Selected Folder
                        </Typography>
                        <Typography variant="label" color="text-black">
                            Work Effectively As Cook
                        </Typography>
                    </div>
                    {eSignTitleCardData.map((course, index) => (
                        <ESignTitleCard
                            courseName={course.courseName}
                            status={course.status}
                        />
                    ))}
                </div>
            </Card>
        </>
    )
}
