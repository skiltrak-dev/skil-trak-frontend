import React from 'react'

// Icons
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillExclamationCircle, AiFillCheckCircle } from 'react-icons/ai'
import { HiExclamationTriangle } from 'react-icons/hi2'
import { TfiReload } from 'react-icons/tfi'

// components
import { Typography } from 'components'

export const DocumentCard = ({
    file,
    name,
    dragging,
    fileList,
    fileObject,
    handleRemove,
    invalidSelection,
}: any) => {

    return (
        <div className="bg-secondary rounded-lg p-2 flex justify-between items-center">
            <div className="flex items-center gap-x-2">
                {file && !invalidSelection ? (
                    <AiFillCheckCircle className="text-success" />
                ) : invalidSelection ? (
                    <HiExclamationTriangle className="text-error" />
                ) : (
                    <AiFillExclamationCircle className="text-info" />
                )}

                <Typography variant={'label'}>{name}</Typography>
                {(file || invalidSelection) && (
                    <Typography variant={'label'}>-</Typography>
                )}
                {file && (
                    <>
                        <Typography variant={'xs'} color={'text-gray-400'}>
                            {fileList
                                ? fileList?.map(
                                      (f: any) => `${f.name.substring(0, 10)}, `
                                  )
                                : file.name}
                            {/* {Object.values(file).map((f) => f.name)} */}
                        </Typography>
                    </>
                )}
                {invalidSelection && (
                    <Typography variant={'xs'} color={'text-error'}>
                        Invalid File Format is selected
                    </Typography>
                )}
            </div>
            <div className="flex items-center gap-x-2">
                {file ? (
                    <TfiReload className="text-primary" />
                ) : (
                    <FaCloudUploadAlt className="text-link" />
                )}

                <Typography
                    variant={'muted'}
                    color={file ? 'text-primary' : 'text-link'}
                >
                    <label
                        htmlFor={`file_id_${name}`}
                        className="cursor-pointer"
                    >
                        {file ? 'Change' : 'Upload'}
                    </label>
                </Typography>
            </div>
        </div>
    )
}
