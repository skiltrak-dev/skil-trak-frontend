import {
    ActionButton,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { RtoApi } from '@queries'
import { useEffect, useState } from 'react'
import { useNotification } from '@hooks'
import { Course } from '@types'
import { CourseList } from './CourseList'

export const UpdatedCourseList = ({
    sectorsWithCourses,
    editCourseHours,
}: {
    editCourseHours?: boolean
    sectorsWithCourses: any
}) => {
    const [editCourse, setEditCourse] = useState<boolean>(false)
    const [selectedCourses, setSelectedCourses] = useState<any>([])

    const { notification } = useNotification()

    const [updateHours, updateHoursResult] =
        RtoApi.Courses.useUpdateCourseHours()

    useEffect(() => {
        if (!editCourse) {
            const allCourses: Course[] = Object.values(
                sectorsWithCourses
            )?.flat() as unknown as Course[]

            setSelectedCourses(
                allCourses?.map((c: Course) => ({
                    id: c?.id,
                    hours:
                        c?.extraHours && c?.extraHours?.length > 0
                            ? Number(c?.extraHours?.[0]?.hours).toFixed(0)
                            : c?.hours,
                }))
            )
        }
    }, [editCourse, sectorsWithCourses])

    useEffect(() => {
        if (updateHoursResult.isSuccess) {
            setEditCourse(false)
            setSelectedCourses([])
            notification.success({
                title: 'Course Hours Updated',
                description: 'Course Hours Updated Successfully',
            })
        }
    }, [updateHoursResult])

    const onUpdateHours = () => {
        updateHours({
            courses: selectedCourses?.map((c: any) => ({
                course: c?.id,
                hours: c?.hours,
            })),
        })
    }

    return (
        <div>
            <ShowErrorNotifications result={updateHoursResult} />
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <Typography variant={'label'} medium>
                        Eligible Sectors
                    </Typography>
                    {!editCourse && editCourseHours && (
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
                    <div
                        className={
                            'max-h-96 overflow-auto custom-scrollbar flex flex-col px-2 gap-y-4 mt-5'
                        }
                    >
                        {Object.keys(sectorsWithCourses).map((sector: any) => {
                            return (
                                <div key={sector?.id}>
                                    <Typography
                                        variant={'small'}
                                        color={'text-black'}
                                        bold
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
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <NoData text={'No Sectors Assigned'} />
                )}
            </div>
            {editCourse && (
                <div className="flex items-center gap-x-2">
                    <div className="mt-2">
                        <ActionButton
                            variant="link"
                            onClick={() => {
                                onUpdateHours()
                            }}
                            loading={updateHoursResult.isLoading}
                            disabled={updateHoursResult.isLoading}
                        >
                            Update
                        </ActionButton>
                    </div>
                    <div className="mt-2">
                        <ActionButton
                            variant="light"
                            onClick={() => {
                                setEditCourse(false)
                            }}
                        >
                            Cancel
                        </ActionButton>
                    </div>
                </div>
            )}
        </div>
    )
}
