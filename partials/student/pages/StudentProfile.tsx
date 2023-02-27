import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout, UserStatus } from '@types'

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
    SubAdminApi,
    useGetSubAdminStudentDetailQuery,
    useUpdateAssessmentToolArchiveMutation,
} from '@queries'

import { useAlert, useContextBar, useNavbar, useNotification } from '@hooks'

import { DetailTabs } from '@partials/sub-admin/students'
import { AddWorkplace } from '@partials/sub-admin/students'
import { getUserCredentials } from '@utils'
import { FaArchive, FaBan } from 'react-icons/fa'
import { useActionModals } from '@partials/sub-admin/students/hooks/useActionModals'

export const StudentProfile = ({ noTitle }: { noTitle?: boolean }) => {
    const contextBar = useContextBar()
    const router = useRouter()
    const { id } = router.query

    const { alert } = useAlert()
    const { notification } = useNotification()

    const [addWorkplace, setAddWorkplace] = useState<boolean>(false)
    const { data, isLoading, isError, isSuccess, refetch } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
        })
    const [notContactable, notContactableResult] =
        SubAdminApi.Student.useNotContactable()

    // hooks
    const navBar = useNavbar()
    const { onAcceptClicked, onRejectClicked, modal } = useActionModals()

    useEffect(() => {
        if (notContactableResult.isSuccess) {
            notification.success({
                title: 'Not Contactable',
                description: 'Not Contactable',
            })
        }
    }, [notContactableResult])

    useEffect(() => {
        if (isSuccess && data) {
            contextBar.setContent(<SubAdminStudentProfile student={data} />)
            contextBar.show(false)
            navBar.setSubTitle(data?.user?.name)
            const showAlert = () => {
                switch (data?.user?.status) {
                    case UserStatus.Pending:
                        alert.warning({
                            title: 'Student is Pending',
                            description: 'Student is Pending',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Archived:
                        alert.warning({
                            title: 'Student is Archived',
                            description: 'Student is Archived',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Rejected:
                        alert.error({
                            title: 'Student is Rejected',
                            description: 'Student is Rejected',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Blocked:
                        alert.error({
                            title: 'Student is Blocked',
                            description: 'Student is Blocked',
                            autoDismiss: false,
                        })
                        break

                    default:
                        break
                }
            }
            showAlert()
        }
    }, [data])

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()

    const role = getUserCredentials()?.role
    const status = getUserCredentials()?.status

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
                        <Button
                            text="Not Contactable"
                            variant="info"
                            onClick={() => {
                                notContactable(data?.id)
                            }}
                            loading={notContactableResult.isLoading}
                            disabled={notContactableResult.isLoading}
                        />
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
                                    ? sessionStorage.getItem('student')
                                    : role === 'subadmin'
                                    ? 'portals/sub-admin/students?tab=all'
                                    : role === 'rto'
                                    ? 'portals/rto/students?tab=active'
                                    : '#'
                            }
                            text="Students"
                        />
                        {!noTitle ? (
                            <PageTitle title="Student Profile" />
                        ) : (
                            <div />
                        )}
                    </div>
                    {isSuccess && data && (
                        <div className="flex flex-col items-end gap-y-2">
                            <div className="pl-4">
                                <StudentTimer
                                    studentId={data?.user?.id}
                                    date={data?.expiryDate}
                                    studentStatus={data?.user?.studentStatus}
                                />
                            </div>
                            {role !== 'rto' && statusBaseActions()}
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
