import { Button, Select, Typography, TextInput, FileUpload } from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { useEffect, useState } from 'react'
import { Course } from '@types'
import { read, readFile, utils, writeFile } from 'xlsx'
import { BinaryFileUpload } from '@components/inputs/BinaryFileUpload'

interface FormProps {
    onSubmit: any
    edit?: boolean
    initialValues?: any
    onStudentFound: Function
    setEmailExistList: Function
    result: any
}
export const ImportStudentForm = ({
    result,
    onSubmit,
    edit,
    initialValues,
    onStudentFound,
    setEmailExistList,
}: FormProps) => {
    const [mount, setMount] = useState(false)
    useEffect(() => {
        if (!mount) setMount(true)
    }, [])

    const sectors = AdminApi.Sectors.useListQuery({})
    // const [checkEmail, checkEmailResult] = AdminApi.Rtos.useCheckStudentEmail()

    const courses = AdminApi.Courses.useListQuery({})
    const [courseOptions, setCourseOptions] = useState<any>([])

    const onSectorSelect = (options: any) => {
        const currentSelectedSectors = options.map((opt: any) => opt.value)

        const currentSelectableCourses: any = []
        currentSelectedSectors.forEach((sectorId: number) => {
            const currentCourses = courses.data?.data.filter(
                (c) => c.sector.id === sectorId
            )

            if (currentCourses?.length)
                currentSelectableCourses.push(...currentCourses)
        })

        setCourseOptions(
            currentSelectableCourses.map((c: any) => ({
                label: c.title,
                value: c.id,
            }))
        )
    }

    const validationSchema = yup.object({})

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    const onFileChange = async (e: any, fileData: any) => {
        // const wb = readFile(e.target.result)
        const wb = read(e.target.result, { type: 'binary' })
        const sheets = wb.SheetNames

        if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
            // const result: any = await checkEmail({
            //     body: rows.map((row: any) => row.email),
            // })
            // if (result?.data && result?.data?.email) {
            //     setEmailExists([...emailExists, result?.data?.email])
            // }
            onStudentFound && onStudentFound(rows, fileData)
        }
    }

    return (
        <FormProvider {...methods}>
            <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={'flex gap-4'}>
                    <div className="w-3/5">
                        <div className="grid grid-cols-2 gap-2">
                            <TextInput label={'Batch/Class'} name="batch" />
                            <TextInput
                                label={'Expiry Date'}
                                name="expiry"
                                type="date"
                            />
                        </div>

                        <div className="mb-2 -mt-3">
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    name={'sectors'}
                                    label={'Sector'}
                                    options={
                                        sectors.isLoading
                                            ? []
                                            : sectors.data?.data.map((s) => ({
                                                  label: s.name,
                                                  value: s.id,
                                              }))
                                    }
                                    onChange={(option: any) =>
                                        onSectorSelect(option)
                                    }
                                    loading={sectors.isLoading}
                                    multi
                                />

                                <Select
                                    name={'courses'}
                                    label={'Courses'}
                                    options={courseOptions}
                                    defaultValue={courseOptions}
                                    multi
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-2/5">
                        <BinaryFileUpload
                            name="list"
                            onChange={onFileChange}
                            fileAsObject={false}
                        />
                    </div>
                </div>

                <div className="flex">
                    <Button
                        text="Import"
                        submit
                        loading={result.isLoading}
                        disabled={result.isLoading}
                    />
                    {/* {checkEmailResult?.data?.length > 0 ? (
                        <Button text="Import" submit disabled />
                    ) : (
                        <Button
                            text="Import"
                            submit
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    )} */}
                </div>
            </form>
        </FormProvider>
    )
}
