import {
    Button,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthApi } from '@queries'
import { SubAdmin, SubadminFromType } from '@types'
import { onlyAlphabets } from '@utils'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const SubAdminForm = ({
    onSubmit,
    result,
    subAdmin,
    edit,
}: {
    edit?: boolean
    onSubmit: (values: SubadminFromType) => void
    result: any
    subAdmin?: SubAdmin
}) => {
    const [sectorOptions, setSectorOptions] = useState<any>([])
    const [selectedSector, setSelectedSector] = useState<any>(null)
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)
    const validationSchema = yup.object({
        // Profile Information
        name: yup.string().required('Must provide your name'),
        coordinatorId: yup.string().required('Must provide your name'),
        phone: yup.string().required('Must provide your name'),
        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        rtos: yup.array().min(1, 'Must select at least 1 RTO').required(),
        sectors: yup.array().min(1, 'Must select at least 1 sector').required(),
        courses: yup.array().min(1, 'Must select at least 1 course').required(),
        // Address Information
        addressLine1: yup.string().required('Must provide address'),
    })
    const sectorResponse = AuthApi.useSectors({})
    const getRtos = AuthApi.useRtos({})
    console.log('getRtos', getRtos)

    const onSectorChanged = (sectors: any) => {
        setSelectedSector(sectors)
        setCourseLoading(true)
        const filteredCourses = sectors?.map((selectedSector: any) => {
            const sectorExisting = sectorResponse?.data?.find(
                (sector: any) => sector.id === selectedSector.value
            )
            if (sectorExisting && sectorExisting?.courses?.length) {
                return sectorExisting.courses
            }
        })

        const newCourseOptions: any = []
        filteredCourses.map((courseList: any) => {
            if (courseList && courseList.length) {
                return courseList.map((course: any) =>
                    newCourseOptions.push({
                        item: course,
                        value: course.id,
                        label: course.title,
                    })
                )
            }
        })

        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
    }

    // map over sectorResponse and there is another array of courses pick those course with label and value
    // const coursesOption = sectorResponse.data
    //     ?.map((sector: any) => {
    //         console.log('map sectors', sector)
    //         return sector.courses.map((course: any) => {
    //             console.log('course inner', course)
    //             return {
    //                 label: course?.title,
    //                 value: course?.id,
    //             }
    //         })
    //     })
    //     .flat()

    const formMethods = useForm<SubadminFromType>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (result.isSuccess) {
            formMethods.reset()
        }
    }, [result])

    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector?.name,
                value: sector?.id,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse?.data])

    useEffect(() => {
        if (subAdmin) {
            const values = {
                name: subAdmin?.user?.name,
                email: subAdmin?.user?.email,
                phone: subAdmin?.phone,
                addressLine1: subAdmin?.addressLine1,
                coordinatorId: subAdmin?.coordinatorId,
            }
            Object.entries(values)?.forEach(([key, value]) => {
                formMethods.setValue(
                    key as keyof SubadminFromType,
                    value as string
                )
            })
            // for (let key in values) {
            //     formMethods.setValue(key, values[key as keyof typeof values])
            // }
        }
    }, [subAdmin])

    // const rtoCoursesOptions =
    //     rto.isSuccess && rto?.data?.courses && rto?.data?.courses?.length > 0
    //         ? rto?.data?.courses?.map((course: Course) => ({
    //               label: course?.title,
    //               value: course?.id,
    //           }))
    //         : []

    const rtosOptions =
        getRtos?.isSuccess && getRtos?.data && getRtos?.data.length > 0
            ? getRtos?.data.map((rto: any) => ({
                  label: rto?.user?.name,
                  value: rto?.id,
              }))
            : []

    return (
        <>
            <ShowErrorNotifications result={result} />
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <TextInput
                        label={'Full Name'}
                        name={'name'}
                        placeholder={'Your Full Name...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'Coordinator Id'}
                        name={'coordinatorId'}
                        placeholder={'Coordinator Id...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'Phone No'}
                        name={'phone'}
                        placeholder={'Phone No...'}
                        validationIcons
                        required
                    />
                    {/* {!edit && (
                        <TextInput
                            label={'Password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Password...'}
                            validationIcons
                            required
                        />
                    )} */}
                    <TextInput
                        label={'Email'}
                        type={'email'}
                        name={'email'}
                        placeholder={'Email...'}
                        validationIcons
                        required
                    />
                    <Select
                        label={'RTOs'}
                        name={'rtos'}
                        options={rtosOptions}
                        multi
                        validationIcons
                        onlyValue
                    />
                    <Select
                        label={'Sector'}
                        value={selectedSector}
                        name={'sectors'}
                        options={sectorOptions}
                        placeholder={'Select Sectors...'}
                        multi
                        loading={sectorResponse.isLoading}
                        disabled={sectorResponse.isLoading}
                        onChange={onSectorChanged}
                        validationIcons
                    />
                    <Select
                        label={'Courses'}
                        name={'courses'}
                        defaultValue={courseOptions}
                        options={courseOptions}
                        multi
                        loading={courseLoading}
                        // components={{
                        //     Option: CourseSelectOption,
                        // }}
                        disabled={courseOptions.length === 0}
                        validationIcons
                        onlyValue
                    />
                    <TextArea
                        label={'Address'}
                        name={'addressLine1'}
                        placeholder={'Address...'}
                    />
                    <Button
                        submit
                        text={edit ? 'Update' : 'Create'}
                        variant={edit ? 'secondary' : 'primary'}
                        loading={result?.isLoading}
                        disabled={result?.isLoading}
                    />
                </form>
            </FormProvider>
        </>
    )
}
