import React, { useState } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { Upload, X, FileText, CheckCircle } from 'lucide-react'
import { Button, TextInput } from '@components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ellipsisText } from '@utils'

interface FormData {
    title: string
    file: File | null
}

interface ValidationErrors {
    [key: string]: string
}

interface ValidationSchema {
    validate: (data: FormData) => ValidationErrors | null
}

// Yup validation (simulated - in real Next.js, install yup and @hookform/resolvers)
const createValidationSchema = (): ValidationSchema => ({
    validate: (data: FormData) => {
        const errors: ValidationErrors = {}

        if (!data.title || data.title.trim() === '') {
            errors.title = 'Title is required'
        } else if (data.title.length < 3) {
            errors.title = 'Title must be at least 3 characters'
        } else if (data.title.length > 100) {
            errors.title = 'Title must not exceed 100 characters'
        }

        if (!data.file) {
            errors.file = 'File is required'
        } else if (data.file.size > 5 * 1024 * 1024) {
            errors.file = 'File size must not exceed 5MB'
        }

        return Object.keys(errors).length > 0 ? errors : null
    },
})

// Separate File Upload Component
const FileUpload: React.FC<{ name: string }> = ({ name }) => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<FormData>()
    const [dragActive, setDragActive] = useState(false)
    const file = watch(name as keyof FormData) as File | null

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setValue(name as keyof FormData, e.dataTransfer.files[0] as any, {
                shouldValidate: true,
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setValue(name as keyof FormData, e.target.files[0] as any, {
                shouldValidate: true,
            })
        }
    }

    const removeFile = () => {
        setValue(name as keyof FormData, null as any, { shouldValidate: true })
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }

    const error = errors[name as keyof FormData]

    return (
        <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-700">
                Upload File
            </label>

            {!file ? (
                <div
                    className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
                        dragActive
                            ? 'border-blue-500 bg-blue-50'
                            : error
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        name={'file'}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    />

                    <div className="flex flex-col items-center justify-center py-6 px-4">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                                dragActive ? 'bg-blue-100' : 'bg-gray-200'
                            }`}
                        >
                            <Upload
                                className={`w-5 h-5 transition-colors duration-300 ${
                                    dragActive
                                        ? 'text-blue-600'
                                        : 'text-gray-500'
                                }`}
                            />
                        </div>

                        <p className="text-xs font-medium text-gray-700 mb-0.5">
                            Drop your file here, or{' '}
                            <span className="text-blue-600">browse</span>
                        </p>
                        <p className="text-[10px] text-gray-500">
                            Supports PDF, DOC, DOCX, TXT, JPG, PNG (Max 5MB)
                        </p>
                    </div>
                </div>
            ) : (
                <div className="border-2 border-green-200 bg-green-50 rounded-lg p-2.5 transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-2 flex-1">
                            <div className="w-7 h-7 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-3.5 h-3.5 text-green-600" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">
                                    {ellipsisText(file.name, 20)}
                                </p>
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={removeFile}
                            className="ml-2 p-0.5 rounded hover:bg-red-100 transition-colors duration-200 flex-shrink-0"
                        >
                            <X className="w-3.5 h-3.5 text-gray-500 hover:text-red-600" />
                        </button>
                    </div>

                    <div className="flex items-center mt-2 text-[10px] text-green-600">
                        <CheckCircle className="w-3 h-3 mr-0.5" />
                        File uploaded successfully
                    </div>
                </div>
            )}

            {error && (
                <p className="text-xs text-red-600 mt-0.5 animate-in fade-in duration-200">
                    {error.message as string}
                </p>
            )}
        </div>
    )
}

export const IndustryGalleryForm = ({
    onSubmit,
}: {
    onSubmit: (values: any) => void
}) => {
    const fileValidationSchema = yup
        .mixed<File>()
        .required('File is required')
        .test('fileSize', 'File size must not exceed 5MB', (value) => {
            if (!value) return false
            return value.size <= 5 * 1024 * 1024 // 5MB in bytes
        })
        .test(
            'fileType',
            'Only PDF, DOC, DOCX, TXT, JPG, and PNG files are allowed',
            (value) => {
                if (!value) return false
                const allowedTypes = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'text/plain',
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                ]
                return allowedTypes.includes(value.type)
            }
        )

    // Main form validation schema
    const formValidationSchema = yup.object().shape({
        title: yup
            .string()
            .required('Title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must not exceed 100 characters')
            .trim(),
        file: fileValidationSchema,
    })

    const methods = useForm<FormData>({
        defaultValues: {
            title: '',
            file: null,
        },
        resolver: yupResolver(formValidationSchema),
        mode: 'onBlur',
    })

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 backdrop-blur-sm border border-gray-100 max-w-md mx-auto">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-3"
                >
                    {/* Title Field */}
                    <TextInput
                        name="title"
                        label={'Title'}
                        placeholder="Add Title Here..."
                    />

                    {/* File Upload Component */}
                    <FileUpload name="file" />

                    <Button
                        submit
                        variant="info"
                        fullWidth
                        className="py-3"
                        text="Submit"
                        loading={methods.formState.isSubmitting}
                        disabled={methods.formState.isSubmitting}
                    />
                </form>
            </FormProvider>
        </div>
    )
}
