import {
    ShowErrorNotifications,
    Typography,
    draftToHtmlText,
} from '@components'
import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { ComposeMailForm } from '../forms'
import { CommonApi } from '@queries'
import { AuthUtils } from '@utils'
import { values } from 'lodash'
import { useNotification } from '@hooks'

export const ComposeMail = ({
    onCancelComposeMail,
}: {
    onCancelComposeMail: () => void
}) => {
    const [sendMessage, sendMessageResult] =
        CommonApi.Messages.sendCustomEmail()

    const { notification } = useNotification()

    const onSubmit = (values: any) => {
        console.log({ values })
        const formData = new FormData()

        const { attachment, ...rest } = values
        Object.entries(rest)?.forEach(([key, value]: any) => {
            if (key === 'message') {
                const message = draftToHtmlText(value)
                formData.append(key, message)
            } else {
                formData.append(key, value)
            }
        })

        attachment?.forEach((attched: File) => {
            formData.append('attachment', attched)
        })
        formData.append('type', 'email')

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`)
        })

        sendMessage(formData).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Mail Sent',
                    description: 'Mail Sent Successfully',
                })
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={sendMessageResult} />
            <div className="w-full md:w-[531px] shadow-profiles pb-4">
                <div className="bg-[#FD7A7C] px-4 py-2.5 flex items-center justify-between rounded-t-lg">
                    <Typography variant="label" color="text-white" bold>
                        New Mail
                    </Typography>
                    <LiaTimesSolid
                        className="text-white cursor-pointer"
                        onClick={() => {
                            onCancelComposeMail()
                        }}
                    />
                </div>

                {/*  */}
                <div className="bg-white">
                    <ComposeMailForm
                        onSubmit={onSubmit}
                        result={sendMessageResult}
                    />
                </div>
            </div>
        </>
    )
}
