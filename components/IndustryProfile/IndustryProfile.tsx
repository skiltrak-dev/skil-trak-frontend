import {
    InitialAvatar,
    InitialAvatarContainer,
} from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import Image from 'next/image'

import { AiFillEdit } from 'react-icons/ai'
import { BiRename } from 'react-icons/bi'

import {
    FaAddressCard,
    FaBirthdayCake,
    FaPhoneAlt,
    FaUserCircle,
} from 'react-icons/fa'
import { GiBackwardTime } from 'react-icons/gi'
import { IoLocation } from 'react-icons/io5'
import { MdPhone, MdBlock, MdVerified } from 'react-icons/md'
import { useGetSubAdminIndustriesProfileQuery } from '@queries'

type Props = {
    data: any
}

export const IndustryProfile = ({ data }: Props) => {
    // console.log("industry profile data", data);
    return (
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
                    <Image
                        src="https://images.unsplash.com/photo-1615915468538-0fbd857888ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9zYSUyMGh1dCUyMGxvZ298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                        width={100}
                        height={100}
                        className="rounded-full shadow-inner-image"
                    />
                    <div className="absolute top-0 w-[100px] h-[100px] bg-transparent rounded-full shadow-inner-image"></div>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">{data?.user?.name}</p>
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
                        <p className="text-sm font-medium">{data?.abn}</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        ABN
                    </div>
                </div>

                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <MdPhone />
                        </span>
                        <p className="text-sm font-medium">
                            {data?.phoneNumber}
                        </p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Phone Number
                    </div>
                </div>
                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <GiBackwardTime />
                        </span>
                        <p className="text-sm font-medium">Yesterday</p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Last Login
                    </div>
                </div>
            </div>

            {/* Info Row 3 */}
            <div className="flex justify-around">
                <div className="p-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300">
                            <IoLocation />
                        </span>
                        <p className="text-sm font-medium">
                            {data?.addressLine1}, {data?.addressLine2},{' '}
                            {data?.state}, {data?.suburb}
                        </p>
                    </div>
                    <div className="text-gray-400 text-[11px] -mt-0.5 text-center">
                        Address
                    </div>
                </div>
            </div>
            {/* contact person row 4 */}
            <Typography variant={'small'} color={'text-gray-500'}>
                Contact Person
            </Typography>
            <div className="flex justify-around divide-x border-t border-b">
                <div className="p-2">
                    <div className="flex items-center gap-x-2">
                        <BiRename className="text-gray-400" />
                        <Typography variant={'small'} color={'text-gray-400'}>
                            Name
                        </Typography>
                    </div>
                    <Typography variant={'small'} color={'text-black'}>
                        {data?.contactPerson}
                    </Typography>
                </div>
                <div className="p-2">
                    <div className="flex items-center gap-x-2">
                        <FaPhoneAlt className="text-gray-400" />
                        <Typography variant={'small'} color={'text-gray-400'}>
                            Phone
                        </Typography>
                    </div>
                    <Typography variant={'small'} color={'text-black'}>
                        {data?.contactPersonNumber}
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
                        <p className="font-medium text-sm">Yaseen Khan</p>
                        <p className="text-xs font-medium text-slate-400">
                            yaseen@skiltrak.com.au
                        </p>
                    </div>

                    <InitialAvatarContainer show={3}>
                        <InitialAvatar name="John Smith" first />
                        <InitialAvatar name="Yaseen Khan" />
                        <InitialAvatar name="Julie Clarke" />
                        <InitialAvatar name="Salman" />
                        <InitialAvatar name="Yaseen Khan" />
                        <InitialAvatar name="Julie Clarke" />
                        <InitialAvatar name="Salman" />
                        <InitialAvatar name="Yaseen Khan" />
                    </InitialAvatarContainer>
                </div>
            </div> */}

            {/* Eligible sectors */}
            {/* <div className="mt-4">
                <Typography variant={'small'} color={'text-gray-500'}>
                    Eligible Sectors
                </Typography>
                <Typography variant={'label'} color={'text-black'}>
                    Commercial Cookery & Hospitality
                </Typography>
                <div className="mt-2 flex items-center gap-x-2">
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-400 p-2 rounded-full"></div>
                        <div className="bg-blue-400 w-[1px] h-10"></div>
                        <div className="bg-blue-400 p-2 rounded-full"></div>
                        <div className="bg-blue-400 w-[1px] h-10"></div>
                        <div className="bg-blue-400 p-2 rounded-full"></div>
                    </div>
                    <div className="flex flex-col gap-y-4">
                        <div className="">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                SITHCCC020
                            </Typography>
                            <Typography
                                variant={'small'}
                                color={'text-gray-800'}
                            >
                                Work Effectively As Cook
                            </Typography>
                        </div>
                        <div className="">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                SITHKOP005
                            </Typography>
                            <Typography
                                variant={'small'}
                                color={'text-gray-800'}
                            >
                                Coordinate Cooking Operations
                            </Typography>
                        </div>
                        <div className="">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                SITHIND004
                            </Typography>
                            <Typography
                                variant={'small'}
                                color={'text-gray-800'}
                            >
                                Work Effectively In Hospitality Service
                            </Typography>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
