import React, { useState } from 'react'

// Icons
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillExclamationCircle, AiFillCheckCircle } from 'react-icons/ai'
import { HiExclamationTriangle } from 'react-icons/hi2'
import { TfiReload } from 'react-icons/tfi'

// components
import { Typography } from 'components'
import { useNotification } from '@hooks'
import { elipiciseText } from '@utils'

export const DocumentCard = ({
    name,
    capacity,
    onChange,
    uploadedDocs,
    requiredDoc,
}: any) => {
    const [fileList, setFileList] = useState<any | null>(null)
    const [invalidSelection, setInvalidSelection] = useState<any | null>(null)

    // hook
    const { notification } = useNotification()

    const handleChange = (event: any) => {
        // Getting file Data
        const fileData: FileList = event.target.files

        // for multiple files upload
        let multipleFiles: any = []

        for (let key in fileData) {
            if (typeof fileData[key] === 'object') {
                multipleFiles.push(fileData[key])
                // setFileList((preVal: any) => [...preVal, fileData[key]])
            }
        }
        if (capacity && fileData.length + uploadedDocs <= capacity) {
            setFileList(multipleFiles)
            fileData && onChange && onChange(multipleFiles)
        } else {
            notification.error({
                title: 'More Than Capacity Selected',
                description: 'You selected more documents from capacity',
            })
        }
    }

    const isNotUploadedDocs = uploadedDocs < capacity
    return (
        <div className="bg-secondary rounded-lg p-2 flex justify-between items-center">
            <div className="flex items-center gap-x-2">
                {fileList && !invalidSelection ? (
                    <AiFillCheckCircle className="text-success" />
                ) : invalidSelection ? (
                    <HiExclamationTriangle className="text-error" />
                ) : (
                    <AiFillExclamationCircle className="text-info" />
                )}
                <Typography variant={'label'}>{name}</Typography>
                {(fileList || invalidSelection) && (
                    <Typography variant={'label'}>-</Typography>
                )}
                {fileList && (
                    <>
                        <Typography variant={'xs'} color={'text-gray-400'}>
                            {fileList
                                ? fileList?.map(
                                      (f: any) => `${f.name.substring(0, 10)}, `
                                  )
                                : null}
                            {/* {Object.values(file).map((f) => f.name)} */}
                        </Typography>
                    </>
                )}
                {invalidSelection && (
                    <Typography variant={'xs'} color={'text-error'}>
                        Invalid File Format is selected
                    </Typography>
                )}
                {requiredDoc?.uploaded && (
                    <div className="flex items-center gap-x-1">
                        {requiredDoc?.uploaded
                            ?.slice(0, 4)
                            ?.map((uploaded: any) => (
                                <Typography variant={'xs'} color={'text-error'}>
                                    {elipiciseText(uploaded?.fileName, 10)},
                                </Typography>
                            ))}
                        {requiredDoc?.uploaded?.length > 4 && (
                            <Typography variant={'xs'} color={'text-error'}>
                                ....
                            </Typography>
                        )}
                    </div>
                )}
                <Typography variant={'small'} color={'text-gray-500'}>
                    ({uploadedDocs}/{capacity})
                </Typography>
                {!isNotUploadedDocs && (
                    <div className="flex items-center">
                        <Typography variant={'small'}>-</Typography>
                        <Typography variant={'small'} color={'text-success'}>
                            Documents Uploaded
                        </Typography>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-x-2">
                {fileList ? (
                    <TfiReload className="text-primary" />
                ) : (
                    <FaCloudUploadAlt
                        className={`${
                            isNotUploadedDocs ? 'text-link' : 'text-gray-300'
                        }`}
                    />
                )}

                <Typography
                    variant={'muted'}
                    color={
                        fileList
                            ? 'text-primary'
                            : isNotUploadedDocs
                            ? 'text-link'
                            : 'text-gray-300'
                    }
                >
                    <label
                        {...(isNotUploadedDocs
                            ? { htmlFor: `file_id_${name}` }
                            : {})}
                        // htmlFor={`file_id_${name}`}
                        className={`${
                            isNotUploadedDocs ? 'cursor-pointer' : ''
                        }`}
                    >
                        {fileList ? 'Change' : 'Upload'}
                    </label>
                </Typography>
            </div>
            <input
                type="file"
                id={`file_id_${name}`}
                name={name}
                className="hidden"
                onChange={(e: any) => {
                    handleChange(e)
                }}
                accept={'pdf/*'}
                multiple
            />
        </div>
    )
}
