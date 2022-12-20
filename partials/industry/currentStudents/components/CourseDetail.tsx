import { Typography } from '@components'
import React from 'react'
import { RiBook2Fill } from 'react-icons/ri'

export const CourseDetail = ({ course }: { course: any }) => {
    return (
        <div className="flex items-center relative">
            <div className="flex items-center gap-x-2">
                <RiBook2Fill className="text-gray-400 text-2xl" />
                <div>
                    <Typography color={'black'} variant={'xs'}>
                        {course?.sector?.name}
                    </Typography>
                    <Typography variant={'muted'}>
                        {course?.code} - {course?.title}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
