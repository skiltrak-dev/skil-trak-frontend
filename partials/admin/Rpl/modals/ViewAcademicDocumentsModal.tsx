import {
    GlobalModal,
    Typography,
    VideoPlayModal,
    VideoPreview,
} from '@components'
import { DocumentView } from '@partials/sub-admin'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'

export const ViewAcademicDocumentsModal = ({
    onCancel,
    financialEvidence,
}: {
    onCancel: () => void
    financialEvidence: any
}) => {
    const [selectedDocument, setSelectedDocument] = useState<any>(null)

    useEffect(() => {
        if (financialEvidence && financialEvidence?.length > 0) {
            setSelectedDocument(financialEvidence?.[0])
        }
    }, [financialEvidence])

    const fileView = (file: string) => {
        const extension = file?.split('.')?.reverse()[0]
        if (
            ['jpg', 'jpeg', 'png', 'jfif', 'heiv', 'JPG', 'webp'].includes(
                extension?.toLowerCase()
            )
        ) {
            return (
                <div className="max-w-[650px] relative">
                    <Image
                        width={0}
                        height={0}
                        sizes="100vw 100vh"
                        src={file}
                        alt=""
                        className="w-full h-full"
                        blurDataURL={'/images/blur_image.png'}
                        placeholder="blur"
                    />
                </div>
            )
        } else if (['pdf', 'document'].includes(extension?.toLowerCase())) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            return <DocumentView file={file} />
        } else if (
            [
                'mp4',
                'mkv',
                'avi',
                'mpeg',
                'quicktime',
                'mov',
                'octet-stream',
            ].includes(extension?.toLowerCase())
        ) {
            return <VideoPreview url={file} />
        }
    }
    return (
        <GlobalModal>
            <div className="max-w-[600px] p-3">
                <div className="flex justify-between">
                    <Typography variant="label" semibold>
                        View Academic Documents
                    </Typography>
                    {onCancel && (
                        <MdCancel
                            onClick={onCancel}
                            className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                        />
                    )}
                </div>

                <div className="flex gap-x-2">
                    {financialEvidence?.map((f: any, i: number) => (
                        <div
                            className={`p-2 min-w-5 border rounded-md cursor-pointer ${
                                selectedDocument === f ? 'bg-gray-100' : ''
                            }`}
                            onClick={() => {
                                setSelectedDocument(f)
                            }}
                        >
                            <Typography variant="small" semibold>
                                Document {i + 1}
                            </Typography>
                        </div>
                    ))}
                </div>

                <div className="mt-3">
                    {selectedDocument ? fileView(selectedDocument) : null}
                </div>
            </div>
        </GlobalModal>
    )
}
