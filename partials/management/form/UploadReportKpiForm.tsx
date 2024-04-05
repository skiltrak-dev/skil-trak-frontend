import { Button, TextInput, Typography } from '@components'
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import * as Yup from 'yup'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { ManagementApi } from '@queries'
import { FileDrop } from 'react-file-drop'
import { AiFillDelete, AiFillPlusCircle } from 'react-icons/ai'
import { SiMicrosoftexcel } from 'react-icons/si'

export const UploadReportKpiForm = ({ name, onChange }: any) => {
    const fileInputRef = useRef<any>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null) // Store selected file
    const [fileName, setFileName] = useState('')
    const [isDrag, setIsDrag] = useState(false)
    const [values, setValues] = useState<File | null>(null)
    const [mediaFile, setMediaFile] = useState({
        file: '',
        type: '',
    })
    const formContext = useFormContext()
    const [upload, uploadResults] = ManagementApi.Documents.useUploadKpiReport()
    useEffect(() => {
        if (formContext) {
            formContext.setValue(name, values)
        }
    }, [values])
    const { register, handleSubmit } = useForm()
    console.log('values', values)
    console.log('fileName', fileName)
    console.log('mediaFile', mediaFile)
    const handleChange = (event: any, isDragging: boolean) => {
        const formData = new FormData()
        console.log('isDragging', event[0])
        setIsDrag(false)
        // Gettin file Data
        setValues(event[0] || event.target.files[0])

        const FileData = event[0] || event.target.files[0]
        setMediaFile({
            file: URL.createObjectURL(FileData),
            type: FileData.type,
        })

        setFileName(event[0]?.name || event.target.files[0]?.name)
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                // Sending file data to field
            }
        }

        // setting file data to state to preview the Data
        // acceptFiles.split(', ').includes(FileData.type) &&
        // setMediaFile({
        //     file: URL.createObjectURL(FileData),
        //     type: FileData.type,
        // })
        reader.readAsDataURL(FileData)

        !isDragging && (event.target.value = '')
    }

    const handleRemove = () => {
        setMediaFile({
            file: '',
            type: '',
        })
        setFileName('')
        setValues(null)
    }
    const onSubmit = () => {
        if (values) {
            console.log('values', values, mediaFile)
            window.alert(mediaFile.type)
        }
    }
    return (
        <div className="flex justify-center w-full overflow-auto remove-scrollbar">
            {/* <form
                className="px-[116px] py-8 bg-[#F8F8FF] rounded-md border-2 border-dashed"
                onSubmit={handleSubmit(onSubmit)}
            > */}
            <div>
                <FileDrop
                    onDragOver={() => {
                        setIsDrag(true)
                    }}
                    onDragLeave={() => {
                        setIsDrag(false)
                    }}
                    onDrop={(event) => handleChange(event, true)}
                >
                    <div
                        className={`w-[545px] bg-white px-6 py-4 border rounded-lg overflow-hidden relative`}
                    >
                        {mediaFile.file ? (
                            <div className="relative px-[116px] py-8 border-2 rounded-md border-dashed bg-[#F8F8FF] flex justify-center items-center flex-col">
                                <div className="flex flex-col items-center">
                                    <SiMicrosoftexcel
                                        size={60}
                                        className="text-green-400"
                                    />
                                </div>
                                <AiFillDelete
                                    className="absolute top-2 right-2 z-10 cursor-pointer text-red-400 text-xl"
                                    onClick={handleRemove}
                                />
                                <p className="font-semibold text-primaryNew">
                                    {fileName || 'N/A'}
                                </p>
                            </div>
                        ) : (
                            <div
                                className={`px-[116px] py-8 border-2 rounded-md border-dashed bg-[#F8F8FF] flex justify-center items-center flex-col`}
                            >
                                <label
                                    htmlFor={`file_id_${name}`}
                                    className="cursor-pointer hover:underline flex items-center flex-col gap-y-6"
                                >
                                    <IoCloudUploadOutline
                                        size={60}
                                        className="text-primaryNew"
                                    />
                                    <p className="font-semibold">
                                        Drag & Drop files or{' '}
                                        <span className="text-primaryNew underline font-semibold">
                                            Browse
                                        </span>
                                    </p>
                                    <Typography variant="muted">
                                        Supported format : Excel
                                    </Typography>
                                </label>
                            </div>
                        )}
                        <div className="flex justify-center mt-4">
                            <Button
                                text="Upload"
                                variant="primaryNew"
                                onClick={onSubmit}
                            />
                        </div>
                    </div>
                    <input
                        type="file"
                        id={`file_id_${name}`}
                        // name={name}
                        className="hidden"
                        {...(formContext
                            ? formContext.register(name)
                            : { name })}
                        onChange={(e: any) => {
                            onChange && onChange(e)
                            handleChange(e, false)
                        }}
                        accept=".xlsx"
                    />
                </FileDrop>
            </div>
        </div>
    )
}
