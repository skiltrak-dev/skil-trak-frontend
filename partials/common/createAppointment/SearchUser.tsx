import { useState } from 'react'
import { SearchAppointmentForUser } from './SearchAppointmentForUser'
import { SearchAppointmentWithUser } from './SearchAppointmentWithUser'
import { UserRoles } from '@constants'
import { SelectedPerson, SelectedUserType } from '@types'

export const SearchUser = ({
    selectedPerson,
    setSelectedUser,
    user,
    query,
    selectedUser,
    setSelectedPerson,
}: {
    selectedPerson: SelectedPerson
    setSelectedUser: Function
    user: UserRoles
    query: boolean
    selectedUser: SelectedUserType
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
