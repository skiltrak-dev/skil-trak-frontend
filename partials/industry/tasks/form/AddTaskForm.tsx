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
} from '@components'

// redux
import { useGetEmployeeQuery, useAddEmployeeTaskMutation } from '@queries'
import { getDate } from '@utils'
import { useNotification } from '@hooks'

const DaysOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
]

export const AddTaskForm = ({ setIsSchedule, publishTask, DraftTask }: any) => {
    const [filteredDays, setFilteredDays] = useState(DaysOptions)

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
            setIsSchedule(false)
        }
    }, [addEmployeeData, setIsSchedule])

    const onSelectEmployee = (employee: any) => {
        const selectedEmployeeTasks = EmployeeData?.data?.data
            ?.find((selected: any) => selected.id === employee)
            ?.tasks?.map((task: any) => task.day)
        const filteredData = DaysOptions.filter(
            (days) => !selectedEmployeeTasks?.includes(days.value)
        )
        setFilteredDays(filteredData)
    }

    const validationSchema = yup.object({
        selectEmployee: yup
            .number()
            .nullable(true)
            .required('Employee is a required field'),
        day: yup.string().required('Day is a required field'),
        title: yup.string().required('Title is a required field'),
        location: yup.string().required('Location is a required field'),
        dated: yup.string().required('Dated is a required field'),
        totalHours: yup.string().required('Total Hours is a required field'),
        note: yup.string().required('Note is a required field'),
        startTime: yup.string().required('Start Time is a required field'),
        endTime: yup.string().required('End Time is a required field'),
        email: yup
            .string()
            .email('Invalid Email')
            .required('Email is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const employee = values.selectEmployee
        delete values.selectEmployee
        await addEmployee({
            employee,
            sendInvite: true,
            tasks: [values],
        })
        // publishTask(values);
    }

    return (
        <div>
            <ShowErrorNotifications result={addEmployeeData} />
            <div className="flex justify-between items-center">
                <Typography variant={'subtitle'}>Add Shift</Typography>
                <ImCancelCircle
                    className="cursor-pointer text-xl"
                    onClick={() => setIsSchedule(false)}
                />
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

                    <div className="grid grid-cols-2 gap-2 mb-6">
                        <TextInput
                            label={'Dated'}
                            name={'dated'}
                            type={'date'}
                            min={getDate()}
                            placeholder={'Dated...'}
                        />
                        <Select
                            required
                            label={'Day'}
                            name={'day'}
                            options={filteredDays}
                            onlyValue
                        />
                        <TextInput
                            label={'Total Hours'}
                            name={'totalHours'}
                            type={'number'}
                            placeholder={'Total Hours...'}
                        />

                        <TextInput
                            label={'Start Time'}
                            name={'startTime'}
                            type={'date'}
                            min={getDate()}
                            placeholder={'Start Time...'}
                        />
                        <TextInput
                            label={'End Time'}
                            name={'endTime'}
                            placeholder={'End Time...'}
                            type={'date'}
                            min={getDate()}
                        />
                        <Select
                            label={'Priority'}
                            name={'priority'}
                            options={[
                                { value: 'low', label: 'Low ' },
                                { value: 'high', label: 'High' },
                                { value: 'medium', label: 'Medium ' },
                            ]}
                            onlyValue
                        />
                    </div>

                    <Typography variant={'small'} color={'gray'}>
                        Shift Details
                    </Typography>

                    <div className="flex flex-col gap-y-2 my-2">
                        <TextInput
                            required
                            label={'Title'}
                            name={'title'}
                            placeholder={'Some Text Here...'}
                        />
                        <TextInput
                            required
                            label={'Email'}
                            name={'email'}
                            placeholder={'Email...'}
                        />
                        <TextInput
                            required
                            label={'Location'}
                            name={'location'}
                            placeholder={'Some Text Here...'}
                        />

                        <TextArea required label={'Notes'} name={'note'} />
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
                        {/* <Button variant={'secondary'} onClick={() => DraftTask(values)}>
              Draft
            </Button> */}
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
