import { FileMimeTypes } from '@components/inputs'
import { PdfViewer } from '@components/PdfViewer'
import { Typography } from '@components/Typography'
import { VideoPreview } from '@components/VideoPreview'
import { ellipsisText, FileFormat } from '@utils'
import Image from 'next/image'
import { IoMdDocument } from 'react-icons/io'
import { getDocType } from '../../AssessmentFolderDetailX'

type AssessmentFolderFileCardProps = {
    fileUrl: string
    filename: string
    type: string
}

export const AssessmentFolderFileCard = ({
    type,
    fileUrl,
    filename,
}: AssessmentFolderFileCardProps) => {
    const file = fileUrl.split('\\').join('/')

    const filePathSplit = fileUrl.split('/')
    const fileName = filePathSplit[filePathSplit.length - 1]

    const pathname = new URL(file).pathname
    const extention = file
        ?.split('/')
        ?.reverse()
        ?.filter((f) => f !== '')[0]
        ?.split('.')
        .reverse()[0]


    return (
        <div className="h-36">
            {fileUrl && (
                <div className="relative w-full h-full flex flex-col gap-y-1.5">
                    {/* Video Preview */}
                    {(type === 'video' ||
                        getDocType('video')?.includes(extention)) && (
                        // Preview Video
                        <div className="bg-black h-full">
                            <div className="">
                                <VideoPreview url={fileUrl} />
                            </div>
                        </div>
                    )}
                    {/* PDF Preview */}
                    {(type === 'docs' ||
                        getDocType('docs')?.includes(extention)) && (
                        <div className="h-full flex justify-center items-center w-full">
                            <IoMdDocument className="text-5xl text-gray" />
                        </div>
                    )}
                    {/* Image Preview */}
                    {(type === 'images' ||
                        getDocType('images')?.includes(extention)) && (
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-md"
                            style={{
                                backgroundImage: `url(${`${file}` || ''})`,
                            }}
                        ></div>
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
                        <Typography variant="small" center>
                            {filename
                                ? ellipsisText(filename?.split('_')[0], 11)
                                : `${ellipsisText(fileName, 7)}.${extention}`}
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    )
}
