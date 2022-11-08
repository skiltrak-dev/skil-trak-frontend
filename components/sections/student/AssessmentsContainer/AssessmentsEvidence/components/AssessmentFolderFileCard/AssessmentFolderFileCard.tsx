import { FileMimeTypes } from '@components/inputs'
import { PdfViewer } from '@components/PdfViewer'
import { Typography } from '@components/Typography'
import { VideoPreview } from '@components/VideoPreview'
import { FileFormat } from '@utils'
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
    console.log('type', type)
    const file = fileUrl.split('\\').join('/')
    console.log('myString', file)
    return (
        <div className="">
            {/* <Image
                src={fileUrl || '/images/assessment-file-images/img-1.png'}
                width={100}
                height={100}
            />
             {fileUrl && file.type && ( */}
            {fileUrl && (
                <div className="relative w-full h-full">
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
                        <div className="flex justify-center items-center w-full h-full">
                            {/* {FileFormat.isPdf('file') ? (
                                <div className="w-full h-full">
                                    <PdfViewer file={fileUrl} />
                                </div>
                            ) : (
                                )} */}
                            <IoMdDocument className="text-5xl text-gray" />
                        </div>
                    )}
                    {/* Image Preview */}
                    {type === 'images' && (
                        <div
                            className="w-full h-28 bg-center bg-no-repeat bg-cover"
                            style={{
                                backgroundImage: `url(${
                                    `${process.env.NEXT_PUBLIC_END_POINT}/${file}` ||
                                    ''
                                })`,
                            }}
                        ></div>
                    )}
                    <Typography variant="body" center>
                        {filename?.split('_')[0].substring(0, 10)}
                    </Typography>
                </div>
            )}
        </div>
    )
}
