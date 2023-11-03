import { ActionButton, Button, NoData, Typography } from '@components'
import { Course } from '@types'
import React, { useState } from 'react'
import { CourseList } from './CourseList'

export const RtoSectors = ({
    sectorsWithCourses,
}: {
    sectorsWithCourses: any
}) => {
    const [editCourse, setEditCourse] = useState<boolean>(false)
    const [selectedCourses, setSelectedCourses] = useState<any>([])
    return (
        <div>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Eligible Sectors
                    </Typography>
                    {!editCourse && (
                        <div
                            className="text-xs bg-blue-300 rounded-md text-blue-900 px-2 py-0.5 cursor-pointer w-fit ml-auto"
                            onClick={() => {
                                setEditCourse(true)
                            }}
                        >
                            Edit Course Hours
                        </div>
                    )}
                </div>

                {sectorsWithCourses ? (
                    Object.keys(sectorsWithCourses).map((sector) => {
                        return (
                            <>
                                <Typography
                                    variant={'label'}
                                    color={'text-black'}
                                >
                                    {sector}
                                </Typography>

                                <CourseList
                                    courses={
                                        (sectorsWithCourses as any)[sector]
                                    }
                                    editCourse={editCourse}
                                    setSelectedCourses={(val: any) => {
                                        setSelectedCourses(val)
                                    }}
                                    selectedCourses={selectedCourses}
                                />
                            </>
                        )
                    })
                ) : (
                    <NoData text={'No Sectors Assigned'} />
                )}
            </div>
            {editCourse && (
                <div className="mt-2">
                    <ActionButton
                        variant="link"
                        onClick={() => {
                            setEditCourse(false)
                        }}
                    >
                        Update
                    </ActionButton>
                </div>
            )}
        </div>
    )
}
