import { CreateNote, GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'

export const AddNoteModal = ({
    userId,
    onCancel,
}: {
    userId: number
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="p-4 flex justify-between items-center">
                <Typography variant="label" semibold>
                    Notes
                </Typography>
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
            </div>
            <div className="max-h-[80vh] overflow-auto custom-scrollbar">
                <CreateNote receiverId={Number(userId)} onCancel={onCancel} />
            </div>
        </GlobalModal>
    )
}
