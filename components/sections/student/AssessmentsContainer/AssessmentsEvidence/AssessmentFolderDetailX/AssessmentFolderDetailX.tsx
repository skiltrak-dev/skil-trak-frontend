import moment from 'moment'
import { useState } from 'react'

// Icons

// components
import {
    Badge,
    FileViewModal,
    LoadingAnimation,
    NoData,
    PdfViewModal,
    Typography,
    VideoPlayModal,
} from '@components'
import { AssessmentFolderFileCard } from '../components'
import { UploadFile } from './UploadFile'

// query
import {
    useGetAssessmentsFolderDetailQuery,
    useUploadFolderDocsMutation,
} from '@queries'

// hoc
import { FileUpload } from '@hoc'
import { Result } from '@constants'

type Props = {
    folder: any
    fileUpload?: any
    result?: any
}

const Loading = () => {
    return <LoadingAnimation size={32} />
}

export const getDocType = (type: string) => {
    switch (type) {
        case 'docs':
            return ['pdf', 'document']
        case 'images':
            return ['jpg', 'png', 'jpeg', 'JPG', 'jfif']
        case 'video':
            return ['mp4', 'mkv', 'avi', 'mpeg', 'quicktime', 'mov']

        default:
            return ['pdf', 'jpg', 'png', 'jpeg', 'mp4']
    }
}

export const AssessmentFolderDetailX = ({
    result,
    folder,
    fileUpload,
}: Props) => {
    // query
    // fetch files
    const getAssessmentResponse = useGetAssessmentsFolderDetailQuery(
        folder?.id,
        { skip: !folder }
    )
    const [uploadDocs, uploadDocsResult] = useUploadFolderDocsMutation()

    const [selected, setSelected] = useState<any>(null)

    const [modal, setModal] = useState<any>(null)

    const onModalCancel = () => {
        setModal(null)
    }

    const getImageViewModal = (file: any) => {
        return (
            <FileViewModal
                title=""
                subtitle=""
                url={file?.file}
                onCancelButtonClick={onModalCancel}
            >
                <div className="max-w-[650px] relative">
                    <img src={file.file} alt="" className="max-w-full" />
                </div>
            </FileViewModal>
        )
    }

    const onFileClicked = (file: any) => {
        setSelected(file)

        if (['jpg', 'jpeg', 'png'].includes(file.extension.toLowerCase())) {
            setModal(getImageViewModal(file))
        } else if (['pdf'].includes(file.extension.toLowerCase())) {
            const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = file.file
            setModal(
                <PdfViewModal
                    downloadUrl={file.file}
                    url={url}
                    onCancelButtonClick={onModalCancel}
                />
            )
        } else if (
            ['mp4', 'mkv', 'avi', 'mpeg'].includes(file.extension.toLowerCase())
        ) {
            const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = file.file
            setModal(
                <VideoPlayModal
                    url={url}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                />
            )
        }
    }

    return (
        <>
            {modal}
            <div className="h-full">
                {folder && (
                    <div className="flex justify-between items-center p-2 border-b">
                        <div className="px-4">
                            <Typography variant="title">
                                {folder?.name}
                            </Typography>
                            <Typography variant="label" color="text-gray-400">
                                Uploaded{' '}
                                {getAssessmentResponse?.data?.files?.length ||
                                    0}
                                /{folder?.capacity}
                            </Typography>
                        </div>
                        <div className="ml-auto">
                            {fileUpload ? (
                                result?.result !== Result.Competent ? (
                                    <FileUpload
                                        onChange={(docs: any) => {
                                            const formData = new FormData()
                                            docs.forEach((doc: any) => {
                                                formData.append(
                                                    `${folder?.name}`,
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
                                            (getAssessmentResponse?.data?.files
                                                ?.length || 0)
                                        }
                                        acceptTypes={getDocType(folder?.type)}
                                        multiple={folder?.capacity > 1}
                                    />
                                ) : null
                            ) : (
                                <div>
                                    {folder.isActive ? (
                                        <Badge
                                            text="Approved"
                                            variant="success"
                                        />
                                    ) : (
                                        <Badge
                                            text="Not Approved"
                                            variant="error"
                                        />
                                    )}
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
                )}
                {/* <div className="bg-white h-[350px] overflow-auto">
                <AssessmentResponse
                    getAssessmentResponse={getAssessmentResponse}
                    header={false}
                    // folder={selectedFolder}
                    // studentId={studentId}
                />
            </div> */}
                <div
                    className={`bg-white p-2 flex flex-col justify-between h-full relative  ${
                        folder ? 'min-h-[355px]' : 'min-h-[400px] mt-6'
                    }`}
                >
                    {getAssessmentResponse.isLoading ||
                    getAssessmentResponse.isFetching ? (
                        <div className="flex flex-col items-center pt-9">
                            <LoadingAnimation size={50} />
                            <Typography variant={'subtitle'}>
                                Assessment Files Loading
                            </Typography>
                        </div>
                    ) : getAssessmentResponse.data?.files?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-2 gap-y-3">
                            {getAssessmentResponse.data?.files.map(
                                (file: any) => (
                                    <AssessmentFolderFileCard
                                        key={file.id}
                                        file={file}
                                        filename={file.filename}
                                        fileUrl={file.file}
                                        type={folder.type}
                                        selected={selected?.id === file?.id}
                                        onClick={onFileClicked}
                                        result={result}
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <NoData text={'No Files Uploaded'} />
                    )}
                    <div className="mt-4 border-dashed border border-gray-300 rounded-lg p-2">
                        <Typography variant="muted" color="text-gray-400">
                            Assessed On:{' '}
                            {moment(
                                getAssessmentResponse.data?.assessmentFolder
                                    ?.updatedAt
                            ).format('Do MMM, YYYY')}
                        </Typography>
                        <Typography variant="body" color="text-gray-600">
                            {getAssessmentResponse.data?.comment}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
