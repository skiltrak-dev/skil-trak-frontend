import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// components
import {
    EmptyData,
    LoadingAnimation,
    ShowErrorNotifications,
    TechnicalError,
} from '@components'
import { checkStudentProfileCompletion } from '@utils'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { useContextBar, useNotification } from '@hooks'

// queries
import { StudentProfileForm } from '@partials/common'
import {
    SubAdminApi,
    useGetSubAdminStudentDetailQuery,
    useUpdateStudentProfileMutation,
} from '@queries'
import { CompleteProfileBeforeWpModal } from '@partials/common/StudentProfileDetail/components'

const EditStudentDetail: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const { notification } = useNotification()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const [showProfileModal, setShowProfileModal] = useState<boolean>(true)

    const router = useRouter()
    const { id } = router.query

    const student = useGetSubAdminStudentDetailQuery(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })

    const courses = SubAdminApi.Student.useCourses(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const [updateDetail, updateDetailResult] = useUpdateStudentProfileMutation()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    useEffect(() => {
        if (updateDetailResult?.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Student Profile Updated',
            })
            setTimeout(() => {
                if (router?.query?.wpType && student?.isSuccess) {
                    const values = {
                        ...student?.data,
                        ...student?.data?.user,
                        courses: courses?.data,
                    }
                    const profileCompletion =
                        checkStudentProfileCompletion(values)
                    if (
                        profileCompletion &&
                        profileCompletion > 0 &&
                        profileCompletion < 100 &&
                        showProfileModal
                    ) {
                        setModal(
                            <CompleteProfileBeforeWpModal
                                workplaceType={
                                    'provide-workplace-detail?tab=abn'
                                }
                                onCancel={() => {
                                    setModal(null)
                                    setShowProfileModal(false)
                                }}
                            />
                        )
                    } else if (profileCompletion === 100) {
                        switch (router?.query?.wpType) {
                            case 'provide-workplace-detail':
                                router.push({
                                    pathname: `/portals/sub-admin/students/${id}/provide-workplace-detail`,
                                    query: { tab: 'abn' },
                                })
                                break
                            case 'request-workplace-detail':
                                router.push(
                                    `/portals/sub-admin/students/${id}/request-workplace-detail`
                                )
                                break

                            default:
                                break
                        }
                    }
                } else {
                    router.back()
                }
            }, 600)
        }
    }, [updateDetailResult, student, router])

    const onSubmit = (values: any) => {
        if (!values?.courses) {
            delete values?.courses
        }
        const { name, email, ...rest } = values
        const dob = new Date(values.dob)
        dob.setDate(dob.getDate() + 1)

        updateDetail({
            id: student?.data?.id,
            body: {
                ...rest,
                ...(rest?.courses
                    ? {
                          courses: rest?.courses?.map((course: any) => ({
                              id: course?.value,
                          })),
                      }
                    : {}),
                dob,
                isInternational:
                    values?.isInternational === 'international' ? true : false,
                user: {
                    id: student?.data?.user?.id,
                    name,
                    email,
                },
            },
        }).then((res: any) => {
            if (res?.data) {
                setShowProfileModal(true)
            }
        })
    }
    return (
        <>
            {modal}
            <ShowErrorNotifications result={updateDetailResult} />
            {/* <UpdateDetails onSubmit={onSubmit} result={updateDetailResult} /> */}
            <div className="px-4">
                {student.isError && <TechnicalError />}
                {student.isLoading || student.isFetching ? (
                    <LoadingAnimation height={'h-[70vh]'} />
                ) : student.data && student.isSuccess ? (
                    <StudentProfileForm
                        onSubmit={onSubmit}
                        profile={student}
                        result={updateDetailResult}
                        courses={courses}
                    />
                ) : (
                    !student.isError && student.isSuccess && <EmptyData />
                )}
            </div>
        </>
    )
}
EditStudentDetail.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Edit Student Detail' }}>
            {page}
        </SubAdminLayout>
    )
}

export default EditStudentDetail
