// Icons
import { MdCancel } from 'react-icons/md'

// components
import { ReactNode } from 'react'

interface FileViewModalProps {
    title: string
    subtitle: string
    children: ReactNode
    loading?: boolean
    onCancelButtonClick?: () => void
    url: string
}

export const FileViewModal = ({
    children,
    title,
    subtitle,
    loading,
    url,
    onCancelButtonClick,
}: FileViewModalProps) => {
    return (
        <div className="bg-[#00000050] w-full h-screen flex items-start justify-center fixed top-0 left-0 z-40 overflow-scroll py-16">
            <div className="bg-white rounded-2xl flex flex-col justify-between shadow-md min-w-[450px] overflow-hidden">
                <div className="px-2 py-1 flex justify-between items-center">
                    {/* <div>
                        <Typography variant={'title'}>{title}</Typography>
                        <Typography variant={'subtitle'} color={'text-muted'}>
                            {subtitle}
                        </Typography>
                    </div> */}
                    <div>
                        <a
                            href={url}
                            className="text-sm font-semibold text-info"
                        >
                            Download
                        </a>
                    </div>
                    <MdCancel
                        onClick={onCancelButtonClick}
                        className="transition-all duration-300 text-gray-400 hover:text-black text-2xl cursor-pointer"
                    />
                </div>

                <div className="">{children}</div>

                {/* <div className="flex justify-end items-end gap-x-4 px-4 py-2">
                    <Button variant={'secondary'} onClick={onCancelButtonClick}>
                        {'Cancel'}
                    </Button>
                </div> */}
            </div>
        </div>
    )
}
