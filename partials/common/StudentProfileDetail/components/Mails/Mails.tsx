import { EmptyData, LoadingAnimation, Mail, TechnicalError } from '@components'
import { CommonApi } from '@queries'
import { User } from '@types'
import { ReactElement, useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { ComposeMailModal } from '../../modals'

export const Mails = ({ user }: { user: User }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isEntered, setIsEntered] = useState<boolean>(false)

    const messages = CommonApi.Messages.useMessages(
        {
            id: user?.id,
        },
        {
            skip: !user?.id || !isEntered,
            refetchOnMountOrArgChange: 20,
        }
    )

    const onCancelClicked = () => setModal(null)

    const onComposeMail = () => {
        setModal(
            <ComposeMailModal userId={user?.id} onCancel={onCancelClicked} />
        )
    }
    return (
        <Waypoint
            onEnter={() => {
                setIsEntered(true)
            }}
            onLeave={() => {
                setIsEntered(false)
            }}
        >
            <div className="h-full">
                {modal}

                <div
                    className={`w-full bg-gray-50 rounded-lg p-4 h-full overflow-auto custom-scrollbar`}
                >
                    {messages.isError && <TechnicalError />}
                    <div className={`flex flex-col gap-y-2.5 h-full `}>
                        {messages?.isLoading || messages?.isFetching ? (
                            <div className="flex justify-center items-center h-full">
                                <LoadingAnimation />
                            </div>
                        ) : messages?.data && messages?.data?.length > 0 ? (
                            messages?.data?.map(
                                (message: any, i: number) =>
                                    message && (
                                        <Mail
                                            key={i}
                                            sender={
                                                message?.sender?.role ===
                                                'admin'
                                            }
                                            message={message}
                                            index={i}
                                        />
                                    )
                            )
                        ) : (
                            messages.isSuccess && (
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
                {/* </Card> */}
            </div>
        </Waypoint>
    )
}
