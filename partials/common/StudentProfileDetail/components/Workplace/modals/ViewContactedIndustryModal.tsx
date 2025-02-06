import React, { useEffect } from 'react'
import { CommonApi, SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import {
    GlobalModal,
    InitialAvatar,
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { MdCancel } from 'react-icons/md'
import { Industry } from '@types'
import Link from 'next/link'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'
import { BsDot } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa6'
import { useNotification } from '@hooks'
import { PuffLoader, PulseLoader } from 'react-spinners'

export const ViewContactedIndustryModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const router = useRouter()
    const { notification } = useNotification()
    const studentDetails = SubAdminApi.SubAdmin.useSubAdminMapStudentDetail(
        router?.query?.id,
        { skip: !router?.query?.id }
    )
    const [interested, interestedResult] =
        CommonApi.FindWorkplace.useFutureIndustryInterest()
    const industries = studentDetails?.data?.student?.industryContacts

    const role = getUserCredentials()?.role

    const onClickInterested = async (industry: any) => {
        const response: any = await interested({
            id: industry?.id,
            body: {
                status: true,
            },
        })
        if (response?.data) {
            // refetch
            notification.success({
                title: 'Interested',
                description: 'Status interested updated successfully',
            })
            studentDetails.refetch()
        }
    }
    const onClickNotInterested = async (industry: any) => {
        const response: any = await interested({
            id: industry?.id,
            body: {
                status: false,
            },
        })
        if (response?.data) {
            notification.success({
                title: 'Not Interested',
                description: 'Status not interested updated successfully',
            })
            // refetch
            studentDetails.refetch()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={interestedResult} />
            <GlobalModal>
                <div className="relative ">
                    <MdCancel
                        onClick={onCancel}
                        className="absolute top-1 right-1 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                    <div className="flex pb-3 pt-8 px-6 justify-between items-center">
                        <div className="w-1/2 ">
                            <Typography variant={'label'}>
                                Contacted Signed Up Industries for current
                                student
                            </Typography>
                        </div>
                        <div className="w-1/2 ml-12">
                            <Typography variant={'label'}>
                                Contacted Listed Industries for current student
                            </Typography>
                        </div>
                    </div>
                    <div className="flex justify-between w-full !min-w-[44rem] max-h-[65vh] overflow-y-auto custom-scrollbar">
                        <div className="w-1/2 pb-3 flex flex-col gap-y-1.5 px-6">
                            {studentDetails.isError && (
                                <NoData
                                    text={'There is some technical issue'}
                                />
                            )}
                            {studentDetails.isLoading ? (
                                <LoadingAnimation size={85} />
                            ) : studentDetails?.data &&
                              industries?.length > 0 ? (
                                <>
                                    {industries
                                        ?.filter(
                                            (industry: any) =>
                                                industry?.industry !== null
                                        )
                                        .map(
                                            (industry: {
                                                distance: string
                                                industry: Industry
                                            }) => (
                                                <div className="bg-secondary py-1 px-4 rounded-lg flex flex-col lg:flex-row justify-between lg:items-center">
                                                    <Link
                                                        href={
                                                            role ===
                                                            UserRoles.ADMIN
                                                                ? `/portals/admin/industry/${industry?.industry?.id}?tab=sectors`
                                                                : role ===
                                                                  UserRoles.SUBADMIN
                                                                ? `/portals/sub-admin/users/industries/${industry?.industry?.id}?tab=overview`
                                                                : '#'
                                                        }
                                                        className="flex items-center gap-x-2 cursor-pointer"
                                                    >
                                                        {industry?.industry
                                                            ?.user?.name && (
                                                            <InitialAvatar
                                                                name={
                                                                    industry
                                                                        ?.industry
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                                imageUrl={
                                                                    industry
                                                                        ?.industry
                                                                        ?.user
                                                                        ?.avatar
                                                                }
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="flex items-center gap-x-0.5">
                                                                <Typography
                                                                    variant={
                                                                        'label'
                                                                    }
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
                                                                variant={
                                                                    'muted'
                                                                }
                                                                color={'gray'}
                                                            >
                                                                {
                                                                    industry
                                                                        ?.industry
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
                                <NoData
                                    text={'There is some technical issue'}
                                />
                            )}
                            {studentDetails.isLoading ? (
                                <LoadingAnimation size={85} />
                            ) : studentDetails?.data &&
                              industries?.length > 0 ? (
                                <>
                                    {industries
                                        ?.filter(
                                            (industry: any) =>
                                                industry?.listing !== null
                                        )
                                        .map((industry: any) => (
                                            <div className="bg-secondary py-1 px-4 rounded-lg w-full">
                                                <div className="flex items-center gap-x-2 justify-between">
                                                    <div className="flex items-center gap-x-2">
                                                        <Link
                                                            href={
                                                                role ===
                                                                UserRoles.ADMIN
                                                                    ? `/portals/admin/industry/${industry?.listing?.id}?tab=sectors`
                                                                    : role ===
                                                                      UserRoles.SUBADMIN
                                                                    ? `portals/sub-admin/tasks/industry-listing/${industry?.listing?.id}`
                                                                    : '#'
                                                            }
                                                        >
                                                            {industry?.listing
                                                                ?.businessName && (
                                                                <InitialAvatar
                                                                    name={
                                                                        industry
                                                                            ?.listing
                                                                            ?.businessName
                                                                    }
                                                                    // imageUrl={'/'}
                                                                />
                                                            )}
                                                        </Link>

                                                        <div>
                                                            <div className="flex items-center gap-x-6 justify-between w-full">
                                                                <Typography
                                                                    variant={
                                                                        'label'
                                                                    }
                                                                >
                                                                    <span className="cursor-pointer">
                                                                        {
                                                                            industry
                                                                                ?.listing
                                                                                ?.businessName
                                                                        }
                                                                    </span>
                                                                </Typography>
                                                            </div>
                                                            <Typography
                                                                variant={
                                                                    'muted'
                                                                }
                                                                color={'gray'}
                                                            >
                                                                {
                                                                    industry
                                                                        ?.listing
                                                                        ?.address
                                                                }
                                                            </Typography>
                                                        </div>
                                                    </div>

                                                    {industry?.intrested ===
                                                    null ? (
                                                        <div className="flex items-center gap-x-2">
                                                            <div
                                                                title="Not Interested"
                                                                className="bg-red-400 rounded-md p-1 cursor-pointer"
                                                                onClick={() =>
                                                                    onClickNotInterested(
                                                                        industry
                                                                    )
                                                                }
                                                            >
                                                                {interestedResult.isLoading ? (
                                                                    <>
                                                                        <PuffLoader
                                                                            size={
                                                                                12
                                                                            }
                                                                            color={
                                                                                'text-gray-300'
                                                                            }
                                                                            data-testid="puff-loader"
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <IoClose
                                                                        size={
                                                                            10
                                                                        }
                                                                        className="text-white"
                                                                    />
                                                                )}
                                                            </div>
                                                            <div
                                                                title="Interested"
                                                                className="bg-green-400 rounded-md p-1 cursor-pointer"
                                                                onClick={() =>
                                                                    onClickInterested(
                                                                        industry
                                                                    )
                                                                }
                                                            >
                                                                {interestedResult.isLoading ? (
                                                                    <>
                                                                        <PuffLoader
                                                                            size={
                                                                                12
                                                                            }
                                                                            color={
                                                                                'text-gray-300'
                                                                            }
                                                                            data-testid="puff-loader"
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <FaCheck
                                                                        size={
                                                                            10
                                                                        }
                                                                        className="text-white"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : industry?.intrested ? (
                                                        <Typography
                                                            variant="muted"
                                                            color="text-green-400"
                                                        >
                                                            Interested
                                                        </Typography>
                                                    ) : !industry?.intrested ? (
                                                        <Typography
                                                            variant="muted"
                                                            color="text-red-400"
                                                        >
                                                            Not Interested
                                                        </Typography>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
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
        </>
    )
}
