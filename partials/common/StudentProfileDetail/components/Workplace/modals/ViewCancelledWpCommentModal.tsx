import { MdCancel } from 'react-icons/md'
import { CiStickyNote } from 'react-icons/ci'
import { GlobalModal, Typography } from '@components'

export const ViewCancelledWpCommentModal = ({
    comment,
    onCancel,
}: {
    comment: any
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="lg:px-32">
                    <div className="flex flex-col gap-y-3.5 justify-between items-center">
                        <CiStickyNote size={60} className="text-gray-500" />
                        <div className="mx-auto ">
                            <Typography
                                center
                                semibold
                                variant="h4"
                                color={'text-gray-700'}
                            >
                                Cancelled Workplace Note
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                {comment?.comment}
                            </span>
                        </Typography>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
