import { ActionButton, Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import Image from 'next/image'

// queries
import { useUpdateSubAdminRtoStudentStatusMutation } from '@queries'
import { Student, UserStatus } from '@types'
import { useEffect, useState } from 'react'
import { useNotification } from '@hooks'

type PendingStudentsProps = {
    studentId: number
    phoneNumber: string
    name: string
    email: string
    imageUrl: string
    student: Student
}

export const PendingStudents = ({
    studentId,
    phoneNumber,
    name,
    email,
    imageUrl,
    student,
}: PendingStudentsProps) => {
    const [studentStatus, setStudentStatus] = useState('')

    const { notification } = useNotification()

    const [pendingStudentsStatus, pendingStudentsStatusResult] =
        useUpdateSubAdminRtoStudentStatusMutation()

    useEffect(() => {
        if (pendingStudentsStatusResult.isSuccess) {
            if (studentStatus === UserStatus.Approved) {
                notification.success({
                    title: 'Student Approved',
                    description: 'Student Approved Successfully',
                })
            }
            if (studentStatus === UserStatus.Rejected) {
                notification.error({
                    title: 'Student Rejected',
                    description: 'Student Rejected Successfully',
                })
            }
        }
    }, [pendingStudentsStatusResult])

    return (
        <>
            <Card>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                        <Image
                            className="rounded-full w-7 h-7"
                            src={imageUrl || ' '}
                            alt={''}
                            width={50}
                            height={50}
                        />
                        <div>
                            <Typography variant={'muted'}>
                                {phoneNumber}
                            </Typography>
                            <Typography variant={'title'} color={'black'}>
                                {name}
                            </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                {email}
                            </Typography>
                        </div>
                    </div>
                    <Typography variant={'muted'} color={'gray'}>
                        {phoneNumber}
                    </Typography>
                    <div className="flex gap-x-2 items-center">
                        <ActionButton
                            onClick={() => {
                                setStudentStatus(UserStatus.Approved)
                                pendingStudentsStatus({
                                    id: studentId,
                                    status: UserStatus.Approved,
                                })
                            }}
                            variant={'success'}
                            loading={
                                pendingStudentsStatusResult.isLoading &&
                                studentStatus === UserStatus.Approved
                            }
                            disabled={pendingStudentsStatusResult.isLoading}
                        >
                            ACCEPT
                        </ActionButton>
                        <ActionButton
                            onClick={() => {
                                setStudentStatus(UserStatus.Rejected)
                                pendingStudentsStatus({
                                    id: studentId,
                                    status: UserStatus.Rejected,
                                })
                            }}
                            variant={'error'}
                            loading={
                                pendingStudentsStatusResult.isLoading &&
                                studentStatus === UserStatus.Rejected
                            }
                            disabled={pendingStudentsStatusResult.isLoading}
                        >
                            Reject
                        </ActionButton>
                    </div>
                </div>
            </Card>
        </>
    )
}
