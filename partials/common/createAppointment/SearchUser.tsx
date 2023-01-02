import { Card, LoadingAnimation, Typography } from '@components'
import { useSearchUserByIdQuery } from '@queries'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SearchedUserCard } from './SearchedUserCard'
import { SearchUserCard } from './SearchUserCard'

export const SearchUser = ({
    selectedPerson,
    setSelectedUser,
    user,
    query,
    selectedUser,
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
}) => {
    const router = useRouter()
    const userData = useSearchUserByIdQuery(
        {
            search: (router?.query as any)[user],
            role: user,
        },
        { skip: !user }
    )

    useEffect(() => {
        if (userData?.isSuccess && userData?.data) {
            setSelectedUser((selectedUser: any) => ({
                ...selectedUser,
                selectedAppointmentForUser: userData?.data?.id,
            }))
        }
    }, [userData])
    return (
        <div>
            {selectedPerson?.selectedAppointmentFor &&
                (query && user ? (
                    <Card>
                        {userData?.isLoading ? (
                            <LoadingAnimation size={80} />
                        ) : (
                            <>
                                <Typography>
                                    Appointment For {userData?.data?.name}{' '}
                                    <span className="text-sm">
                                        (
                                        {selectedPerson?.selectedAppointmentFor}
                                        )
                                    </span>
                                </Typography>
                                <SearchedUserCard
                                    data={userData?.data}
                                    onClick={() => {
                                        setSelectedUser({
                                            ...selectedUser,
                                            selectedAppointmentForUser:
                                                userData?.data?.id,
                                        })
                                    }}
                                    selected={
                                        selectedUser?.selectedAppointmentForUser
                                    }
                                    selectedPerson={
                                        selectedPerson?.selectedAppointmentFor
                                    }
                                />
                            </>
                        )}
                    </Card>
                ) : (
                    <SearchUserCard
                        selectedAppointment={
                            selectedPerson?.selectedAppointmentFor
                        }
                        onClick={(s: any) => {
                            setSelectedUser({
                                ...selectedUser,
                                selectedAppointmentForUser: s.id,
                            })
                        }}
                        selectedUser={selectedUser.selectedAppointmentForUser}
                        type={'For'}
                        selectedPerson={selectedPerson?.selectedAppointmentFor}
                    />
                ))}

            {selectedPerson.selectedAppointmentWith &&
                selectedPerson.selectedAppointmentWith !== 'Self' && (
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
                )}
        </div>
    )
}
