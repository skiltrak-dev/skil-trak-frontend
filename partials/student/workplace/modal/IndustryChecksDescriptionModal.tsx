import { Folder } from '@types'
import { GlobalModal, Typography } from '@components'
import { MdClose } from 'react-icons/md'
import { IoIosHelpCircle, IoIosHelpCircleOutline } from 'react-icons/io'
import Link from 'next/link'

export const IndustryChecksDescriptionModal = ({
    folder,
    onCancel,
}: {
    folder: Folder
    onCancel: () => void
}) => {
    return (
        <GlobalModal className="!max-w-4xl ">
            <button
                className="text-gray-400 text-2xl hover:text-gray-600 absolute top-3 right-3"
                onClick={() => onCancel()}
            >
                <MdClose />
            </button>
            <div className="p-6 max-h-[70vh] overflow-auto">
                <div className="flex items-center justify-center">
                    <IoIosHelpCircleOutline
                        size={30}
                        className="text-blue-600"
                    />
                </div>
                <div className="flex justify-between items-start ">
                    <div className="mb-4">
                        <div className="flex items-center gap-x-2">
                            <p className="text-sm text-gray-400 font-semibold">
                                Description:
                            </p>
                        </div>
                        <p className="text-sm font-semibold">
                            <Typography variant="small" color="text-gray-700">
                                {folder?.description}
                            </Typography>
                        </p>

                        <div className="flex items-center gap-x-1 mt-2">
                            <Typography variant="label" semibold>
                                Link to apply:
                            </Typography>
                            <Link
                                href={folder?.link}
                                target="_blank"
                                className="text-sm text-info underline font-semibold"
                            >
                                {folder?.link}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
