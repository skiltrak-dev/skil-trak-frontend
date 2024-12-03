import { Button } from '@components'
import React from 'react'

export const UploadFileButton = ({ name }: { name: string }) => {
    return (
        <div>
            <Button>
                <label htmlFor={`file_id_${name}`}>Upload</label>
            </Button>
        </div>
    )
}
