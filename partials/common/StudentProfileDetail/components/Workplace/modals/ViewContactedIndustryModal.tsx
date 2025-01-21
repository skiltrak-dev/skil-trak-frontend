import React from 'react'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import {
    GlobalModal,
    InitialAvatar,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { MdCancel } from 'react-icons/md'
import { Industry } from '@types'
import Link from 'next/link'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { BsDot } from 'react-icons/bs'

export const ViewContactedIndustryModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const router = useRouter()
    const studentDetails = SubAdminApi.SubAdmin.useSubAdminMapStudentDetail(
        router?.query?.id,
        { skip: !router?.query?.id }
    )
    const industries = studentDetails?.data?.student?.industryContacts

    const role = getUserCredentials()?.role
    return (
        <GlobalModal>
            <div className="relative ">
                <MdCancel
                    onClick={onCancel}
                    className="absolute top-1 right-1 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                <div className="flex pb-3 pt-8 px-6 justify-between items-center">
                    <Typography variant={'label'}>
                        Contacted Industries for current Students
                    </Typography>
                    <Typography variant={'label'}>
                        Contacted <strong className="italic">Listing</strong>{' '}
                        Industries for current Students
                    </Typography>
                </div>
                <div className="flex justify-between w-full !min-w-[40rem] max-h-[65vh] overflow-auto custom-scrollbar">
                    <div className="w-1/2 pb-3 flex flex-col gap-y-1.5 px-6">
                        {studentDetails.isError && (
                            <NoData text={'There is some technical issue'} />
                        )}
                        {studentDetails.isLoading ? (
                            <LoadingAnimation size={85} />
                        ) : studentDetails?.data && industries?.length > 0 ? (
                            <>
                                {industries?.map(
                                    (industry: {
                                        distance: string
                                        industry: Industry
                                    }) => (
                                        <div className="bg-secondary py-1 px-2 rounded-lg flex flex-col lg:flex-row justify-between lg:items-center">
                                            <Link
                                                href={
                                                    role === UserRoles.ADMIN
                                                        ? `/portals/admin/industry/${industry?.industry?.id}?tab=sectors`
                                                        : role ===
                                                          UserRoles.SUBADMIN
                                                        ? `/portals/sub-admin/users/industries/${industry?.industry?.id}?tab=overview`
                                                        : '#'
                                                }
                                                className="flex items-center gap-x-2 cursor-pointer"
                                            >
                                                {industry?.industry?.user
                                                    ?.name && (
                                                    <InitialAvatar
                                                        name={
                                                            industry?.industry
                                                                ?.user?.name
                                                        }
                                                        imageUrl={
                                                            industry?.industry
                                                                ?.user?.avatar
                                                        }
                                                    />
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-x-0.5">
                                                        <Typography
                                                            variant={'label'}
                                                        >
                                                            <span className="cursor-pointer">
                                                                {
                                                                    industry
                                                                        ?.industry
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                    <Typography
                                                        variant={'muted'}
                                                        color={'gray'}
                                                    >
                                                        {
                                                            industry?.industry
                                                                ?.addressLine1
                                                        }
                                                    </Typography>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                )}
                            </>
                        ) : (
                            studentDetails.isSuccess && (
                                <NoData text={'There is no Industries!'} />
                            )
                        )}
                    </div>
                    <div className="w-1/2 pb-3 flex flex-col gap-y-1.5 px-6">
                        {studentDetails.isError && (
                            <NoData text={'There is some technical issue'} />
                        )}
                        {studentDetails.isLoading ? (
                            <LoadingAnimation size={85} />
                        ) : studentDetails?.data && industries?.length > 0 ? (
                            <>
                                {industries?.map(
                                    (industry: {
                                        distance: string
                                        industry: Industry
                                    }) => (
                                        <div className="bg-secondary py-1 px-2 rounded-lg flex flex-col lg:flex-row justify-between lg:items-center">
                                            <Link
                                                href={
                                                    role === UserRoles.ADMIN
                                                        ? `/portals/admin/industry/${industry?.industry?.id}?tab=sectors`
                                                        : role ===
                                                          UserRoles.SUBADMIN
                                                        ? `/portals/sub-admin/users/industries/${industry?.industry?.id}?tab=overview`
                                                        : '#'
                                                }
                                                className="flex items-center gap-x-2 cursor-pointer"
                                            >
                                                {industry?.industry?.user
                                                    ?.name && (
                                                    <InitialAvatar
                                                        name={
                                                            industry?.industry
                                                                ?.user?.name
                                                        }
                                                        imageUrl={
                                                            industry?.industry
                                                                ?.user?.avatar
                                                        }
                                                    />
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-x-0.5">
                                                        <Typography
                                                            variant={'label'}
                                                        >
                                                            <span className="cursor-pointer">
                                                                {
                                                                    industry
                                                                        ?.industry
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                    <Typography
                                                        variant={'muted'}
                                                        color={'gray'}
                                                    >
                                                        {
                                                            industry?.industry
                                                                ?.addressLine1
                                                        }
                                                    </Typography>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                )}
                            </>
                        ) : (
                            studentDetails.isSuccess && (
                                <NoData text={'There is no Industries!'} />
                            )
                        )}
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
