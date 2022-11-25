import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
    InitialAvatar,
    InitialAvatarContainer,
    Typography,
    LoadingAnimation,
    EmptyData,
    TechnicalError,
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
import { DetailTabs } from '@partials/admin/rto/tabs'
import { PinnedNotes } from '@partials'

const RtoDetail: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
    })

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])

    return (
        <>
            {rto.isError && <TechnicalError />}
            {rto?.isLoading ? (
                <LoadingAnimation />
            ) : rto.data ? (
                <div className="p-6 mb-32 flex flex-col gap-y-6">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <BackButton text="RTOs" />
                        <div className="flex gap-x-2">
                            <Button>Import Students</Button>
                            <Button variant="dark">Summary Report</Button>
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
                                        src={rto.data?.user.avatar}
                                        alt="RTO Logo"
                                    />
                                    <div>
                                        <Typography variant={'title'}>
                                            {rto.data?.user?.name}
                                        </Typography>
                                        <div className="flex items-center gap-x-2">
                                            <Typography
                                                variant={'label'}
                                                color={'text-gray-500'}
                                            >
                                                {rto.data?.user?.email}
                                            </Typography>
                                            <BsPatchCheckFill className="text-link" />
                                        </div>
                                        <div className="text-sm flex gap-x-2 items-center mt-2 text-gray-500">
                                            <MdPlace className="text-gray-400" />
                                            {rto.data?.addressLine1}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex border-t border-secondary-dark">
                                    <div className="w-full flex justify-center">
                                        <DescriptiveInfo
                                            title={'RTO Code'}
                                            description={
                                                rto.data
                                                    ? rto.data?.rtoCode
                                                    : 'NA'
                                            }
                                            Icon={AiOutlineBarcode}
                                        />
                                    </div>
                                    <div className="w-full flex justify-center border-r border-l border-secondary-dark">
                                        <DescriptiveInfo
                                            title={'Phone'}
                                            description={
                                                rto.data
                                                    ? rto.data?.phone
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
                                            name="Contact Person"
                                            first
                                        />
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Contact&apos;o Person
                                            </p>
                                            <p className="text-xs font-medium text-gray-500">
                                                (012) 345 6789 123
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
                                            <InitialAvatar
                                                name="John Doe"
                                                first
                                            />
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
                                        src={
                                            '/images/portal-icons/students.png'
                                        }
                                        width={48}
                                        height={48}
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
                                        src={
                                            '/images/portal-icons/pending-student.png'
                                        }
                                        width={48}
                                        height={48}
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

                    {/* <PinnedNotes id={router.query?.id} /> */}
                    <DetailTabs id={router.query?.id} rto={rto} />
                </div>
            ) : (
                !rto.isError && rto.isSuccess && <EmptyData />
            )}
        </>
    )
}

RtoDetail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoDetail
