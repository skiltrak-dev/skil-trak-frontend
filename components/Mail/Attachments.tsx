import {
    FileViewModal,
    PdfViewModal,
    VideoPlayModal,
} from '@components/AssessmentEvidence'
import Image from 'next/image'
import React, { ReactElement, useState } from 'react'
import { IoMdDocument } from 'react-icons/io'
import { TbPlayerPlay } from 'react-icons/tb'

export const Attachments = ({ attachments }: { attachments: string[] }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [selected, setSelected] = useState<any>(null)

    const attachementsType = {
        images: ['*', 'jpeg', 'jpg', 'png', 'svg+xml', 'webp'],
        videos: [
            '*',
            'x-msvideo',
            'mp4',
            'mpeg',
            'quicktime',
            'ogg',
            'webm',
            '3gpp',
        ],
        documents: [
            '*',
            'msword',
            'vnd.openxmlformats-officedocument.wordprocessingml.document',
            'vnd.ms-excel',
            'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'pdf',
        ],
    }

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
        setSelected(file)

        if (attachementsType?.images?.includes(file.extension.toLowerCase())) {
            setModal(getImageViewModal(file))
        } else if (['pdf'].includes(file.extension.toLowerCase())) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = `${file?.file}`
            setModal(
                <PdfViewModal
                    url={url}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                />
            )
        } else if (
            ['mp4', 'mkv', 'avi', 'mpeg'].includes(file.extension.toLowerCase())
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
    return (
        <>
            {modal}
            <div className="flex items-center flex-wrap gap-x-1 pr-5">
                {attachments?.map((attached: string) => {
                    const fileType = attached?.split('.')?.reverse()[0]
                    if (attachementsType?.images?.includes(fileType)) {
                        return (
                            <div
                                key={attached}
                                className={`relative w-20 h-20  border rounded cursor-pointer ${
                                    selected?.file === attached
                                        ? 'bg-blue-200'
                                        : ''
                                }`}
                                onClick={() => {
                                    onFileClicked({
                                        file: attached,
                                        extension: fileType,
                                    })
                                }}
                            >
                                <Image
                                    fill
                                    src={attached}
                                    alt={attached}
                                    className="w-full h-full object-cover p-1"
                                />
                            </div>
                        )
                    }
                    if (attachementsType?.documents?.includes(fileType)) {
                        return (
                            <div
                                key={attached}
                                className="relative w-20 h-20 flex items-center justify-center border rounded cursor-pointer"
                                onClick={() => {
                                    onFileClicked({
                                        file: attached,
                                        extension: fileType,
                                    })
                                }}
                            >
                                <IoMdDocument className="text-5xl text-gray-500" />
                            </div>
                        )
                    }
                    if (attachementsType?.videos?.includes(fileType)) {
                        return (
                            <div
                                key={attached}
                                className="relative w-20 h-20 flex items-center justify-center border rounded cursor-pointer bg-black"
                                onClick={() => {
                                    onFileClicked({
                                        file: attached,
                                        extension: fileType,
                                    })
                                }}
                            >
                                <TbPlayerPlay className="text-5xl text-gray-500" />
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}
