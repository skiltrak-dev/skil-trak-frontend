import { PdfViewer } from '@components/PdfViewer'
import { Typography } from '@components/Typography'
import { VideoPreview } from '@components/VideoPreview'
import { FileFormat } from '@utils'
import { FileMimeTypes } from 'hoc/FileUpload'
import { IoMdDocument } from 'react-icons/io'

export const UploadFileX = ({
    file,
    name,
    dragging,
    fileObject,
    handleRemove,
    invalidSelection,
}: any) => {
    return (
        <div
            className={`w-full h-40 border border-dashed  rounded-lg overflow-hidden ${
                dragging
                    ? 'bg-primary-light flex justify-center items-center border-primary border-2'
                    : invalidSelection
                    ? 'bg-error-light flex justify-center items-center border-error border-2'
                    : 'bg-secondary border-gray'
            }`}
        >
            {dragging ? (
                // Showing text on Drop File
                <Typography variant={'small'} color={'text-primary'}>
                    Drop Here
                </Typography>
            ) : file && file.name && file.type ? (
                <div className="relative w-full h-full">
                    {/* Video Preview */}
                    {FileMimeTypes.video.includes(file.type) && (
                        // Preview Video
                        <div className="bg-black h-full">
                            <div className="h-[70%]">
                                <VideoPreview url={fileObject} />
                            </div>
                        </div>
                    )}

                    {/* PDF Preview */}
                    {FileMimeTypes.documents.includes(file.type) && (
                        <div className="flex justify-center items-center w-full h-full">
                            {fileObject && FileFormat.isPdf(file) ? (
                                <div className="w-full h-full">
                                    <PdfViewer file={fileObject} />
                                </div>
                            ) : (
                                <IoMdDocument className="text-5xl text-gray" />
                            )}
                        </div>
                    )}

                    {/* Image Preview */}
                    {FileMimeTypes.image.includes(file.type) && (
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-contain"
                            style={{
                                backgroundImage: `url(${fileObject || ''})`,
                            }}
                        ></div>
                    )}

                    {/* Showing details after uploading media */}
                    <div
                        className={`absolute bottom-0 pt-1 pb-2 w-full flex flex-col justify-between px-4 bg-gradient-to-b from-[#00000000] to-black`}
                    >
                        <Typography variant="subtitle" color="text-white">
                            {file && file.name.length > 15
                                ? `${file.name.substring(0, 15)}...`
                                : file.name}
                        </Typography>

                        <div className="flex gap-x-3.5">
                            <Typography variant="small" color={'text-primary'}>
                                <label
                                    htmlFor={`file_id_${name}`}
                                    className="cursor-pointer"
                                >
                                    Change
                                </label>
                            </Typography>
                            <Typography variant="small" color={'text-error'}>
                                <span
                                    className="cursor-pointer"
                                    onClick={handleRemove}
                                >
                                    Remove
                                </span>
                            </Typography>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`w-full h-full flex justify-center items-center flex-col`}
                >
                    {invalidSelection && (
                        <Typography variant={'muted'} color={'text-error'}>
                            Invalid File
                        </Typography>
                    )}
                    <Typography variant={'small'} color={'text-muted'}>
                        Drop File Here
                    </Typography>
                    <Typography variant={'small'} color={'text-muted'}>
                        Or
                    </Typography>
                    <Typography variant={'small'} color={'text-link'}>
                        <label
                            htmlFor={`file_id_${name}`}
                            className="cursor-pointer hover:underline"
                        >
                            Browse
                        </label>
                    </Typography>
                </div>
            )}
        </div>
    )
}
