import { Button, Card, LoadingAnimation, Typography } from '@components'
import { RequiredStar } from '@components/inputs/components'
import { UserRoles } from '@constants'
import { useSearchUserByIdQuery } from '@queries'
import React, { useEffect, useState } from 'react'
import { SearchedUserCard } from './SearchedUserCard'
import { SearchUserCard } from './SearchUserCard'

export const SearchAppointmentWithUser = ({
    selectedPerson,
    setSelectedUser,
    selectedUser,
    studentIndustry,
}: {
    selectedUser: any
    selectedPerson: any
    setSelectedUser: any
    studentIndustry: number
}) => {
    const [selectedUserData, setSelectedUserData] = useState<any>(null)
    const [industry, setIndustry] = useState<any>(null)

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
        setSelectedUserData(null)
        setIndustry(null)
    }, [selectedPerson, setSelectedUser, studentIndustry])

    useEffect(() => {
        if (userData?.isSuccess && userData?.data) {
            setSelectedUser((selectedUser: any) => ({
                ...selectedUser,
                selectedAppointmentWithUser: userData?.data?.id,
            }))
            setIndustry(userData?.data)
        }
    }, [userData])

    return (
        <div>
            {selectedPerson.selectedAppointmentWith &&
            selectedPerson.selectedAppointmentWith !== 'Self' ? (
                userData?.isLoading ? (
                    <LoadingAnimation size={80} />
                ) : studentIndustry &&
                  industry &&
                  selectedPerson?.selectedAppointmentFor === 'Student' ? (
                    <Card>
                        <>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex gap-x-1">
                                    <Typography>
                                        Appointment With {industry?.name}{' '}
                                        <span className="text-sm">
                                            (
                                            {
                                                selectedPerson?.selectedAppointmentWith
                                            }
                                            )
                                        </span>
                                    </Typography>
                                    <div className="-mt-1">
                                        <RequiredStar />
                                    </div>
                                </div>
                                {industry?.role === UserRoles.INDUSTRY && (
                                    <Button
                                        variant={'info'}
                                        text={'Search Another Industry'}
                                        onClick={() => {
                                            setIndustry(null)
                                            setSelectedUserData(null)
                                        }}
                                    />
                                )}
                            </div>
                            <SearchedUserCard
                                data={industry}
                                onClick={() => {
                                    setSelectedUser({
                                        ...selectedUser,
                                        selectedAppointmentWithUser:
                                            industry?.id,
                                    })
                                }}
                                selected={
                                    selectedUser.selectedAppointmentWithUser
                                }
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
                                No {selectedPerson?.selectedAppointmentWith}{' '}
                                Found
                            </Typography>
                        ) : null}
                        {selectedUserData ? (
                            <Card>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex gap-x-1">
                                        <Typography>
                                            Appointment With{' '}
                                            {selectedUserData?.name}{' '}
                                            <span className="text-sm">
                                                (
                                                {
                                                    selectedPerson?.selectedAppointmentWith
                                                }
                                                )
                                            </span>
                                        </Typography>
                                        <div className="-mt-1">
                                            <RequiredStar />
                                        </div>
                                    </div>
                                    <Button
                                        variant={'info'}
                                        text={`Search Another ${selectedPerson?.selectedAppointmentWith}`}
                                        onClick={() => {
                                            setIndustry(null)
                                            setSelectedUserData(null)
                                        }}
                                    />
                                </div>
                                <SearchedUserCard
                                    data={selectedUserData}
                                    onClick={() => {
                                        setSelectedUser({
                                            ...selectedUser,
                                            selectedAppointmentWithUser:
                                                selectedUserData?.id,
                                        })
                                    }}
                                    selected={
                                        selectedUser.selectedAppointmentWithUser
                                    }
                                    selectedPerson={
                                        selectedPerson?.selectedAppointmentWith
                                    }
                                />
                            </Card>
                        ) : (
                            <SearchUserCard
                                selectedAppointment={
                                    selectedPerson?.selectedAppointmentWith
                                }
                                onClick={(s: any) => {
                                    setSelectedUser({
                                        ...selectedUser,
                                        selectedAppointmentWithUser: s.id,
                                    })
                                    setSelectedUserData(s)
                                }}
                                selectedUser={
                                    selectedUser.selectedAppointmentWithUser
                                }
                                type={'With'}
                                selectedPerson={
                                    selectedPerson?.selectedAppointmentWith
                                }
                            />
                        )}
                    </>
                )
            ) : null}
        </div>
    )
}
