import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
    InitialAvatar,
    InitialAvatarContainer,
    Typography,
    TechnicalError,
    EmptyData,
    LoadingAnimation,
} from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import {
    AiFillCodeSandboxCircle,
    AiOutlineBarcode,
    AiOutlineLogin,
    AiTwotonePhone,
} from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan, FaPhoneAlt } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { IoLogIn } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import Image from 'next/image'
import { DetailTabs } from '@partials/admin/sub-admin'
import { FigureCard } from '@components/sections'

const RtoDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const { data, isLoading, isError } = AdminApi.SubAdmins.useRtoProfile(
        Number(router.query.id),
        {
            skip: !router.query?.id,
        }
    )

    useEffect(() => {
        navBar.setTitle('Sub Admin Detail')
        contextBar.hide()
    }, [])

    return (
        <>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : data ? (
                <div className="p-6 flex flex-col gap-y-4 pb-32">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <BackButton text="RTOs" />
                        <div className="flex gap-x-2">
                            <ActionButton Icon={FaArchive}>
                                Archive
                            </ActionButton>
                            <ActionButton Icon={FaBan} variant={'error'}>
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
                                        src={data?.user.avatar}
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
                                            {data?.address}
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
                                        count={0}
                                        title={'Students'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/industry.png"
                                        count={0}
                                        title={'Industries'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/rto.png"
                                        count={0}
                                        title={'RTOs'}
                                    />
                                </div>
                                <div className="flex gap-x-4">
                                    <FigureCard
                                        imageUrl="/images/icons/workplace.png"
                                        count={0}
                                        title={'Workplace Requests'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/pending-student.png"
                                        count={0}
                                        title={'Pending Students'}
                                    />
                                    <FigureCard
                                        imageUrl="/images/icons/appointments.png"
                                        count={0}
                                        title={'Appointments'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <DetailTabs id={router.query.id} subAdmin={data?.user} />
                </div>
            ) : (
                !isError && <EmptyData />
            )}
        </>
    )
}

RtoDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoDetail
