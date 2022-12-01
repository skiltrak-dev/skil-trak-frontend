import { AiFillEdit } from 'react-icons/ai'
import { MdBlock, MdPhone, MdVerified } from 'react-icons/md'
import Image from 'next/image'
import { Course, Rto } from '@types'
import { FaAddressCard, FaPhoneAlt, FaSchool } from 'react-icons/fa'
import { GiBackwardTime } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import { AuthUtils } from '@utils'
import { AdminApi, RtoApi } from '@queries'
import { IoLocation } from 'react-icons/io5'
import {
    Typography,
    InitialAvatarContainer,
    InitialAvatar,
    LoadingAnimation,
    NoData,
} from '@components'
import { BiRename } from 'react-icons/bi'

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
    const { data: rto, isLoading } = RtoApi.Rto.useProfile()

    const sectorsWithCourses = getSectors(rto?.courses)

    return isLoading ? (
        <LoadingAnimation />
    ) : (
        <div>
            <div className="flex justify-end gap-x-2">
                <div className="bg-blue-100 rounded-full p-1">
                    <AiFillEdit className="text-blue-400  cursor-pointer " />
                </div>
                <div className="bg-red-100 rounded-full p-1">
                    <MdBlock className="text-red-400  cursor-pointer bg-red-100 rounded-full" />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="relative">
                    {rto?.user.avatar ? (
                        <Image
                            src={rto?.user.avatar}
                            width={100}
                            height={100}
                            className="rounded-full shadow-inner-image"
                        />
                    ) : (
                        <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                            <span className="text-4xl text-gray-300">
                                <FaSchool />
                            </span>
                        </div>
                    )}
                    <div
                        className={`${
                            rto?.user.avatar
                                ? 'w-[100px] h-[100px]'
                                : 'w-24 h-24'
                        }absolute top-0 left-0 bg-transparent rounded-full shadow-inner-image`}
                    ></div>
                </div>

                <div className="flex flex-col items-center mt-2">
                    <p className="text-md font-semibold">{rto?.user?.name}</p>
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
                        <p className="text-xs font-medium">{rto?.rtoCode}</p>
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
                        <p className="text-xs font-medium">{rto?.phone}</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Phone Number
                    </div>
                </div>
                <div className="p-1">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <GiBackwardTime />
                        </span>
                        <p className="text-xs font-medium">NA</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Last Login
                    </div>
                </div>
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
                        <Typography variant={'small'} color={'text-black'}>
                            {/* {rto?.contactPerson} */}
                            {'Not Available'}
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
                        <Typography variant={'small'} color={'text-black'}>
                            {/* {rto?.contactPersonNumber} */}
                            {'Not Available'}
                        </Typography>
                    </div>
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
                        <InitialAvatarContainer show={3}>
                            {rto?.subadmin.map((coordinator: any) => (
                                <>
                                    <InitialAvatar
                                        name={coordinator.user.name}
                                        first
                                    />
                                </>
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

                                {(sectorsWithCourses as any)[sector].map(
                                    (c: Course) => (
                                        <div
                                            key={c.id}
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
                                                    {c.code}
                                                </Typography>
                                                <Typography
                                                    variant={'small'}
                                                    color={'text-gray-800'}
                                                >
                                                    {c.title}
                                                </Typography>
                                            </div>
                                        </div>
                                    )
                                )}
                            </>
                        )
                    })
                ) : (
                    <NoData text={'No Sectors Assigned'} />
                )}
            </div>
        </div>
    )
}
