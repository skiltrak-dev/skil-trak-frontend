import { useEffect, useState, ReactElement } from 'react'
import { FileDrop } from 'react-file-drop'

// Icons

// components
import {
    HelpText,
    PdfViewer,
    RequiredStar,
    Tooltip,
    Typography,
    VideoPreview,
} from '@components'
import { FileData } from '@types'
import {
    FileFormat,
    getFileExtension,
    getMimeTypes,
    SupportedDocumentFormats,
    SupportedImageFormats,
    SupportedVideoFormats,
} from '@utils'
import { useFormContext } from 'react-hook-form'
import { IoMdDocument } from 'react-icons/io'
import { InputProps } from '@components/inputs/InputPropType'

export const FileMimeTypes = {
    video: SupportedVideoFormats,
    image: SupportedImageFormats,
    documents: SupportedDocumentFormats,
}

const AcceptMimeTypes = [...Object.values(FileMimeTypes)] as const

export const isFileTypeAcceptable = (types: string[]) => {
    return types.some((t) =>
        AcceptMimeTypes.some((mimeType) => mimeType.includes(t))
    )
}

export const isFileTypeSelectable = (fileType: string, types: string[]) => {
    const includesFileType = types.some((t) => fileType.includes(t))
    const isValidType = types.some((t) => {
        return t === 'document' || t === 'video' || t === 'image'
    })
    return includesFileType || isValidType
}

export type FileUploadProps = InputProps & {
    acceptTypes?: typeof AcceptMimeTypes[number][]
    component?: any
}

export const FileUpload = ({
    id,
    name,
    label,

    acceptTypes,

    helpText,
    tooltip,

    value,
    rules,
    onChange,
    onBlur,

    required,
    disabled,
    loading,
    component,
}: FileUploadProps) => {
    const formContext = useFormContext()

    const [values, setValues] = useState<File[] | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [fileObject, setFileObject] = useState<string | null>(null)
    const [invalidSelection, setInvalidSelection] = useState(false)

    const [dragging, setDragging] = useState(false)

    const handleRemove = () => {
        setFile(null)
        setFileObject(null)
        setInvalidSelection(false)
    }

    useEffect(() => {
        if (formContext && values) {
            console.log('::: VALUES TO SET', values)
            formContext.setValue(name, values)
            console.log('::: SETTING VALUE', formContext.getValues())
        }
    }, [values])

    // Uploading Media
    const handleChange = (event: any, isDragging: boolean) => {
        setDragging(false)

        // Getting file Data
        const fileData: File = event[0] || event.target.files[0]

        // console.log(":::: EVENT Before", event.target.files);

        // if (formContext && event.target) {
        // 	formContext.setValue(name, values);
        // 	console.log("::: SETTING VALUE", formContext.getValues());
        // }
        // console.log(":::: EVENT After", event.target.files);

        const reader: any = new FileReader()
        if (reader) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    // Sending file data to field
                    fileData &&
                        onChange &&
                        onChange({
                            name: fileData.name,
                            type: fileData.type,
                            extension: getFileExtension(fileData),
                            data: reader.result.toString(),
                        } as FileData)
                    // fileUpload(name, reader.result.toString());
                }
            }
        }

        // setting file data to state to preview the Data
        if (acceptTypes) {
            if (
                isFileTypeAcceptable(acceptTypes) &&
                isFileTypeSelectable(fileData.type, acceptTypes)
            ) {
                setInvalidSelection(false)
                setFile(fileData)
                setFileObject(URL.createObjectURL(fileData))
            } else {
                setInvalidSelection(true)
            }
        } else {
            setInvalidSelection(false)
            setFile(fileData)
            setFileObject(URL.createObjectURL(fileData))
        }

        reader.readAsDataURL(fileData)

        // when user upload the file and after removing upload same file so its does upload
        // for that purpose removed the value
        !isDragging && (event.target.value = '')
    }

    const Components = component

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center">
                    <div>
                        <Typography variant={'label'}>{label}</Typography>
                        {required && <RequiredStar />}
                    </div>
                    {tooltip && <Tooltip text={tooltip} />}
                </div>
            )}

            {/* FileDrop For Drag file */}
            <FileDrop
                onDragOver={() => {
                    setDragging(true)
                }}
                onDragLeave={() => {
                    setDragging(false)
                }}
                onDrop={(event) => handleChange(event, true)}
            >
                <Components
                    file={file}
                    name={name}
                    dragging={dragging}
                    fileObject={fileObject}
                    handleRemove={handleRemove}
                    invalidSelection={invalidSelection}
                />
                <input
                    type="file"
                    id={`file_id_${name}`}
                    // name={name}
                    className="hidden"
                    // {...getMethodsForInput(
                    // 	name,
                    // 	formContext,
                    // 	rules,
                    // 	(e: any) => {
                    // 		onChange && onChange(e);
                    // 		handleChange(e, false);
                    // 	},
                    // 	onBlur
                    // )}
                    {...(formContext ? formContext.register(name) : { name })}
                    onChange={(e: any) => {
                        console.log(':::: IN ON CHANGE', e.target.files)
                        setValues(e.target.files)
                        handleChange(e, false)
                        // onChange && onChange(e);
                    }}
                    {...(acceptTypes
                        ? { accept: getMimeTypes(acceptTypes) }
                        : {})}
                    multiple
                />
                {/* <Controller
					control={formContext.control}
					name={name}
					render={({
						// field: { onChange, onBlur, value, name, ref },
						field,
						fieldState: {isTouched, isDirty, error },
						formState,
					}) => (
						<input
							ref={field.ref}
							type="file"
							id={`file_id_${name}`}
							name={field.name}
							className="hidden"
							onChange={(e: any) => {
								handleChange(e, false);
								field.onChange(e);
							}}
							onBlur={(e: any) => {
								field.onBlur();
								onBlur && onBlur();
							}}
							{...(acceptTypes
								? { accept: getMimeTypes(acceptTypes) }
								: {})}
						/>
					)}
				/> */}
            </FileDrop>

            <HelpText text={helpText} />
        </div>
    )
}
