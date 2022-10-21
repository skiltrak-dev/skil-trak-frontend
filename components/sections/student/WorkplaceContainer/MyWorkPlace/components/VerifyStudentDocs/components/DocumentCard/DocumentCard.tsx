import React from 'react'

// Icons
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillExclamationCircle } from 'react-icons/ai'

// components
import { Typography } from 'components'

export const DocumentCard = () => {
    return (
        <div className="bg-secondary rounded-lg p-2 flex justify-between items-center">
            <div className="flex items-center gap-x-2">
                <AiFillExclamationCircle className="text-info" />
                <Typography variant={'label'}>
                    National Identity Card
                </Typography>
            </div>
            <div className="flex items-center gap-x-2">
                <FaCloudUploadAlt className="text-info" />
                <Typography variant={'muted'} color={'textLink'}>
                    Upload
                </Typography>
            </div>
        </div>
    )
}