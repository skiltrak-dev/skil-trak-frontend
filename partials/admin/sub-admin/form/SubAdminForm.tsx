import {
    AuthorizedUserComponent,
    Button,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthApi } from '@queries'
import { OptionType, SubAdmin, SubadminFromType } from '@types'
import {
    CourseSelectOption,
    formatOptionLabel,
    getUserCredentials,
    onlyAlphabets,
} from '@utils'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const SubAdminForm = ({
    onSubmit,
    result,
    subAdmin,
    edit,
    rtoCoursesOptions,
}: {
    edit?: boolean
    onSubmit: (values: SubadminFromType) => void
    result: any
    subAdmin?: SubAdmin
    rtoCoursesOptions?: OptionType[]
}) => {
    const [sectorOptions, setSectorOptions] = useState<any>([])
    const [selectedSector, setSelectedSector] = useState<any>(null)
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)

    const role = getUserCredentials()?.role

    const validationObject = {
        name: yup.string().required('Must provide your name'),
        coordinatorId: yup.string().required('Must provide your name'),
        phone: yup.string().required('Must provide your name'),
        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        // Address Information
        addressLine1: yup.string().required('Must provide address'),
        courses: yup.array().min(1, 'Must select at least 1 course').required(),
    }

    const validation = {
        ...validationObject,
        rtos: yup.array().min(1, 'Must select at least 1 RTO').required(),
        sectors: yup.array().min(1, 'Must select at least 1 sector').required(),
    }

    const rtoValidation = {
        ...validationObject,
    }

    const validationSchema = yup.object(
        role === UserRoles.ADMIN ? validation : rtoValidation
    )
    const sectorResponse = AuthApi.useSectors({})
    const getRtos = AuthApi.useRtos({})

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
                    <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
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
                    </AuthorizedUserComponent>

                    <AuthorizedUserComponent
                        roles={[UserRoles.ADMIN] || [UserRoles.SUBADMIN]}
                    >
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
                    </AuthorizedUserComponent>

                    <AuthorizedUserComponent roles={[UserRoles.RTO]}>
                        <Select
                            label={'Courses'}
                            name={'courses'}
                            options={rtoCoursesOptions}
                            multi
                            loading={courseLoading}
                            components={{
                                Option: CourseSelectOption,
                            }}
                            formatOptionLabel={formatOptionLabel}
                            disabled={
                                rtoCoursesOptions &&
                                rtoCoursesOptions?.length === 0
                            }
                            validationIcons
                            onlyValue
                        />
                    </AuthorizedUserComponent>

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
