import { Button, Typography } from '@components'
import React from 'react'

export const DocUpload = ({
    name,
    title,
    setFile,
}: {
    setFile: ({ name, file }: { name: string; file: File }) => void
    name: string
    title: string
}) => {
    return (
        <div className="bg-[#E6E6E6] px-4 py-1.5 flex items-center justify-between rounded-[10px] ">
            <div className="pl-2">
                <Typography bold>{title}</Typography>
            </div>

            <Button>
                <label htmlFor={name}>Upload</label>
            </Button>

            <input
                id={name}
                type={'file'}
                name={name}
                className="hidden"
                onChange={(e: any) =>
                    setFile({ name, file: e.target?.files?.[0] })
                }
            />
        </div>
    )
}
