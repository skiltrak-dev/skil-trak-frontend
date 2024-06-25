import { GlobalModal } from '@components'
import { AppointmentType } from '@types'
import { MdClose } from 'react-icons/md'

export const ViewQueriesMessageModal = ({
    message,
    subject,
    onCancel,
}: {
    subject: string
    message: string
    onCancel: Function
}) => {
    return (
        <GlobalModal>
            <div className="fixed z-30 bg-black/25 backdrop-blur-sm w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="w-3/5 bg-white p-6 shadow-2xl rounded-2xl">
                    <div className="flex justify-between items-start">
                        <div className="mb-4 mx-auto">
                            <p className="text-sm text-center text-gray-400 font-medium">
                                Subject
                            </p>
                            <p className="text-lg font-semibold text-center">
                                <span className="text-gray-700">{subject}</span>
                            </p>
                        </div>

                        <button
                            className="text-gray-400 text-2xl hover:text-gray-600"
                            onClick={() => onCancel()}
                        >
                            <MdClose />
                        </button>
                    </div>
                    <div className="border border-secondary-dark rounded-md p-4 max-h-[60vh] overflow-auto custom-scrollbar">
                        <div
                            className="text-sm text-gray-500"
                            dangerouslySetInnerHTML={{
                                __html: message,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
