// will be receiving course id and industry id as props and will call an api to delete the course

//     const handleDelete = () => {
//         deleteCourse({
//             course: courseId,
//             industry: industryId,
//         })
//     }
import React from 'react'
import { Button, Typography } from '@components'
import { Trash2 } from 'lucide-react'

export const DeleteCourseModal = ({ course }: any) => {
    return (
        <div className="flex flex-col gap-y-4 items-center">
            <div className="flex justify-center mt-4">
                <Trash2
                    size={45}
                    className="bg-red-400 rounded-full p-2 text-white"
                />
            </div>
            <div className="px-5 py-1 flex flex-col gap-y-2 items-center">
                <Typography variant="title">Are you sure?</Typography>
                <Typography variant="body" italic>
                    You want to delete this{' '}
                    <span className="font-semibold">
                        {course?.course?.title ?? 'NA'}
                    </span>{' '}
                    course?
                </Typography>
            </div>
            <Button text={'Confirm'} variant="error" />
        </div>
    )
}
