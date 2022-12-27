import moment from 'moment'
import { useEffect, useState } from 'react'

// Icons
import { MdCloudUpload } from 'react-icons/md'

// components
import { LoadingAnimation, Typography, NoData, Badge } from '@components'
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

export const AssessmentFolderDetailX = ({ folder, fileUpload }: Props) => {
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
        <div className="h-full">
            <div className="flex justify-between items-center p-2">
                <div className="px-4">
                    <Typography variant="title">{folder?.name}</Typography>
                    <Typography variant="label" color="text-gray-400">
                        Uploaded {data?.files?.length || 0}/{folder?.capacity}
                    </Typography>
                </div>
                <div className="ml-auto">
                    {fileUpload ? (
                        <FileUpload
                            onChange={(docs: any) => {
                                const formData = new FormData()
                                docs.forEach((doc: any) => {
                                    formData.append(
                                        `${folder?.name}_${doc.name}`,
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
                                folder?.capacity - (data?.files?.length || 0)
                            }
                            acceptTypes={getDocType()}
                            multiple={folder?.capacity > 1}
                        />
                    ) : (
                        <div>
                            {folder.isActive ? (
                                <Badge text="Approved" variant="success" />
                            ) : (
                                <Badge text="Not Approved" variant="error" />
                            )}
                            <Typography variant="body" color={'text-green-500'}>
                                Assessed On
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white p-2 flex flex-col justify-between h-full relative min-h-[355px]">
                {isLoading || isFetching ? (
                    <div className="flex flex-col items-center pt-9">
                        <LoadingAnimation size={50} />
                        <Typography variant={'subtitle'}>
                            Assessment Files Loading
                        </Typography>
                    </div>
                ) : data?.files?.length > 0 ? (
                    <div className="grid grid-cols-6 gap-x-2 gap-y-3">
                        {data?.files.map((file: any) => (
                            <AssessmentFolderFileCard
                                key={file.id}
                                filename={file.filename}
                                fileUrl={file.file}
                                type={folder.type}
                            />
                        ))}
                    </div>
                ) : (
                    <NoData text={'No Files Uploaded'} />
                )}
                <div className="mt-4 border-dashed border border-gray-300 rounded-lg p-2">
                    <Typography variant="muted" color="text-gray-400">
                        Assessed On:{' '}
                        {moment(data?.assessmentFolder?.updatedAt).format(
                            'Do MMM, YYYY'
                        )}
                    </Typography>
                    <Typography variant="body" color="text-gray-600">
                        {data?.comment}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
