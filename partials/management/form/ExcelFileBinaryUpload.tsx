'use client'
import { useEffect, useState } from 'react'
import { FileDrop } from 'react-file-drop'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useFormContext } from 'react-hook-form'
import { IoDocumentTextOutline } from 'react-icons/io5'

const acceptTypes = [
    '.xls',
    '.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
]

export const ExcelFileBinaryUpload = ({ name, label, onChange }: any) => {
    const formContext = useFormContext()

    const [values, setValues] = useState(null)
    const [file, setFile] = useState<any>(null)
    const [invalidSelection, setInvalidSelection] = useState(false)

    const [dragging, setDragging] = useState(false)

    const handleRemove = () => {
        setFile(null)
        setInvalidSelection(false)
    }

    useEffect(() => {
        if (formContext && values) {
            formContext.setValue(name, values)
        }
    }, [values])

    // Uploading Media
    const handleChange = (event: any, isDragging: any) => {
        setDragging(false)

        // Getting file Data
        const fileData = event[0] || event.target.files[0]

        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString
        if (reader) {
            reader.onload = (loadEvent: any) => {
                if (reader.readyState === 2) {
                    if (acceptTypes.includes(fileData?.type)) {
                        setFile(fileData)
                        setInvalidSelection(false)
                        onChange && onChange(loadEvent, fileData)
                    } else {
                        setInvalidSelection(true)
                    }
                }
            }
        }

        if (rABS) reader.readAsBinaryString(fileData)
        else reader.readAsArrayBuffer(fileData)

        // when user upload the file and after removing upload same file so its does upload
        // for that purpose removed the value
        !isDragging && (event.target.value = '')
    }

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-center mb-4 items-center">
                    <p className="font-bold text-lg text-primaryNew">{label}</p>
                </div>
            )}

            <FileDrop
                onDragOver={() => {
                    setDragging(true)
                }}
                onDragLeave={() => {
                    setDragging(false)
                }}
                onDrop={(event) => handleChange(event, true)}
            >
                <div
                    className={` w-full h-40 border-dashed border-2  rounded-lg overflow-hidden ${
                        dragging
                            ? 'bg-primary-light flex justify-center items-center border-primary border-2'
                            : invalidSelection
                            ? 'bg-error-light flex justify-center items-center border-error border-2'
                            : 'bg-[#F8F8FF] border-gray border-2'
                    }`}
                >
                    {dragging ? (
                        <p className="text-yellow-500 text-xs">Drop Here</p>
                    ) : file && file.name && file.type ? (
                        <div className="relative w-full h-full">
                            {/* PDF Preview */}
                            {acceptTypes.includes(file.type) && (
                                <div className="flex justify-center items-center w-full h-full">
                                    <IoDocumentTextOutline className="text-5xl text-gray text-[#1d6f42]" />
                                </div>
                            )}

                            <div
                                className={`absolute bottom-0 pt-1 pb-2 w-full flex flex-col justify-between px-4 bg-gradient-to-b from-[#00000000] to-[#1d6f42]`}
                            >
                                <p className="font-medium text-white">
                                    {file && file.name.length > 15
                                        ? `${file.name.substring(0, 15)}...`
                                        : file.name}
                                </p>

                                <div className="flex gap-x-3.5">
                                    <p className="text-xs text-yellow-400">
                                        <label
                                            htmlFor={`file_id_${name}`}
                                            className="cursor-pointer"
                                        >
                                            Change
                                        </label>
                                    </p>
                                    <p className="text-xs text-red-800">
                                        <span
                                            className="cursor-pointer"
                                            onClick={handleRemove}
                                        >
                                            Remove
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`pt-6 pb-7 w-full h-full flex justify-center items-center flex-col`}
                        >
                            {invalidSelection && (
                                <p className="text-xs text-red-500">
                                    Invalid File
                                </p>
                            )}
                            <label
                                htmlFor={`file_id_${name}`}
                                className="cursor-pointer"
                            >
                                <IoCloudUploadOutline
                                    size={55}
                                    className="mb-6 text-primaryNew"
                                />
                            </label>
                            <p className="font-semibold">
                                <label
                                    htmlFor={`file_id_${name}`}
                                    className="cursor-pointer hover:underline"
                                >
                                    Drag & Drop files or{' '}
                                    <span className="underline text-primaryNew">
                                        Browse
                                    </span>
                                </label>
                            </p>
                            <p className="text-xs text-[#676767] mt-2.5">
                                <label
                                    htmlFor={`file_id_${name}`}
                                    className="cursor-pointer hover:underline"
                                >
                                    Supported format : Excel
                                </label>
                            </p>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    id={`file_id_${name}`}
                    className="!hidden"
                    {...(formContext ? formContext.register(name) : { name })}
                    onChange={(e: any) => {
                        setValues(e.target.files)
                        handleChange(e, false)
                    }}
                    accept={acceptTypes?.join(',')}
                />
            </FileDrop>
        </div>
    )
}
