import {
    ActionButton,
    BackButton,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
} from '@components'

import { DetailTabs, RtoStudentProfileCB } from '@partials/rto/student'

import { useContextBar, useNavbar } from '@hooks'
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { FaArchive, FaBan } from 'react-icons/fa'

import { useGetRtoStudentProfileQuery } from '@queries'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const { data, isLoading, isSuccess, isError } =
        useGetRtoStudentProfileQuery(Number(id), {
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
        navBar.setTitle('Student Detail')
        contextBar.hide()
    }, [])
    useEffect(() => {
        if (isSuccess) {
            contextBar.setContent(<RtoStudentProfileCB student={data} />)
            contextBar.show(false)
        }
    }, [data])

    return (
        <>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : !data ? (
                !isError &&
                isSuccess && (
                    <EmptyData
                        title={'No Student Found'}
                        description={'No Student Detail were found'}
                        height={'50vh'}
                    />
                )
            ) : (
                <div className="p-6 flex flex-col gap-y-4 mb-32">
                    {/* Action Bar */}
                    {/* TODO Add Action on action button */}
                    <div className="flex items-center justify-between">
                        <BackButton text="Students" />
                        <div className="flex gap-x-2">
                            {/* <Button>Book Appointment</Button> */}
                            <ActionButton Icon={FaArchive}>
                                Archive
                            </ActionButton>
                            <ActionButton Icon={FaBan} variant={'error'}>
                                Block
                            </ActionButton>
                        </div>
                    </div>

                    <div>
                        <div className="w-full grid grid-cols-9 gap-x-2 gap-y-2">
                            {/* first */}
                            {/* <div
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
                            </div> */}

                            {/* second */}
                            <div
                                className={`col-span-10 lg:col-span-4 xl:col-span-4 w-full flex flex-col gap-y-2`}
                            >
                                {/* Contact Person */}
                                {/* <div className="w-full h-full bg-white rounded-2xl shadow-xl px-4 py-2">
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
                                </div> */}

                                {/* Placement Coordinator */}
                                {/* <div className="w-full h-full bg-white rounded-2xl shadow-xl px-4 py-2">
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
                                </div> */}
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
    return <RtoLayout pageTitle={{ title: 'Students' }}>{page}</RtoLayout>
}

export default Detail
