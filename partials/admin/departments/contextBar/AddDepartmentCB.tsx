import {
    Button,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import * as yup from 'yup'
export const AddDepartmentCB = ({
    setAddDepartment,
    addDepartment,
    onCloseModal,
}: any) => {
    const [selectedSector, setSelectedSector] = useState<number[]>([])

    console.log({ selectedSector })

    const getSectors = AdminApi.Department.useDepartmentSectors()
    const { notification } = useNotification()
    const [addDept, addDeptResult] = AdminApi.Department.useAddDepartment()
    const departmentCoordinators =
        AdminApi.Department.useDepartmentCoordinators(selectedSector, {
            skip: !selectedSector?.length,
        })
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
        sectors: yup
            .array()
            .of(yup.number())
            .min(1, 'Must select at least 1 sector')
            .required('Sectors are required'),
        departmentMembers: yup
            .array()
            .of(yup.number())
            .min(1, 'Must select at least 1 member')
            .required('Members are required'),
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
                        options={sectorOptions}
                        name="sectors"
                        label="Select Sector"
                        placeholder="Select Sector"
                        multi
                        onlyValue
                        onChange={(e: number[]) => {
                            setSelectedSector(e)
                            methods.setValue('sectors', e)
                        }}
                        required
                        disabled={getSectors.isLoading}
                        loading={getSectors.isLoading}
                    />
                    <Select
                        options={coordinatorOptions}
                        name="departmentMembers"
                        label="Add Member"
                        placeholder="Select Member"
                        multi
                        disabled={
                            !selectedSector?.length ||
                            !coordinatorOptions?.length ||
                            departmentCoordinators.isLoading
                        }
                        // onlyValue
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
