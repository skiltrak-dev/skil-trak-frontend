import { Typography } from '@components/Typography'
import Image from 'next/image'
import { useState } from 'react'
import { LogoutDropDown, ManagementNavLink } from './components'
import OutsideClickHandler from 'react-outside-click-handler'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { linksData } from './linksData'
import { getUserCredentials } from '@utils'

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
    const user = getUserCredentials()
    return (
        <div className="bg-white  rounded-lg px-5 py-4">
            <div className="flex items-center justify-between container mx-auto">
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
                        {linksData
                            .filter((link) => link.visible) // Filter links based on visibility
                            .map((link, index) => (
                                <ManagementNavLink
                                    key={index}
                                    href={link.href}
                                    label={link.label}
                                    activePaths={link.activePaths}
                                />
                            ))}
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
        </div>
    )
}
