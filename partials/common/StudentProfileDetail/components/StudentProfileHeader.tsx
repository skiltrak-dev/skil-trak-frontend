import { Alert } from '@components'
import { UserRoles } from '@constants'
import { getLink } from '@utils'
import moment from 'moment'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { ProfileIds } from '../types'
import { QuickSearchToggle } from './QuickSearchToggle'

interface StudentProfileHeaderProps {
    profile: any
    role: string
    subadmin: any
    router: any
    quickSearch: boolean
    setQuickSearch: (value: boolean) => void
    onSectionClick: (value: ProfileIds) => void
}

export const StudentProfileHeader: React.FC<StudentProfileHeaderProps> = ({
    profile,
    role,
    subadmin,
    router,
    quickSearch,
    setQuickSearch,
    onSectionClick,
}) => {
    const handleBackNavigation = () => {
        if (role === UserRoles.ADMIN || subadmin?.data?.isAdmin) {
            const link = getLink('student')
            link ? router.push(`/${link}`) : router.back()
        } else if (role === UserRoles.SUBADMIN && !subadmin?.data?.isAdmin) {
            const link = getLink('subadmin-student')
            link ? router.push(`/${link}`) : router.back()
        } else {
            router.back()
        }
    }

    return (
        <div>
            {profile?.data?.isSnoozed && (
                <Alert
                    title="Student Snoozed"
                    description={`Student Snoozed till ${moment(
                        profile?.data?.snoozedDate
                    ).format('MMM DD YYYY')}`}
                    variant="warning"
                    autoDismiss={false}
                />
            )}

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-2 gap-x-3">
                <div className="flex items-center gap-x-2.5">
                    <div
                        className="shadow-site rounded-[10px] px-2.5 bg-white group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark cursor-pointer"
                        onClick={handleBackNavigation}
                    >
                        <IoArrowBackOutline className="transition-all inline-flex text-lg text-gray-600 group-hover:-translate-x-1" />
                    </div>
                </div>

                <QuickSearchToggle
                    quickSearch={quickSearch}
                    setQuickSearch={setQuickSearch}
                    onSectionClick={onSectionClick}
                    role={role}
                />
            </div>
        </div>
    )
}
