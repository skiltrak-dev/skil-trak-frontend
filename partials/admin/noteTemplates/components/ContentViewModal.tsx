import { MdClose } from 'react-icons/md'
import { GlobalModal, Typography } from '@components'

export const ContentViewModal = ({
    type,
    content,
    onCancel,
}: {
    type: string
    content: string
    onCancel: Function
}) => {
    return (
        <GlobalModal>
            <div className="flex justify-between items-start p-6">
                <div className="mb-4">
                    <Typography variant="label" color="text-gray-400" medium>
                        Requirement File For {type} Content
                    </Typography>
                </div>

                <button
                    className="text-gray-400 text-2xl hover:text-gray-600"
                    onClick={() => onCancel()}
                >
                    <MdClose />
                </button>
            </div>
            <div className="max-h-[80vh] overflow-auto custom-scrollbar px-6 pb-2">
                <div
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                ></div>
            </div>
        </GlobalModal>
    )
}
