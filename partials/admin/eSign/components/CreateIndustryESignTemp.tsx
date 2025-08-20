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
import { AuthApi } from '@queries'
import { OptionType } from '@types'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FiUsers } from 'react-icons/fi'
import * as Yup from 'yup'

export const CreateIndustryESignTemp = ({
    edit,
    onSubmit,
    result,
    esignData,
}: {
    result?: any
    edit?: any
    onSubmit: (values: any) => void
    esignData?: any
}) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null)
    const [selectedSector, setSelectedSector] = useState<number | null>(null)

    const sectorResponse = AuthApi.useSectors({})

    const sectorOptions = useMemo(
        () =>
            sectorResponse.data?.map((sector: any) => ({
                label: sector?.name,
                value: sector?.id,
            })),
        [sectorResponse]
    )

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        sector: Yup.number().required('Sector is required'),
        recipients: Yup.array().min(1, 'Must select at least 1 Recipient'),
        file: Yup.mixed()
            .test('fileSize', (value: any) => {
                return edit
                    ? fileUrl
                        ? true
                        : value && [...value]?.length > 0
                        ? true
                        : false
                    : value && [...value]?.length > 0
                    ? true
                    : false
            })
            .required('File is required!'),
    })

    const methods = useForm<any>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            recipients: [UserRoles.INDUSTRY], // Initialize as empty array
        },
    })

    useEffect(() => {
        if (esignData) {
            methods.setValue('name', esignData?.name)
            // Ensure recipients is always an array
            methods.setValue(
                'recipients',
                Array.isArray(esignData?.recipients) ? esignData.recipients : []
            )
            methods.setValue('file', esignData?.file)
            setFileUrl(esignData?.file)
            setSelectedSector(esignData?.sector?.id)
        }
    }, [esignData])

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
                                <div className="relative z-40">
                                    <Select
                                        label={'Sector'}
                                        options={sectorOptions}
                                        loading={sectorResponse?.isLoading}
                                        disabled={sectorResponse?.isLoading}
                                        value={sectorOptions?.find(
                                            (sector: OptionType) =>
                                                sector?.value === selectedSector
                                        )}
                                        onChange={(e: number) => {
                                            setSelectedSector(e)
                                        }}
                                        name="sector"
                                        placeholder="Select..."
                                        onlyValue
                                    />
                                </div>
                            </Card>
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

                            {/* Updated checkbox to handle array properly */}
                            <div className="space-y-3">
                                <div>
                                    <Checkbox
                                        label={'Industry'}
                                        name={'recipients'}
                                        value={UserRoles.INDUSTRY}
                                    />
                                    <Typography
                                        variant="muted"
                                        color="text-gray-400"
                                    >
                                        Industry professionals will be the
                                        primary signers for this document
                                        template.
                                    </Typography>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex justify-end items-center gap-x-2">
                        <Button text="Cancel" outline variant="secondary" />
                        <Button
                            text={`${edit ? 'Update' : 'Save'} & Next`}
                            loading={result?.isLoading}
                            disabled={result?.isLoading}
                            submit
                            variant={edit ? 'info' : 'primary'}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
