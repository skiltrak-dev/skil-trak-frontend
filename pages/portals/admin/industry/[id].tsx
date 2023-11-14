import {
    ActionButton,
    Alert,
    BackButton,
    Button,
    EmptyData,
    IndustryProfile,
    LoadingAnimation,
    TechnicalError,
    TextInput,
} from '@components'
import {
    useActionModal,
    useAlert,
    useContextBar,
    useNavbar,
    useNotification,
} from '@hooks'
import { AdminLayout } from '@layouts'
import { Industry, NextPageWithLayout, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { FaArchive, FaBan, FaEdit } from 'react-icons/fa'

import { DetailTabs } from '@partials/admin/industry/tabs'
import { AdminApi, CommonApi } from '@queries'

import { FigureCard } from '@components/sections/subAdmin'
import { PinnedNotes } from '@partials'
import { useActionModals } from '@partials/admin/industry/hooks/useActionModals'
import { getUserCredentials } from '@utils'
import { AcceptModal } from '@partials/admin/industry/modals'
import { SnoozeIndustry, SnoozeIndustryModal } from '@partials/common'

const Detail: NextPageWithLayout = () => {
    const [newModal, setNewModal] = useState<ReactNode | null>(null)

    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const { alert, setAlerts } = useAlert()

    useEffect(() => {
        navBar.setTitle('Industry Detail')
    }, [])

    const {
        modal,
        // onAcceptClicked,
        onRejectClicked,
        onArchiveClicked,
        onUnblockClicked,
        onDeleteClicked,
        onUnArchiveClicked,
        onBlockClicked,
    } = useActionModals()

    const onAcceptClicked = (industry: any) => {
        setNewModal(
            <AcceptModal
                industry={industry}
                onCancel={() => setNewModal(null)}
            />
        )
    }

    const industry = AdminApi.Industries.useDetail(Number(router.query.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })
    const industryStatisticsCount = AdminApi.Industries.useStatisticsCount(
        Number(industry?.data?.user?.id),
        { skip: !industry?.data?.user?.id }
    )

    useEffect(() => {
        navBar.setSubTitle('Industry Detail')
        navBar.setSubTitle(industry.data?.user?.name)
    }, [industry.data])
    useEffect(() => {
        if (industry.isSuccess) {
            if (industry?.data) {
                contextBar.setContent(<IndustryProfile data={industry.data} />)
                contextBar.show(false)
            }
            const showAlert = () => {
                switch (industry.data?.user?.status) {
                    case UserStatus.Pending:
                        alert.warning({
                            title: 'Industry is Pending',
                            description: 'Industry is Pending',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Archived:
                        alert.warning({
                            title: 'Industry is Archived',
                            description: 'Industry is Archived',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Rejected:
                        alert.error({
                            title: 'Industry is Rejected',
                            description: 'Industry is Rejected',
                            autoDismiss: false,
                        })
                        break
                    case UserStatus.Blocked:
                        alert.error({
                            title: 'Industry is Blocked',
                            description: 'Industry is Blocked',
                            autoDismiss: false,
                        })
                        break

                    default:
                        break
                }
            }
            showAlert()
        }

        return () => {
            setAlerts([])
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [industry])

    const role = getUserCredentials()?.role

    const { passwordModal, onViewPassword } = useActionModal()

    const statusBaseActions = () => {
        switch (industry.data?.user?.status) {
            case UserStatus.Pending:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            variant={'success'}
                            Icon={FaArchive}
                            onClick={() => onAcceptClicked(industry?.data)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onRejectClicked(industry?.data)}
                        >
                            Reject
                        </ActionButton>
                    </div>
                )
            case UserStatus.Approved:
                return (
                    <div className="flex gap-x-2">
                        <ActionButton
                            Icon={FaEdit}
                            onClick={() => {
                                router.push(
                                    role === 'admin'
                                        ? `/portals/admin/industry/edit-industry/${router.query.id}`
                                        : `/portals/sub-admin/users/industries/${router.query.id}/edit-profile`
                                )
                            }}
                        >
                            Edit
                        </ActionButton>
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onArchiveClicked(industry?.data)}
                        >
                            Archive
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onBlockClicked(industry?.data)}
                        >
                            Block
                        </ActionButton>
                    </div>
                )
            case UserStatus.Blocked:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onUnblockClicked(industry?.data)}
                        >
                            Un Block
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(industry?.data)}
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
                            onClick={() => onAcceptClicked(industry?.data)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(industry?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )
            case UserStatus.Archived:
                return (
                    <div className="flex items-center gap-x-2">
                        <ActionButton
                            Icon={FaArchive}
                            onClick={() => onUnArchiveClicked(industry?.data)}
                        >
                            Un Archive
                        </ActionButton>
                        <ActionButton
                            Icon={FaBan}
                            variant={'error'}
                            onClick={() => onDeleteClicked(industry?.data)}
                        >
                            Delete
                        </ActionButton>
                    </div>
                )

            default:
                return
        }
    }

    const onCancelModal = () => setNewModal(null)

    const onSnooze = () => {
        setNewModal(
            <SnoozeIndustryModal
                onCancel={onCancelModal}
                industry={industry?.data as Industry}
            />
        )
    }

    return (
        <>
            {newModal}
            {passwordModal}
            {industry.isError && <TechnicalError />}
            {industry.isLoading || industry?.isFetching ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : industry.data ? (
                <div className="p-6 flex flex-col gap-y-4">
                    {industry?.data?.snoozedDate && (
                        <Alert
                            title="Industry Snoozed"
                            description="Industry Snoozed"
                            variant="warning"
                            autoDismiss={false}
                        />
                    )}
                    {modal && modal}
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <BackButton text="Industries" />
                        <div className="flex items-center gap-x-2">
                            <Button
                                text={'View Password'}
                                onClick={() => {
                                    onViewPassword({
                                        user: industry?.data?.user,
                                    })
                                }}
                            />
                            <Button
                                text="Book Appointment"
                                variant="info"
                                onClick={() => {
                                    router.push({
                                        pathname:
                                            '/portals/admin/appointment-type/create-appointment',
                                        query: {
                                            industry: industry?.data?.user?.id,
                                        },
                                    })
                                }}
                                disabled={!industry.isSuccess}
                            />
                            <Button
                                text="Snooze"
                                variant="action"
                                onClick={() => {
                                    onSnooze()
                                }}
                            />
                            {statusBaseActions()}
                        </div>
                    </div>
                    <div className="flex">
                        <FigureCard
                            imageUrl="/images/icons/students.png"
                            count={Number(industryStatisticsCount?.data?.count)}
                            title={'Current Students'}
                            link={`/portals/admin/industry/${industry?.data?.id}?tab=students`}
                        />
                    </div>

                    <PinnedNotes id={industry?.data?.user?.id} />
                    <DetailTabs id={router.query.id} industry={industry} />
                </div>
            ) : (
                !industry.isError &&
                industry.isSuccess && (
                    <EmptyData
                        title={'No Industry Found'}
                        description={'No Industry Found on your request'}
                    />
                )
            )}
        </>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Detail
