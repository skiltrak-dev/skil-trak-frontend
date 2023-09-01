import { FileViewModal, PdfViewModal, VideoPlayModal } from '@components'
import React, { ReactElement, useState } from 'react'

export const DocumentsView = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

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
                    <img src={file?.file} alt="" className="max-w-full" />
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
            ['mp4', 'mkv', 'avi', 'mpeg', 'quicktime', 'mov'].includes(
                file?.extension?.toLowerCase()
            )
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
    return { onFileClicked, documentsViewModal: modal }
}
