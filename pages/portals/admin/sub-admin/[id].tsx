import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { useActionModal, useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout, SubAdmin } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import {
    AiOutlineBarcode,
    AiOutlineLogin,
    AiTwotonePhone,
} from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan } from 'react-icons/fa'

import { DetailTabs } from '@partials/admin/sub-admin'
import { AdminApi } from '@queries'
import { MdPlace } from 'react-icons/md'

import { FigureCard } from '@components/sections/subAdmin/components/Cards/FigureCard'
import { PinnedNotes } from '@partials'
import { ArchiveModal, BlockModal } from '@partials/admin/sub-admin/modals'

const SubAdminDetail: NextPageWithLayout = () => {
    const [changeStatusResult, setChangeStatusResult] = useState<any>({})
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [modal, setModal] = useState<ReactElement | null>(null)
    const { passwordModal, onUpdatePassword, onViewPassword } = useActionModal()

    const { data, isLoading, isError, refetch } =
        AdminApi.SubAdmins.useRtoProfile(Number(router.query.id), {
            skip: !router.query?.id,
        })
    const count = AdminApi.SubAdmins.useProfileCount(Number(data?.user?.id), {
        skip: !data,
    })

    useEffect(() => {
        navBar.setTitle('Sub Admin Detail')
        navBar.setSubTitle(data?.user?.name)
        contextBar.hide()
    }, [data])

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            refetch()
        }
    }, [changeStatusResult])

    const onModalCancelClicked = () => {
        setModal(null)
    }
    const onArchivedClicked = (subAdmin: SubAdmin) => {
        setModal(
            <ArchiveModal
                item={subAdmin}
                onCancel={() => onModalCancelClicked()}
                setChangeStatusResult={setChangeStatusResult}
            />
        )
    }

    const onBlockClicked = (subAdmin: SubAdmin) => {
        setModal(
            <BlockModal
                subAdmin={subAdmin}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    return (
        <>
            {modal && modal}
            {passwordModal}
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation height={'h-[60vh]'} />
            ) : data ? (
                <div className="p-6 flex flex-col gap-y-4 pb-32">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <BackButton
                            text="Sub Admin"
                            link={sessionStorage.getItem('subadmin')}
                        />
                        <div className="flex gap-x-2">
                            <Button
                                text={'View Password'}
                                onClick={() => {
                                    onViewPassword({
                                        user: data?.user,
                                    })
                                }}
                            />
                            <div>
                                <Button
                                    text={'Update Password'}
                                    onClick={() => onUpdatePassword(data)}
                                />
                            </div>
                            <ActionButton
                                Icon={FaArchive}
                                onClick={() => onArchivedClicked(data)}
                            >
                                Archive
                            </ActionButton>
                            <ActionButton
                                Icon={FaBan}
                                variant={'error'}
                                onClick={() => onBlockClicked(data)}
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
                                        src={
                                            data?.user.avatar ||
                                            '/images/avatar.png'
                                        }
                                        alt="RTO Logo"
                                    />
                                    <div>
                                        <Typography variant={'title'}>
                                            {data?.user?.name}
                                        </Typography>
                                        <div className="flex items-center gap-x-2">
                                            <Typography
                                                variant={'label'}
                                                color={'text-gray-500'}
                                            >
                                                {data?.user?.email}
                                            </Typography>
                                            <BsPatchCheckFill className="text-link" />
                                        </div>
                                        <div className="text-sm flex gap-x-2 items-center mt-2 text-gray-500">
                                            <MdPlace className="text-gray-400" />
                                            {data?.addressLine1}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex border-t border-secondary-dark">
                                    <div className="w-full flex justify-center">
                                        <DescriptiveInfo
                                            title={'SubAdmin Id'}
                                            description={String(data?.id)}
                                            Icon={AiOutlineBarcode}
                                        />
                                    </div>
                                    <div className="w-full flex justify-center border-r border-l border-secondary-dark">
                                        <DescriptiveInfo
                                            title={'Phone'}
                                            description={
                                                data ? data?.phone : 'NA'
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
                            <div className="col-span-7 flex flex-col gap-y-4 w-full">
                                <div className="flex gap-x-4 w-full">
                                    <FigureCard
                                        imageUrl="/images/icons/students.png"
                                        count={Number(count?.data?.student)}
                                        title={'Students'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/industry.png"
                                        count={Number(count?.data?.industry)}
                                        title={'Industries'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/rto.png"
                                        count={Number(count?.data?.rto)}
                                        title={'RTOs'}
                                    />
                                </div>
                                <div className="flex gap-x-4">
                                    <FigureCard
                                        imageUrl="/images/icons/workplace.png"
                                        count={Number(
                                            count?.data?.workplaceRequest
                                        )}
                                        title={'Workplace Requests'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/pending-student.png"
                                        count={Number(
                                            count?.data?.Pendingstudent
                                        )}
                                        title={'Pending Students'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/appointments.png"
                                        count={Number(count?.data?.appointment)}
                                        title={'Appointments'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <PinnedNotes id={data?.user?.id} />
                    <DetailTabs id={router.query.id} subAdmin={data} />
                </div>
            ) : (
                !isError && <EmptyData />
            )}
        </>
    )
}

SubAdminDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SubAdminDetail
