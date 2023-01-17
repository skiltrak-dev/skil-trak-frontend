import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
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
import { PinnedNotes } from '@partials'
import { Industry } from '@types'
import { ArchiveModal, BlockModal } from '@partials/admin/industry/modals'

// TODO: Can be deleted
const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    // FIXME: change this with something
    const [modal, setModal] = useState<ReactElement | null>(null)

    const industry = AdminApi.Industries.useDetail(Number(router.query.id), {
        skip: !router.query?.id,
    })

    useEffect(() => {
        navBar.setTitle('Industry Detail')
        navBar.setSubTitle(industry?.data?.user?.name)
        contextBar.hide()
    }, [industry])

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

            <div>
                <div className="w-full grid grid-cols-12 gap-x-2 gap-y-2">
                    {/* first */}
                    <div
                        className={`col-span-10 xl:col-span-5 w-full flex flex-col justify-between bg-white rounded-2xl shadow-xl`}
                    >
                        <div className="w-full flex items-center gap-x-2 px-4 py-2">
                            <img
                                className="w-24 h-24 border rounded-lg p-1"
                                src={industry?.data?.user.avatar}
                                alt="Industry Logo"
                            />
                            <div>
                                <Typography variant={'title'}>
                                    {industry?.data?.user?.name}
                                </Typography>
                                <div className="flex items-center gap-x-2">
                                    <Typography
                                        variant={'label'}
                                        color={'text-gray-500'}
                                    >
                                        {industry?.data?.user?.email}
                                    </Typography>
                                    <BsPatchCheckFill className="text-link" />
                                </div>
                                <div className="text-sm flex gap-x-2 items-center mt-2 text-gray-500">
                                    <MdPlace className="text-gray-400" />
                                    {industry?.data?.addressLine1}
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex border-t border-secondary-dark">
                            <div className="w-full flex justify-center">
                                <DescriptiveInfo
                                    title={'ABN'}
                                    description={
                                        industry?.data
                                            ? industry?.data?.abn
                                            : 'NA'
                                    }
                                    Icon={AiOutlineBarcode}
                                />
                            </div>
                            <div className="w-full flex justify-center border-r border-l border-secondary-dark">
                                <DescriptiveInfo
                                    title={'Phone'}
                                    description={
                                        industry?.data
                                            ? industry?.data?.phoneNumber
                                            : 'NA'
                                    }
                                    Icon={AiTwotonePhone}
                                />
                            </div>
                            <div className="w-full  flex justify-center">
                                <DescriptiveInfo
                                    title={'Last Login'}
                                    description={'Yesterday'}
                                    Icon={AiOutlineLogin}
                                />
                            </div>
                        </div>
                    </div>

                    {/* second */}
                    <div
                        className={`col-span-10 lg:col-span-4 xl:col-span-4 w-full flex flex-col gap-y-2`}
                    >
                        {/* Contact Person */}
                        <div className="w-full h-full bg-white rounded-2xl shadow-xl px-4 py-2">
                            <div className="mb-2">
                                <Typography variant={'muted'}>
                                    Contact Person
                                </Typography>
                            </div>
                            <div className="w-full flex items-start gap-x-2">
                                <InitialAvatar
                                    name={
                                        industry?.data?.contactPerson
                                            ? industry?.data.contactPerson
                                            : 'Not Provided'
                                    }
                                    first
                                />
                                <div>
                                    <p className="text-sm text-gray-700">
                                        {industry?.data?.contactPerson
                                            ? industry?.data.contactPerson
                                            : 'Not Provided'}
                                    </p>
                                    <p className="text-xs font-medium text-gray-500">
                                        {industry?.data?.contactPersonNumber
                                            ? industry?.data.contactPersonNumber
                                            : '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Placement Coordinator */}
                        <div className="w-full h-full bg-white rounded-2xl shadow-xl px-4 py-2">
                            <div className="mb-2">
                                <Typography variant={'muted'}>
                                    Placement Coordinator(s)
                                </Typography>
                            </div>
                            <div className="w-full flex">
                                <div className="w-full flex items-start gap-x-2">
                                    <InitialAvatar name="John Doe" first />
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            John Doe
                                        </p>
                                        <p className="text-xs font-medium text-gray-500">
                                            john@skiltrak.com.au
                                        </p>
                                    </div>
                                </div>

                                <InitialAvatarContainer show={2}>
                                    <InitialAvatar name="John Doe" />
                                    <InitialAvatar name="Austin Martini" />
                                    <InitialAvatar name="Dcosta Belrona" />
                                    <InitialAvatar name="AB Deviler" />
                                </InitialAvatarContainer>
                            </div>
                        </div>
                    </div>

                    {/* third */}
                    <div
                        className={` col-span-10 lg:col-span-3 xl:col-span-3 w-full flex flex-col justify-between gap-y-2`}
                    >
                        <div className="w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-between px-4 py-2">
                            <Image
                                src={'/images/portal-icons/students.png'}
                                width={48}
                                height={48}
                                alt=""
                            />
                            <div className="flex flex-col items-end">
                                <Typography variant={'h2'} center>
                                    106
                                </Typography>
                                <Typography
                                    variant={'muted'}
                                    color="text-gray-500"
                                >
                                    Number Of Students
                                </Typography>
                            </div>
                        </div>
                        <div className="w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-between px-4 py-2">
                            <Image
                                src={'/images/portal-icons/pending-student.png'}
                                width={48}
                                height={48}
                                alt=""
                            />
                            <div className="flex flex-col items-end">
                                <Typography variant={'h2'} center>
                                    20
                                </Typography>
                                <Typography
                                    variant={'muted'}
                                    color="text-gray-500"
                                >
                                    Pending Requests
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PinnedNotes id={industry?.data?.user?.id} />

            <DetailTabs id={router.query.id} industry={industry} />
        </div>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Detail
