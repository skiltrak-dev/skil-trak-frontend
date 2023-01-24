import { Card, NoData } from '@components'
import Image from 'next/image'
import React from 'react'
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa'
import { IoBriefcase } from 'react-icons/io5'
import { MdPermContactCalendar, MdPhone } from 'react-icons/md'

type Props = {
    data: any
}

export const MyWorkPlaceCard = ({ data }: Props) => {
    const appliedIndustry = data?.workplace[0]?.industries
        ?.filter((i: any) => i?.applied)
        ?.slice(0, 1)
    console.log('data?.workplace', appliedIndustry)
    return (
        <>
            <Card>
                {/* Card Header */}
                <div className="flex justify-between items-center">
                    {/* Icon Title */}
                    <div className="flex items-center gap-x-2">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex justify-center items-center">
                            <IoBriefcase size={16} />
                        </div>
                        <p className="text-sm font-semibold">My Workplace</p>
                    </div>

                    {/* Action */}
                    {/* <Link legacyBehavior href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-green-100 text-green-600 px-4 py-2 rounded">
                                See Details
                            </a>
                        </Link> */}
                </div>

                {/* Card Body */}
                {data?.workplace?.length > 0 ? (
                    <div className="mt-4">
                        {data?.workplace[0]?.industries[0]?.applied && (
                            <>
                                <div
                                    key={
                                        data?.workplace?.[0]?.id
                                    }
                                >
                                    <div className="flex items-center gap-x-6 mb-4">
                                        <div className="hidden md:block">
                                            <div className="flex-shrink-0">
                                                {data?.workplace[0]?.industries[0]?.industry?.avatar ? (
                                                    <Image
                                                        src={
                                                            data
                                                                ?.rto
                                                                ?.user
                                                                ?.avatar
                                                        }
                                                        width={
                                                            100
                                                        }
                                                        height={
                                                            100
                                                        }
                                                        alt=""
                                                        className="hidden md:block rounded-full shadow-inner-image"
                                                    />
                                                ) : (
                                                    <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                                                        <span className="text-4xl text-gray-300">
                                                            <FaBriefcase />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <div>
                                                <div className="flex items-center gap-x-1">
                                                    {/* <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full">
                                                        <FaBriefcase
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </div> */}
                                                    <p className="font-medium">
                                                        {
                                                            data?.workplace[0]?.industries[0]
                                                                ?.industry
                                                                ?.user
                                                                ?.name
                                                        }
                                                    </p>
                                                </div>
                                                <p className="text-slate-400 text-sm">
                                                    {
                                                        data?.workplace[0]?.industries[0]
                                                            ?.industry
                                                            ?.user
                                                            ?.email
                                                    }
                                                </p>
                                            </div>

                                            <div className="flex gap-x-3 mt-1 border-t pt-2">
                                                <div className="flex items-center gap-x-1">
                                                    <span className="text-gray-400">
                                                        <MdPermContactCalendar
                                                            size={
                                                                14
                                                            }
                                                        />
                                                    </span>
                                                    <span className="text-xs">
                                                        {
                                                            data?.workplace[0]?.industries[0]
                                                                ?.industry
                                                                ?.user
                                                                ?.name
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-x-1">
                                                    <span className="text-gray-400">
                                                        <MdPhone
                                                            size={
                                                                14
                                                            }
                                                        />
                                                    </span>
                                                    <span className="text-xs">
                                                        {
                                                            data?.workplace[0]?.industries[0]
                                                                ?.industry
                                                                ?.phoneNumber
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <p className="text-[11px] text-gray-400">
                                                    Contact
                                                    Person
                                                </p>
                                                <div className="flex justify-between gap-x-4">
                                                    <div>
                                                        <p className="font-medium text-sm">
                                                            {data?.workplace[0]?.industries[0]
                                                                ?.industry
                                                                ?.contactPerson ||
                                                                'N/A'}
                                                        </p>
                                                        <p className="text-xs font-medium text-slate-400">
                                                            {data?.workplace[0]?.industries[0]
                                                                ?.industry
                                                                ?.contactPersonNumber ||
                                                                'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-x-3 mt-1 border-t pt-2">
                                        <div className="flex items-center gap-x-1">
                                            <span className="text-gray-400">
                                                <FaMapMarkerAlt
                                                    size={14}
                                                />
                                            </span>
                                            <span className="text-xs">
                                                {
                                                    data?.workplace[0]?.industries[0]
                                                        ?.industry
                                                        ?.addressLine1
                                                },{" "}
                                                {
                                                    data?.workplace[0]?.industries[0]
                                                        ?.industry
                                                        ?.addressLine2 || "N/A"
                                                }, {" "}
                                                {
                                                    data?.workplace[0]?.industries[0]?.industry?.suburb || 'N/A'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="mt-6">
                        <NoData text="No Workplace" />
                    </div>
                )}
            </Card>
        </>
    )
}
