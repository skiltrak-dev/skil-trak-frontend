// components
import {
    EmptyData,
    LoadingAnimation,
    Mail,
    MailForm,
    TechnicalError,
} from '@components'

// query
// query
import { CommonApi, useSendIndustryMessageMutation } from '@queries'

// hooks
// import { useMessage } from 'hooks'

export const MailsTab = ({ user }: { user: any }) => {
    const messages = CommonApi.Messages.useMessages(
        {
            id: user?.id,
        },
        {
            skip: !user?.id,
        }
    )

    return (
        <div
            className={`flex flex-col md:flex-row gap-y-4 md:gap-x-2.5 w-full mt-4 mb-32`}
        >
            <div className={`w-full bg-gray-50 rounded-lg p-2`}>
                {messages.isError && <TechnicalError />}
                <div className={`flex flex-col gap-y-2.5 h-full `}>
                    {messages?.isLoading || messages?.isFetching ? (
                        <div className="flex justify-center items-center h-full">
                            <LoadingAnimation />
                        </div>
                    ) : !messages.isError && messages?.data?.length > 0 ? (
                        messages?.data?.map(
                            (message: any, i: number) =>
                                message && (
                                    <Mail
                                        key={i}
                                        sender={
                                            message?.sender?.role === 'admin'
                                        }
                                        message={message}
                                        index={i}
                                    />
                                )
                        )
                    ) : (
                        !messages.isError && (
                            <EmptyData
                                imageUrl="/images/icons/common/mails.png"
                                title={'No Mails'}
                                description={
                                    'You have not sent/received any mail yet'
                                }
                                height={'40vh'}
                            />
                        )
                    )}
                </div>
            </div>
            <div className={`md:w-2/5 w-full`}>
                <MailForm
                    action={useSendIndustryMessageMutation}
                    receiverId={Number(user?.id)}
                    sender={'admin'}
                />
            </div>
        </div>
    )
}
