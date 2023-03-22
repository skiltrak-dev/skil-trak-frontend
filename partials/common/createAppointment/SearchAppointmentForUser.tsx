import { Button, Card, LoadingAnimation, Typography } from '@components'
import { useSearchUserByIdQuery } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SearchedUserCard } from './SearchedUserCard'
import { SearchUserCard } from './SearchUserCard'

export const SearchAppointmentForUser = ({
    user,
    setSelectedUser,
    selectedPerson,
    selectedUser,
    query,
    setStudentIndustry,
    setSelectedPerson,
}: {
    user: any
    setSelectedUser: Function
    selectedPerson: any
    selectedUser: any
    query: any
    setStudentIndustry: Function
    setSelectedPerson: Function
}) => {
    const [selectedUserData, setSelectedUserData] = useState<any>(null)
    const [isAppointmentTypeChange, setIsAppointmentTypeChange] =
        useState<boolean>(false)

    const router = useRouter()
    const userData = useSearchUserByIdQuery(
        {
            search: (router?.query as any)[user],
            role: user,
        },
        { skip: !user }
    )
    const industry =
        userData?.data?.student?.workplace[0]?.industries[0]?.industry?.user?.id

    useEffect(() => {
        setSelectedUserData(null)
    }, [selectedPerson, setSelectedUser])

    useEffect(() => {
        if (selectedPerson?.selectedAppointmentFor?.toLowerCase() === user) {
            setIsAppointmentTypeChange(true)
        } else {
            setIsAppointmentTypeChange(false)
        }
    }, [selectedPerson, userData])

    useEffect(() => {
        if (userData?.isSuccess && userData?.data) {
            setSelectedUser((selectedUser: any) => ({
                ...selectedUser,
                selectedAppointmentForUser: userData?.data?.id,
            }))
            if (userData?.data?.role === 'student') {
                // send student workplace Industry id

                setStudentIndustry(industry)
                setSelectedPerson({
                    ...selectedPerson,
                    selectedAppointmentWith: 'Industry',
                })
            }
        }
    }, [userData])
    return (
        <div>
            {selectedPerson?.selectedAppointmentFor &&
                (userData?.isLoading ? (
                    <LoadingAnimation size={80} />
                ) : query &&
                  user &&
                  selectedPerson?.selectedAppointmentFor?.toLowerCase() ===
                      user &&
                  userData?.data ? (
                    <Card>
                        {
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
                                        if (
                                            userData?.data?.role === 'student'
                                        ) {
                                            // send student workplace Industry id
                                            setStudentIndustry(industry)
                                            setSelectedPerson({
                                                ...selectedPerson,
                                                selectedAppointmentWith:
                                                    'Industry',
                                            })
                                        }
                                    }}
                                    selected={
                                        selectedUser?.selectedAppointmentForUser
                                    }
                                    selectedPerson={
                                        selectedPerson?.selectedAppointmentFor
                                    }
                                />
                            </>
                        }
                    </Card>
                ) : (
                    <>
                        {query &&
                            user &&
                            selectedPerson?.selectedAppointmentFor?.toLowerCase() ===
                                user &&
                            !userData?.data && (
                                <Typography>
                                    No {selectedPerson?.selectedAppointmentFor}{' '}
                                    Found
                                </Typography>
                            )}
                        {selectedUserData ? (
                            <Card>
                                <div className="flex items-center justify-between mb-2">
                                    <Typography>
                                        Appointment For {selectedUserData?.name}{' '}
                                        <span className="text-sm">
                                            (
                                            {
                                                selectedPerson?.selectedAppointmentFor
                                            }
                                            )
                                        </span>
                                    </Typography>
                                    <Button
                                        variant={'info'}
                                        text={`Search Another ${selectedPerson?.selectedAppointmentFor}`}
                                        onClick={() => {
                                            setSelectedUserData(null)
                                        }}
                                    />
                                </div>
                                <SearchedUserCard
                                    data={selectedUserData}
                                    onClick={() => {
                                        setSelectedUser({
                                            ...selectedUser,
                                            selectedAppointmentForUser:
                                                selectedUserData?.id,
                                        })
                                    }}
                                    selected={
                                        selectedUser.selectedAppointmentForUser
                                    }
                                    selectedPerson={
                                        selectedPerson?.selectedAppointmentFor
                                    }
                                />
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
                                    setSelectedUserData(s)
                                    if (
                                        selectedPerson?.selectedAppointmentFor ===
                                            'Student' &&
                                        s?.student?.workplace?.length
                                    ) {
                                        // send student workplace Industry id
                                        setStudentIndustry(
                                            s?.student?.workplace[0]
                                                ?.industries[0]?.industry?.user
                                                ?.id
                                        )
                                        setSelectedPerson({
                                            ...selectedPerson,
                                            selectedAppointmentWith: 'Industry',
                                        })
                                    }
                                }}
                                selectedUser={
                                    selectedUser.selectedAppointmentForUser
                                }
                                type={'For'}
                                selectedPerson={
                                    selectedPerson?.selectedAppointmentFor
                                }
                            />
                        )}
                    </>
                ))}
        </div>
    )
}
