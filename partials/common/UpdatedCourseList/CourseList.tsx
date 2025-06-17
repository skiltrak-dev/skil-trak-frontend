import { AuthorizedUserComponent, Typography } from '@components'
import { UserRoles } from '@constants'
import { RtoWorkplaceTypes } from '@partials/admin/rto/UpdatedRtoProfileDetail/components/RtoSectors/RtoWorkplaceTypes'
import { Course } from '@types'
import { Fragment, useEffect } from 'react'

export const CourseList = ({
    setSelectedCourses,
    selectedCourses,
    courses,
    editCourse,
    userId,
}: {
    selectedCourses: any
    setSelectedCourses: any
    editCourse: boolean
    courses: Course[]
    userId?: any
}) => {
    useEffect(() => {
        setSelectedCourses((prevCourses: any) => {
            const allCourses = [...prevCourses, ...courses]
            return allCourses?.map((c: Course) => ({
                id: c?.id,
                hours:
                    c?.extraHours && c?.extraHours?.length > 0
                        ? Number(c?.extraHours?.[0]?.hours).toFixed(0)
                        : c?.hours,
            }))
        })
    }, [])

    return (
        <div className="flex flex-col gap-y-2.5 mt-2">
            {courses?.map((c: Course) => (
                <Fragment key={c?.id}>
                    <div className="bg-[#95C6FB26] border border-[#6B728050] rounded-md p-2.5">
                        <div
                            className={
                                'flex gap-x-2 justify-between items-center'
                            }
                        >
                            <Typography
                                variant={'xxs'}
                                color={'text-[#24556D]'}
                            >
                                {c?.code}
                            </Typography>

                            <Typography variant={'xxs'} color={'text-gray-500'}>
                                <span className="text-[#6C6C6C]">
                                    Course Hours :
                                </span>{' '}
                                {editCourse ? (
                                    <input
                                        placeholder="Hours"
                                        className="border rounded p-1.5 text-xs w-14"
                                        name="hours"
                                        type="number"
                                        value={
                                            selectedCourses?.find(
                                                (s: any) => s?.id === c?.id
                                            )
                                                ? selectedCourses?.find(
                                                      (s: any) =>
                                                          s?.id === c?.id
                                                  )?.hours
                                                : c?.hours
                                        }
                                        onChange={(e: any) => {
                                            setSelectedCourses(
                                                (course: any) => {
                                                    const existingCourse =
                                                        courses?.find(
                                                            (ccc: any) =>
                                                                ccc.id === c.id
                                                        )
                                                    return existingCourse
                                                        ? [
                                                              ...course?.filter(
                                                                  (a: any) =>
                                                                      a?.id !==
                                                                      c?.id
                                                              ),
                                                              {
                                                                  id: c?.id,
                                                                  hours: Number(
                                                                      e.target
                                                                          .value
                                                                  ),
                                                              },
                                                          ]
                                                        : [
                                                              ...course,
                                                              {
                                                                  id: c?.id,
                                                                  hours: Number(
                                                                      e.target
                                                                          .value
                                                                  ),
                                                              },
                                                          ]
                                                }
                                            )
                                        }}
                                    />
                                ) : c?.extraHours &&
                                  c?.extraHours?.length > 0 ? (
                                    Number(c?.extraHours?.[0]?.hours).toFixed(0)
                                ) : (
                                    c?.hours
                                )}
                            </Typography>
                        </div>
                        <div className="flex justify-between items-center gap-x-2.5">
                            <Typography variant={'xs'} medium>
                                {c?.title}
                            </Typography>
                            <AuthorizedUserComponent
                                roles={[UserRoles.RTO, UserRoles.ADMIN]}
                            >
                                <RtoWorkplaceTypes
                                    courseId={c?.id}
                                    userId={userId}
                                    workplaceTypes={c?.workplaceTypes}
                                />
                            </AuthorizedUserComponent>
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}
