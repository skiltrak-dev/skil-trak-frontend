import { useEffect, useState } from 'react'
import { FileDrop } from 'react-file-drop'
import { useFormContext } from 'react-hook-form'

// Icons
import { AiFillDelete, AiFillPlusCircle } from 'react-icons/ai'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'

// components
import { Typography, VideoPreview } from '@components'
import { InputErrorMessage } from '@components/inputs/components'
// import { elipiciseText } from '@utills'

// components
export const UploadRPLDocs = ({
    name,
    label,
    acceptFiles,
    multiple,
    onChange,
    rules,
    onBlur,
}: any) => {
    const [mediaFile, setMediaFile] = useState({
        file: '',
        type: '',
    })
    const [fileName, setFileName] = useState('')
    const [isDrag, setIsDrag] = useState(false)
    const [values, setValues] = useState<File | null>(null)

    const formContext = useFormContext()

    useEffect(() => {
        if (formContext) {
            formContext.setValue(name, values)
        }
    }, [values])

    const handleRemove = () => {
        setMediaFile({
            file: '',
            type: '',
        })
        setFileName('')
        setValues(null)
    }

    // Uploading Media
    const handleChange = (event: any, isDragging: boolean) => {
        setIsDrag(false)
        // Gettin file Data
        setValues(event.target.files[0])
        const FileData = event[0] || event.target.files[0]
        setMediaFile({
            file: URL.createObjectURL(FileData),
            type: FileData.type,
        })

        setFileName(FileData[0]?.name)
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

        // when user upload the file and after removing upload same file so its doens upload
        // for that purposr removed the value
        !isDragging && (event.target.value = '')
    }

    return (
        <div className="w-full">
            <Typography>
                <span className="font-bold">{label}</span>
            </Typography>

            {/* FileDrop For Drag file */}
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
                    className={`w-full h-36 border rounded-lg overflow-hidden relative ${
                        isDrag
                            ? 'bg-primary-light flex justify-center items-center border-primary'
                            : 'bg-white border-secondary-dark'
                    }`}
                >
                    {isDrag ? (
                        // Showing text on Drop File
                        <Typography variant={'badge'} color={'primary'}>
                            Drop Here
                        </Typography>
                    ) : mediaFile.file ? (
                        <div className="relative w-full h-full">
                            <AiFillDelete
                                className="absolute top-2 right-2 z-10 cursor-pointer text-gray-light text-xl"
                                onClick={handleRemove}
                            />
                            {/* For Preview the Media */}
                            {mediaFile.type === 'video/mp4' ? (
                                // Preview Video
                                <VideoPreview url={mediaFile.file} />
                            ) : mediaFile.type === 'image/png' ? (
                                // preview Image
                                <img
                                    className="w-full h-full object-cover"
                                    src={mediaFile.file}
                                    alt={name}
                                />
                            ) : (
                                // Preview Document
                                <div className="flex justify-center items-center w-full h-full">
                                    <BsFillFileEarmarkPdfFill className="text-5xl text-gray" />
                                </div>
                            )}

                            {/* Showing details after uploading media */}
                            <div
                                className={`absolute bottom-0 pt-1.5 pb-5 w-full flex justify-between px-4 ${
                                    (mediaFile.type === 'video/mp4' ||
                                        mediaFile.type === 'image/png') &&
                                    'bg-gradient-to-b from-[#00000000] to-black text-white'
                                }`}
                            >
                                <Typography
                                    color={
                                        mediaFile.type === 'video/mp4' ||
                                        mediaFile.type === 'image/png'
                                            ? 'white'
                                            : 'gray'
                                    }
                                >
                                    {fileName}
                                    {/* {elipiciseText(fileName, 15)} */}
                                </Typography>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={`w-full h-full flex justify-center items-center flex-col`}
                        >
                            <label
                                htmlFor={`file_id_${name}`}
                                className="cursor-pointer hover:underline"
                            >
                                <AiFillPlusCircle className="text-6xl text-gray-light" />
                            </label>
                            {/* </Typography> */}
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    id={`file_id_${name}`}
                    // name={name}
                    className="hidden"
                    // {...fileUpload}
                    // onChange={(e: any) => {
                    //     fileUpload.onChange(e)
                    //     onChange && onChange(e)
                    //     handleChange(e, false)
                    // }}
                    {...(formContext ? formContext.register(name) : { name })}
                    // {...getMethodsForInput(
                    //     name,
                    //     formContext,
                    //     rules,
                    //     (e: any) => {
                    //         onChange && onChange(e)
                    //         handleChange(e, false)
                    //     },
                    //     onBlur
                    // )}
                    onChange={(e: any) => {
                        onChange && onChange(e)
                        handleChange(e, false)
                    }}
                    // {...(acceptFiles
                    //     ? { accept: getMimeTypes(acceptFiles) }
                    //     : {})}
                    {...(multiple ? { multiple } : {})}
                />
                <InputErrorMessage name={name} />
            </FileDrop>
        </div>
    )
}
