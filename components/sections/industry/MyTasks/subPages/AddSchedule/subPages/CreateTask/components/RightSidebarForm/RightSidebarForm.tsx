import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'

// Icons
import { ImCancelCircle } from 'react-icons/im'

// components
import {
    Button,
    Checkbox,
    Textarea,
    Typography,
    InputField,
    SelectFieldOption,
} from 'components'

// Functions
import { Console } from 'utills/functions/ShowConsole'

// redux
import { useGetEmployeeQuery, useAddEmployeeTaskMutation } from 'redux/query'

const DaysOptions = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
]

export const RightSidebarForm = ({ setIsSchedule, publishTask, DraftTask }) => {
    const [filteredDays, setFilteredDays] = useState(DaysOptions)
    // Employee
    const EmployeeData = useGetEmployeeQuery()

    console.log('EmployeeDataEmployeeData', EmployeeData)

    // Add Task
    const [addEmployee, addEmployeeData] = useAddEmployeeTaskMutation()

    useEffect(() => {
        addEmployeeData.isSuccess && setIsSchedule(false)
    }, [addEmployeeData.isSuccess, setIsSchedule])

    const onSelectEmployee = (employee) => {
        const selectedEmployeeTasks = EmployeeData?.data?.data
            ?.find((selected) => selected.id === employee.value)
            .tasks?.map((task) => task.day)
        const filteredData = DaysOptions.filter(
            (days) => !selectedEmployeeTasks.includes(days.value)
        )
        setFilteredDays(filteredData)
        console.log('filteredDatafilteredData', filteredData)
        // const getAssignedCourses = sectors.map((sector) =>
        //     sector.courses.map((course) => course)
        // )
        // const flatAssignedCourses = getAssignedCourses.flat()
        // const getCourseName = flatAssignedCourses.map((c) => c.name)
        // return courseOptions.filter((c) => !getCourseName.includes(c.label))
    }

    const initialValues = {
        day: '',
        dated: '',
        note: '',
        title: '',
        endTime: '',
        priority: '',
        location: '',
        email: '',
        startTime: '',
        totalHours: '',
        selectEmployee: {},
        repeatShift: false,
    }

    const validationSchema = yup.object({})

    const onSubmit = async (values) => {
        const employee = values.selectEmployee.value
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
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(props) => {
                    const { touched, errors, setFieldValue, values } = props
                    return (
                        <Form className="mt-8">
                            <Typography variant={'smallText'} color={'gray'}>
                                Employee
                            </Typography>

                            <div className="mb-6">
                                <SelectFieldOption
                                    label={'Select Employee'}
                                    setFieldValue={setFieldValue}
                                    name={'selectEmployee'}
                                    options={
                                        EmployeeData.isSuccess
                                            ? EmployeeData?.data?.data?.map(
                                                  (
                                                      {
                                                          id,
                                                          firstName,
                                                          lastName,
                                                      },
                                                      i
                                                  ) => ({
                                                      value: id,
                                                      label: `${firstName} ${lastName}`,
                                                  })
                                              )
                                            : []
                                    }
                                    onChange={onSelectEmployee}
                                />
                            </div>

                            <Typography variant={'smallText'} color={'gray'}>
                                Shift Date {'&'} Time
                            </Typography>

                            <div className="grid grid-cols-2 gap-2 mb-6">
                                <InputField
                                    label={'Dated'}
                                    name={'dated'}
                                    type={'date'}
                                    placeholder={'Dated...'}
                                    touched={touched}
                                    errors={errors}
                                />
                                <SelectFieldOption
                                    label={'Day'}
                                    setFieldValue={setFieldValue}
                                    name={'day'}
                                    options={filteredDays}
                                />
                                <InputField
                                    label={'Total Hours'}
                                    name={'totalHours'}
                                    type={'number'}
                                    placeholder={'Total Hours...'}
                                    touched={touched}
                                    errors={errors}
                                />

                                <InputField
                                    label={'Start Time'}
                                    name={'startTime'}
                                    type={'date'}
                                    placeholder={'Start Time...'}
                                    touched={touched}
                                    errors={errors}
                                />
                                <InputField
                                    label={'End Time'}
                                    name={'endTime'}
                                    placeholder={'End Time...'}
                                    type={'date'}
                                    touched={touched}
                                    errors={errors}
                                />
                                <SelectFieldOption
                                    label={'Priority'}
                                    setFieldValue={setFieldValue}
                                    name={'priority'}
                                    options={[
                                        { value: 'low', label: 'Low ' },
                                        { value: 'high', label: 'High' },
                                        { value: 'medium', label: 'Medium ' },
                                    ]}
                                />
                            </div>

                            <Typography variant={'smallText'} color={'gray'}>
                                Shift Details
                            </Typography>

                            <div className="flex flex-col gap-y-2 my-2">
                                <InputField
                                    label={'Title'}
                                    name={'title'}
                                    placeholder={'Some Text Here...'}
                                    touched={touched}
                                    errors={errors}
                                />
                                <InputField
                                    label={'Email'}
                                    name={'email'}
                                    placeholder={'Email...'}
                                    touched={touched}
                                    errors={errors}
                                />
                                <InputField
                                    label={'Location'}
                                    name={'location'}
                                    placeholder={'Some Text Here...'}
                                    touched={touched}
                                    errors={errors}
                                />

                                <Textarea
                                    label={'Notes'}
                                    name={'note'}
                                    touched={touched}
                                    errors={errors}
                                />
                            </div>

                            <div className="mb-6">
                                <Checkbox
                                    name={'repeatShift'}
                                    label={'Repeat Shift'}
                                />
                            </div>

                            <div className="flex items-center gap-x-2">
                                <Button
                                    submit
                                    loading={addEmployeeData.isLoading}
                                    disabled={addEmployeeData.isLoading}
                                >
                                    Publish
                                </Button>
                                <Button
                                    variant={'secondary'}
                                    onClick={() => DraftTask(values)}
                                >
                                    Draft
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
