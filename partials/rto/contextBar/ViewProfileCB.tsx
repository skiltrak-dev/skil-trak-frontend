import { AiFillEdit } from 'react-icons/ai'
import { MdBlock, MdPhone, MdVerified } from 'react-icons/md'
import Image from 'next/image'
import { Course, Rto } from '@types'
import {
    FaAddressCard,
    FaMoneyBill,
    FaPhoneAlt,
    FaSchool,
} from 'react-icons/fa'
import { GiBackwardTime } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import { AuthUtils, ellipsisText } from '@utils'
import { AdminApi, RtoApi } from '@queries'
import { IoLocation } from 'react-icons/io5'
import {
    Typography,
    InitialAvatarContainer,
    InitialAvatar,
    LoadingAnimation,
    NoData,
    RtoAvatar,
    ActionButton,
} from '@components'
import { BiPackage, BiRename } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { CourseList } from '@partials/common'
import { BsUnlockFill } from 'react-icons/bs'
import { useActionModal } from '@hooks'

const getSectors = (courses: any) => {
    if (!courses) return {}
    const sectors = {}
    courses.forEach((c: any) => {
        if ((sectors as any)[c.sector.name]) {
            ; (sectors as any)[c.sector.name].push(c)
        } else {
            ; (sectors as any)[c.sector.name] = []
                ; (sectors as any)[c.sector.name].push(c)
        }
    })
    return sectors
}

