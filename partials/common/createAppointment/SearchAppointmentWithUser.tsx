import { Card, LoadingAnimation, Typography } from '@components'
import { useSearchUserByIdQuery } from '@queries'
import React, { useEffect } from 'react'
import { SearchedUserCard } from './SearchedUserCard'
import { SearchUserCard } from './SearchUserCard'

export const SearchAppointmentWithUser = ({
    selectedPerson,
    setSelectedUser,
    selectedUser,
    studentIndustry,
}: {
    selectedPerson: any
    setSelectedUser: any
    selectedUser: any
    studentIndustry: number
}) => {
    const userData = useSearchUserByIdQuery(
        {
            search: studentIndustry,
            role: 'industry',
        },
        {
            skip:
                selectedPerson?.selectedAppointmentFor !== 'Student' ||
                !studentIndustry,
        }
    )

    useEffect(() => {
        if (userData?.isSuccess && userData?.data) {
            setSelectedUser((selectedUser: any) => ({
                ...selectedUser,
                selectedAppointmentWithUser: userData?.data?.id,
            }))
        }
    }, [userData])
    return (
        <div>
            {selectedPerson.selectedAppointmentWith &&
            selectedPerson.selectedAppointmentWith !== 'Self' &&
            userData?.isLoading ? (
                <LoadingAnimation size={80} />
            ) : studentIndustry &&
              userData?.data &&
              selectedPerson?.selectedAppointmentFor === 'Student' ? (
                <Card>
                    <>
                        <Typography>
                            Appointment For {userData?.data?.name}{' '}
                            <span className="text-sm">
                                ({selectedPerson?.selectedAppointmentWith})
                            </span>
                        </Typography>
                        <SearchedUserCard
                            data={userData?.data}
                            onClick={() => {
                                setSelectedUser({
                                    ...selectedUser,
                                    selectedAppointmentWithUser:
                                        userData?.data?.id,
                                })
                            }}
                            selected={selectedUser.selectedAppointmentWithUser}
                            selectedPerson={
                                selectedPerson?.selectedAppointmentWith
                            }
                        />
                    </>
                </Card>
            ) : (
                <>
                    {studentIndustry && !userData?.data ? (
                        <Typography>
                            No {selectedPerson?.selectedAppointmentWith} Found
                        </Typography>
                    ) : null}
                    <SearchUserCard
                        selectedAppointment={
                            selectedPerson?.selectedAppointmentWith
                        }
                        onClick={(s: any) => {
                            setSelectedUser({
                                ...selectedUser,
                                selectedAppointmentWithUser: s.id,
                            })
                        }}
                        selectedUser={selectedUser.selectedAppointmentWithUser}
                        type={'With'}
                        selectedPerson={selectedPerson?.selectedAppointmentWith}
                    />
                </>
            )}
        </div>
    )
}
