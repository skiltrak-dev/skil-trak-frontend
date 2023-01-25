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
    BackButton,
    ActionButton,
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
import { FaArchive, FaBan } from 'react-icons/fa'
import { useActionModals } from '@partials/sub-admin/students/hooks/useActionModals'

export const StudentProfile = ({ noTitle }: { noTitle?: boolean }) => {
    const contextBar = useContextBar()
    const router = useRouter()
    const { id } = router.query

    const [addWorkplace, setAddWorkplace] = useState<boolean>(false)
    const { data, isLoading, isError, isSuccess, refetch } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
        })

    // hooks
    const navBar = useNavbar()
    const { onAcceptClicked, onRejectClicked, modal } = useActionModals()

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

    const statusBaseActions = () => {
        switch (data?.user?.status) {
            case 'pending':
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            variant={'success'}
                            Icon={FaArchive}
                            onClick={() => onAcceptClicked(data)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onRejectClicked(data)}
                        >
                            Reject
                        </ActionButton>
                    </div>
                )
            case 'approved':
                return (
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
                )
            case 'blocked':
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            // onClick={() => onArchiveClicked(rto?.data)}
                        >
                            Un Block
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            // onClick={() => onBlockClicked(rto?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )
            case 'rejected':
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            // onClick={() => onArchiveClicked(rto?.data)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            // onClick={() => onBlockClicked(rto?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )
            case 'archived':
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            // onClick={() => onArchiveClicked(rto?.data)}
                        >
                            Un Archive
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            // onClick={() => onBlockClicked(rto?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )

            default:
                return
        }
    }

    return (
        <>
            {modal && modal}
            <div className="mb-16">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <BackButton
                            link={
                                role === 'admin'
                                    ? '/portals/admin/student?tab=approved'
                                    : '/portals/sub-admin/students?tab=all'
                            }
                            text="Students"
                        />
                        {!noTitle ? (
                            <PageTitle title="Student Profile" />
                        ) : (
                            <div />
                        )}
                    </div>
                    {isSuccess && (
                        <div className="flex flex-col items-end gap-y-2">
                            <div className="pl-4">
                                <StudentTimer date={new Date('02/25/2023')} />
                            </div>
                            {statusBaseActions()}
                        </div>
                    )}
                </div>

                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height={'h-[60vh]'} />
                ) : data ? (
                    <DetailTabs student={data} id={data?.id} />
                ) : (
                    !isError && (
                        <EmptyData
                            title={'Student Not found'}
                            description={'Student Does not exist!'}
                        />
                    )
                )}
            </div>
        </>
    )
}
