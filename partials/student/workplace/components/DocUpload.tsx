import React from 'react'
import { Button, Typography } from '@components'
import { IoDocumentText } from 'react-icons/io5'

export enum WorkplaceEmploymentDocument {
    PAY_SLIP = 'paySlip',
    EMPLOYMENT_CONTRACT = 'employmentContract',
}

export const DocUpload = ({
    name,
    title,
    value,
    setFile,
    loading,
    disabled,
}: {
    disabled?: boolean
    value: any
    setFile: ({
        name,
        file,
    }: {
        name: WorkplaceEmploymentDocument
        file: File
    }) => void
    name: WorkplaceEmploymentDocument
    loading: boolean
    title: string
}) => {
    return (
        <div className="bg-[#E6E6E6] px-4 py-1.5 flex items-center justify-between rounded-[10px] ">
            <div className="pl-2 flex items-center gap-x-4">
                <Typography bold>{title}</Typography>
                {value ? <IoDocumentText /> : null}
            </div>

            <Button loading={loading} disabled={disabled || loading}>
                <label htmlFor={name}>Upload</label>
            </Button>

            <input
                id={name}
                type={'file'}
                name={name}
                className="hidden"
                onChange={(e: any) =>
                    setFile({
                        name,
                        file: e.target?.files?.[0],
                    })
                }
            />
        </div>
    )
}
