import { RtoMessage } from '@types'
import { MdClose } from 'react-icons/md'

export const MessageModal = ({
    message,
    onCancel,
}: {
    message: RtoMessage
    onCancel: () => void
}) => {
    return (
        <div className="fixed z-30 bg-black/25 backdrop-blur-sm w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="w-3/4 bg-white p-6 shadow-2xl rounded-2xl">
                <div className="flex justify-between items-start">
                    <div className="mb-4">
                        <p className="text-sm text-gray-400 font-medium">
                            Message
                        </p>
                        <p className="text-sm font-semibold">
                            <span className="text-gray-700">
                                {message?.title}
                            </span>
                        </p>
                    </div>

                    <button
                        className="text-gray-400 text-2xl hover:text-gray-600"
                        onClick={() => onCancel()}
                    >
                        <MdClose />
                    </button>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: message?.message,
                    }}
                ></div>
            </div>
        </div>
    )
}
