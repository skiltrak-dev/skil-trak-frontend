import {
    ActionButton,
    BackButton,
    Button,
    EmptyData,
    IndustryProfile,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { useActionModal, useAlert, useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { FaArchive, FaBan, FaEdit } from 'react-icons/fa'

import { DetailTabs } from '@partials/admin/industry/tabs'
import { AdminApi } from '@queries'

import { PinnedNotes } from '@partials'
import { ArchiveModal, BlockModal } from '@partials/admin/industry/modals'
import { Industry } from '@types'
import { useActionModals } from '@partials/admin/industry/hooks/useActionModals'
import { getUserCredentials } from '@utils'
import { FigureCard } from '@components/sections/subAdmin'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const { alert, setAlerts } = useAlert()

    const {
        modal,
        onAcceptClicked,
        onRejectClicked,
        onArchiveClicked,
        onUnblockClicked,
        onDeleteClicked,
        onUnArchiveClicked,
        onBlockClicked,
    } = useActionModals()

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
            contextBar.setContent(<IndustryProfile data={industry.data} />)
            contextBar.show(false)
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

    return (
        <>
            {passwordModal}
            {industry.isError && <TechnicalError />}
            {industry.isLoading ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : industry.data ? (
                <div className="p-6 flex flex-col gap-y-4">
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

                    <DetailTabs id={router.query.id} industry={industry} />
                    <PinnedNotes id={industry?.data?.user?.id} />
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
