import moment from 'moment'
import { useEffect, useState } from 'react'

// Icons
import { MdCloudUpload } from 'react-icons/md'

// components
import { Button, Typography } from '@components'
import { AssessmentFolderFileCard } from '../components'
import { UploadFile } from './UploadFile'

// query
import { useUploadFolderDocsMutation } from '@queries'

// hoc
import { FileUpload } from '@hoc'
import { LoadingAnimation } from '@components/LoadingAnimation'

type Props = {
    data: any
}

const Loading = () => {
    return <LoadingAnimation size={32} />
}

export const AssessmentFolderDetails = ({ data }: Props) => {
    // query
    const [uploadDocs, uploadDocsResult] = useUploadFolderDocsMutation()

    return (
        <>
            <div className="flex justify-between items-center p-2">
                <div>
                    <Typography variant="title">{data.name}</Typography>
                    <Typography variant="label" color="text-gray-400">
                        Uploaded {data.uploaded || 0}/{data.capacity}
                    </Typography>
                </div>
                <div className="ml-auto">
                    <FileUpload
                        onChange={(docs: any) => {
                            const formData = new FormData()
                            docs.forEach((doc: any) => {
                                formData.append('assessmentEvidence', doc)
                            })
                            uploadDocs({ id: data.id, body: formData })
                        }}
                        name={data?.name}
                        component={
                            uploadDocsResult.isLoading ? Loading : UploadFile
                        }
                        limit={data?.capacity}
                        acceptTypes={['pdf']}
                        multiple={data?.capacity > 1}
                    />
                </div>
            </div>
            <div className="bg-white p-2 min-h-[290px] flex flex-col justify-between">
                <div className="grid grid-cols-6 gap-x-2">
                    {data.files?.length > 0 ? (
                        data.files.map((file: any) => (
                            <AssessmentFolderFileCard
                                key={file.id}
                                filename={file.filename}
                                fileUrl={file.file}
                                type={data.type}
                            />
                        ))
                    ) : (
                        <Typography variant={'title'} center>
                            No Files Uploaded
                        </Typography>
                    )}
                </div>
                <div className="mt-4 border-dashed border border-gray-300 rounded-lg p-2">
                    <Typography variant="muted" color="text-gray-400">
                        Assessed On:{' '}
                        {moment(
                            data.assessedTime,
                            'YYYY-MM-DD hh:mm:ss Z'
                        ).format('Do MMM, YYYY')}
                    </Typography>
                    <Typography variant="body" color="text-gray-600">
                        {data.isActive
                            ? data.positiveComment
                            : data.negativeComment}
                    </Typography>
                </div>
            </div>
        </>
    )
}
