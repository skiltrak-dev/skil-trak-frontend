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
import { useNotification } from '@hooks'
import { ellipsisText } from '@utils'

export const ImportantDocuments = ({
    sidebar,
    coureseRequirementsLink,
}: {
    coureseRequirementsLink: string
    sidebar?: boolean
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

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

        if (document) {
            setModal(
                <Modal
                    title=""
                    subtitle=""
                    onCancelClick={onCancel}
                    onConfirmClick={onCancel}
                >
                    {document?.fileType === 'file' ? (
                        ['jpg', 'jpeg', 'png'].includes(
                            extension.toLowerCase()
                        ) ? (
                            <img
                                src={document?.file}
                                alt=""
                                className="min-w-[650px] max-h-[500px] object-cover"
                            />
                        ) : ['mp4', 'mkv', 'avi', 'mpeg'].includes(
                              extension.toLowerCase()
                          ) ? (
                            <VideoPlayModal
                                downloadUrl={document?.file}
                                url={document?.file}
                                onCancelButtonClick={onCancel}
                            />
                        ) : ['pdf'].includes(extension.toLowerCase()) ? (
                            <PdfViewModal
                                downloadUrl={document?.file}
                                url={document?.file}
                                onCancelButtonClick={onModalCancel}
                            />
                        ) : null
                    ) : (
                        <div className="px-5 min-w-full md:min-w-[600px] max-w-4xl min-h-[40vh] max-h-[calc(100vh-250px)] overflow-auto custom-scrollbar">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: document?.content,
                                }}
                            />
                        </div>
                    )}
                </Modal>
            )
        } else {
            notification.error({
                title: 'No Document Provided',
                description: 'No Document provided from Admin',
            })
        }
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
                    href={coureseRequirementsLink}
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
