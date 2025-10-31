import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileText, X } from 'lucide-react'
import { ActionButton } from '@components'
import { FileWithId } from '../../forms'
import classNames from 'classnames'
import { Title } from '@partials/rto-v2'

export const ViewUploadedFiles = ({
    variant,
}: {
    variant: 'primaryNew' | 'primary' | 'success'
}) => {
    const formMethods = useFormContext()

    // Remove file by ID
    const removeFile = useCallback(
        (fileId: string) => {
            const currentFiles = formMethods.getValues('fileUpload') || []
            const updatedFiles = currentFiles.filter(
                (fileWithId: FileWithId) => fileWithId.id !== fileId
            )
            formMethods.setValue('fileUpload', updatedFiles)
        },
        [formMethods]
    )

    const files = formMethods?.watch('fileUpload')
    const fileUpload = files && files?.length > 0 ? [...files] : []

    const iconClasses = classNames({
        'bg-primaryNew/10 !text-primaryNew': true,
        '!bg-primary/10 !text-primary': variant === 'primary',
        '!bg-success/10 !text-success': variant === 'success',
    })

    return (
        <div>
            {fileUpload && fileUpload?.length > 0 && (
                <div className="space-y-2">
                    {fileUpload?.map((fileWithId: FileWithId) => (
                        <div
                            key={fileWithId.id}
                            className="flex items-center justify-between p-3 bg-secondary rounded-lg border border-border/50"
                        >
                            <Title
                                Icon={FileText}
                                title={fileWithId.file?.name}
                                description={`${(
                                    fileWithId.file?.size /
                                    1024 /
                                    1024
                                ).toFixed(2)}
                                        MB`}
                                iconClasses={iconClasses}
                            />
                            {/* <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <FileText className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {fileWithId.file?.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {(
                                            fileWithId.file?.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{' '}
                                        MB
                                    </p>
                                </div>
                            </div> */}
                            <ActionButton
                                onClick={() => {
                                    removeFile(fileWithId.id)
                                }}
                            >
                                <X className="h-4 w-4" />
                            </ActionButton>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
