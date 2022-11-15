import moment from 'moment'
import { useEffect, useState } from 'react'

// Icons
import { MdCloudUpload } from 'react-icons/md'

// components
import { LoadingAnimation, Typography } from '@components'
import { AssessmentFolderFileCard } from '../components'
import { UploadFile } from './UploadFile'

// query
import {
    useUploadFolderDocsMutation,
    useGetAssessmentsFolderDetailQuery,
} from '@queries'

// hoc
import { FileUpload } from '@hoc'

type Props = {
    folder: any
    fileUpload?: any
}

const Loading = () => {
    return <LoadingAnimation size={32} />
}

export const AssessmentFolderDetails = ({ folder, fileUpload }: Props) => {
    // query
    // fetch files
    const { data, isLoading, isSuccess, isError, isFetching } =
        useGetAssessmentsFolderDetailQuery(folder?.id, { skip: !folder })
    const [uploadDocs, uploadDocsResult] = useUploadFolderDocsMutation()

    const getDocType = () => {
        switch (folder?.type) {
            case 'docs':
                return ['pdf']
            case 'images':
                return ['jpg', 'png', 'jpeg']
            case 'docs':
                return ['mp4']

            default:
                return
        }
    }

    return (
        <>
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : (
                isSuccess && (
                    <>
                        <div className="flex justify-between items-center p-2">
                            <div>
                                <Typography variant="title">
                                    {folder?.name}
                                </Typography>
                                <Typography
                                    variant="label"
                                    color="text-gray-400"
                                >
                                    Uploaded {data?.files?.length || 0}/
                                    {folder?.capacity}
                                </Typography>
                            </div>
                            <div className="ml-auto">
                                {fileUpload ? (
                                    <FileUpload
                                        onChange={(docs: any) => {
                                            console.log('Saad', docs)
                                            const formData = new FormData()
                                            docs.forEach((doc: any) => {
                                                formData.append(
                                                    'assessmentEvidence',
                                                    doc
                                                )
                                            })
                                            uploadDocs({
                                                id: folder?.id,
                                                body: formData,
                                            })
                                        }}
                                        name={folder?.name}
                                        component={
                                            uploadDocsResult.isLoading
                                                ? Loading
                                                : UploadFile
                                        }
                                        limit={
                                            folder?.capacity -
                                            (data?.files?.length || 0)
                                        }
                                        acceptTypes={getDocType()}
                                        multiple={folder?.capacity > 1}
                                    />
                                ) : (
                                    <div>
                                        <Typography
                                            variant="body"
                                            color={'text-green-500'}
                                        >
                                            Not Approved
                                        </Typography>
                                        <Typography
                                            variant="body"
                                            color={'text-green-500'}
                                        >
                                            Assessed On
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-2 min-h-[290px] flex flex-col justify-between">
                            <div className="grid grid-cols-6 gap-x-2">
                                {data?.files?.length > 0 ? (
                                    data?.files.map((file: any) => (
                                        <AssessmentFolderFileCard
                                            key={file.id}
                                            filename={file.filename}
                                            fileUrl={file.file}
                                            type={folder.type}
                                        />
                                    ))
                                ) : (
                                    <Typography variant={'title'} center>
                                        No Files Uploaded
                                    </Typography>
                                )}
                            </div>
                            <div className="mt-4 border-dashed border border-gray-300 rounded-lg p-2">
                                <Typography
                                    variant="muted"
                                    color="text-gray-400"
                                >
                                    Assessed On:{' '}
                                    {moment(
                                        folder?.assessedTime,
                                        'YYYY-MM-DD hh:mm:ss Z'
                                    ).format('Do MMM, YYYY')}
                                </Typography>
                                <Typography
                                    variant="body"
                                    color="text-gray-600"
                                >
                                    {folder?.isActive
                                        ? folder?.positiveComment
                                        : folder?.negativeComment}
                                </Typography>
                            </div>
                        </div>
                    </>
                )
            )}
        </>
    )
}
