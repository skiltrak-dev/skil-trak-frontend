import { AuthorizedUserComponent } from '@components/AuthorizedUserComponent'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { VideoPreview } from '@components/VideoPreview'
import { UserRoles } from '@constants'
import moment from 'moment'
import Image from 'next/image'
import { BsInfo } from 'react-icons/bs'
import { IoMdDocument } from 'react-icons/io'

type AssessmentFolderFileCardProps = {
    file?: any
    fileUrl: string
    filename: string
    type: string
    selected?: boolean
    onClick?: (file: any) => void
    deleteAction?: any
    index?: any
}

export const AssessmentFolderFileCard = ({
    file,
    index,
    type,
    fileUrl,
    filename,
    selected,
    onClick,
    deleteAction,
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
        <div className="relative w-full file-view-group">
            <div className=" absolute top-0 z-20 flex justify-between w-full items-center gap-x-1 px-0.5">
                <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                    {file?.uploadedBy && (
                        <div className="file-view-icon transition-all duration-500 bg-white rounded-full shadow-md border border-gray-600 cursor-pointer relative">
                            <BsInfo className="text-black text-sm" />

                            <div className="file-view-detail transition-all duration-500 absolute top-full mt-1 w-auto h-auto p-1 rounded bg-white border text-[10px]">
                                <div className="whitespace-pre">
                                    Uploaded By: {file?.uploadedBy?.name}(
                                    {file?.uploadedBy?.role})
                                </div>
                                <div className="whitespace-pre">
                                    email: {file?.uploadedBy?.email}
                                </div>
                                <div className="whitespace-pre">
                                    Uploaded AT:{' '}
                                    {moment(file?.createdAt)?.format(
                                        'ddd, DD.MMM.YYYY [at] hh:mm a'
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </AuthorizedUserComponent>
                <AuthorizedUserComponent
                    roles={[UserRoles.ADMIN, UserRoles.RTO, UserRoles.SUBADMIN]}
                >
                    {deleteAction && !file?.agreement && (
                        <div className="ml-auto">{deleteAction(file?.id)}</div>
                    )}
                </AuthorizedUserComponent>
            </div>
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
                                    src={file?.file}
                                    alt={filename || fileName}
                                    sizes="100vw 100vh"
                                    fill
                                    className="object-cover"
                                    blurDataURL={'/images/blur_image.png'}
                                    placeholder="blur"
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

                            {/* <Typography variant="small" center>
                                {index + 1}
                            </Typography> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
