import { ActionButton, Button } from '@components'
import { DocumentsView } from '@hooks'
import { Folder, Rto } from '@types'
import { EsignDocumentStatus } from '@utils'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { CancelInitiateSign, InitiateSigningModal } from '../modal'
import { CheckAgreementSignedStatus } from './CheckAgreementSignedStatus'

export const ViewInitiatedSign = ({
    document,
    courseId,
    rto,
    filteredFiles,
    folder,
    onEsignRefetch,
    fileDeleteAction,
}: {
    onEsignRefetch: () => void
    filteredFiles?: any
    fileDeleteAction?: any
    document: any
    courseId: number
    rto: Rto
    folder: Folder
}) => {
    const [modal, setModal] = useState<any>(null)

    const [selectedDocument, setSelectedDocument] = useState<any>(null)

    const { onFileClicked, documentsViewModal } = DocumentsView()

    useEffect(() => {
        if (document && document?.length > 0) {
            setSelectedDocument(document?.[0])
        } else {
            setSelectedDocument(null)
        }
    }, [document])

    const onModalCancel = () => {
        onEsignRefetch()
        setModal(null)
    }

    const onInitiateSigning = () => {
        setModal(
            <InitiateSigningModal
                onCancel={() => {
                    onModalCancel()
                }}
                courseId={courseId}
                rto={rto}
                folder={folder}
            />
        )
    }

    const onCancelInitiateSignClicked = () => {
        setModal(
            <CancelInitiateSign
                onCancel={onModalCancel}
                eSign={selectedDocument}
            />
        )
    }

    const getIndex = document?.findIndex(
        (ch: any) => ch?.id === Number(selectedDocument?.id)
    )

    const nextData =
        document && document?.length > 0 && document?.[getIndex + 1]
    const prevData =
        document && document?.length > 0 && document?.[getIndex - 1]

    return (
        <>
            {modal}
            {documentsViewModal}
            {/* {filteredFiles && filteredFiles?.length > 0 && (
                <div className="p-2 flex flex-wrap gap-x-2 gap-y-2 items-end  overflow-hidden">
                    {filteredFiles?.map((file: any, i: number) => (
                        <AssessmentFolderFileCard
                            key={file?.id}
                            file={file}
                            index={i}
                            filename={file?.filename}
                            fileUrl={file?.file}
                            type={file?.type}
                            selected={selected?.id === file?.id}
                            onClick={onFileClicked}
                            deleteAction={fileDeleteAction}
                        />
                    ))}
                </div>
            )} */}
            <div className="flex items-center justify-between gap-x-3">
                <div className="flex items-center gap-x-2 px-4 pt-2">
                    <ActionButton
                        onClick={() => {
                            onInitiateSigning()
                        }}
                        variant="info"
                    >
                        Initiate Another Signing
                    </ActionButton>
                    {selectedDocument?.status !==
                        EsignDocumentStatus.SIGNED && (
                        <div className="flex">
                            <Button
                                text="Cancel Sign"
                                onClick={() => onCancelInitiateSignClicked()}
                            />
                        </div>
                    )}
                </div>
                {document?.length > 0 && (
                    <div className="flex items-center gap-x-3 text-xs font-semibold mt-3 px-3">
                        <button
                            className={`flex items-center gap-x-1 text-gray-500 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
                            onClick={() => setSelectedDocument(prevData)}
                            disabled={!prevData}
                        >
                            <FaChevronLeft />
                            Previous
                        </button>
                        <button
                            onClick={() => setSelectedDocument(nextData)}
                            disabled={!nextData}
                            className={`flex items-center gap-x-1 text-gray-500 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
                        >
                            Next
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
            <CheckAgreementSignedStatus
                document={selectedDocument}
                documentSigned={selectedDocument?.status}
            />
        </>
    )
}
