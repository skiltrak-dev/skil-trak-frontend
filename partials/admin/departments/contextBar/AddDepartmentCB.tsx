import {
    Button,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AuthApi, AdminApi } from '@queries'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { AddSectorsAndCourses } from './AddSectorsAndCourses'
import { useNotification } from '@hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
export const AddDepartmentCB = ({
    setAddDepartment,
    addDepartment,
    onCloseModal,
}: any) => {
    const getSectors = AdminApi.Department.useDepartmentSectors()
    const { notification } = useNotification()
    const [addDept, addDeptResult] = AdminApi.Department.useAddDepartment()
    const departmentCoordinators =
        AdminApi.Department.useDepartmentCoordinators()
    console.log('Department coordinator', getSectors?.data)
    const coordinatorOptions = departmentCoordinators?.data?.map(
        (coordinator: any) => ({
            label: `${coordinator?.user?.name}`,
            value: coordinator?.id,
        })
    )
    const sectorOptions = getSectors?.data?.map((sector: any) => ({
        label: `${sector?.code} - ${sector?.name}`,
        value: sector?.id,
    }))

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Department name is required')
            .min(3, 'Department name must be at least 3 characters long'),
        code: yup
            .string()
            .required('Department code is required')
            .min(2, 'Department code must be at least 2 characters long'),
        departmentMembers: yup
            .array()
            .of(
                yup.object().shape({
                    value: yup.string().required('Coordinator is required'),
                })
            )
            .min(1, 'At least one member is required'),
        // sectors:
    })
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        // defaultValues: { ...editValues, body: bodyData },
    })

    const onSubmit = (data: any) => {
        const dept = {
            ...data,
            departmentMembers: data?.departmentMembers?.map((member: any) => ({
                subadmin: member?.value,
            })),
        }
        // console.log('dept: ', dept)
        addDept(dept)
    }

    useEffect(() => {
        if (addDeptResult.isSuccess) {
            notification.success({
                title: 'Department Added',
                description: 'Department Added Successfully',
            })
            setAddDepartment(false)
            onCloseModal()
            methods.reset()
        }
    }, [addDeptResult])

    return (
        <>
            <ShowErrorNotifications result={addDeptResult} />
            <div className="flex justify-between items-center mb-5 w-full">
                <Typography variant="label" color="text-primaryNew" uppercase>
                    Add New Department
                </Typography>
                {addDepartment && (
                    <button onClick={() => setAddDepartment(false)}>
                        <IoMdCloseCircleOutline
                            className="text-primaryNew"
                            size={25}
                        />
                    </button>
                )}
            </div>

            <FormProvider {...methods}>
                <form
                    className="min-w-[450px]"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <TextInput
                        name="name"
                        placeholder="Enter Department Name"
                        required
                    />
                    <TextInput
                        name="code"
                        placeholder="Enter Department Code"
                        required
                    />
                    <Select
                        options={coordinatorOptions}
                        name="departmentMembers"
                        label="Add Member"
                        placeholder="Select Member"
                        multi
                        // onlyValue
                        required
                        loading={departmentCoordinators.isLoading}
                    />
                    <Select
                        options={sectorOptions}
                        name="sectors"
                        label="Select Sector"
                        placeholder="Select Sector"
                        multi
                        onlyValue
                        required
                        loading={departmentCoordinators.isLoading}
                    />
                    <Button
                        text="Add"
                        submit
                        loading={addDeptResult.isLoading}
                        disabled={addDeptResult.isLoading}
                    />
                    {/* <AddSectorsAndCourses subAdmin={''} /> */}
                </form>
            </FormProvider>
        </>
    )
}
