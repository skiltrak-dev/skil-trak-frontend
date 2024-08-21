import Image from 'next/image'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { AiFillEdit } from 'react-icons/ai'
import { IoLocation } from 'react-icons/io5'
import { BsUnlockFill } from 'react-icons/bs'
import { FaAddressCard } from 'react-icons/fa'
import { ActionButton, Typography } from '@components'
import { MdAdminPanelSettings, MdPhone, MdVerified } from 'react-icons/md'

// hooks
import Link from 'next/link'
import { useActionModal } from '@hooks'
import { getUserCredentials } from '@utils'
import { SubAdmin, UserStatus } from '@types'
import { PulseLoader } from 'react-spinners'
import { UserProfileDetailCard } from '@partials/common'
import { ProfileLinks } from '../components'
export const ViewProfileCB = ({
    subadmin,
    statistics,
}: {
    statistics: any
    subadmin: SubAdmin
}) => {
    const status = getUserCredentials()?.status

    const todoListCount = SubAdminApi.Todo.todoListCount(undefined, {
        skip: status !== UserStatus.Approved,
    })

    const sectionsData = [
        {
            text: 'Up coming appointments',
            count: statistics?.appointmentBooked,
            // link: '/portals/sub-admin/tasks/appointments',
        },
        {
            text: 'Pending workplace requests',
            subText: 'Before Appointment',
            count: statistics?.inProcess,
            link: '/portals/sub-admin/tasks/workplace?tab=my-workplaces',
        },
        {
            text: 'My Agreements Pending',
            count: statistics?.awaitingAgreementSigned,
            link: '/portals/sub-admin/students?tab=agreement-pending',
        },
        // {
        //     text: 'Schedule pending',
        //     count: 2,
        //     link: '',
        // },
        {
            text: 'Pending students',
            subText: 'Same Sector and RTO',
            count: todoListCount?.data?.pendingStudent,
            link: '/portals/sub-admin/students?tab=pending',
        },
        {
            text: 'Tickets pending',
            subText: 'Unclosed',
            count: todoListCount?.data?.openTicket,
            link: '/portals/sub-admin/tickets?tab=all-tickets',
        },
        {
            text: 'Pending industry',
            subText: 'Assigned Student Added',
            count: todoListCount?.data?.pendingIndustries,
            link: '/portals/sub-admin/users/industries?tab=pending',
        },
        // {
        //     text: 'Pending assessment',
        //     count: todoListCount?.data?.pendingAssessment,
        //     link: '/portals/sub-admin/tasks/assessment-evidence?tab=pending',
        // },
        {
            text: 'Urgent Students',
            count: todoListCount?.data?.urgentStudents,
            link: '/portals/sub-admin/students?tab=urgent-students',
        },
    ]

    return (
        <>
            <div>
                <div className="flex flex-col">
                    {/* <div className="relative flex flex-col items-center">
                        <div className="flex justify-end gap-x-2 absolute top-0 right-0">
                            <ActionButton
                                rounded
                                Icon={AiFillEdit}
                                variant={'info'}
                                onClick={() =>
                                    router.push('/portals/sub-admin/my-profile')
                                }
                                title="Edit Profile"
                            />

                            <ActionButton
                                rounded
                                Icon={BsUnlockFill}
                                variant={'neutral'}
                                onClick={() => onUpdatePassword(subadmin)}
                                title="Edit Password"
                            />
                        </div>
                        {subadmin?.user.avatar ? (
                            <div className="w-[100px] h-[100px]">
                                <Image
                                    src={subadmin?.user.avatar}
                                    width={0}
                                    height={0}
                                    sizes="100vh 100vw"
                                    alt=""
                                    className="w-full h-full rounded-full object-cover shadow-inner-image"
                                />
                            </div>
                        ) : (
                            <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                <span className="text-4xl text-gray-300">
                                    <MdAdminPanelSettings />
                                </span>
                            </div>
                        )}
                        <div
                            className={`${
                                subadmin?.user?.avatar
                                    ? 'w-[100px] h-[100px]'
                                    : 'w-24 h-24'
                            } absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image`}
                        ></div>
                    </div> */}

                    <div className="flex justify-between items-center">
                        <div>
                            <div className="relative flex flex-col items-center">
                                {subadmin?.user.avatar ? (
                                    <div className="w-[100px] h-[100px]">
                                        <Image
                                            src={subadmin?.user.avatar}
                                            width={0}
                                            height={0}
                                            sizes="100vh 100vw"
                                            alt=""
                                            className="w-full h-full rounded-full object-cover shadow-inner-image"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                        <span className="text-4xl text-gray-300">
                                            <MdAdminPanelSettings />
                                        </span>
                                    </div>
                                )}
                                <div
                                    className={`${
                                        subadmin?.user?.avatar
                                            ? 'w-[100px] h-[100px]'
                                            : 'w-24 h-24'
                                    } absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image`}
                                ></div>
                            </div>
                        </div>
                        <ProfileLinks subadmin={subadmin} />
                    </div>

                    <div className="mt-2">
                        <Typography semibold>
                            <span className="text-[15px]">
                                {subadmin?.user?.name}
                            </span>
                        </Typography>
                        <Typography variant="xs" color="text-[#6B7280]">
                            {subadmin?.user?.email}
                        </Typography>
                    </div>
                </div>

                <div className="mt-1.5 flex flex-col gap-y-1.5">
                    <div className="flex items-center gap-x-[5px]">
                        <UserProfileDetailCard
                            title="Coordinator ID"
                            detail={subadmin?.coordinatorId}
                        />
                        <UserProfileDetailCard
                            title="Phone Number"
                            detail={subadmin?.phone}
                        />
                    </div>
                </div>
                <div className="mt-1.5 flex flex-col gap-y-1.5">
                    <div className="flex items-center gap-x-[5px]">
                        <UserProfileDetailCard
                            title="Location"
                            detail={
                                subadmin?.addressLine1 || 'No Address Provided'
                            }
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <Typography variant="label" semibold>
                        To do List:
                    </Typography>

                    {/*  */}
                    <div className="flex flex-col gap-y-2 mt-2">
                        {sectionsData.map((secData, i) => (
                            <Link href={secData?.link || '#'} key={i}>
                                <div className="flex items-center justify-between border border-[#6B728050] rounded-md py-3.5 px-2.5">
                                    <div>
                                        <Typography variant="xxs" medium>
                                            {secData.text}
                                        </Typography>
                                        {secData?.subText ? (
                                            <Typography
                                                variant="xxs"
                                                color="text-[#797979]"
                                            >
                                                {secData.text}
                                            </Typography>
                                        ) : null}
                                    </div>
                                    <Typography variant="small">
                                        {todoListCount.isLoading ? (
                                            <PulseLoader size={3} />
                                        ) : (
                                            secData.count
                                        )}
                                    </Typography>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
