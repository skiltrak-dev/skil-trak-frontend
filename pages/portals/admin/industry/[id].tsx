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

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const industry = AdminApi.Industries.useDetail(Number(router.query.id), {
        skip: !router.query?.id,
    })

    useEffect(() => {
        navBar.setSubTitle(industry.data?.user?.name)
    }, [industry.data])
    useEffect(() => {
        if (industry.isSuccess) {
            contextBar.setContent(<IndustryProfile data={industry.data} />)
            contextBar.show(false)
        }
    }, [industry.data])

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onArchiveClicked = (industry: Industry | undefined) => {
        setModal(
            <ArchiveModal
                item={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onBlockClicked = (industry: Industry | undefined) => {
        setModal(
            <BlockModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
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
                        <div className="flex gap-x-2">
                            <ActionButton Icon={FaEdit}>Edit</ActionButton>
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
