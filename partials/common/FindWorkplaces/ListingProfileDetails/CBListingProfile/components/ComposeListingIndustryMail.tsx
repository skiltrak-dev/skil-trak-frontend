import {
    ShowErrorNotifications,
    Typography,
    draftToHtmlText,
} from '@components'
import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { CommonApi } from '@queries'
import { AuthUtils } from '@utils'
import { values } from 'lodash'
import { useNotification } from '@hooks'
import { ComposeMailForm } from '@partials/common/MailsListing/tabs/MailsInbox/forms'
import { useRouter } from 'next/router'
import { ComposeListingIndustryMailForm } from './ComposeListingIndustryMailForm'

export const ComposeListingIndustryMail = ({
    onCancelComposeMail,
}: {
    onCancelComposeMail: () => void
}) => {
    const router = useRouter()
    const id = router.query?.id
    const [sendMessage, sendMessageResult] =
        CommonApi.FindWorkplace.useComposeListingIndustryMail()

    const { notification } = useNotification()

    const onSubmit = (values: any) => {
        const formData = new FormData()

        const { attachments, ...rest } = values
        Object.entries(rest)?.forEach(([key, value]: any) => {
            if (key === 'body') {
                const body = draftToHtmlText(value)
                formData.append(key, body)
            } else {
                formData.append(key, value)
            }
        })
        if (attachments && attachments?.length > 0) {
            attachments?.forEach((attched: File) => {
                formData.append('attachments', attched)
            })
        }

        // console.log('aaaaaa', formData)

        // sendMessage(formData).then((res: any) => {
        //     if (res?.data) {
        //         notification.success({
        //             title: 'Mail Sent',
        //             description: 'Mail Sent Successfully',
        //         })
        //         onCancelComposeMail()
        //     }
        // })
        if (id) {
            sendMessage({ id, body: formData }).then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Mail Sent',
                        description: 'Mail Sent Successfully',
                    })
                    onCancelComposeMail()
                }
            })
        }
    }
    // const onSubmit = (values: any) => {
    //     const { message, subject } = values
    //     const body = {
    //         subject: subject,
    //         body: draftToHtmlText(message),
    //         // type: 'email',
    //     }

    //     if (id) {
    //         sendMessage({ id: id, body: body }).then((res: any) => {
    //             if (res?.data) {
    //                 notification.success({
    //                     title: 'Mail Sent',
    //                     description: 'Mail Sent Successfully',
    //                 })
    //                 onCancelComposeMail()
    //             }
    //         })
    //     }
    // }
    return (
        <>
            <ShowErrorNotifications result={sendMessageResult} />
            <div className="w-full md:w-[531px] shadow-profiles">
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
                <div className="bg-white pb-4">
                    <ComposeListingIndustryMailForm
                        onSubmit={onSubmit}
                        result={sendMessageResult}
                    />
                </div>
            </div>
        </>
    )
}
