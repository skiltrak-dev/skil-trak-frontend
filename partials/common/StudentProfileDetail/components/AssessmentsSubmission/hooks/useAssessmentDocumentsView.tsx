import { FileViewModal, VideoPlayModal } from '@components'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import { PdfDocumentView } from '../components'
import { EditPdfModal } from '../modals'

export const useAssessmentDocumentsView = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const onCancelClicked = () => setModal(null)

    const onModalCancel = (file?: boolean) => {
        if (file) {
            setModal(<EditPdfModal onCancel={onCancelClicked} file={file} />)
        } else {
            onCancelClicked()
        }
    }

    const getImageViewModal = (file: any) => {
        return (
            <FileViewModal
                title=""
                subtitle=""
                url={file?.file}
                onCancelButtonClick={() => {
                    onModalCancel()
                }}
            >
                <div className="max-w-[650px] relative p-4">
                    <Image
                        width={0}
                        height={0}
                        sizes="100vw 100vh"
                        src={file?.file}
                        alt=""
                        className="w-full h-full rounded-lg"
                        blurDataURL={'/images/blur_image.png'}
                        placeholder="blur"
                    />
                </div>
            </FileViewModal>
        )
    }

    const onFileClicked = (file: any) => {
        if (
            [
                'jpg',
                'jpeg',
                'png',
                'jfif',
                'heiv',
                'JPG',
                'webp',
                'heic',
            ].includes(file?.extension?.toLowerCase())
        ) {
            setModal(getImageViewModal(file))
        } else if (
            ['pdf', 'document', 'msword'].includes(
                file?.extension?.toLowerCase()
            )
        ) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = `${file?.file}`
            setModal(
                <PdfDocumentView
                    url={url}
                    file={file}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                    extension={file?.extension}
                    filename={file?.filename}
                    showEdit={file?.showEdit}
                    showDownload={file?.showDownload}
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
                    onCancelButtonClick={() => {
                        onModalCancel()
                    }}
                />
            )
        }
    }
    return {
        onFileClicked,
        documentsViewModal: modal,
    }
}
