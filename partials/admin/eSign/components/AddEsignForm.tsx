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
import { AdminApi } from '@queries'
import { Course, Folder, Rto } from '@types'
import React, { ReactNode, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const AddEsignForm = ({
    actions,
    onSubmit,
}: {
    actions: (methods: any) => ReactNode
    onSubmit: (val: any) => void
}) => {
    const [selectedRto, setSelectedRto] = useState<number | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
    const [selectedFolder, setselectedFolder] = useState<number | null>(null)

    const getRtos = AdminApi.ESign.useGetEsignRtos()

    const methods = useForm({
        mode: 'all',
    })

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
                    {actions(methods)}
                </form>
            </FormProvider>
        </Card>
    )
}
