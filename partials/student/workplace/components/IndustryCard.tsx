import React from 'react'

// Icons
import { IoBriefcase } from 'react-icons/io5'
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa'
import { MdPermContactCalendar, MdPhone } from 'react-icons/md'

// components
import { Card } from '@components'
import { Industry } from '@types'
import Image from 'next/image'

export const IndustryCard = ({ industry }: { industry: Industry }) => {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <Card>
                {/* Card Header */}

                {/* Card Body */}
                <div>
                    <div key={industry?.id}>
                        <div className="flex items-center gap-x-6 mb-4">
                            <div className="hidden md:block">
                                <div className="flex-shrink-0">
                                    {industry?.user?.avatar ? (
                                        <Image
                                            src={industry?.user?.avatar}
                                            width={100}
                                            height={100}
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
                                        <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full">
                                            <FaBriefcase size={16} />
                                        </div>
                                        <p className="font-medium">
                                            {industry?.user?.name}
                                        </p>
                                    </div>
                                    <p className="text-slate-400 text-sm">
                                        {industry?.user?.email}
                                    </p>
                                </div>

                                <div className="flex gap-x-3 mt-1 border-t pt-2">
                                    <div className="flex items-center gap-x-1">
                                        <span className="text-gray-400">
                                            <MdPermContactCalendar size={14} />
                                        </span>
                                        <span className="text-xs">
                                            {industry?.user?.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <span className="text-gray-400">
                                            <MdPhone size={14} />
                                        </span>
                                        <span className="text-xs">
                                            {industry?.phoneNumber}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="text-[11px] text-gray-400">
                                        Contact Person
                                    </p>
                                    <div className="flex justify-between gap-x-4">
                                        <div>
                                            <p className="font-medium text-sm">
                                                {industry?.contactPerson ||
                                                    'N/A'}
                                            </p>
                                            <p className="text-xs font-medium text-slate-400">
                                                {industry?.contactPersonNumber ||
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
                                    <FaMapMarkerAlt size={14} />
                                </span>
                                <span className="text-xs">
                                    {industry?.addressLine1},{' '}
                                    {industry?.addressLine2 || 'N/A'},{' '}
                                    {industry?.suburb || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
