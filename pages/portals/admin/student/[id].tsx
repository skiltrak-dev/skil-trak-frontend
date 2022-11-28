import {
    ActionButton,
    BackButton,
    Button,
    DescriptiveInfo,
    InitialAvatar,
    InitialAvatarContainer,
    LoadingAnimation,
    EmptyData,
    Typography,
    Card,
    TechnicalError,
} from '@components'

import {
    Sectors,
    Workplaces,
    Appointments,
    CourseFolders,
    RequiredDocs,
    DetailTabs,
} from '@partials/admin/student'

import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import {
    AiFillCodeSandboxCircle,
    AiOutlineBarcode,
    AiOutlineLogin,
    AiTwotonePhone,
} from 'react-icons/ai'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaArchive, FaBan, FaPhoneAlt, FaUniversity } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { IoLogIn } from 'react-icons/io5'
import { MdPlace } from 'react-icons/md'
import Image from 'next/image'
import { GoPrimitiveDot } from 'react-icons/go'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const [placementProgressBar, setPlacementProgressBar] = useState<
        string | null
    >(null)

    const { data, isLoading, isSuccess, isError } =
        AdminApi.Students.useProfile(Number(id), {
            skip: !id,
        })

    useEffect(() => {
        if (data && isSuccess) {
            setAppliedIndustry(
                data?.workplace[0]?.industries?.find((i: any) => i.applied)
            )
        }
    }, [data])

    useEffect(() => {
        if (appliedIndustry?.placementStarted) {
        } else if (appliedIndustry?.placementStarted) {
            setPlacementProgressBar('Placement Started')
        } else if (appliedIndustry?.awaitingAgreementSigned) {
            setPlacementProgressBar('Waiting For Agrement Sign')
        } else if (appliedIndustry?.appointmentBooked) {
            setPlacementProgressBar('Appointment Booked')
        } else if (appliedIndustry?.awaitingWorkplaceResponse) {
            setPlacementProgressBar('Awaiting For Workplace Response')
        } else if (appliedIndustry?.interview) {
            setPlacementProgressBar('Interview With Case Officer')
        } else if (appliedIndustry?.caseOfficerAssigned) {
            setPlacementProgressBar('Case Officer Assigned')
        } else if (appliedIndustry?.industryCheck) {
            setPlacementProgressBar('Industry Check')
        }
    }, [placementProgressBar])

    useEffect(() => {
        navBar.setTitle('Student Detail')
        contextBar.hide()
    }, [])

    return (
        <>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : !data ? (
                !isError &&
                isSuccess && <EmptyData title={'No Student Found'} />
            ) : (
                <div className="p-6 flex flex-col gap-y-4 mb-32">
                    {/* Action Bar */}
                    <div className="flex items-center justify-between">
                        <BackButton text="RTOs" />
                        <div className="flex gap-x-2">
                            <Button>Book Appointment</Button>
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
                                            {data?.addressLine1}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex border-t border-secondary-dark">
                                    <div className="w-full flex justify-center">
                                        <DescriptiveInfo
                                            title={'Student Id'}
                                            description={
                                                data ? data?.studentId : 'NA'
                                            }
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
                            <div
                                className={`col-span-10 lg:col-span-4 xl:col-span-4 w-full flex flex-col gap-y-2`}
                            >
                                {/* Contact Person */}
                                <div className="w-full h-full bg-white rounded-2xl shadow-xl px-4 py-2">
                                    <div className="mb-2">
                                        <Typography variant={'muted'}>
                                            Emergency Person
                                        </Typography>
                                    </div>
                                    <div className="w-full flex items-start gap-x-2">
                                        <InitialAvatar
                                            name={
                                                data?.emergencyPerson
                                                    ? data.emergencyPerson
                                                    : 'Not Provided'
                                            }
                                            first
                                        />
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                {data?.emergencyPerson
                                                    ? data.emergencyPerson
                                                    : 'Not Provided'}
                                            </p>
                                            <p className="text-xs font-medium text-gray-500">
                                                {data?.emergencyPersonPhone
                                                    ? data?.emergencyPersonPhone
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
                                {/* RTO Info */}
                                <Card>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-x-2">
                                            <FaUniversity />
                                            <Typography
                                                variant={'label'}
                                                color={'gray'}
                                            >
                                                <span className="font-semibold">
                                                    RTO Information
                                                </span>
                                            </Typography>
                                        </div>
                                        <Typography
                                            variant={'muted'}
                                            color={'info'}
                                        >
                                            View
                                        </Typography>
                                    </div>

                                    <div className="flex gap-x-2 items-center mt-2">
                                        <img
                                            className="w-12 h-12"
                                            src="https://pbs.twimg.com/profile_images/1201388599830351872/AfFH530f_400x400.jpg"
                                            alt="RTO Logo"
                                        />
                                        <div>
                                            <Typography variant={'label'}>
                                                <span className="font-semibold">
                                                    {data?.rto?.user?.name}
                                                </span>
                                            </Typography>
                                            <Typography
                                                variant={'small'}
                                                color={'text-gray-500'}
                                            >
                                                {data?.rto?.user?.email}
                                            </Typography>
                                        </div>
                                    </div>
                                </Card>

                                {/* Placement Progress */}
                                <Card>
                                    {appliedIndustry ? (
                                        <>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-x-2">
                                                    <FaUniversity />
                                                    <Typography
                                                        variant={'label'}
                                                        color={'text-gray-500'}
                                                    >
                                                        Placement Progress
                                                    </Typography>
                                                </div>
                                                <Typography
                                                    variant={'muted'}
                                                    color={'info'}
                                                >
                                                    View
                                                </Typography>
                                            </div>

                                            {/*  */}
                                            <div className="my-1.5">
                                                <GoPrimitiveDot />
                                                <Typography
                                                    variant={'small'}
                                                    uppercase
                                                >
                                                    <span className="font-semibold">
                                                        {placementProgressBar}
                                                    </span>
                                                </Typography>
                                            </div>

                                            {/*  */}
                                            <div>
                                                <Typography
                                                    variant={'xs'}
                                                    color={'text-gray-500'}
                                                >
                                                    Case Officer:{' '}
                                                    <span>John Doe</span>
                                                </Typography>
                                            </div>
                                        </>
                                    ) : (
                                        <Typography variant={'label'}>
                                            Not Applied for workplace
                                        </Typography>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </div>

                    <DetailTabs id={id} student={data} />
                </div>
            )}
        </>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Detail
