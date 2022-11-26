import { useState } from 'react'
import moment from 'moment'

// Icons
import { TiArrowBack } from 'react-icons/ti'
import { RiShareForwardFill } from 'react-icons/ri'
import { BiCheckDouble, BiDotsVerticalRounded } from 'react-icons/bi'

// components
import { Typography } from 'components/Typography'

// functions
import { AuthUtils } from '@utils'
// import { useMessage } from 'hooks'
import { MdAvTimer } from 'react-icons/md'

// functions
import { elipiciseText, userStatus } from '@utils'

export const Mail = ({ message, sender, index }: any) => {
    const [showOptions, setShowOptions] = useState(false)
    // const { setReplyMessage } = useMessage()
    const replyIconClasses =
        'hidden transition-all group-hover:block cursor-pointer'

    // const sender = AuthUtils.getUserCredentials()?.id === message?.sender?.id;

    const checkMessageStatus = () => {
        switch (message.status) {
            case userStatus.PENDING:
                return <MdAvTimer title={userStatus.PENDING} />
            case 'deliverd':
                return (
                    <BiCheckDouble
                        title="deliverd"
                        className={`${message.isSeen ? 'text-info' : ''}`}
                    />
                )
            default:
                return
        }
    }

    const myMessages =
        AuthUtils.getUserCredentials()?.id === message?.sender?.id

    return (
        <div
            id={message?.id}
            className={`flex gap-x-2 ${sender ? 'flex-row-reverse' : ''} group`}
        >
            <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src={`https://placeimg.com/100/${100 + index}/any`}
                alt=""
            />
            <div
                className={`flex items-center gap-x-2 ${
                    sender ? 'flex-row-reverse' : ''
                }`}
            >
                <div
                    className={`max-w-600 min-w-280  shadow-1 rounded-b-lg p-2 pt-1.5 flex flex-col justify-between ${
                        message.parent ? 'min-h-[105px]' : 'min-h-[77px]'
                    } ${
                        sender
                            ? 'bg-white rounded-tr-0 rounded-tl-lg'
                            : 'bg-[#FCD6A540] rounded-tl-0 rounded-tr-lg'
                    }`}
                >
                    {message?.parent && (
                        <div className={`bg-[#00000009] p-1.5 mb-1`}>
                            <Typography variant={'muted'} color={'grayLight'}>
                                <span className="italic">
                                    {elipiciseText(
                                        message?.parent?.message,
                                        350
                                    )}
                                </span>
                            </Typography>
                        </div>
                    )}
                    <div
                        className={`flex justify-between items-start gap-x-2 ${
                            message?.parent ? 'mb-3' : ''
                        }`}
                    >
                        <div>
                            <Typography variant={'muted'}>
                                {message?.subject || 'Message Subject'}
                            </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                {myMessages ? 'You' : message?.sender?.name}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant={'badge'} color={'grayLight'}>
                                {/* Jul 15, 2022 10:55am */}
                                {/* {moment(message.createdAt).format('LLL')} */}
                                {moment(
                                    message.createdAt,
                                    'YYYY-MM-DD hh:mm:ss Z'
                                ).format('MMM DD, YYYY hh:mm a')}
                            </Typography>
                            {message.status === userStatus.PENDING && (
                                <div className="relative hidden group-hover:block">
                                    {/* reactions */}
                                    <BiDotsVerticalRounded
                                        onClick={() =>
                                            setShowOptions(!showOptions)
                                        }
                                        className=" hover:bg-[#00000020] rounded-full p-0.5 cursor-pointer absolute right-0 z-20"
                                    />
                                    {showOptions && (
                                        <div
                                            onClick={() =>
                                                setShowOptions(false)
                                            }
                                            className="cursor-pointer absolute z-10 bg-secondary rounded-md border border-gray-300 w-40 right-0 top-3 flex flex-col gap-y-1 py-2.5 p-1.5"
                                        >
                                            <Typography
                                                variant={'muted'}
                                                color={'gray'}
                                            >
                                                Resend Message
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between gap-x-2 relative">
                        <Typography variant={'small'}>
                            <span className="break-all block mr-6">
                                {message?.message}
                            </span>
                        </Typography>

                        {/* show message status icons */}
                        {sender && (
                            <span className="absolute bottom-0 right-0 z-0">
                                {checkMessageStatus()}
                            </span>
                        )}
                    </div>
                </div>
                <div
                    onClick={() => {
                        // setReplyMessage({
                        //     id: message?.id,
                        //     message: message.message,
                        // })
                    }}
                >
                    {sender ? (
                        <RiShareForwardFill className={replyIconClasses} />
                    ) : (
                        <TiArrowBack className={replyIconClasses} />
                    )}
                </div>
            </div>
        </div>
    )
}