export const ViewProfileCB = () => {
    const router = useRouter()
    const [isAvatarUpdated, setIsAvatarUpdated] = useState<boolean>(false)

    const { onUpdatePassword, passwordModal } = useActionModal()

    const { data: rto, isLoading, refetch, isSuccess } = RtoApi.Rto.useProfile()

    useEffect(() => {
        if (isAvatarUpdated) {
            refetch()
        }
        if (isSuccess) {
            setIsAvatarUpdated(false)
        }
    }, [isAvatarUpdated, rto])

    const sectorsWithCourses = getSectors(rto?.courses)
    return (
        <>
            {passwordModal && passwordModal}
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <div>
                    <div className="flex justify-end gap-x-2">
                        <ActionButton
                            rounded
                            Icon={AiFillEdit}
                            variant={'info'}
                            onClick={() =>
                                router.push('/portals/rto/my-profile')
                            }
                            title="Edit Profile"
                        />

                        <ActionButton
                            rounded
                            Icon={BsUnlockFill}
                            variant={'neutral'}
                            onClick={() => onUpdatePassword(rto)}
                            title="Edit Password"
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <RtoAvatar
                            imageUrl={rto?.user.avatar}
                            canEdit
                            setIsAvatarUpdated={setIsAvatarUpdated}
                        />

                        <div className="flex flex-col items-center mt-2">
                            <p className="text-md font-semibold">
                                {rto?.user?.name}
                            </p>
                            <div className="flex items-center gap-x-2">
                                <p className="text-sm text-gray-400">
                                    {rto?.user?.email}
                                </p>
                                <span className="text-blue-500">
                                    <MdVerified />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info Row 1 */}
                    <div className="flex justify-between divide-x border-b mt-4">
                        <div className="p-1">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <FaAddressCard />
                                </span>
                                <p className="text-xs font-medium">
                                    {rto?.rtoCode}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                RTO CODE
                            </div>
                        </div>

                        <div className="p-1">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <MdPhone />
                                </span>
                                <p className="text-xs font-medium">
                                    {rto?.phone}
                                </p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                Phone Number
                            </div>
                        </div>
                        {/* <div className="p-1">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <GiBackwardTime />
                                </span>
                                <p className="text-xs font-medium">NA</p>
                            </div>
                            <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                                Last Login
                            </div>
                        </div> */}
                    </div>

                    {/* Info Row 3 */}
                    <div className="flex justify-around mb-2">
                        <div className="p-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-300">
                                    <IoLocation />
                                </span>
                                <p className="text-xs">
                                    {rto?.addressLine1}, {rto?.addressLine2},{' '}
                                    {rto?.state}, {rto?.suburb}
                                </p>
                            </div>
                            {/* <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                      Address
                    </div> */}
                        </div>
                    </div>

                    {/* contact person row 4 */}
                    <div className="mb-2">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Contact Person
                        </Typography>
                        <div className="flex justify-around divide-x border-t border-b">
                            <div className="p-2">
                                <div className="flex items-center gap-x-2">
                                    <BiRename className="text-gray-400" />
                                    <Typography
                                        variant={'small'}
                                        color={'text-gray-400'}
                                    >
                                        Name
                                    </Typography>
                                </div>

                            
                                <Typography
                                    variant={'small'}
                                    color={'text-black'}
                                >
                                    {rto?.contactPersons[0]?.name || "N/A"}
                                </Typography>
                            </div>
                            <div className="p-2">
                                <div className="flex items-center gap-x-2">
                                    <FaPhoneAlt className="text-gray-400" />
                                    <Typography
                                        variant={'small'}
                                        color={'text-gray-400'}
                                    >
                                        Phone
                                    </Typography>
                                </div>
                                <Typography
                                    variant={'small'}
                                    color={'text-black'}
                                >
                                    {rto?.contactPersons[0]?.phone || "N/A"}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    {/* rto Package */}
                    <div className="mt-4">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            RTO Package
                        </Typography>
                    </div>
                    <div className="flex justify-around divide-x border-t border-b">
                        <div className="p-2">
                            <div className="flex items-center gap-x-2">
                                <BiPackage className="text-gray-400" />
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-400'}
                                >
                                    Package Name
                                </Typography>
                            </div>
                            {rto?.package?.name ? (
                                <>
                                    <Typography
                                        variant={'small'}
                                        color={'text-black'}
                                    >
                                        {rto?.package?.name || 'Package Name N/A'}
                                    </Typography>
                                    <Typography
                                        variant={'small'}
                                        color={'text-black'}
                                    >
                                        {ellipsisText(
                                            rto?.package?.description,
                                            25
                                        ) || 'Package Description N/A'}
                                    </Typography>
                                </>
                            ) : (
                                <p className="text-xs">Not Selected</p>
                            )}
                        </div>
                        <div className="p-2">
                            <div className="flex items-center gap-x-2">
                                <FaMoneyBill className="text-gray-400" />
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-400'}
                                >
                                    Billing Type
                                </Typography>
                            </div>
                            <Typography variant={'small'} color={'text-black'}>
                                {rto?.package?.billingType || 'N/A'}
                            </Typography>
                        </div>
                    </div>

                    {/* placement coordinator row 5 */}
                    <div className="mb-2">
                        <p className="text-[11px] text-gray-400">
                            Placement Coordinators
                        </p>
                        <div className="flex justify-between gap-x-2">
                            <div>
                                <p className="font-medium text-sm">
                                    {rto?.subadmin[0]?.user.name}
                                </p>
                                <p className="text-xs font-medium text-slate-400">
                                    {rto?.subadmin[0]?.user.email}
                                </p>
                            </div>

                            {rto?.subadmin.length && (
                                <InitialAvatarContainer show={1}>
                                    {rto?.subadmin.map((coordinator: any) => (
                                        <InitialAvatar
                                            name={coordinator?.user?.name}
                                            first
                                        />
                                    ))}
                                </InitialAvatarContainer>
                            )}
                        </div>
                    </div>

                    {/* Eligible sectors */}
                    <div className="mt-4">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Eligible Sectors
                        </Typography>

                        {sectorsWithCourses ? (
                            Object.keys(sectorsWithCourses).map((sector) => {
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
                                                (sectorsWithCourses as any)[
                                                sector
                                                ]
                                            }
                                        />
                                    </>
                                )
                            })
                        ) : (
                            <NoData text={'No Sectors Assigned'} />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
