import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import { Button, TextInput } from '@components'

// query
import { useAddEmployeeMutation, useUpdateEmployeeMutation } from '@queries'

//hooks
import { useNotification } from '@hooks'

// utils
import { trimString } from '@utils'

// import { EmployeeData } from "context";

export const EditEmployeeDetailForm = ({
    values,
    onSubmit,
    result,
}: {
    values: any
    onSubmit: any
    result: any
}) => {
    const keys = ['firstName', 'lastName', 'mobileNo', 'email']

    const validationSchema = yup.object({
        firstName: yup.string().required('firstName is required'),
        lastName: yup.string().required('lastName is required'),
        mobileNo: yup.string().required('mobileNo is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: keys.reduce((a, v) => ({ ...a, [v]: values[v] }), {}),
        mode: 'all',
    })

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
                    <TextInput
                        placeholder="Enter your First Name"
                        label={'First Name'}
                        name={`firstName`}
                    />
                    <TextInput
                        placeholder="Enter your Last Name"
                        label={'Last Name'}
                        name={`lastName`}
                    />
                    <TextInput
                        placeholder="Enter your Mobile No"
                        label={'Mobile No'}
                        name={`mobileNo`}
                    />
                    <TextInput
                        placeholder="Enter your Email"
                        name={`email`}
                        label={'Email'}
                    />

                    <Button
                        submit
                        variant={'secondary'}
                        loading={result.isLoading}
                        disabled={result.isLoading}
                        text={'Update'}
                        //   disabled={addEmployeeResult.isLoading || !isValid}
                    />
                </form>
            </FormProvider>
        </>
    )
}
