import {
    ActionButton,
    LoadingAnimation,
    RtoAvatar,
    Typography,
} from '@components'
import { NoData } from '@components/ActionAnimations'
import { useActionModal } from '@hooks'
import { CourseList } from '@partials/common'
import { Course, GetSectorsType } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { AiFillEdit } from 'react-icons/ai'
import { BiPackage } from 'react-icons/bi'
import { BsUnlockFill } from 'react-icons/bs'
import { FaAddressCard, FaMoneyBill } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdPhone, MdVerified } from 'react-icons/md'

type Props = {}

export const RtoProfileSidebar = ({ loading, data, rto }: any) => {
    const pathname = useRouter()
    const profileId = pathname.query.profileId
    // const {data} = useGetSubAdminRTODetailQuery(String(profileId), {
    //   skip: !profileId,
    // })

    // hooks
    const { onUpdatePassword, passwordModal } = useActionModal()

    const getSectors = (courses: Course[]) => {
        if (!courses) return {}
        const sectors: GetSectorsType = {}
        courses.forEach((c: Course) => {
            if (sectors[c.sector.name]) {
                sectors[c.sector.name].push(c)
            } else {
                sectors[c.sector.name] = []
                sectors[c.sector.name].push(c)
            }
        })
        return sectors
    }

    const role = getUserCredentials()?.role
    const sectorsWithCourses = getSectors(rto?.data?.courses)
    return (
        <>
            {passwordModal && passwordModal}
            {rto?.isLoading ? (
                <LoadingAnimation />
            ) : (
                rto?.data && (
                    <div>
                        <div className="flex flex-col items-center">
                            <div className="relative flex items-center justify-center w-full">
                                <div className="flex items-center gap-x-2 absolute top-0 right-0">
                                    <ActionButton
                                        rounded
                                        Icon={AiFillEdit}
                                        variant={'info'}
                                        onClick={() =>
                                            pathname.push(
                                                role === 'admin'
                                                    ? `/portals/admin/rto/${rto?.data?.id}/edit-profile`
                                                    : `/portals/sub-admin/users/rtos/${rto?.data?.id}/edit-profile`
                                            )
                                        }
                                        title="Edit Profile"
                                    />

                                    <ActionButton
                                        rounded
                                        Icon={BsUnlockFill}
                                        variant={'neutral'}
                                        onClick={() =>
                                            onUpdatePassword(rto?.data)
                                        }
                                        title="Edit Password"
                                    />
                                </div>
                                <RtoAvatar
                                    imageUrl={rto?.data?.user?.avatar}
                                    user={rto?.data?.user?.id}
                                    canEdit
                                />
                            </div>

                            <div className="flex flex-col items-center mt-2">
                                <p className="text-sm font-semibold text-center">
                                    {rto?.data?.user?.name}
                                </p>
                                <div className="flex items-center gap-x-2">
                                    <p className="text-sm text-gray-400">
                                        {rto?.data?.user?.email}
                                    </p>
                                    <span className="text-blue-500">
                                        <MdVerified />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Row 1 */}
                        <div className="flex flex-col divide-y mt-4">
                            <div className="flex justify-around divide-x border-t">
                                <div className="p-2">
                                    <div className="flex items-center gap-x-2">
                                        <FaAddressCard
                                            className="text-gray-400"
                                            size={12}
                                        />
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-400'}
                                        >
                                            RTO Code
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant={'small'}
                                        color={'text-black'}
                                    >
                                        {rto?.data?.rtoCode || 'N/A'}
                                    </Typography>
                                </div>
                                <div className="p-2">
                                    <div className="flex items-center gap-x-2">
                                        <FaMoneyBill
                                            className="text-gray-400"
                                            size={12}
                                        />
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-400'}
                                        >
                                            RTO ABN
                                        </Typography>
                                    </div>
                                    <Typography
                                        variant={'small'}
                                        color={'text-black'}
                                        capitalize
                                    >
                                        {rto?.data?.abn || 'N/A'}
                                    </Typography>
                                </div>
                            </div>

                            <div className="p-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">
                                        <MdPhone />
                                    </span>

                                    <div>
                                        <div className="text-gray-400 text-[11px] -mb-1">
                                            Phone Number
                                        </div>
                                        <p className="text-xs font-medium">
                                            {rto?.data?.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Row 3 */}
                        <div className="flex justify-around border-t">
                            <div className="p-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">
                                        <IoLocation />
                                    </span>
                                    <p className="text-xs text-gray-700">
                                        {rto?.data?.addressLine1}{' '}
                                        {rto?.data?.addressLine2}{' '}
                                        {rto?.data?.state} {rto?.data?.suburb}
                                    </p>
                                </div>
                                {/* <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Address
                      </div> */}
                            </div>
                        </div>
                        {/* contact person row 4 */}
                        {/* <div className="mt-4">
                                <Typography variant={'small'} color={'text-gray-500'}>
                                    Contact Person
                                </Typography>
                                <div className="flex justify-around divide-x border-t border-b">
                                    <div className="p-2">
                                        <div className="flex items-center gap-x-2">
                                            <BiRename className="text-gray-400" size={11}/>
                                            <Typography
                                                variant={'small'}
                                                color={'text-gray-400'}
                                            >
                                                Name
                                            </Typography>
                                        </div>
                                        <Typography variant={'small'} color={'text-black'}>
                                            {rto?.data?.contactPerson || 'N/A'}
                                        </Typography>
                                    </div>
                                    <div className="p-2">
                                        <div className="flex items-center gap-x-2">
                                            <FaPhoneAlt className="text-gray-400" size={11} />
                                            <Typography
                                                variant={'small'}
                                                color={'text-gray-400'}
                                            >
                                                Phone
                                            </Typography>
                                        </div>
                                        <Typography variant={'small'} color={'text-black'}>
                                            {rto?.data?.contactPersonNumber || 'N/A'}
                                        </Typography>
                                    </div>
                                </div>
                            </div> */}

                        {/* rto Package */}
                        <div className="mt-4">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                RTO Package
                            </Typography>
                        </div>
                        <div className="flex justify-around divide-x border-t border-b">
                            <div className="p-2">
                                <div className="flex items-center gap-x-2">
                                    <BiPackage
                                        className="text-gray-400"
                                        size={12}
                                    />
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-400'}
                                    >
                                        Package Name
                                    </Typography>
                                </div>
                                <Typography
                                    variant={'small'}
                                    color={'text-black'}
                                >
                                    {rto?.data?.package?.name || 'N/A'}
                                </Typography>
                            </div>
                            <div className="p-2">
                                <div className="flex items-center gap-x-2">
                                    <FaMoneyBill
                                        className="text-gray-400"
                                        size={12}
                                    />
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-400'}
                                    >
                                        Billing Type
                                    </Typography>
                                </div>
                                <Typography
                                    variant={'small'}
                                    color={'text-black'}
                                    capitalize
                                >
                                    {rto?.data?.package?.billingType || 'N/A'}
                                </Typography>
                            </div>
                        </div>
                        {/* placement coordinator row 5 */}
                        {/* <div className="mt-4">
                                <p className="text-[11px] text-gray-400">
                                    Placement Coordinators
                                </p>
                                <div className="flex justify-between gap-x-2">
                                    <div>
                                        <p className="font-medium text-sm">
                                            {data?.subadmin[0]?.user?.name}
                                        </p>
                                        <p className="text-xs font-medium text-slate-400">
                                            {data?.subadmin[0]?.user?.email}
                                        </p>
                                    </div>
            
                                    <InitialAvatarContainer show={3}>
                                        {data?.subadmin?.map((coordinator: any) => (
                                            <>
                                                <InitialAvatar
                                                    name={coordinator?.user?.name}
                                                    first
                                                />
                                            </>
                                        ))}
                                    </InitialAvatarContainer>
                                </div>
                            </div> */}

                        {/* Eligible sectors */}
                        <div className="mt-4">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                Eligible Sectors...
                            </Typography>

                            {sectorsWithCourses ? (
                                Object.keys(sectorsWithCourses).map(
                                    (sector) => {
                                        return (
                                            <>
                                                <Typography
                                                    variant={'label'}
                                                    color={'text-black'}
                                                >
                                                    {sector}
                                                </Typography>

                                                <CourseList
                                                    courses={
                                                        (
                                                            sectorsWithCourses as any
                                                        )[sector]
                                                    }
                                                />
                                            </>
                                        )
                                    }
                                )
                            ) : (
                                <NoData text={'No Sectors Assigned'} />
                            )}
                        </div>
                    </div>
                )
            )}
        </>
    )
}
