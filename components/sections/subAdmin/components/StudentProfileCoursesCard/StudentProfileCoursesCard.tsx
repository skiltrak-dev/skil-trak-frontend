import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React from 'react'
import { FaBook } from 'react-icons/fa'
import { Course } from './Course'

export const StudentProfileCoursesCard = ({ courses }: any) => {
    return (
        <Card>
            <div className="flex items-center gap-x-2">
                <div className="bg-gray-100 p-2 rounded-full">
                    <FaBook className="text-xl text-red-500" />
                </div>
                <Typography variant={'label'}>
                    <span className="font-semibold">
                        My Sector {'&'} Courses
                    </span>
                </Typography>
            </div>

            {/*  */}
            <div className="mt-2">
                <Typography variant={'small'} color={'text-gray-500'}>
                    Sector
                </Typography>
                <Typography variant={'label'} color={'text-gray-700'}>
                    Commercial Cookery {'&'} Hospitality
                </Typography>
            </div>

            {/*  */}
            <div className="mt-2 flex flex-col gap-y-1">
                {courses?.map((course: any) => (
                    <Course course={course} />
                ))}
            </div>
        </Card>
    )
}
