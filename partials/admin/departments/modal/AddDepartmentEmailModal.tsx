import { Modal, Select, ShowErrorNotifications, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Course, OptionType, Sector } from '@types'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useDepartmentDetailContext } from '../hooks'
import { useRouter } from 'next/router'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'

export const AddDepartmentEmailModal = ({
    onCancel,
    departmentId,
    deptName,
    deptEmail,
}: {
    deptName: string
    deptEmail: string
    departmentId: number
    onCancel: () => void
}) => {
    const { deptCourses } = useDepartmentDetailContext()

    const { notification } = useNotification()

    const router = useRouter()

    const [selectedSectors, setSelectedSectors] = useState<number[]>([])

    const sectors = AdminApi.Sectors.useListQuery(undefined)
    const sectotsadded = AdminApi.Department.getSectorsAddingList(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )

    const uniqueSectors2 = useMemo(
        () =>
            Array.from(
                new Set(
                    deptCourses?.data?.map(
                        (course: Course) => course?.sector?.id
                    )
                )
            )
                .map(
                    (id) =>
                        deptCourses?.data?.find(
                            (course: Course) => course?.sector?.id === id
                        )?.sector
                )
                ?.map((s: Sector) => ({
                    label: s?.name,
                    value: s?.id,
                }))
                ?.map((a: OptionType) => a?.value),
        [deptCourses]
    )

    useEffect(() => {
        setSelectedSectors(uniqueSectors2 as number[])
    }, [uniqueSectors2])

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        name: Yup.string().required('Name is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: { name: deptName, email: deptEmail },
    })

    const [updateDepartment, updateDepartmentResult] =
        AdminApi.Department.updateDepartment()

    const onConfirm = async (values: any) => {
        const res: any = await updateDepartment({
            ...values,
            departmentId,
        })

        if (res?.data) {
            notification.success({
                title: 'Department Updated',
                description: 'Department Updated Successfully',
            })
            onCancel()
        }
    }

    const sectorsOptions = sectotsadded?.data?.map((s: Sector) => ({
        label: s.name,
        value: s.id,
    }))

    return (
        <>
            <ShowErrorNotifications result={updateDepartmentResult} />
            <Modal
                title="Update Department"
                subtitle=" "
                onCancelClick={onCancel}
                onConfirmClick={methods.handleSubmit(onConfirm)}
                loading={updateDepartmentResult?.isLoading}
            >
                <div className="max-w-5xl max-h-[72vh] overflow-auto custom-scrollbar">
                    <FormProvider {...methods}>
                        <form className="mt-2 w-full">
                            <div className="">
                                <TextInput
                                    label={'Name'}
                                    name={'name'}
                                    placeholder={'Your Name Here...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Email'}
                                    name={'email'}
                                    type={'email'}
                                    placeholder={'Your Email Here...'}
                                    validationIcons
                                    required
                                />
                                <Select
                                    name={'sectors'}
                                    label={'Sector'}
                                    options={
                                        sectors.isLoading ? [] : sectorsOptions
                                    }
                                    value={sectorsOptions?.filter(
                                        (s: OptionType) =>
                                            selectedSectors?.includes(
                                                Number(s?.value)
                                            )
                                    )}
                                    onChange={(options: number[]) => {
                                        setSelectedSectors(options)
                                    }}
                                    menuPlacement="top"
                                    onlyValue
                                    loading={sectors.isLoading}
                                    multi
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </Modal>
        </>
    )
}
