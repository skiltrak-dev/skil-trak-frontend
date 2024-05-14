import Image from 'next/image'
import { VideoPreview } from '@components'
import { IoMdDocument } from 'react-icons/io'
import { getDocType } from '@components/sections/student/AssessmentsContainer'

type AssessmentFolderFileCardProps = {
    file?: any
    fileUrl: string
    filename: string
    type: string
    selected?: boolean
    onClick?: (file: any) => void
    index?: any
}

export const GalleryFileCard = ({
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
            <div className="relative w-full h-24 file-view-group cursor-pointer">
                <div
                    className={`border rounded h-full flex justify-center items-center ${
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
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
