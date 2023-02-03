import {
    ActionButton,
    BackButton,
    EmptyData,
    IndustryProfile,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
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

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

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
    })

    useEffect(() => {
        navBar.setSubTitle('Industry Detail')
        navBar.setSubTitle(industry.data?.user?.name)
    }, [industry.data])
    useEffect(() => {
        if (industry.isSuccess) {
            contextBar.setContent(<IndustryProfile data={industry.data} />)
            contextBar.show(false)
        }
    }, [industry.data])

    const role = getUserCredentials()?.role

    const statusBaseActions = () => {
        switch (industry.data?.user?.status) {
            case 'pending':
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
            case 'approved':
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
            case 'blocked':
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
            case 'rejected':
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
            case 'archived':
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
            {industry.isError && <TechnicalError />}
            {industry.isLoading ? (
                <LoadingAnimation height={'60vh'} />
            ) : industry.data ? (
                <div className="p-6 flex flex-col gap-y-4">
                    {modal && modal}
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <BackButton text="Industries" />
                        {statusBaseActions()}
                    </div>

                    <DetailTabs id={router.query.id} industry={industry} />
                    <PinnedNotes id={industry?.data?.user?.id} />
                </div>
            ) : (
                !industry.isError && (
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
