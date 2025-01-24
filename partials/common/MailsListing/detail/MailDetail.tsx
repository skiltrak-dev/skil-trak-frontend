import {
    Button,
    draftToHtmlText,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { TitleAndDate } from './TitleAndDate'
import { DetailMailTopbar } from './DetailMailTopbar'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { HiChevronDown, HiChevronUp, HiOutlineReply } from 'react-icons/hi'
import { ComposeMail } from '../tabs'

export const MailDetail = () => {
    const [isReply, setIsReply] = useState(false)
    const [isComposeMail, setIsComposeMail] = useState<boolean>(false)
    const [isRepliesExpanded, setIsRepliesExpanded] = useState<boolean>(false)

    const router = useRouter()

    const onCancelComposeMail = useCallback(() => {
        setIsComposeMail(false)
    }, [])

    const mailDetail = CommonApi.Messages.useMailDetail(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )
    const [isSeen] = CommonApi.Messages.useIsSeen()

    useEffect(() => {
        if (router?.query?.id && !mailDetail?.data?.isSeen) {
            isSeen(router?.query?.id)
        }
    }, [router?.query, mailDetail?.data])

    const onReplySubmit = (values: any) => {
        const reply = draftToHtmlText(values?.reply)
        setIsReply(false)
    }
    const toggleRepliesExpansion = () => {
        setIsRepliesExpanded(!isRepliesExpanded)
    }
    console.log('mailDetail?.data', mailDetail?.data)
    return (
        <div>
            {mailDetail.isError ? <TechnicalError /> : null}
            {mailDetail?.isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : mailDetail?.data ? (
                <div className="relative">
                    <DetailMailTopbar mailDetail={mailDetail?.data} />
                    <TitleAndDate mailDetail={mailDetail?.data} />
                    <div className="p-5 bg-gray-100 border border-gray-400 border-dashed rounded-xl shadow-xl">
                        <div
                            className="text-sm"
                            dangerouslySetInnerHTML={{
                                __html: mailDetail?.data?.message,
                            }}
                        />
                    </div>

                    {/* Replies Accordion */}
                    {mailDetail?.data?.replies &&
                        mailDetail.data.replies.length > 0 && (
                            <div className="border border-gray-200 rounded-lg">
                                {/* Accordion Header */}
                                <div
                                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                                    onClick={toggleRepliesExpansion}
                                >
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        Replies (
                                        {mailDetail.data.replies.length})
                                    </h3>
                                    {isRepliesExpanded ? (
                                        <HiChevronUp className="text-gray-600 w-6 h-6" />
                                    ) : (
                                        <HiChevronDown className="text-gray-600 w-6 h-6" />
                                    )}
                                </div>

                                {/* Replies Content */}
                                {isRepliesExpanded && (
                                    <div className="space-y-4 p-4 border-t">
                                        {mailDetail.data.replies.map(
                                            (reply: any) => (
                                                <div
                                                    key={reply.id}
                                                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center">
                                                            <span className="font-medium text-gray-800">
                                                                {reply.sender
                                                                    ?.name ||
                                                                    reply.sender
                                                                        ?.email ||
                                                                    'Unknown Sender'}
                                                            </span>
                                                            <span className="text-gray-500 text-sm ml-2">
                                                                {/* {formatDistance(new Date(reply.createdAt), new Date(), { addSuffix: true })} */}
                                                            </span>
                                                        </div>
                                                        <span
                                                            className={`
                                                    px-2 py-1 rounded-full text-xs font-medium
                                                    ${
                                                        reply.status ===
                                                        'delivered'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }
                                                `}
                                                        >
                                                            {reply.status}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="text-sm text-gray-600"
                                                        dangerouslySetInnerHTML={{
                                                            __html: reply.message,
                                                        }}
                                                    />
                                                    {reply.attachments &&
                                                        reply.attachments
                                                            .length > 0 && (
                                                            <div className="mt-2 text-sm text-gray-500">
                                                                Attachments:{' '}
                                                                {
                                                                    reply
                                                                        .attachments
                                                                        .length
                                                                }
                                                            </div>
                                                        )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                    {!isReply ? (
                        <div className="mt-5 flex justify-end ml-auto">
                            <Button
                                rounded
                                text={'Reply'}
                                variant="dark"
                                Icon={HiOutlineReply}
                                onClick={() => {
                                    setIsComposeMail(!isComposeMail)
                                }}
                            />
                        </div>
                    ) : null}

                    {/* {isReply ? (
                        <div>
                            <ReplyEmailForm
                                onSubmit={onReplySubmit}
                                result={{}}
                            />
                        </div>
                    ) : null} */}
                    <div
                        className={`fixed bottom-0 right-20 z-[333]  ${
                            isComposeMail ? 'block' : 'hidden'
                        }`}
                    >
                        <ComposeMail
                            onCancelComposeMail={onCancelComposeMail}
                            senderEmail={mailDetail?.data?.sender?.email}
                            parentId={mailDetail?.data?.id}
                        />
                    </div>
                </div>
            ) : mailDetail?.isSuccess ? (
                <EmptyData />
            ) : null}
        </div>
    )
}
