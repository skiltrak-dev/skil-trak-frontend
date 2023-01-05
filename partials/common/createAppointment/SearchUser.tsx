import { Card, LoadingAnimation, Typography } from '@components'
import { useSearchUserByIdQuery } from '@queries'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SearchAppointmentForUser } from './SearchAppointmentForUser'
import { SearchAppointmentWithUser } from './SearchAppointmentWithUser'
import { SearchedUserCard } from './SearchedUserCard'
import { SearchUserCard } from './SearchUserCard'

export const SearchUser = ({
    selectedPerson,
    setSelectedUser,
    user,
    query,
    selectedUser,
    setSelectedPerson,
}: {
    selectedPerson: {
        selectedAppointmentFor: string
        selectedAppointmentWith: string
    }
    setSelectedUser: Function
    user: string
    query: boolean
    selectedUser: {
        selectedAppointmentForUser: string
        selectedAppointmentWithUser: string
    }
    setSelectedPerson: Function
}) => {
    const [studentIndustry, setStudentIndustry] = useState<number | null>(null)
    return (
        <div className="flex flex-col gap-y-2.5">
            <SearchAppointmentForUser
                user={user}
                setSelectedUser={setSelectedUser}
                selectedPerson={selectedPerson}
                selectedUser={selectedUser}
                query={query}
                setStudentIndustry={setStudentIndustry}
                setSelectedPerson={setSelectedPerson}
            />

            <SearchAppointmentWithUser
                selectedPerson={selectedPerson}
                setSelectedUser={setSelectedUser}
                selectedUser={selectedUser}
                studentIndustry={Number(studentIndustry)}
            />
        </div>
    )
}
