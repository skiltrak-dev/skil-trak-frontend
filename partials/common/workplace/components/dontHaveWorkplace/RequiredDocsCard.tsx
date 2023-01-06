import React, { useState } from 'react'

// Icons
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillExclamationCircle, AiFillCheckCircle } from 'react-icons/ai'
import { HiExclamationTriangle } from 'react-icons/hi2'
import { TfiReload } from 'react-icons/tfi'

// components
import { Typography } from 'components'
import { useNotification } from '@hooks'
import { ellipsisText } from '@utils'

export const RequiredDocsCard = ({
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
        <div className="bg-secondary rounded-lg p-2 flex flex-col md:flex-row gap-2 justify-between md:items-center">
            <div className="flex flex-col md:flex-row gap-2 md:items-center gap-x-2">
                {/* title and capacity */}
                <div className="flex items-center justify-between md:justify-start gap-x-2 w-full md:w-auto">
                    {/* capacity */}
                    <div className="flex items-center gap-x-1">
                        {fileList && !invalidSelection ? (
                            <AiFillCheckCircle className="text-success" />
                        ) : invalidSelection ? (
                            <HiExclamationTriangle className="text-error" />
                        ) : (
                            <AiFillExclamationCircle className="text-info" />
                        )}
                        <Typography variant={'label'}>{name}</Typography>
                    </div>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        ({uploadedDocs}/{capacity})
                    </Typography>
                </div>
                <div className="flex items-center">
                    {(fileList || invalidSelection) && (
                        <Typography variant={'label'}>-</Typography>
                    )}
                    <div className="overflow-scroll">
                        {fileList && (
                            <>
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    {fileList
                                        ? fileList?.map(
                                              (f: any) =>
                                                  `${f.name.substring(0, 10)}, `
                                          )
                                        : null}
                                </Typography>
                            </>
                        )}
                    </div>
                    {invalidSelection && (
                        <Typography variant={'xs'} color={'text-error'}>
                            Invalid File Format is selected
                        </Typography>
                    )}
                </div>
                {requiredDoc?.uploaded && (
                    <div className="flex items-center gap-x-1 overflow-scroll w-full">
                        {requiredDoc?.uploaded
                            ?.slice(0, 4)
                            ?.map((uploaded: any, idx: number) => (
                                <Typography
                                    key={idx}
                                    variant={'xs'}
                                    color={'text-error'}
                                >
                                    <span className="whitespace-pre">
                                        {ellipsisText(uploaded?.fileName, 10)},
                                    </span>
                                </Typography>
                            ))}
                        {requiredDoc?.uploaded?.length > 4 && (
                            <Typography variant={'xs'} color={'text-error'}>
                                ....
                            </Typography>
                        )}
                    </div>
                )}

                {!isNotUploadedDocs && (
                    <div className="flex items-center">
                        <Typography variant={'small'}>-</Typography>
                        <Typography variant={'small'} color={'text-success'}>
                            <span className="whitespace-pre">
                                Documents Uploaded
                            </span>
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
