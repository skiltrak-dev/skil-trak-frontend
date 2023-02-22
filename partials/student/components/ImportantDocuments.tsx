import {
    FileViewModal,
    ImportantDocument,
    Modal,
    PdfViewModal,
    VideoPlayModal,
} from '@components'
import classNames from 'classnames'

// query
import { CommonApi } from '@queries'
import { ReactElement, useState } from 'react'

export const ImportantDocuments = ({ sidebar }: { sidebar?: boolean }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const documents = CommonApi.Documents.useList()

    const titleClasses = classNames({
        'mb-2': true,
        'text-xs font-medium text-gray-600': sidebar,
        'text-sm font-semibold': !sidebar,
    })

    const containerClasses = classNames({
        'grid grid-cols-2 gap-4 md:flex md:gap-x-4': !sidebar,
        'flex flex-col gap-y-2': sidebar,
    })

    const [selected, setSelected] = useState<any>(null)

    const onModalCancel = () => {
        setModal(null)
    }

    const onCancel = () => {
        setModal(null)
    }

    const getDocument = (docType: string) => {
        return documents?.data?.find(
            (document: any) => document?.docType === docType
        )
    }

    const onDocumentView = (docType: string) => {
        const document = getDocument(docType)
        const extension = document?.file?.split('.').reverse()[0]

        // const asasas = onFileClicked({
        //     file: document,
        //     extension,
        // })
        console.log('document', document)

        setModal(
            <Modal
                title=""
                subtitle=""
                onCancelClick={onCancel}
                onConfirmClick={onCancel}
            >
                {document?.fileType === 'file' ? (
                    ['jpg', 'jpeg', 'png'].includes(extension.toLowerCase()) ? (
                        <img
                            src={document?.file}
                            alt=""
                            className="max-w-lg max-h-[500px] object-cover"
                        />
                    ) : ['mp4', 'mkv', 'avi', 'mpeg'].includes(
                          extension.toLowerCase()
                      ) ? (
                        <VideoPlayModal
                            url={document?.file}
                            onCancelButtonClick={onCancel}
                        />
                    ) : ['pdf'].includes(extension.toLowerCase()) ? (
                        <PdfViewModal
                            url={document?.file}
                            onCancelButtonClick={onModalCancel}
                        />
                    ) : null
                ) : (
                    <div
                        dangerouslySetInnerHTML={{ __html: document?.content }}
                    />
                )}
            </Modal>
        )
    }
    return (
        <div>
            {modal}
            <p className={titleClasses}>Important Documents</p>
            <div className={containerClasses}>
                <ImportantDocument
                    imageUrl={'/images/documents/workflow.webp'}
                    title={'Work Flow'}
                    detail={sidebar}
                    onClick={() => {
                        onDocumentView('workflow')
                    }}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/requirements.webp'}
                    title={'Course Requirement'}
                    detail={sidebar}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/induction.webp'}
                    title={'Induction Process'}
                    detail={sidebar}
                    onClick={() => {
                        onDocumentView('inductionProcess')
                    }}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/placement.webp'}
                    title={'Placement Info'}
                    detail={sidebar}
                    onClick={() => {
                        onDocumentView('placementInfo')
                    }}
                />

                <ImportantDocument
                    imageUrl={'/images/documents/legal.webp'}
                    title={'Legal'}
                    detail={sidebar}
                    onClick={() => {
                        onDocumentView('legal')
                    }}
                />
            </div>
        </div>
    )
}
