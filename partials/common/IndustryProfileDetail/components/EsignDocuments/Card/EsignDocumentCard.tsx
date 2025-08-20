import { DocumentsView } from '@hooks'
import { IoMdDocument } from 'react-icons/io'

export const EsignDocumentCard = ({ document }: { document: any }) => {
    const { documentsViewModal, onFileClicked } = DocumentsView()

    let fileName = document ? document?.file?.split('\\') : ''
    if (fileName?.length === 1) {
        fileName = document?.file?.split('/')

        if (fileName.length > 1) {
            fileName = fileName[fileName?.length - 1]
        }
    }

    const extension = fileName
        ?.replaceAll('{"', '')
        .replaceAll('"}', '')
        ?.split('.')
        .reverse()[0]

    return (
        <>
            {documentsViewModal}
            <div
                className={`w-full border rounded py-2 bg-blue-100`}
                onClick={() => {
                    onFileClicked &&
                        onFileClicked({
                            ...document,
                            file: document?.file
                                .replaceAll('{"', '')
                                .replaceAll('"}', ''),
                            extension,
                            type: 'all',
                        })
                }}
            >
                <div className="relative w-full h-20 flex flex-col gap-y-1.5">
                    <div className=" h-full flex justify-center items-center w-full text-gray-500">
                        <IoMdDocument className="text-5xl text-gray" />
                    </div>
                </div>
            </div>
        </>
    )
}
