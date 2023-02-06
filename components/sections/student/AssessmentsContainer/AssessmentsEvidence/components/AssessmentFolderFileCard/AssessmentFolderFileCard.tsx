import { FileMimeTypes } from '@components/inputs'
import { PdfViewer } from '@components/PdfViewer'
import { Typography } from '@components/Typography'
import { VideoPreview } from '@components/VideoPreview'
import { ellipsisText, FileFormat } from '@utils'
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

    console.log('file', file)
    const url = 'http://www.mymainsite.com/somepath/path2/path3/path4'
    const pathname = new URL(file).pathname
    console.log('pathnamepathname', pathname)

    return (
        <div className="">
            {fileUrl && (
                <div className="relative w-full h-full flex flex-col gap-y-1.5">
                    {/* Video Preview */}
                    {type === 'video' && (
                        // Preview Video
                        <div
                            className="w-full h-28 bg-center bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url(${`${file}` || ''})`,
                            }}
                        ></div>
                    )}
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
                        {!filename
                            ? ellipsisText(filename?.split('_')[0], 11)
                            : ellipsisText(
                                  pathname?.split('/')?.slice(1)[0],
                                  7
                              )}
                    </Typography>
                </div>
            )}
        </div>
    )
}
