import {
    BackButton,
    Button,
    Card,
    Checkbox,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
    UploadFile,
} from '@components'
import { PageHeading } from '@components/headings'
import { AdminLayout } from '@layouts'
import { AddCommentEnum, Course, Folder, Rto } from '@types'
import React, { ReactElement, useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { FileUpload } from '@hoc'
import { UserRoles } from '@constants'
import { useRouter } from 'next/router'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

const AddESign = () => {
    const router = useRouter()

    const [isSaveAndNext, setIsSaveAndNext] = useState<boolean | null>(null)
    const [selectedRto, setSelectedRto] = useState<number | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectedFolder, setselectedFolder] = useState<number | null>(null)

    const { notification } = useNotification()

    const getRtos = AdminApi.ESign.useGetEsignRtos()
    const [saveEsign, saveEsignResult] = AdminApi.ESign.useSaveEsign()

    const methods = useForm({
        mode: 'all',
    })

    useEffect(() => {
        if (saveEsignResult.isSuccess) {
            notification.success({
                title: 'Teplate Created',
                description: 'Template Created Successfully',
            })
            if (isSaveAndNext) {
                router.push(
                    `/portals/admin/e-sign/${saveEsignResult?.data?.id}/document-template`
                )
            } else if (isSaveAndNext === false) {
                router.push(
                    `/portals/admin/e-sign?tab=approved&page=1&pageSize=50`
                )
            }
        }
    }, [saveEsignResult, isSaveAndNext])

    const onSave = (values: any) => {
        // return null
        const formData = new FormData()
        Object.entries({ ...values, file: values?.file?.[0] }).forEach(
            ([key, value]: any) => {
                formData.append(key, value)
            }
        )
        saveEsign(formData)
    }

    const onSubmit = (values: any) => {
        setIsSaveAndNext(true)
        onSave(values)
    }

    const onHandleSave = (values: any) => {
        setIsSaveAndNext(false)
        onSave(values)
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
        <div className="p-4">
            <ShowErrorNotifications result={saveEsignResult} />
            <BackButton link={'/portals/admin'} text="Back To Dashboard" />
            <div className="flex">
                <PageHeading
                    title={'E-Sign Templates'}
                    subtitle={'Create and manage e-sign templates'}
                />
            </div>
            <Card>
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
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
                                            placeholder={
                                                'Document Name Here...'
                                            }
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
                                            onlyValue
                                            disabled={!folderOptions}
                                        />
                                    </div>
                                    <FileUpload
                                        name={'file'}
                                        component={UploadFile}
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
                        <div className="mt-4 flex gap-x-4 items-center justify-end">
                            <Button
                                submit
                                loading={
                                    saveEsignResult.isLoading &&
                                    Boolean(isSaveAndNext)
                                }
                                disabled={
                                    saveEsignResult.isLoading &&
                                    Boolean(isSaveAndNext)
                                }
                            >
                                Save & Next
                            </Button>
                            <Button
                                onClick={() => {
                                    onHandleSave(methods.getValues())
                                }}
                                loading={
                                    saveEsignResult.isLoading &&
                                    Boolean(!isSaveAndNext)
                                }
                                disabled={
                                    saveEsignResult.isLoading &&
                                    Boolean(!isSaveAndNext)
                                }
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}

AddESign.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default AddESign
