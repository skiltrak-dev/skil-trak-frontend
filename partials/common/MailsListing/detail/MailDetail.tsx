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
import { useEffect, useState } from 'react'
import { HiOutlineReply } from 'react-icons/hi'

export const MailDetail = () => {
    const router = useRouter()

    const [isReply, setIsReply] = useState(false)

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

    return (
        <div>
            {mailDetail.isError ? <TechnicalError /> : null}
            {mailDetail?.isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : mailDetail?.data ? (
                <div>
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

                    {!isReply ? (
                        <div className="mt-5 flex justify-end ml-auto">
                            <Button
                                rounded
                                text={'Reply'}
                                variant="dark"
                                Icon={HiOutlineReply}
                                onClick={() => {
                                    setIsReply(!isReply)
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
                </div>
            ) : mailDetail?.isSuccess ? (
                <EmptyData />
            ) : null}
        </div>
    )
}
