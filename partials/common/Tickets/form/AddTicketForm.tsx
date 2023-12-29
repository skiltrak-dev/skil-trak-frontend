import {
    Button,
    Card,
    InitialAvatar,
    InputContentEditor,
    Select,
    TextInput,
    inputEditorErrorMessage,
} from '@components'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi, AuthApi, SubAdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { OptionType } from '@types'

enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

export const AddTicketForm = ({
    result,
    onSubmit,
    students,
    subadmins,
}: {
    result: any
    onSubmit: (values: any) => void
    students: any
    subadmins: any
}) => {
    const sectorResponse = AuthApi.useSectors({})

    const courses = sectorResponse?.data
        ?.map((sector: any) => {
            return sector?.courses?.map((course: any) => {
                return course
            })
        })
        .flat()
    const validationSchema = yup.object({
        assignedTo: yup.number().required('Must provide Assign To'),
        subject: yup.string().required('Must provide Subject'),
        // message: yup.string().,
        message: yup
            .mixed()
            .test('Message', 'Must Provide Message', (value) =>
                inputEditorErrorMessage(value)
            ),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const priorityOptions = [
        ...Object.entries(Priority).map(([label, value]) => ({
            label,
            value,
        })),
    ]

    // const studentsOptions = students?.data?.length
    //     ? students?.data?.map((student: any) => ({
    //           label: student?.user?.name,
    //           value: student?.id,
    //       }))
    //     : []
    const studentsOptions = students?.data?.length
        ? students?.data?.map((student: any) => ({
              label:
                  student?.user?.name +
                  student?.studentId +
                  student?.familyName,
              value: student?.id,
              item: student,
          }))
        : []

    const subAdminOptions = subadmins?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.user?.id,
    }))

    const courseOptions = courses?.map((opt: any) => ({
        label: opt?.title,
        value: opt?.id,
    }))

    return (
        <div>
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
                            <Select
                                label={'Assign TO'}
                                name={'assignedTo'}
                                placeholder={'Assign TO...'}
                                options={subAdminOptions}
                                loading={subadmins?.isLoading}
                                disabled={subadmins?.isLoading}
                                onlyValue
                            />
                            {/* <Select
                                label={'Link Student (Optional)'}
                                name={'student'}
                                placeholder={'Link Student (Optional)'}
                                options={studentsOptions}
                                onlyValue
                                loading={students.isLoading}
                                disabled={students?.isLoading}
                            /> */}
                            <Select
                                label={'Link Student (Optional)'}
                                name={'student'}
                                placeholder={'Link Student (Optional)'}
                                options={studentsOptions}
                                onlyValue
                                loading={students.isLoading}
                                disabled={students?.isLoading}
                                components={{
                                    Option: (optionItem: any) => (
                                        <div
                                            ref={optionItem.innerRef}
                                            {...optionItem.innerProps}
                                            className="cursor-pointer flex items-center justify-between text-sm px-2 py-1 hover:bg-gray-100 border-b border-secondary-dark"
                                        >
                                            <div className="px-2 flex items-center gap-x-2">
                                                {optionItem.data?.item?.user
                                                    ?.name && (
                                                    <InitialAvatar
                                                        name={
                                                            optionItem.data
                                                                ?.item?.user
                                                                ?.name
                                                        }
                                                        imageUrl={
                                                            optionItem.data
                                                                ?.item?.user
                                                                ?.avatar
                                                        }
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-[11px] text-gray-600">
                                                        {' '}
                                                        {
                                                            optionItem.data
                                                                ?.item
                                                                ?.studentId
                                                        }{' '}
                                                    </p>
                                                    <p>
                                                        {
                                                            optionItem.data
                                                                ?.item?.user
                                                                ?.name
                                                        }{' '}
                                                        {
                                                            optionItem.data
                                                                ?.item
                                                                ?.familyName
                                                        }{' '}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                }}
                                formatOptionLabel={(option: any) => {
                                    return (
                                        <div>
                                            <span>
                                                {option?.item?.studentId}
                                                {' - '}
                                            </span>
                                            <span>
                                                {option?.item?.user?.name}
                                                {' - '}
                                            </span>
                                            <span>
                                                {option?.item?.faimlyName}
                                            </span>
                                        </div>
                                    )
                                }}
                            />
                            <Select
                                label={'Select Course'}
                                name={'course'}
                                placeholder={'Select Course'}
                                options={courseOptions}
                                onlyValue
                                loading={sectorResponse.isLoading}
                                disabled={sectorResponse?.isLoading}
                            />
                            <Select
                                label={'Priority'}
                                name={'priority'}
                                placeholder={'Priority...'}
                                options={priorityOptions}
                                onlyValue
                            />
                        </div>
                        <TextInput
                            label={'Subject'}
                            name={'subject'}
                            placeholder={'Subject...'}
                            validationIcons
                            required
                        />

                        <InputContentEditor
                            name={'message'}
                            label={'Message'}
                        />

                        <Button
                            submit
                            text={'Open Ticket'}
                            variant={'dark'}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
