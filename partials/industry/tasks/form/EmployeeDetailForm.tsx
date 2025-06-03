import React, { useContext, useEffect } from 'react'
import {
    FormProvider,
    useForm,
    useFieldArray,
    Controller,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// components
import {
    ActionButton,
    Button,
    Checkbox,
    TextInput,
    Typography,
    //   ShowErrorNotifications,
} from '@components'

// query
import { useAddEmployeeMutation, useUpdateEmployeeMutation } from '@queries'

//hooks
import { useNotification } from '@hooks'

// utils
import { trimString } from '@utils'
import { MdDelete } from 'react-icons/md'

// import { EmployeeData } from "context";

export const EmployeeDetailForm = ({ onVolunteer, employeeDetail }: any) => {
    const [updateEmployee, updateEmployeeResult] = useUpdateEmployeeMutation()
    const [addEmployee, addEmployeeResult] = useAddEmployeeMutation()

    const { notification } = useNotification()

    useEffect(() => {
        if (addEmployeeResult.isSuccess) {
            notification.success({
                title: 'You have added an Employee',
                description: 'Some description for notification',
            })
        }
    }, [addEmployeeResult.isSuccess])

    const validationSchema = yup.object({
        employee: yup.array().of(
            yup.object().shape({
                firstName: yup.string().required('firstName is required'),
                lastName: yup.string().required('lastName is required'),
                mobileNo: yup.string().required('mobileNo is required'),
            })
        ),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            employee: [
                {
                    firstName: employeeDetail?.employee[0]?.firstName,
                    lastName: employeeDetail?.employee[0]?.lastName,
                    mobileNo: employeeDetail?.employee[0]?.mobileNo,
                    email: employeeDetail?.employee[0]?.email,
                },
            ],
            isInvite: false,
        },
        mode: 'all',
    })

    const { fields, append, remove } = useFieldArray({
        rules: { minLength: 1 },
        control: methods.control,
        name: 'employee',
    })

    const onSubmit = async (values: any) => {
        const employee = values.employee.map((data: any) => {
            return trimString(data)
        })
        onVolunteer(values)
        await addEmployee({ employee, isInvite: values.isInvite })

        methods.reset()
    }
    const onUpdate = async (values: any) => {
        const trimValues = trimString(values.employee[0])
        await updateEmployee({ body: trimValues, id: values.id })
    }
    return (
        <>
            {/* <ShowErrorNotifications
                result={
                    employeeData?.isEditing
                        ? updateEmployeeResult
                        : addEmployeeResult
                }
            /> */}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="border border-secondary-dark mt-6">
                        <div className="flex justify-between md:block">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 md:gap-x-6 p-2">
                                <Typography variant={'label'}>
                                    {' '}
                                    First Name*{' '}
                                </Typography>
                                <Typography variant={'label'}>
                                    {' '}
                                    Last Name*{' '}
                                </Typography>
                                <Typography variant={'label'}>
                                    Mobile Number*
                                </Typography>
                                <Typography variant={'label'}>
                                    {' '}
                                    Email{' '}
                                </Typography>
                            </div>
                            {fields.map((item, index) => (
                                <div
                                    // className="flex flex-col md:flex-row items-start gap-x-6 px-2 py-1"
                                    className="grid grid-cols-1 md:grid-cols-4 gap-y-2 md:gap-x-6 p-2"
                                    key={item?.id}
                                >
                                    <TextInput
                                        placeholder="Enter your First Name"
                                        name={`employee.${index}.firstName`}
                                    />
                                    <TextInput
                                        placeholder="Enter your Last Name"
                                        name={`employee.${index}.lastName`}
                                    />
                                    <TextInput
                                        placeholder="Enter your Mobile No"
                                        name={`employee.${index}.mobileNo`}
                                    />
                                    <div className="flex items-start gap-x-2">
                                        <TextInput
                                            placeholder="Enter your Email"
                                            name={`employee.${index}.email`}
                                        />
                                        <ActionButton
                                            Icon={MdDelete}
                                            onClick={() => {
                                                remove(index)
                                            }}
                                            variant="error"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* {!employeeData && ( */}
                        <div className="inline-block mb-2 ml-2">
                            <Button
                                onClick={() =>
                                    append({
                                        firstName: '',
                                        lastName: '',
                                        mobileNo: '',
                                        email: '',
                                    })
                                }
                                variant={'info'}
                                disabled={false}
                            >
                                + Add More
                            </Button>
                        </div>
                        {/* )} */}
                    </div>

                    <div className="mt-2">
                        <Checkbox name={'isInvite'} label={'Send an invite'} />
                    </div>

                    <Button
                        submit
                        loading={addEmployeeResult.isLoading}
                        disabled={addEmployeeResult.isLoading}
                        text={'Confirm'}
                        //   disabled={addEmployeeResult.isLoading || !isValid}
                    />
                </form>
            </FormProvider>
        </>
    )
}
