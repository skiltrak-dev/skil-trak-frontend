import { Button, Select, TextArea, TextInput, Typography } from '@components'
import { BinaryFileUpload } from '@components/inputs/BinaryFileUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { ImportStudentFormType } from '@types'
import { CourseSelectOption, formatOptionLabel, getDate } from '@utils'
import { Upload } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { read, utils } from 'xlsx'
import * as yup from 'yup'
import { PlacementType } from './PlacementType'
import { PlacementTypeEnum } from '../enum'

interface FormProps {
    onSubmit: (values: ImportStudentFormType) => void
    edit?: boolean
    initialValues?: any
    onStudentFound: Function
    setEmailExistList: Function
    result: any
    rtoCourses: any
    onCancel?: any
}

export const ImportStudentFormV2 = ({
    result,
    onSubmit,
    edit,
    initialValues,
    onStudentFound,
    setEmailExistList,
    rtoCourses,
    onCancel,
}: FormProps) => {
    const { notification } = useNotification()
    const [mount, setMount] = useState(false)
    const [studentsCount, setStudentsCount] = useState<number>(0)

    useEffect(() => {
        if (!mount) setMount(true)
    }, [])

    const courses = AdminApi.Courses.useListQuery(undefined)
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

    const validationSchema = yup.object({
        batch: yup.string().required('Batch required'),
        // Placement Type
        placementType: yup
            .string()
            .oneOf(
                [PlacementTypeEnum.BLOCK, PlacementTypeEnum.FLEXIBLE],
                'Must select a valid placement type'
            )
            .required('Must select placement type'),

        // Conditional Date Validations
        startDate: yup.date().when('placementType', {
            is: PlacementTypeEnum.BLOCK,
            then: (schema) =>
                schema
                    .min(
                        new Date(getDate()),
                        'Start date cannot be in the past'
                    )
                    .required('Must provide start date for block placement'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),

        endDate: yup.date().when(['placementType', 'startDate'], {
            is: (placementType: string, startDate: Date) =>
                placementType === PlacementTypeEnum.BLOCK && startDate,
            then: (schema) =>
                schema
                    .min(
                        yup.ref('startDate'),
                        'End date must be after start date'
                    )
                    .required('Must provide end date for block placement'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),

        expiryDate: yup.date().when('placementType', {
            is: PlacementTypeEnum.FLEXIBLE,
            then: (schema) =>
                schema
                    .min(
                        new Date(getMinExpiryDate()),
                        'Expiry date must be at least 3 months from today'
                    )
                    .required('Must provide expiry date for rolling placement'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
        courses: yup.array().min(1, 'Must select at least 1 course').required(),

        list: yup
            .mixed()
            .required('A file is required')
            .test(
                'fileValue',
                'A file is required',
                (value) => [...value]?.length > 0
            )
            .test(
                'fileSize',
                'File size is too large. Maximum size is 5MB',
                (value) =>
                    value &&
                    value?.length > 0 &&
                    value?.[0]?.size <= 5 * 1024 * 1024 // 5MB
            )
            .test(
                'fileType',
                'Unsupported file format. PDF,JPG,Png formats are allowed.',
                (value) =>
                    value &&
                    [
                        'image/jpg',
                        'image/png',
                        'image/jpeg',
                        'application/pdf',
                    ].includes(value?.[0]?.type)
            ),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
         defaultValues: { placementType: PlacementTypeEnum.FLEXIBLE },
        mode: 'all',
    })

    const placementType: PlacementTypeEnum = methods.watch('placementType')

    const onFileChange = async (e: any, fileData: any) => {
        try {
            const wb = read(e.target.result, { type: 'binary' })
            const sheets = wb.SheetNames

            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
                setStudentsCount(rows?.length)
                if (rows?.length <= 50) {
                    onStudentFound && onStudentFound(rows, fileData)
                } else {
                    notification.error({
                        title: 'Student Length!',
                        description:
                            'Student Length must be less than or equal to 50!',
                        dissmissTimer: 5000,
                    })
                }
            }
        } catch (err) {
            notification.error({
                title: 'Invalid File',
                description: 'File should be .csv or .xlsx',
            })
        }
    }

    // Utility to calculate date 3 months ahead
    const getMinExpiryDate = () => {
        const date = new Date()
        date.setMonth(date.getMonth() + 3)
        return date.toISOString().split('T')[0]
    }

    return (
        <FormProvider {...methods}>
            <form
                className="w-full"
                onSubmit={methods.handleSubmit((values: any) => {
                    const filteredValues = { ...values }

                    if (placementType === PlacementTypeEnum.FLEXIBLE) {
                        delete filteredValues.startDate
                        delete filteredValues.endDate
                    } else if (placementType === PlacementTypeEnum.BLOCK) {
                        delete filteredValues.expiryDate
                    }
                    onSubmit(filteredValues)
                })}
            >
                <div className="space-y-4">
                    {/* Placement Type */}
                    <PlacementType />

                    {/* Form Inputs */}
                    <div className="grid grid-cols-2 gap-2">
                        <TextInput
                            name="batch"
                            label="Batch/Class"
                            placeholder="Batch/Class"
                        />
                        <div>
                            <Select
                                name="courses"
                                label="Courses"
                                options={rtoCourses}
                                multi
                                onlyValue
                                components={{ Option: CourseSelectOption }}
                                formatOptionLabel={formatOptionLabel}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 justify-between">
                        {placementType === PlacementTypeEnum.BLOCK ? (
                            <>
                                <TextInput
                                    label="Start Date"
                                    name="startDate"
                                    type="date"
                                    min={getDate()}
                                />
                                <TextInput
                                    label="End Date"
                                    name="endDate"
                                    type="date"
                                    min={getDate()}
                                />
                            </>
                        ) : (
                            <TextInput
                                label="Expiry Date"
                                name="expiryDate"
                                type="date"
                                min={getMinExpiryDate()}
                            />
                        )}
                    </div>

                    <BinaryFileUpload
                        name="list"
                        onChange={onFileChange}
                        fileAsObject={false}
                    />

                    <TextArea
                        label={'Notes (Optional)'}
                        name={'notes'}
                        placeholder={'Add Notes here...'}
                        rows={4}
                    />

                    {/* Expected Columns Preview */}
                    <div className="p-4 bg-gray-300/30 rounded-lg border my-4">
                        <p className="text-sm font-semibold mb-2">
                            Expected columns in your file:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['id', 'name', 'email', 'contact', 'address'].map(
                                (col) => (
                                    <div
                                        key={col}
                                        className="text-xs px-2 py-0.5 rounded-full bg-[#0D5468] text-white border border-[#0D5468]/20"
                                    >
                                        {col}
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-x-2 items-center">
                        <Button
                            text="Cancel"
                            onClick={onCancel}
                            variant="secondary"
                        />
                        <Button
                            text="Import Students"
                            Icon={Upload}
                            submit
                            loading={result.isLoading}
                            disabled={result.isLoading || studentsCount > 50}
                        />
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
