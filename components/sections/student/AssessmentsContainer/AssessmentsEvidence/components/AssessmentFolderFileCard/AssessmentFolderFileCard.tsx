import { FileMimeTypes } from '@components/inputs'
import { PdfViewer } from '@components/PdfViewer'
import { Typography } from '@components/Typography'
import { VideoPreview } from '@components/VideoPreview'
import { elipiciseText, FileFormat } from '@utils'
import Image from 'next/image'
import { IoMdDocument } from 'react-icons/io'

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

    return (
        <div className="">
            {fileUrl && (
                <div className="relative w-full h-full flex flex-col gap-y-1.5">
                    {/* Video Preview */}
                    {type === 'video' && (
                        // Preview Video
                        <div className="bg-black h-full">
                            <div className="h-[70%]">
                                <VideoPreview url={fileUrl} />
                            </div>
                        </div>
                    )}
                    {/* PDF Preview */}
                    {type === 'docs' && (
                        <div className="flex justify-center items-center w-full">
                            <IoMdDocument className="text-5xl text-gray" />
                        </div>
                    )}
                    {/* Image Preview */}
                    {type === 'images' && (
                        <div
                            className="w-full h-28 bg-center bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url(${`${file}` || ''})`,
                            }}
                        ></div>
                    )}
                    <Typography variant="body" center>
                        {elipiciseText(filename?.split('_')[0], 11)}
                    </Typography>
                </div>
            )}
        </div>
    )
}
