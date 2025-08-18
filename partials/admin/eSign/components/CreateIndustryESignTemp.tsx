import {
    Button,
    Card,
    Checkbox,
    Select,
    TextInput,
    Typography,
    UploadFile,
} from '@components'
import { FileUpload } from '@hoc'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FiUsers } from 'react-icons/fi'
import * as Yup from 'yup'

export const CreateIndustryESignTemp = ({ edit }: { edit?: any }) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null)

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        sector: Yup.number().required('Sector is required'),
        folder: Yup.number().required('Folder is required'),
        recipients: Yup.boolean().oneOf(
            [true],
            'Must select Industry Recipient'
        ),

        deadline: Yup.number()
            .positive('Deadline Must be positive')
            .max(180, 'Deadline must not exceed 180')
            .required('Deadline is required')
            .nullable(true),
        file: Yup.mixed()
            .test(
                'fileSize',
                // 'File size is too large',
                (value: any) => {
                    return edit
                        ? fileUrl
                            ? true
                            : value && [...value]?.length > 0
                            ? true
                            : false
                        : value && [...value]?.length > 0
                        ? true
                        : false
                }
            )
            .required('File is required!'),
    })
    const methods = useForm<any>({
        resolver: yupResolver(validationSchema),

        mode: 'all',
    })
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
    const onSubmit = (data: any) => {}
    return (
        <div className="">
            <FormProvider {...methods}>
                <form
                    className="w-full flex flex-col gap-y-2"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-3 gap-x-6">
                        <div className="col-span-2 flex flex-col gap-y-4">
                            <Card border>
                                <TextInput
                                    name="name"
                                    placeholder="name"
                                    label={'Name'}
                                    required
                                />
                                <Select
                                    label={'Sector'}
                                    options={[
                                        {
                                            label: 'Select Industry',
                                            value: 'Select Industry',
                                        },
                                        {
                                            label: 'Industry 1',
                                            value: 'Industry 1',
                                        },
                                        {
                                            label: 'Industry 2',
                                            value: 'Industry 2',
                                        },
                                        {
                                            label: 'Industry 3',
                                            value: 'Industry 3',
                                        },
                                    ]}
                                    name="sectors"
                                    placeholder="Select..."
                                />
                                <Select
                                    label={'Folder'}
                                    options={[
                                        {
                                            label: 'Select Industry',
                                            value: 'Select Industry',
                                        },
                                        {
                                            label: 'Industry 1',
                                            value: 'Industry 1',
                                        },
                                        {
                                            label: 'Industry 2',
                                            value: 'Industry 2',
                                        },
                                        {
                                            label: 'Industry 3',
                                            value: 'Industry 3',
                                        },
                                    ]}
                                    name="industryFolder"
                                    placeholder="Select..."
                                />
                                <TextInput
                                    name="deadline"
                                    placeholder="deadline"
                                    label={'Deadline (In Days)'}
                                    type="number"
                                />
                            </Card>{' '}
                            <Card border>
                                <FileUpload
                                    required
                                    name={'file'}
                                    component={onFileUpload}
                                    label={'Select Document'}
                                />
                            </Card>
                        </div>
                        <Card border fitHeight>
                            <div className="flex items-center gap-x-2 mb-4">
                                <div>
                                    <FiUsers />
                                </div>
                                <Typography variant="small">
                                    Recipients/Signers
                                </Typography>
                            </div>
                            <Checkbox name="recipients" label={'Industry'} />
                            <Typography variant="muted" color="text-gray-400">
                                Industry professionals will be the primary
                                signers for this document template.
                            </Typography>
                        </Card>
                    </div>

                    <div className="flex justify-end items-center gap-x-2">
                        <Button text="Cancel" outline variant="secondary" />
                        <Button text="Save & Next" submit />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
