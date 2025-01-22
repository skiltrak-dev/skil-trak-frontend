import { Typography, VideoPreview } from '@components'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import Image from 'next/image'
import React from 'react'
import { IoMdDocument } from 'react-icons/io'

type AssessmentFolderFileCardProps = {
    file?: any
    fileUrl: string
    filename: string
    type: string
    selected?: boolean
    onClick?: (file: any) => void
    index?: any
}

export const AssessmentFileCard = ({
    file,
    index,
    type,
    fileUrl,
    filename,
    selected,
    onClick,
}: AssessmentFolderFileCardProps) => {
    let fileName = file ? file?.file?.split('\\') : ''
    if (fileName?.length === 1) {
        fileName = file?.file?.split('/')

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
        <div>
            <div className="relative w-24 file-view-group cursor-pointer">
                <div
                    className={` basis-1/6 border rounded py-2 ${
                        selected ? 'bg-blue-200' : ''
                    }`}
                    onClick={() => {
                        onClick &&
                            onClick({
                                ...file,
                                file: file?.file
                                    .replaceAll('{"', '')
                                    .replaceAll('"}', ''),
                                extension,
                                type: type || 'all',
                            })
                    }}
                >
                    {fileUrl && (
                        <div className="relative w-full min-h-[40px] flex flex-col gap-y-1.5">
                            {/* Video Preview */}
                            {(type === 'video' ||
                                getDocType('video')?.includes(extension)) && (
                                // Preview Video
                                <div className="bg-black w-24 h-24 overflow-hidden">
                                    <div className="w-full h-full">
                                        <VideoPreview url={fileUrl} />
                                    </div>
                                </div>
                            )}
                            {/* PDF Preview */}
                            {(type === 'docs' ||
                                getDocType('docs')?.includes(extension)) && (
                                <div className=" h-full flex justify-center items-center w-full text-gray-500">
                                    <IoMdDocument className="text-5xl text-gray" />
                                </div>
                            )}
                            {/* Image Preview */}
                            {(type === 'images' ||
                                getDocType('images')?.includes(extension)) && (
                                // <div
                                //     className="w-full h-[80px] bg-center bg-no-repeat bg-cover rounded-sm"
                                //     style={{
                                //         backgroundImage: `url(${`${file.file}` || ''})`,
                                //     }}
                                // ></div>
                                <div className="w-full h-[80px] relative">
                                    <Image
                                        src={file.file}
                                        alt={filename || fileName}
                                        sizes="100vw"
                                        fill
                                        className="bg-cover"
                                    />
                                </div>
                            )}
                            {/* <Typography variant="body" center>
                        {filename
                            ? ellipsisText(filename?.split('_')[0], 11)
                            : ellipsisText(
                                  pathname?.split('/')?.slice(1)[0],
                                  7
                              )}
                    </Typography> */}
                            <div title={fileName}>
                                {/* <Typography variant="small" center>
                                {filename
                                    ? ellipsisText(filename?.split('_')[0], 11)
                                    : `${ellipsisText(
                                          fileName,
                                          5
                                      )}.${extension}`}
                            </Typography> */}

                                <Typography variant="small" center>
                                    {index + 1}
                                </Typography>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
