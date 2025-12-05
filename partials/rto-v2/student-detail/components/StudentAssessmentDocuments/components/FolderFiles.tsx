import React from 'react'
import { RtoV2Api } from '@queries'
import { FolderDocumentCard } from '../cards'
import { LoadingAnimation, NoData } from '@components'
import { useSelector } from 'react-redux'

export const FolderFiles = ({
    folder,
    config,
}: {
    folder: any
    config: any
}) => {
    const response = folder?.studentResponse?.[0]

    const filesData = RtoV2Api.StudentDocuments.getStudentDocumentFiles(
        response?.id,
        {
            skip: !response?.id,
        }
    )

    const { id: studentId } = useSelector(
        (state: any) => state?.student?.studentDetail
    )

    if (!response?.id) {
        return <NoData text="No files uploaded" />
    }

    return (
        <div className="border-t border-slate-200 bg-white">
            {filesData.isError && (
                <NoData text={'There is some technical issue!'} isError />
            )}
            {filesData.isLoading || filesData.isFetching ? (
                <div className="min-h-[inherit] flex justify-center items-center">
                    <LoadingAnimation size={50} />
                </div>
            ) : filesData?.data &&
              filesData?.data?.length > 0 &&
              filesData?.isSuccess ? (
                <div className="p-4 space-y-2">
                    {filesData?.data?.map((doc: any) => {
                        const docConfig = config

                        return (
                            <FolderDocumentCard
                                doc={doc}
                                key={doc.id}
                                config={docConfig}
                                studentId={studentId}
                            />
                        )
                    })}
                </div>
            ) : (
                filesData?.isSuccess && <NoData text="No files uploaded" />
            )}
        </div>
    )
}
