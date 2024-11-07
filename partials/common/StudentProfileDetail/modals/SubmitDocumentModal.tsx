import { Button, GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'
import { PiWarningCircleFill } from 'react-icons/pi'

export const SubmitDocumentModal = ({
    onCancel,
}: {
    onCancel: (isOpen?: boolean) => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-2xl p-10 relative flex flex-col gap-y-3 py-5">
                {onCancel ? (
                    <MdCancel
                        onClick={() => {
                            if (onCancel) {
                                onCancel()
                            }
                        }}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                    />
                ) : null}
                <div className="flex flex-col gap-y-2 justify-between items-center">
                    <PiWarningCircleFill className="text-error text-8xl" />
                    <div className="mx-auto">
                        <Typography center semibold variant="title">
                            Fill all the required fields before Submit E-Sign
                            Document
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography center>
                        <span className="text-[14px] leading-4 text-center">
                            Please complete all required fields before
                            submitting your e-signature. Make sure each section
                            is filled out accurately to avoid any delays in
                            processing.
                        </span>
                    </Typography>
                </div>
                <div className="flex items-center justify-center mt-3">
                    <Button
                        text="Open Document"
                        onClick={() => {
                            onCancel(true)
                        }}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
