import React from 'react'
import { Typography } from '@components'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

export const ApprovedCourseTooltip = ({ courses }: any) => {
    if (!courses || courses.length === 0) return null

    return (
        <div className="flex items-center gap-x-1 gap-y-2 mt-2">
            {courses?.map((course: any) => (
                <div key={course.id} className="relative group">
                    <div className="size-2 bg-gray-500 rounded-full cursor-pointer"></div>
                    <div className="invisible group-hover:visible absolute left-0 top-2 z-10">
                        <div className="bg-white border rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
                            <Typography variant="small" semibold>
                                {course?.title} - {course?.code}
                            </Typography>
                            <Typography variant="small" semibold>
                                Course Hours - {course?.hours}
                            </Typography>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
