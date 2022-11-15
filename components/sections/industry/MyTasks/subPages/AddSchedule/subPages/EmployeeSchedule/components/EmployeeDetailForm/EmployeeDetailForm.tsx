import React, { useContext, useEffect } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as yup from 'yup'

// view
import { EmployeeDataContext } from '../../../../ScheduleView'

// components
import {
    Button,
    Checkbox,
    InputField,
    Typography,
    ShowErrorNotifications,
} from 'components'

// query
import { useAddEmployeeMutation } from 'redux/query'

//hooks
import { useNotification } from 'hooks'

// redux
import { useUpdateEmployeeMutation } from 'redux/query'

// utills
import { trimString } from 'utills'

// import { EmployeeData } from "context";

export const EmployeeDetailForm = ({ onVolunteer }) => {
    const [updateEmployee, updateEmployeeResult] = useUpdateEmployeeMutation()
    const [addEmployee, addEmployeeResult] = useAddEmployeeMutation()

    const { notification } = useNotification()
    const { employeeData, setEmployeeData } = useContext(EmployeeDataContext)

    useEffect(() => {
        if (addEmployeeResult.isSuccess) {
            notification.success({
                title: 'You have added an Employee',
                description: 'Some description for notification',
            })
        }
    }, [addEmployeeResult.isSuccess])

    useEffect(() => {
        if (updateEmployeeResult.isSuccess) {
            notification.info({
                title: 'You have updated an Employee',
                description: 'Some description for notification',
            })
            setEmployeeData(null)
        }
    }, [updateEmployeeResult.isSuccess, setEmployeeData])

    const initialValues = {
        employee: [
            {
                firstName: '',
                lastName: '',
                mobileNo: '',
                email: '',
            },
        ],
        isInvite: false,
    }

    const validationSchema = yup.object({
        employee: yup.array().of(
            yup.object().shape({
                firstName: yup.string().required('firstName is required'),
                lastName: yup.string().required('lastName is required'),
                mobileNo: yup.string().required('mobileNo is required'),
            })
        ),
    })

    const onSubmit = async (values, { resetForm }) => {
        const employee = values.employee.map((data) => {
            return trimString(data)
        })
        onVolunteer(values)
        await addEmployee({ employee, isInvite: values.isInvite })
        resetForm()
    }
    const onUpdate = async (values) => {
        const trimValues = trimString(values.employee[0])
        await updateEmployee({ body: trimValues, id: values.id })
    }
    return (
        <>
            <ShowErrorNotifications
                result={
                    employeeData?.isEditing
                        ? updateEmployeeResult
                        : addEmployeeResult
                }
            />
            <Formik
                initialValues={employeeData || initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnMount
                enableReinitialize
            >
                {(props) => {
                    const { isValid, values } = props
                    return (
                        <Form>
                            <FieldArray name="employee">
                                {(props) => {
                                    const {
                                        push,
                                        form: {
                                            values: { employee },
                                            touched,
                                            errors,
                                        },
                                    } = props
                                    return (
                                        <div className="border border-secondary-dark mt-6">
                                            <div className="grid grid-cols-4 gap-x-6 p-2">
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
                                            {employee.map(
                                                (employeeDetail, index) => {
                                                    return (
                                                        <div
                                                            className="flex items-start gap-x-6 px-2 py-1"
                                                            key={index}
                                                        >
                                                            <InputField
                                                                name={`employee[${index}].firstName`}
                                                                placeholder={
                                                                    'Some Text Here...'
                                                                }
                                                                touched={
                                                                    props.form
                                                                        .touched
                                                                }
                                                                errors={
                                                                    props.form
                                                                        .errors
                                                                }
                                                            />
                                                            <InputField
                                                                name={`employee[${index}].lastName`}
                                                                placeholder={
                                                                    'Some Text Here...'
                                                                }
                                                                touched={
                                                                    touched
                                                                }
                                                                errors={errors}
                                                            />
                                                            <InputField
                                                                name={`employee[${index}].mobileNo`}
                                                                placeholder={
                                                                    'Some Text Here...'
                                                                }
                                                                touched={
                                                                    touched
                                                                }
                                                                errors={errors}
                                                            />
                                                            <InputField
                                                                name={`employee[${index}].email`}
                                                                type={'email'}
                                                                placeholder={
                                                                    'Some Text Here...'
                                                                }
                                                                touched={
                                                                    touched
                                                                }
                                                                errors={errors}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            )}
                                            {!employeeData && (
                                                <div className="flex flex-col">
                                                    <Button
                                                        onClick={() =>
                                                            push({
                                                                firstName: '',
                                                                lastName: '',
                                                                mobileNo: '',
                                                                email: '',
                                                            })
                                                        }
                                                        variant={'secondary'}
                                                        disabled={!isValid}
                                                    >
                                                        + Add Another Entry
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                }}
                            </FieldArray>
                            <div className="my-6">
                                <Checkbox
                                    name={'isInvite'}
                                    label={'Send an invite'}
                                />
                            </div>
                            {employeeData?.isEditing ? (
                                <Button
                                    variant={'secondary'}
                                    onClick={() => onUpdate(values)}
                                    loading={updateEmployeeResult.isLoading}
                                >
                                    Update
                                </Button>
                            ) : (
                                <Button
                                    submit
                                    loading={addEmployeeResult.isLoading}
                                    disabled={
                                        addEmployeeResult.isLoading || !isValid
                                    }
                                >
                                    Confirm
                                </Button>
                            )}
                            {/* <Button
              type={"submit"}
              border={"2"}
              borderColor={"primary"}
              bgColor={"primary"}
              disabled={addEmployeeResult.isLoading || !isValid}
            >
              Confirm
            </Button> */}
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}
