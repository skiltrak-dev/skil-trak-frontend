import { useState } from 'react'
import { Select } from '@components'
import { SubAdminApi } from '@queries'
import { AssignCoordinatorModal } from '../modals'
import { Course, Student, SubAdmin } from '@types'

export const AssignCoordinator = ({ student }: { student: Student }) => {
    const departmentCoordinators =
        SubAdminApi.Student.useDepartmentCoordinators()
    const [modal, setModal] = useState<any | null>(null)
    const [changeCoordinator, setChangeCoordinator] = useState(false)

    const filterSubadminsByCourses = (
        subadminsData: any,
        coursesToCheck: number[]
    ) => {
        // Filter subadmins who have at least one of the specified courses
        const filteredSubadmins = subadminsData?.filter(
            (item: { subadmin: SubAdmin }) => {
                const subadminCourses = item?.subadmin?.courses?.map(
                    (course) => course?.id
                )

                // Check if any course ID from coursesToCheck exists in subadminCourses
                return coursesToCheck?.some((courseId) =>
                    subadminCourses?.includes(courseId)
                )
            }
        )

        return filteredSubadmins
    }

    const studentCoursesIds = student?.courses?.map((c: Course) => c?.id)

    const subAdminOptionsData = filterSubadminsByCourses(
        departmentCoordinators?.data,
        studentCoursesIds
    )

    const subAdminOptions = subAdminOptionsData?.map((coordinator: any) => ({
        value: coordinator?.subadmin?.id,
        label: coordinator.subadmin?.user?.name,
    }))

    const onCancelModal = () => {
        setModal(null)
    }
    const onChangeCoordinator = (value: number) => {
        setModal(
            <AssignCoordinatorModal
                onCancelModal={onCancelModal}
                subAdminId={value}
                studentId={student?.id}
            />
        )
    }

    return (
        <>
            {modal && modal}{' '}
            <div className="min-w-48 relative z-10">
                {!changeCoordinator && !student.subadmin ? (
                    <div className="">
                        <Select
                            name={'subAdmin'}
                            placeholder={'Select Sub Admin'}
                            options={subAdminOptions}
                            loading={departmentCoordinators?.isLoading}
                            disabled={departmentCoordinators?.isLoading}
                            onChange={(e: any) => {
                                onChangeCoordinator(Number(e?.value))
                            }}
                        />
                    </div>
                ) : changeCoordinator ? (
                    <div className="flex items-start gap-x-2">
                        <div className="">
                            <Select
                                name={'subAdmin'}
                                placeholder={'Select Sub Admin'}
                                options={subAdminOptions}
                                loading={departmentCoordinators?.isLoading}
                                disabled={departmentCoordinators?.isLoading}
                                onChange={(e: any) => {
                                    onChangeCoordinator(Number(e?.value))
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setChangeCoordinator(false)
                            }}
                            className="text-red-400 text-xs hover:text-red-600"
                        >
                            cancel
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        <p className="text-xs font-medium text-gray-600">
                            {student?.subadmin?.user?.name}
                        </p>
                        <button
                            onClick={() => {
                                setChangeCoordinator(true)
                            }}
                            className="text-link text-xs underline hover:text-link-dark"
                        >
                            change
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}
