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
import { BsUnlockFill } from 'react-icons/bs'
import { useActionModal } from '@hooks'
import { CourseList } from '../components'
import { RtoSectors } from '../components/RtoSectors'

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

export const ViewProfileCB = () => {
    const router = useRouter()

    const { onUpdatePassword, passwordModal } = useActionModal()

    const { data: rto, isLoading } = RtoApi.Rto.useProfile()

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
                            user={rto?.user?.id}
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
                    <div className="flex flex-col divide-y mt-4 border-b">
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
                                    {rto?.rtoCode || 'N/A'}
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
                                    {rto?.abn || 'N/A'}
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
                                        {rto?.phone}
                                    </p>
                                </div>
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
                                    {rto?.contactPersons[0]?.name || 'N/A'}
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
                                    {rto?.contactPersons[0]?.phone || 'N/A'}
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
                                        {rto?.package?.name ||
                                            'Package Name N/A'}
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
                    <RtoSectors sectorsWithCourses={sectorsWithCourses} />
                    {/* <div className="mt-4">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Eligible Sectors
                        </Typography>

                        <CourseList
                            // courses={(sectorsWithCourses as any)[sector]}
                            sectorsWithCourses={sectorsWithCourses}
                        />
                    </div> */}
                </div>
            )}
        </>
    )
}
