import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

//components
import {
    TechnicalError,
    LoadingAnimation,
    EmptyData,
    SubAdminStudentProfile,
    PageTitle,
    StudentTimer,
    Button,
} from '@components'

// queries
import {
    useGetSubAdminStudentDetailQuery,
    useUpdateAssessmentToolArchiveMutation,
} from '@queries'

import { useContextBar, useNavbar } from '@hooks'

import { DetailTabs } from '@partials/sub-admin/students'
import { AddWorkplace } from '@partials/sub-admin/students'
import { getUserCredentials } from '@utils'

export const StudentProfile = ({ noTitle }: { noTitle?: boolean }) => {
    const contextBar = useContextBar()
    const router = useRouter()
    const { id } = router.query

    const navBar = useNavbar()

    const [addWorkplace, setAddWorkplace] = useState<boolean>(false)

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
        })

    useEffect(() => {
        navBar.setSubTitle(data?.user?.name)
    }, [data])

    useEffect(() => {
        if (isSuccess) {
            contextBar.setContent(<SubAdminStudentProfile student={data} />)
            contextBar.show(false)
        }
    }, [data])

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()

    const role = getUserCredentials()?.role

    return (
        <div className="mb-16">
            <div className="flex justify-between items-end mb-4">
                {!noTitle ? (
                    <PageTitle title="Student Profile" backTitle="Students" />
                ) : (
                    <div />
                )}
                <div className="flex flex-col items-end gap-y-2">
                    <div className="pl-4">
                        <StudentTimer date={new Date('02/25/2023')} />
                    </div>
                    <div className="flex items-end gap-x-2">
                        <AddWorkplace id={data?.id} />

                        <Button
                            text="Book Appointment"
                            variant="info"
                            onClick={() => {
                                router.push({
                                    pathname:
                                        role === 'admin'
                                            ? '/portals/admin/appointment-type/create-appointment'
                                            : `/portals/sub-admin/tasks/appointments/create-appointment`,
                                    query: { student: data?.user?.id },
                                })
                            }}
                            disabled={!isSuccess}
                        />
                        <Button text="More" variant="action" />
                    </div>
                </div>
            </div>

            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <DetailTabs student={data} id={data?.id} />
            ) : (
                !isError && <EmptyData />
            )}
        </div>
    )
}
