import { ActionButton, LoadingAnimation, Typography } from '@components'
import { SubAdminApi } from '@queries'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiFillEdit } from 'react-icons/ai'
import { BsUnlockFill } from 'react-icons/bs'
import { FaAddressCard } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdAdminPanelSettings, MdPhone, MdVerified } from 'react-icons/md'

// hooks
import { useActionModal } from '@hooks'
import Link from 'next/link'
import { PulseLoader } from 'react-spinners'
import { UserStatus } from '@types'
import { getUserCredentials } from '@utils'

export const ViewProfileCB = () => {
    const status = getUserCredentials()?.status
    const router = useRouter()
    const { data, isSuccess, isLoading, isFetching } =
        SubAdminApi.SubAdmin.useProfile()
    const todoListCount = SubAdminApi.Todo.todoListCount(undefined, {
        skip: status !== UserStatus.Approved,
    })

    const { onUpdatePassword, passwordModal } = useActionModal()

    const getSectors = (courses: any) => {
        if (!courses) return {}
        const sectors = {}
        courses.forEach((c: any) => {
            if ((sectors as any)[c.sector.name]) {
                ;(sectors as any)[c.sector.name].push(c)
            } else {
                ;(sectors as any)[c.sector.name] = []
                ;(sectors as any)[c.sector.name].push(c)
            }
        })
        return sectors
    }
    const sectorsWithCourses = getSectors(data?.courses)

    const sectionsData = [
        {
            text: 'Up coming appointments',
            count: todoListCount?.data?.upCommingAppointments,
            link: '/portals/sub-admin/tasks/appointments',
        },
        {
            text: 'Pending workplace requests (before appointments)',
            count: todoListCount?.data?.workplace,
            link: '/portals/sub-admin/tasks/workplace?tab=all&subTab=case-officer-not-assigned',
        },
        {
            text: 'Agreements pending',
            count: todoListCount?.data?.awaitingAgreementSignedCount,
            link: '/portals/sub-admin/students?tab=agreement-pending',
        },
        // {
        //     text: 'Schedule pending',
        //     count: 2,
        //     link: '',
        // },
        {
            text: 'Pending students (same sector and RtO)',
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
        {
            text: 'Pending assessment',
            count: todoListCount?.data?.pendingAssessment,
            link: '/portals/sub-admin/tasks/assessment-evidence?tab=pending',
        },
        {
            text: 'Urgent Students',
            count: todoListCount?.data?.urgentStudents,
            link: '/portals/sub-admin/students?tab=urgent-students',
        },
    ]

    return (
        <>
            {isLoading || isFetching ? (
                <LoadingAnimation height={'h-[40vh]'} size={80} />
            ) : (
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
                                        router.push(
                                            '/portals/sub-admin/my-profile'
                                        )
                                    }
                                    title="Edit Profile"
                                />

                                <ActionButton
                                    rounded
                                    Icon={BsUnlockFill}
                                    variant={'neutral'}
                                    onClick={() => onUpdatePassword(data)}
                                    title="Edit Password"
                                />
                            </div>
                            {data?.user.avatar ? (
                                <Image
                                    src={data?.user.avatar}
                                    width={100}
                                    height={100}
                                    alt=""
                                    className="rounded-full shadow-inner-image"
                                />
                            ) : (
                                <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                    <span className="text-4xl text-gray-300">
                                        <MdAdminPanelSettings />
                                    </span>
                                </div>
                            )}
                            <div
                                className={`${
                                    data?.user.avatar
                                        ? 'w-[100px] h-[100px]'
                                        : 'w-24 h-24'
                                } absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image`}
                            ></div>
                        </div>

                        <div className="flex flex-col items-center">
                            <p className="text-lg font-semibold">
                                {data?.user?.name}
                            </p>
                            <div className="flex items-center gap-x-2">
                                <p className="text-sm text-gray-400">
                                    {data?.user?.email}
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
                                    {data?.coordinatorId}
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
                                    {data?.phone}
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
                                    {data?.addressLine1 ||
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
                            {sectionsData.map((secData) => (
                                <Link href={secData?.link}>
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
            )}
        </>
    )
}
