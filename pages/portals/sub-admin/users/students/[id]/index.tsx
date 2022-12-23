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

import { useContextBar } from '@hooks'

import { DetailTabs } from '@partials/sub-admin/students'

const StudentsProfile: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const router = useRouter()
    const { id } = router.query

    const [addWorkplace, setAddWorkplace] = useState<boolean>(false)

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(String(id), {
            skip: !id,
        })

    useEffect(() => {
        if (isSuccess) {
            contextBar.setContent(<SubAdminStudentProfile student={data} />)
            contextBar.show(false)
        }
    }, [data])

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()

    const workplaceActions = [
        {
            text: 'Provide Workplace Detail',
            onClick: () => {
                router.push(`${id}/provide-workplace-detail`)
            },
        },
        {
            text: 'Request Workplace Detail',
            onClick: () => {
                router.push(`${id}/request-workplace-detail`)
            },
        },
    ]

    return (
        <div className="mb-16">
            <div className="flex justify-between items-end mb-4">
                <PageTitle title="Student Profile" backTitle="Students" />
                <div className="flex flex-col items-end gap-y-2">
                    <div className="pl-4">
                        <StudentTimer date={new Date('12/30/2022')} />
                    </div>
                    <div className="flex items-end gap-x-2">
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                setAddWorkplace(false)
                            }}
                        >
                            <div className="relative">
                                <Button
                                    text="Add Workplace"
                                    onClick={() => {
                                        setAddWorkplace(!addWorkplace)
                                    }}
                                />
                                {addWorkplace && (
                                    <div className="absolute z-20 mt-2 bg-white py-2 shadow-lg rounded">
                                        {workplaceActions.map(
                                            ({ text, onClick }) => (
                                                <p
                                                    key={text}
                                                    className="whitespace-pre text-sm text-gray-600 font-medium py-2 border-b border-gray-200 cursor-pointer px-2 hover:bg-gray-200"
                                                    onClick={() => {
                                                        onClick()
                                                        setAddWorkplace(false)
                                                    }}
                                                >
                                                    {text}
                                                </p>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </OutsideClickHandler>

                        <Button
                            text="Book Appointment"
                            variant="info"
                            onClick={() => {
                                router.push(
                                    `/portals/sub-admin/tasks/appointments/create-appointment?student=${data?.user?.id}`
                                )
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
StudentsProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default StudentsProfile
