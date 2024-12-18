import { Button, Typography } from '@components'
import React from 'react'

export const AssessmentFileArchiveModal = ({
    onModalClose,
    archiveFile,
    fileId,
    archiveFileResult,
}: any) => {
    return (
        <div className="px-8 py-4 flex flex-col gap-y-4 justify-center items-center">
            <Typography variant="title" bold>
                Are you sure?
            </Typography>
            <Typography variant="body" color="text-gray-500" center>
                You are about to archive this assessment file. Archiving a file
                makes it inaccessible to students.
            </Typography>
            <div>
                <Button
                    text="Archive"
                    variant="error"
                    onClick={() => {
                        archiveFile(fileId)
                        if (archiveFileResult?.isSuccess) {
                            onModalClose()
                        }
                    }}
                    loading={
                        archiveFileResult?.isLoading &&
                        archiveFileResult?.originalArgs === fileId
                    }
                    disabled={
                        archiveFileResult?.isLoading &&
                        archiveFileResult?.originalArgs === fileId
                    }
                />
            </div>
        </div>
    )
}
