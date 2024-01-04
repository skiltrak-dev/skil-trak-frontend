import { FileViewModal, PdfViewModal, VideoPlayModal } from '@components'
import Image from 'next/image'
import React, { ReactElement, useState } from 'react'

export const DocumentsView = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [viewedPendingIndustriesModal, setViewedPendingIndustriesModal] =
        useState<number>(0)

    const onModalCancel = () => {
        setModal(null)
    }

    const getImageViewModal = (file: any) => {
        return (
            <FileViewModal
                title=""
                subtitle=""
                url={file?.file}
                onCancelButtonClick={onModalCancel}
            >
                <div className="max-w-[650px] relative">
                    <Image
                        width={0}
                        height={0}
                        sizes="100vw 100vh"
                        src={file?.file}
                        alt=""
                        className="w-full h-full"
                        blurDataURL={'/images/blur_image.png'}
                        placeholder="blur"
                    />
                </div>
            </FileViewModal>
        )
    }

    const onFileClicked = (file: any) => {
        // setSelected(file)

        if (
            ['jpg', 'jpeg', 'png', 'jfif', 'heiv', 'JPG', 'webp'].includes(
                file?.extension?.toLowerCase()
            )
        ) {
            setModal(getImageViewModal(file))
        } else if (
            ['pdf', 'document'].includes(file?.extension?.toLowerCase())
        ) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = `${file?.file}`
            setModal(
                <PdfViewModal
                    url={url}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                    extension={file?.extension}
                />
            )
        } else if (
            [
                'mp4',
                'mkv',
                'avi',
                'mpeg',
                'quicktime',
                'mov',
                'octet-stream',
            ].includes(file?.extension?.toLowerCase())
        ) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            setModal(
                <VideoPlayModal
                    // url={url}
                    url={file?.file}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                />
            )
        }
    }
    return {
        onFileClicked,
        documentsViewModal: modal,
        viewedPendingIndustriesModal,
        setViewedPendingIndustriesModal,
    }
}
