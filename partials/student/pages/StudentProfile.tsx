import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

//Layouts
import { UserStatus } from '@types'

//components
import {
    ActionButton,
    AuthorizedUserComponent,
    BackButton,
    Button,
    EmptyData,
    LoadingAnimation,
    PageTitle,
    ShowErrorNotifications,
    StudentTimer,
    SubAdminStudentProfile,
    TechnicalError,
} from '@components'

// queries
import {
    SubAdminApi,
    useGetSubAdminStudentDetailQuery,
    useUpdateAssessmentToolArchiveMutation,
} from '@queries'

import {
    useActionModal,
    useAlert,
    useContextBar,
    useNavbar,
    useNotification,
} from '@hooks'

import { AddWorkplace, DetailTabs } from '@partials/sub-admin/students'
import { useActionModals } from '@partials/sub-admin/students/hooks/useActionModals'
import { getLink, getUserCredentials } from '@utils'
import { FaArchive, FaBan } from 'react-icons/fa'
import { UserRoles } from '@constants'

export const StudentProfile = ({ noTitle }: { noTitle?: boolean }) => {
    const [studentExpiryDate, setStudentExpiryDate] = useState<boolean>(false)

    const contextBar = useContextBar()
    const router = useRouter()
    const { id } = router.query

    const { alert, setAlerts, alerts } = useAlert()
    const { notification } = useNotification()

    const [addWorkplace, setAddWorkplace] = useState<boolean>(false)
    const { data, isLoading, isError, isSuccess, refetch } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
            refetchOnMountOrArgChange: true,
        })
    const [notContactable, notContactableResult] =
        SubAdminApi.Student.useNotContactable()
    const { passwordModal, onViewPassword } = useActionModal()

    // useEffect(() => {
    //     if (studentExpiryDate) {
    //         refetch()
    //     }
    // }, [studentExpiryDate])

    // hooks
    const navBar = useNavbar()
    const {
        onAcceptClicked,
        onRejectClicked,
        onUnArchiveClicked,
        onDeleteClicked,
        onUnblockClicked,
        modal,
    } = useActionModals()

    useEffect(() => {
        if (notContactableResult.isSuccess) {
            notification.success({
                title: data?.nonContactable ? 'Not Contactable' : 'Contactable',
                description: data?.nonContactable
                    ? 'Not Contactable'
                    : 'Contactable',
            })
        }
    }, [notContactableResult])

    useEffect(() => {
        if (isSuccess && data) {
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
            if (!alerts?.length) {
                showAlert()
            }
        }

        return () => {
            setAlerts([])
        }
    }, [data])

    useEffect(() => {
        if (isSuccess && data) {
            contextBar.setContent(<SubAdminStudentProfile student={data} />)
            contextBar.show(false)
            navBar.setSubTitle(data?.user?.name)
        }
        return () => {
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [data])

    const [archiveAssessmentTool, archiveAssessmentToolResult] =
        useUpdateAssessmentToolArchiveMutation()

    const role = getUserCredentials()?.role
    const status = getUserCredentials()?.status

    const statusBaseActions = () => {
        switch (data?.user?.status) {
            case UserStatus.Pending:
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
            case UserStatus.Approved:
                return (
                    <div className="flex items-end gap-x-2">
                        <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                            <AddWorkplace id={data?.id} />
                        </AuthorizedUserComponent>
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
                            text={
                                data?.nonContactable
                                    ? 'Not Contactable'
                                    : 'Contactable'
                            }
                            variant={
                                data?.nonContactable ? 'info' : 'secondary'
                            }
                            onClick={() => {
                                notContactable(data?.id)
                            }}
                            loading={notContactableResult.isLoading}
                            disabled={notContactableResult.isLoading}
                        />
                    </div>
                )
            case UserStatus.Blocked:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onUnblockClicked(data)}
                        >
                            Un Block
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )
            case UserStatus.Rejected:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onAcceptClicked(data)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )
            case UserStatus.Archived:
                return (
                    <div className="flex items-center gap-x-2">
                        {/* <ActionButton
                            Icon={FaArchive}
                            onClick={() => onUnArchiveClicked(data)}
                        >
                            Un Archive
                        </ActionButton> */}
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(data)}
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
            {passwordModal}
            <ShowErrorNotifications result={notContactableResult} />
            <div className="mb-16">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <BackButton
                            link={
                                role === 'admin'
                                    ? getLink('student') ||
                                      'portals/admin/student?tab=active&page=1&pageSize=50'
                                    : role === 'subadmin'
                                    ? getLink('subadmin-student') ||
                                      'portals/sub-admin/students?tab=all'
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
                            <div className="flex items-center gap-x-1">
                                <div className="pl-4 flex items-center gap-x-5">
                                    <StudentTimer
                                        studentId={data?.user?.id}
                                        date={data?.expiryDate}
                                        studentStatus={
                                            data?.user?.studentStatus
                                        }
                                        changeExpiryData={setStudentExpiryDate}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Button
                                    text={'View Password'}
                                    onClick={() => {
                                        onViewPassword({ user: data?.user })
                                    }}
                                />
                                <AuthorizedUserComponent
                                    roles={[
                                        UserRoles.ADMIN,
                                        UserRoles.SUBADMIN,
                                    ]}
                                >
                                    {statusBaseActions()}
                                </AuthorizedUserComponent>
                            </div>
                        </div>
                    )}
                </div>

                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height={'h-[60vh]'} />
                ) : data && !isError ? (
                    <DetailTabs student={data} id={data?.id} />
                ) : (
                    !isError &&
                    data?.isSuccess && (
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
