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
export const ViewProfileCB = ({
    subadmin,
    statistics,
}: {
    statistics: any
    subadmin: SubAdmin
}) => {
    const router = useRouter()
    const status = getUserCredentials()?.status

    const todoListCount = SubAdminApi.Todo.todoListCount(undefined, {
        skip: status !== UserStatus.Approved,
    })

    const { onUpdatePassword, passwordModal } = useActionModal()

    const sectionsData = [
        {
            text: 'Up coming appointments',
            count: statistics?.appointmentBooked,
            // link: '/portals/sub-admin/tasks/appointments',
        },
        {
            text: 'Pending workplace requests',
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
            text: 'Pending students (same sector and Rto)',
            count: todoListCount?.data?.pendingStudent,
            link: '/portals/sub-admin/students?tab=pending',
        },
        {
            text: 'Tickets pending  (unclosed)',
            count: todoListCount?.data?.openTicket,
            link: '/portals/sub-admin/tickets?tab=all-tickets',
        },
        {
            text: 'Pending industry (assigned students added)',
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
                {passwordModal && passwordModal}
                <div className="flex flex-col">
                    <div className="relative flex flex-col items-center">
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
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold">
                            {subadmin?.user?.name}
                        </p>
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm text-gray-400">
                                {subadmin?.user?.email}
                            </p>
                            <span className="text-blue-500">
                                <MdVerified />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Info Row 1 */}
                <div className="flex justify-between divide-x border-b mt-4">
                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <FaAddressCard />
                            </span>
                            <p className="text-sm font-medium">
                                {subadmin?.coordinatorId}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Coordinator ID
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <MdPhone />
                            </span>
                            <p className="text-sm font-medium">
                                {subadmin?.phone}
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Phone Number
                        </div>
                    </div>
                </div>

                {/* Info Row 3 */}
                <div className="flex justify-around divide-x border-b">
                    <div className="p-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-300">
                                <IoLocation />
                            </span>
                            <p className="text-sm font-medium">
                                {subadmin?.addressLine1 ||
                                    'No Address Provided'}
                                ,
                            </p>
                        </div>
                        <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                            Address
                        </div>
                    </div>
                </div>
                {/* Eligible sectors */}
                {/* <div className="mt-4">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Eligible Sectors
                        </Typography>

                        {sectorsWithCourses ? (
                            Object.keys(sectorsWithCourses).map((sector, i) => {
                                return (
                                    <Fragment key={i}>
                                        <Typography
                                            variant={'label'}
                                            color={'text-black'}
                                        >
                                            {sector}
                                        </Typography>

                                        {(sectorsWithCourses as any)[
                                            sector
                                        ]?.map((c: Course) => (
                                            <div
                                                key={c?.id}
                                                className="flex gap-x-2 justify-start"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <div className="bg-blue-400 p-2 rounded-full"></div>
                                                    <div className="bg-blue-400 w-[1px] h-full"></div>
                                                </div>
                                                <div className="pb-2">
                                                    <Typography
                                                        variant={'small'}
                                                        color={'text-gray-500'}
                                                    >
                                                        {c?.code}
                                                    </Typography>
                                                    <Typography
                                                        variant={'small'}
                                                        color={'text-gray-800'}
                                                    >
                                                        {c?.title}
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))}
                                    </Fragment>
                                )
                            })
                        ) : (
                            <NoData text={'No Sectors Assigned'} />
                        )}
                    </div> */}

                <div>
                    <Typography variant="label" semibold>
                        To do List:
                    </Typography>

                    {/*  */}
                    <div>
                        {sectionsData.map((secData, i) => (
                            <Link href={secData?.link || '#'} key={i}>
                                <div className="flex items-center justify-between border-b border-secondary-dark py-2">
                                    <Typography variant="small">
                                        {secData.text}
                                    </Typography>
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
