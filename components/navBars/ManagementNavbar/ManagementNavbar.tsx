import { Typography } from '@components/Typography'
import Image from 'next/image'
import { useState } from 'react'
import { LogoutDropDown } from './components'
import OutsideClickHandler from 'react-outside-click-handler'
import Link from 'next/link'
import { useRouter } from 'next/router'
type ManagementNavbarProps = {
    // handleTabChange: any
    // activeTab?: any
    isExpanded: boolean
    setIsExpanded: any
}
export const ManagementNavbar = ({
    // handleTabChange,
    // activeTab,
    setIsExpanded,
    isExpanded,
}: ManagementNavbarProps) => {
    const router = useRouter()
    return (
        <div className="bg-white flex items-center justify-between rounded-lg px-5 py-4">
            <div className="flex items-center justify-between gap-x-24">
                <div className="">
                    <Image
                        src={'/images/management-portal/logo.png'}
                        height={70}
                        width={100}
                        alt="Logo"
                    />
                </div>
                <div className="flex gap-x-10">
                    <Link
                        href={'/portals/management/check-kpi'}
                        // onClick={() => handleTabChange('checkKpi')}
                    >
                        <Typography
                            variant="small"
                            color={
                                router.pathname ===
                                '/portals/management/check-kpi'
                                    ? 'text-primaryNew'
                                    : 'text-gray-400'
                            }
                            bold={
                                router.pathname ===
                                '/portals/management/check-kpi'
                            }
                        >
                            Check KPI
                        </Typography>
                    </Link>
                    <Link
                        href={'/portals/management/student-list'}
                        // onClick={() => handleTabChange('studentList')}
                    >
                        <Typography
                            variant="small"
                            color={
                                router.pathname ===
                                '/portals/management/student-list'
                                    ? 'text-primaryNew'
                                    : 'text-gray-400'
                            }
                            bold={
                                router.pathname ===
                                '/portals/management/student-list'
                            }
                        >
                            Student List
                        </Typography>
                    </Link>
                </div>
            </div>
            <div>
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setIsExpanded(false)
                    }}
                >
                    <LogoutDropDown
                        setIsExpanded={setIsExpanded}
                        isExpanded={isExpanded}
                    />
                </OutsideClickHandler>
            </div>
        </div>
    )
}
