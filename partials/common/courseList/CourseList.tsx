import { Typography } from '@components'
import { Course } from '@types'
import React from 'react'

export const CourseList = ({ courses }: { courses: Course[] }) => {
    return (
        <div>
            {courses?.map((c: Course) => (
                <div key={c?.id} className="flex gap-x-2 justify-start">
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-400 p-2 rounded-full"></div>
                        <div className="bg-blue-400 w-[1px] h-full"></div>
                    </div>
                    <div className="pb-2">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            {c?.code}
                        </Typography>
                        <Typography variant={'small'} color={'text-gray-800'}>
                            {c?.title}
                        </Typography>
                    </div>
                </div>
            ))}
        </div>
    )
}
