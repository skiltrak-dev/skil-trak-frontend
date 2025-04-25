import { Button, Select, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi, CommonApi, SubAdminApi } from '@queries'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InvoiceCategoriesEnum } from '../enum'
import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import { Course, Student } from '@types'

interface SectorFormProps {
    onSubmit: any
    result: any
}

export const AddCustomInvoiceForm = ({ onSubmit, result }: SectorFormProps) => {
    const [searchedStudent, setSearchedStudent] = useState('')
    const validationSchema = yup.object({
        invoiceAction: yup
            .string()
            .oneOf(Object.values(InvoiceCategoriesEnum))
            .required('Invoice type is required'),
        student: yup.number().required('Student is required'),
        course: yup.number().required('Course is required'),
        customDate: yup.string().required('Date is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const categoriesList = AdminApi.Invoice.invoiceCategorisList()
    const adminAllStudents = CommonApi.Student.searchAllPortalStudents({
        search: `name:${searchedStudent}`,
    })
    const courses = SubAdminApi.Courses.useStudentCourses(
        Number(methods.watch()?.student),
        {
            skip: !methods.watch()?.student,
        }
    )

    const nameOptions = Object.entries(InvoiceCategoriesEnum).map(
        ([key, value]) => ({
            label: key,
            value,
        })
    )

    const objectConverted = nameOptions.reduce((obj: any, item) => {
        obj[item.value] = item?.label
        return obj
    }, {})

    const invoiceActions = categoriesList?.data?.map((c: any) => ({
        label: objectConverted[c?.name],
        value: c?.name,
    }))

    const studentsList = adminAllStudents?.data?.map((student: Student) => ({
        label: `${student?.user?.name} ${student?.familyName}`,
        value: student?.id,
    }))
    const coursesList = courses?.data?.map((course: Course) => ({
        label: course?.title,
        value: course?.id,
    }))

    const delayedSearch = useCallback(
        debounce((values) => setSearchedStudent(values), 700),
        []
    )

    return (
        <>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="mb-8">
                        <div className="mb-3 pb-2 border-b">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                Custom Invoice
                            </Typography>
                        </div>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-2">
                            <TextInput
                                type={'date'}
                                name="customDate"
                                label={`${'Select Date'}`}
                                placeholder={'Add Date'}
                            />
                            <Select
                                name="invoiceAction"
                                label={'Add Invoice Actions'}
                                options={invoiceActions}
                                onlyValue
                            />
                            <Select
                                name="student"
                                label={'Add Student'}
                                options={studentsList}
                                loading={
                                    adminAllStudents?.isLoading ||
                                    adminAllStudents?.isFetching
                                }
                                disabled={adminAllStudents?.isLoading}
                                onlyValue
                                onInputChange={(value) => {
                                    delayedSearch(value)
                                }}
                            />
                            <Select
                                name="course"
                                label={'Add Course'}
                                options={coursesList}
                                loading={courses?.isLoading}
                                disabled={
                                    courses?.isLoading ||
                                    courses?.isFetching ||
                                    !courses?.data?.length
                                }
                                onlyValue
                                onInputChange={(value) => {
                                    delayedSearch(value)
                                }}
                            />
                        </div>

                        <div>
                            <Button
                                submit
                                loading={result?.isLoading}
                                disabled={result?.isLoading}
                            >
                                Add Custom Invoice
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
