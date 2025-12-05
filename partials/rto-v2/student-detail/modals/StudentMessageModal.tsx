import {
    GlobalModal,
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { Student } from '@types'

import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { LiaTimesSolid } from 'react-icons/lia'
import { StudentMessageCard } from '../card'
import { RestrictSendMessageForm } from '../components'
import { MessageSendForm } from '../forms'

export const StudentMessageModal = ({
    onCancel,
    student,
}: {
    student: Student
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const studentMesagesList = SubAdminApi.Student.studentMessagesList(
        student?.user?.id,
        { skip: !student }
    )
    const [sendMessage, sendMessageResult] =
        SubAdminApi.Student.sendStudentMssage()

    const onSubmit = async (values: { message: string }) => {
        const res: any = await sendMessage({
            ...values,
            phoneNumber: student?.phone,
            recipient: student?.user?.id,
        })
        if (res?.data) {
            notification.success({
                title: 'Message Sent',
                description: 'Message Sent Successfully!',
            })
        }
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={sendMessageResult} />

            <div className="px-[25px] pt-[5px] pb-[15px] relative max-w-3xl xl:max-w-3xl md:min-w-[600px] lg:min-w-[700px] h-[95vh] lg:h-auto overflow-auto custom-scrollbar">
                <LiaTimesSolid
                    size={20}
                    onClick={onCancel}
                    className="absolute top-1 right-2 transition-all duration-500 text-gray-700 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />

                {studentMesagesList?.data &&
                studentMesagesList?.data?.length >= 3 ? (
                    <RestrictSendMessageForm />
                ) : (
                    <MessageSendForm
                        onSubmit={onSubmit}
                        result={sendMessageResult}
                    />
                )}

                {/*  */}
                <div className="mt-7 flex flex-col gap-y-2.5">
                    <Typography variant="small" medium>
                        Recent Messages
                    </Typography>
                    {studentMesagesList?.isError ? (
                        <NoData
                            text="There is some technical issue. try refresh your page!"
                            isError
                        />
                    ) : null}
                    {studentMesagesList?.isLoading ? (
                        <LoadingAnimation size={75} />
                    ) : studentMesagesList?.data &&
                      studentMesagesList?.data?.length > 0 ? (
                        <div className="flex flex-col gap-y-2.5 lg:h-52 xl:h-64 overflow-auto custom-scrollbar">
                            {studentMesagesList?.data?.map(
                                (studentMessage: any) => (
                                    <StudentMessageCard
                                        key={studentMessage?.id}
                                        studentMessage={studentMessage}
                                    />
                                )
                            )}
                        </div>
                    ) : studentMesagesList?.isSuccess ? (
                        <NoData text="There is no messages to show!" />
                    ) : null}
                </div>
            </div>
        </GlobalModal>
    )
}
