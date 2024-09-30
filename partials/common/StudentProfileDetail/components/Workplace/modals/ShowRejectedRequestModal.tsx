import { GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'
import { PiWarningOctagonThin } from 'react-icons/pi'

export const ShowRejectedRequestModal = ({
    content,
    onCancel,
}: {
    content: string
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-10">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="flex flex-col gap-y-2 justify-between items-center">
                    <PiWarningOctagonThin className="text-primary text-8xl" />
                    <div className="mx-auto">
                        <Typography variant="label" block center semibold>
                            Reason added by Student
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography center>
                        <span className="text-[15px] leading-4 text-center">
                            {content}
                        </span>
                    </Typography>
                </div>
            </div>
        </GlobalModal>
    )
}
