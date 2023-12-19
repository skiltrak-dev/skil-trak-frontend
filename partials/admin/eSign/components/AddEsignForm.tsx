import {
    Button,
    Card,
    Checkbox,
    Select,
    TextInput,
    Typography,
    UploadFile,
} from '@components'
import { UserRoles } from '@constants'
import { FileUpload } from '@hoc'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { Course, Folder, OptionType, Rto } from '@types'
import React, { ReactNode, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const AddEsignForm = ({
    edit,
    data,
    actions,
    onSubmit,
}: {
    edit?: boolean
    data?: any
    actions: (methods?: any) => ReactNode
    onSubmit: (val: any) => void
}) => {
    const [selectedRto, setSelectedRto] = useState<number | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectedFolder, setselectedFolder] = useState<number | null>(null)
    const [fileUrl, setFileUrl] = useState<string | null>(null)

    const getRtos = AdminApi.ESign.useGetEsignRtos()

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required!'),
        user: Yup.number().required('Rto is required'),
        course: Yup.number().required('Course is required'),
        folder: Yup.number().required('Folder is required'),
        recipients: Yup.array().min(1, 'Must select at least 1 Recipient'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (data) {
            methods.setValue('name', data?.name)
            methods.setValue('recipients', data?.recipients)
            methods.setValue('user', data?.user?.id)
            methods.setValue('course', data?.course?.id)
            methods.setValue('folder', data?.folder?.id)
            // methods.setValue('file', data?.file)
            setSelectedRto(data?.user?.id)
            setSelectedCourse(data?.course?.id)
            setselectedFolder(data?.folder?.id)
            setFileUrl(data?.file)
        }
    }, [data])

    const onFileUpload = ({
        name,
        dragging,
        file,
        handleRemove,
        fileObject,
        invalidSelection,
    }: any) => {
        const onRemove = () => {
            handleRemove()
            setFileUrl(null)
        }

        if (file) {
            setFileUrl(null)
        }

        if (invalidSelection) {
            handleRemove()
        }

        return (
            <UploadFile
                name={name}
                dragging={dragging}
                file={fileUrl || file}
                handleRemove={onRemove}
                fileObject={
                    fileUrl
                        ? {
                              type: 'pdf',
                          }
                        : fileObject
                }
            />
        )
    }

    const rtoOptions = getRtos.data?.map((rto: Rto) => ({
        label: rto?.user?.name,
        value: rto?.user?.id,
    }))

    const rto = getRtos?.data?.find((rto: Rto) => rto?.user?.id === selectedRto)

    const coursesOptions = rto?.courses?.map((course: Course) => ({
        label: course?.title,
        value: course?.id,
        item: course,
    }))

    const folderOptions = rto?.courses
        ?.find((course: Course) => course?.id === Number(selectedCourse))
        ?.assessmentEvidence?.map((folder: Folder) => ({
            label: folder?.name,
            value: folder?.id,
        }))

    return (
        <Card>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit((values) => {
                        if (values?.file?.[0] || values?.file) {
                            onSubmit(values)
                        } else {
                            methods.setError('file', {
                                type: 'Required',
                                message: 'File is required',
                            })
                        }
                    })}
                >
                    <div className="grid grid-cols-2 divide-x-2">
                        <div>
                            <div className="w-[500px]">
                                <Typography
                                    semibold
                                    variant="small"
                                    color="text-gray-500"
                                >
                                    Docement Detail
                                </Typography>
                                <div className="w-96">
                                    <TextInput
                                        label={'Name'}
                                        name={'name'}
                                        placeholder={'Document Name Here...'}
                                        validationIcons
                                        required
                                    />

                                    <Select
                                        name={'user'}
                                        label={'RTO'}
                                        options={rtoOptions}
                                        onChange={(e: number) => {
                                            setSelectedRto(e)
                                        }}
                                        value={rtoOptions?.find(
                                            (rto: OptionType) =>
                                                rto?.value ===
                                                Number(
                                                    methods.getValues('user')
                                                )
                                        )}
                                        onlyValue
                                        loading={getRtos.isLoading}
                                        disabled={
                                            !rtoOptions || getRtos.isLoading
                                        }
                                    />
                                    <Select
                                        name={'course'}
                                        label={'Course'}
                                        options={coursesOptions}
                                        value={coursesOptions?.find(
                                            (course: OptionType) =>
                                                course?.value ===
                                                Number(
                                                    methods.getValues('course')
                                                )
                                        )}
                                        onChange={(e: number) => {
                                            setSelectedCourse(e)
                                        }}
                                        onlyValue
                                        disabled={!coursesOptions}
                                    />
                                    <Select
                                        name={'folder'}
                                        label={'Folder'}
                                        options={folderOptions}
                                        onChange={(e: number) => {
                                            setselectedFolder(e)
                                        }}
                                        value={folderOptions?.find(
                                            (folder: OptionType) =>
                                                folder?.value ===
                                                Number(
                                                    methods.getValues('folder')
                                                )
                                        )}
                                        onlyValue
                                        disabled={!folderOptions}
                                    />

                                    <TextInput
                                        name="deadline"
                                        label={'Deadline (In Days)'}
                                        placeholder={'Add Deadline'}
                                        type={'number'}
                                        defaultValue={'7'}
                                    />
                                </div>
                                <FileUpload
                                    name={'file'}
                                    component={onFileUpload}
                                    label={'Select Document'}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="px-5">
                                <Typography
                                    semibold
                                    variant="small"
                                    color="text-gray-500"
                                >
                                    Recipients/Signers
                                </Typography>
                                <div className="grid grid-cols-1 mt-1">
                                    <div className="mt-3">
                                        <Checkbox
                                            name={'recipients'}
                                            value={UserRoles.RTO}
                                            label={'Rto'}
                                        />
                                        <Checkbox
                                            name={'recipients'}
                                            value={UserRoles.SUBADMIN}
                                            label={'Coordinator'}
                                        />
                                        <Checkbox
                                            name={'recipients'}
                                            value={UserRoles.INDUSTRY}
                                            label={'Industry'}
                                        />
                                        <Checkbox
                                            name={'recipients'}
                                            value={UserRoles.STUDENT}
                                            label={'Student'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {actions(methods)}
                </form>
            </FormProvider>
        </Card>
    )
}
