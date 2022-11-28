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
} from 'components'

// redux
import { useGetEmployeeQuery, useAddEmployeeTaskMutation } from '@queries'

const DaysOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
]

export const AddTaskForm = ({ setIsSchedule, publishTask, DraftTask }: any) => {
    const [filteredDays, setFilteredDays] = useState(DaysOptions)
    // Employee
    const EmployeeData = useGetEmployeeQuery(null)

    // Add Task
    const [addEmployee, addEmployeeData] = useAddEmployeeTaskMutation()

    useEffect(() => {
        addEmployeeData.isSuccess && setIsSchedule(false)
    }, [addEmployeeData.isSuccess, setIsSchedule])

    const onSelectEmployee = (employee: any) => {
        const selectedEmployeeTasks = EmployeeData?.data?.data
            ?.find((selected: any) => selected.id === employee)
            .tasks?.map((task: any) => task.day)
        const filteredData = DaysOptions.filter(
            (days) => !selectedEmployeeTasks.includes(days.value)
        )
        setFilteredDays(filteredData)
    }

    const validationSchema = yup.object({})

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
            tasks: [
                {
                    ...values,
                    day: values.day.value,
                    priority: values.priority.value,
                },
            ],
        })
        // publishTask(values);
    }

    return (
        <div>
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
                    <Typography variant={'small'} color={'gray'}>
                        Employee
                    </Typography>

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
                            placeholder={'Dated...'}
                        />
                        <Select
                            label={'Day'}
                            name={'day'}
                            options={filteredDays}
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
                            placeholder={'Start Time...'}
                        />
                        <TextInput
                            label={'End Time'}
                            name={'endTime'}
                            placeholder={'End Time...'}
                            type={'date'}
                        />
                        <Select
                            label={'Priority'}
                            name={'priority'}
                            options={[
                                { value: 'low', label: 'Low ' },
                                { value: 'high', label: 'High' },
                                { value: 'medium', label: 'Medium ' },
                            ]}
                        />
                    </div>

                    <Typography variant={'small'} color={'gray'}>
                        Shift Details
                    </Typography>

                    <div className="flex flex-col gap-y-2 my-2">
                        <TextInput
                            label={'Title'}
                            name={'title'}
                            placeholder={'Some Text Here...'}
                        />
                        <TextInput
                            label={'Email'}
                            name={'email'}
                            placeholder={'Email...'}
                        />
                        <TextInput
                            label={'Location'}
                            name={'location'}
                            placeholder={'Some Text Here...'}
                        />

                        <TextArea label={'Notes'} name={'note'} />
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
