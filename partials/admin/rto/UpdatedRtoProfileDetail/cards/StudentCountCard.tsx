import React from 'react'
import { Card, Typography } from '@components'
import { HiUserCircle } from 'react-icons/hi'
import { LabelCard } from './LabelCard'

export const StudentCountCard = () => {
    return (
        <Card noPadding>
            <div className="px-3.5 py-3 flex flex-col gap-y-1 relative">
                <LabelCard
                    right={16}
                    top={-20}
                    background={{
                        from: '#FF7300',
                        to: '#F7910F',
                    }}
                />
                <Typography variant="label" color="text-[#7B809A]" light>
                    New Added Students
                </Typography>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-1.5">
                        <Typography variant="h3" bold>
                            50
                        </Typography>
                        <Typography variant="xxs" light color="text-[#7B809A]">
                            Since last 30 days
                        </Typography>
                    </div>
                    <div>
                        <Typography
                            underline
                            variant="small"
                            color="text-[#24556D]"
                        >
                            View Student Logs
                        </Typography>
                    </div>
                </div>
            </div>
        </Card>
    )
}
