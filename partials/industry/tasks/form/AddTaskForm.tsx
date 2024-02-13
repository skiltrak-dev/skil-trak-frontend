import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// Icons
import { ImCancelCircle } from 'react-icons/im'

// components
import {
    Button,
    Checkbox,
    TextArea,
    Typography,
    TextInput,
    Select,
    ShowErrorNotifications,
    Card,
} from 'components'

// redux
import { useGetEmployeeQuery, useAddEmployeeTaskMutation } from '@queries'
import { getDate } from '@utils'
import { useNotification } from '@hooks'
import { useRouter } from 'next/router'

const DaysOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
]

export const AddTaskForm = ({ publishTask, DraftTask }: any) => {
    const [filteredDays, setFilteredDays] = useState(DaysOptions)
    const [email, setEmail] = useState('')
    const router = useRouter()
    // hooks
    const { notification } = useNotification()
    // Employee
    const EmployeeData = useGetEmployeeQuery(null)

    // Add Task
    const [addEmployee, addEmployeeData] = useAddEmployeeTaskMutation()

    useEffect(() => {
        if (addEmployeeData.isSuccess) {
            notification.success({
                title: 'Schedule Added',
                description: 'Schedule Added Successfully',
            })
            router.push(
                '/portals/industry/tasks/add-a-schedule/schedule?tab=create-task'
            )
            // setIsSchedule(false)
        }
    }, [addEmployeeData])

    const onSelectEmployee = (employee: any) => {
        const selectedEmployeeTasks = EmployeeData?.data?.data
            ?.find((selected: any) => selected.id === employee)
            ?.tasks?.map((task: any) => task.day)
        const filteredData = DaysOptions.filter(
            (days) => !selectedEmployeeTasks?.includes(days.value)
        )
        setFilteredDays(filteredData)

        const selectedEmployeeEmail = EmployeeData?.data?.data?.find(
            (selected: any) => selected.id === employee
        )?.email
        if (selectedEmployeeEmail) {
            setEmail(selectedEmployeeEmail)
        }
    }

    // const validationSchema = yup.object({
    //     selectEmployee: yup
    //         .number()
    //         .nullable(true)
    //         .required('Employee is a required field'),
    //     day: yup.string().required('Day is a required field'),
    //     title: yup.string().required('Title is a required field'),
    //     location: yup.string().required('Location is a required field'),
    //     dated: yup.string().required('Dated is a required field'),
    //     totalHours: yup.string().required('Total Hours is a required field'),
    //     note: yup.string().required('Note is a required field'),
    //     startTime: yup.string().required('Start Time is a required field'),
    //     endTime: yup.string().required('End Time is a required field'),
    //     email: yup
    //         .string()
    //         .email('Invalid Email')
    //         .required('Email is required!'),
    // })

    const validationSchema = yup.object().shape({
        selectEmployee: yup
            .number()
            .nullable(true)
            .required('Employee is a required field'),
        // Validation for each day
        monday: yup
            .object()
            .nullable(true)
            .shape({
                totalHours: yup
                    .number()
                    .positive()
                    .required('Monday Total Hours is a required field')
                    .min(1),

                startTime: yup
                    .string()
                    .required('Monday Start Time is a required field'),

                endTime: yup
                    .string()
                    .required('Monday End Time is a required field'),
                priority: yup
                    .string()
                    .required('Monday Priority is a required field'),
                title: yup
                    .string()
                    .required('Monday Title is a required field'),
                location: yup
                    .string()
                    .required('Monday Location is a required field'),
                note: yup.string().required('Monday Note is a required field'),
            }),
        tuesday: yup
            .object()
            .nullable(true)
            .shape({
                totalHours: yup
                    .number()
                    .positive()
                    .required('Tuesday Total Hours is a required field')
                    .min(1),
                startTime: yup
                    .string()
                    .required('Tuesday Start Time is a required field'),
                endTime: yup
                    .string()
                    .required('Tuesday End Time is a required field'),
                priority: yup
                    .string()
                    .required('Tuesday Priority is a required field'),
                title: yup
                    .string()
                    .required('Tuesday Title is a required field'),
                location: yup
                    .string()
                    .required('Tuesday Location is a required field'),
                note: yup.string().required('Tuesday Note is a required field'),
            }),
        wednesday: yup
            .object()
            .nullable(true)
            .shape({
                totalHours: yup
                    .number()
                    .positive()
                    .required('Wednesday Total Hours is a required field')
                    .min(1),
                startTime: yup
                    .string()
                    .required('Wednesday Start Time is a required field'),
                endTime: yup
                    .string()
                    .required('Wednesday End Time is a required field'),
                priority: yup
                    .string()
                    .required('Wednesday Priority is a required field'),
                title: yup
                    .string()
                    .required('Wednesday Title is a required field'),
                location: yup
                    .string()
                    .required('Wednesday Location is a required field'),
                note: yup
                    .string()
                    .required('Wednesday Note is a required field'),
            }),
        thursday: yup
            .object()
            .nullable(true)
            .shape({
                totalHours: yup
                    .number()
                    .positive()
                    .required('Thursday Total Hours is a required field')
                    .min(1),
                startTime: yup
                    .string()
                    .required('Thursday Start Time is a required field'),
                endTime: yup
                    .string()
                    .required('Thursday End Time is a required field'),
                priority: yup
                    .string()
                    .required('Thursday Priority is a required field'),
                title: yup
                    .string()
                    .required('Thursday Title is a required field'),
                location: yup
                    .string()
                    .required('Thursday Location is a required field'),
                note: yup
                    .string()
                    .required('Thursday Note is a required field'),
            }),
        friday: yup
            .object()
            .nullable(true)
            .shape({
                totalHours: yup
                    .number()
                    .positive()
                    .required('Friday Total Hours is a required field')
                    .min(1),
                startTime: yup
                    .string()
                    .required('Friday Start Time is a required field'),
                endTime: yup
                    .string()
                    .required('Friday End Time is a required field'),
                priority: yup
                    .string()
                    .required('Friday Priority is a required field'),
                title: yup
                    .string()
                    .required('Friday Title is a required field'),
                location: yup
                    .string()
                    .required('Friday Location is a required field'),
                note: yup.string().required('Friday Note is a required field'),
            }),
        // Other fields outside of days

        email: yup
            .string()
            .email('Invalid Email')
            .required('Email is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    // const onSubmit = async (values: any) => {
    //     const employee = values.selectEmployee
    //     delete values.selectEmployee
    //     await addEmployee({
    //         employee,
    //         sendInvite: true,
    //         tasks: [values],
    //     })
    //     // publishTask(values);
    // }

    const onSubmit = async (values: any) => {
        const employee = values.selectEmployee
        delete values.selectEmployee

        const tasks = DaysOptions.map((day) => {
            const days = [
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
            ]
            const updatedValues = { ...values }
            days?.forEach((day) => {
                delete updatedValues[day as any]
            })
            return {
                ...updatedValues,
                ...values[day?.value],
                day: day.value,
            }
        })
        await addEmployee({
            employee,
            sendInvite: true,
            tasks: tasks,
        })
    }

    return (
        <Card>
            <ShowErrorNotifications result={addEmployeeData} />
            <div className="flex justify-between items-center">
                <Typography variant={'subtitle'}>Add Shift</Typography>
                {/* <ImCancelCircle
                    className="cursor-pointer text-xl"
                    // onClick={() => setIsSchedule(false)}
                /> */}
            </div>

            {/* Form */}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="mb-6">
                        <Select
                            label={'Select Employee'}
                            name={'selectEmployee'}
                            options={
                                EmployeeData.isSuccess
                                    ? EmployeeData?.data?.data?.map(
                                          ({
                                              id,
                                              firstName,
                                              lastName,
                                          }: any) => ({
                                              value: id,
                                              label: `${firstName} ${lastName}`,
                                          })
                                      )
                                    : []
                            }
                            loading={EmployeeData?.isLoading}
                            disabled={EmployeeData?.isLoading}
                            onlyValue
                            onChange={onSelectEmployee}
                        />
                    </div>

                    <Typography variant={'small'} color={'gray'}>
                        Shift Date {'&'} Time
                    </Typography>

                    <div className="grid grid-cols-2 mb-6">
                        {filteredDays.map((day) => (
                            <div
                                key={day.value}
                                className="border-r border-b p-4"
                            >
                                <TextInput
                                    label={day.label}
                                    name={`${day.value}`}
                                    type={'text'}
                                    value={day.value}
                                />
                                <TextInput
                                    label={'Total Hours'}
                                    name={`${day.value}.totalHours`}
                                    type={'number'}
                                    placeholder={'Total Hours...'}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <TextInput
                                        label={'Start Time'}
                                        name={`${day.value}.startTime`}
                                        type={'time'}
                                        // min={getDate()}
                                        placeholder={'Start Time...'}
                                    />
                                    <TextInput
                                        label={'End Time'}
                                        name={`${day.value}.endTime`}
                                        placeholder={'End Time...'}
                                        type={'time'}
                                        // min={getDate()}
                                    />
                                </div>
                                <Select
                                    label={'Priority'}
                                    name={`${day.value}.priority`}
                                    options={[
                                        { value: 'low', label: 'Low ' },
                                        { value: 'high', label: 'High' },
                                        { value: 'medium', label: 'Medium ' },
                                    ]}
                                    onlyValue
                                />

                                <TextInput
                                    required
                                    label={'Title'}
                                    name={`${day.value}.title`}
                                    placeholder={'Some Text Here...'}
                                />
                                <TextInput
                                    required
                                    label={'Location'}
                                    name={`${day.value}.location`}
                                    placeholder={'Location...'}
                                />

                                <TextArea
                                    required
                                    label={'Notes'}
                                    name={`${day.value}.note`}
                                />
                            </div>
                        ))}
                    </div>

                    <Typography variant={'small'} color={'gray'}>
                        Shift Details
                    </Typography>

                    <div className="flex flex-col gap-y-2 my-2">
                        <TextInput
                            required
                            label={'Email'}
                            name={'email'}
                            placeholder={'Email...'}
                            value={email || ''}
                        />
                    </div>

                    <div className="mb-6">
                        <Checkbox name={'repeatShift'} label={'Repeat Shift'} />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <Button
                            submit
                            loading={addEmployeeData.isLoading}
                            disabled={addEmployeeData.isLoading}
                        >
                            Publish
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}
