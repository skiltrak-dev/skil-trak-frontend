import {
    Button,
    Card,
    Checkbox,
    Select,
    TextArea,
    TextInput,
} from '@components'
import { FileUpload } from '@hoc'
import { Attachment } from '@partials/common/Notifications'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ActiveRtos, ActiveIndustries, ActiveStudents, BulkEmailCard } from './components'
import { AuthApi, CommonApi } from '@queries'
type Props = {}

const selectUser = [
    {
        text: 'Student',
        icon: '/images/icons/students.png',
    },
    {
        text: 'RTO',
        icon: '/images/icons/rto.png',
    },
    {
        text: 'Industry',
        icon: '/images/icons/industry.png',
    },
]
export const EmailBulk = (props: Props) => {
    const [selectedUser, setSelectedUser] = useState<any | null>({
        sendTo: 'Student',
    })
    const [selectedStudent, setSelectedStudent] = useState<any | null>('All Students')

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
                                }}
                            />
                        ))}
                    </div>
                    {selectedUser?.sendTo === 'Student' ? (
                        <ActiveStudents
                            setSelectedStudent={setSelectedStudent}
                            setSelectedUser={setSelectedUser}
                            selectedUser={selectedUser}
                            selectedStudent={selectedStudent}
                        />
                    ) : selectedUser?.sendTo === 'RTO' ? (
                        <ActiveRtos />
                    ) : (<ActiveIndustries />)}

                </Card>
            </div>

        </>
    )
}
