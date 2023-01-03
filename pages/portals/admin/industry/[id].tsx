import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
    IndustryProfile,
    InitialAvatar,
    InitialAvatarContainer,
    TabNavigation,
    TabProps,
    Typography,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState, useEffect } from 'react'
import {
    AiOutlineBarcode,
    AiOutlineLogin,
    AiTwotonePhone,
} from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan, FaEdit } from 'react-icons/fa'

import { AdminApi } from '@queries'
import Image from 'next/image'
import { MdPlace } from 'react-icons/md'
import { DetailTabs } from '@partials/admin/industry/tabs'

import { Industry } from '@types'
import { ArchiveModal, BlockModal } from '@partials/admin/industry/modals'
import { PinnedNotes } from '@partials'

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
            <PinnedNotes id={industry?.data?.user?.id}  />
        </div>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Detail
