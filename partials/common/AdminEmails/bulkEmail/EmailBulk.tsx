import { Card } from '@components'
import { useEffect, useState } from 'react'
import {
    ActiveIndustries,
    ActiveRtos,
    ActiveStudents,
    BulkEmailCard,
} from './components'
import { useRouter } from 'next/router'
import { getUserCredentials } from '@utils'
import { UserRoles } from '@constants'

enum SelectUserEnum {
    Student = 'Student',
    RTO = 'RTO',
    Industry = 'Industry',
}

const selectUser = [
    {
        text: SelectUserEnum.Student,
        icon: '/images/icons/students.png',
    },
    {
        text: SelectUserEnum.RTO,
        icon: '/images/icons/rto.png',
    },
    {
        text: SelectUserEnum.Industry,
        icon: '/images/icons/industry.png',
    },
]
export const EmailBulk = () => {
    const router = useRouter()
    const [selectedUser, setSelectedUser] = useState<any | null>({
        sendTo: SelectUserEnum.Student,
    })
    const [selectedStudent, setSelectedStudent] = useState<any | null>(
        'All Students'
    )

    useEffect(() => {
        router.query?.sendTo &&
            setSelectedUser({ sendTo: router.query?.sendTo })
    }, [router])

    const role = getUserCredentials()?.role

    return (
        <>
            <div className="p-4 w-full flex flex-col gap-y-4">
                <Card>
                    <div className="mb-2 flex justify-between items-center gap-x-3">
                        {selectUser.map(({ text, icon }: any) => (
                            <BulkEmailCard
                                key={text}
                                text={text}
                                icon={icon}
                                selected={selectedUser.sendTo}
                                onClick={() => {
                                    setSelectedUser({
                                        ...selectedUser,
                                        sendTo: text,
                                    })
                                    router.push({
                                        pathname:
                                            role === UserRoles.ADMIN
                                                ? '/portals/admin/bulk-email'
                                                : role === UserRoles.SUBADMIN
                                                ? '/portals/sub-admin/notifications/bulk-email'
                                                : '',
                                        query: { sendTo: text },
                                    })
                                }}
                            />
                        ))}
                    </div>
                    {selectedUser?.sendTo === SelectUserEnum.Student ? (
                        <ActiveStudents
                            setSelectedStudent={setSelectedStudent}
                            setSelectedUser={setSelectedUser}
                            selectedUser={selectedUser}
                            selectedStudent={selectedStudent}
                        />
                    ) : selectedUser?.sendTo === SelectUserEnum.RTO ? (
                        <ActiveRtos />
                    ) : (
                        <ActiveIndustries />
                    )}
                </Card>
            </div>
        </>
    )
}
