import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { AuthApi } from '@queries'
import {
    TextInput,
    Select,
    Typography,
    TextArea,
    LoadingAnimation,
    Button,
} from '@components'
import { OptionType, Sector } from '@types'
import { useNotification } from '@hooks'

const jobType = [
    {
        value: 'fullTime',
        label: 'Full Time',
    },
    {
        value: 'partTime',
        label: 'Part Time',
    },
    {
        value: 'temporary',
        label: 'Temporary & Casual',
    },
]

export const JobForm = ({ initialValues, onSubmit, edit }: any) => {
    const [defaultValue, setDefaultValue] = useState<any | null | undefined>(
        null
    )
    const [courseOptions, setCourseOptions] = useState<OptionType[]>([])
    const [courseLoading, setCourseLoading] = useState(false)
    const [storedData, setStoredData] = useState<any>(null)

    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)

    const { notification } = useNotification()

    const sectorResponse = AuthApi.useSectors({})

    const onSectorChanged = (sectors: OptionType[]) => {
        setCourseLoading(true)
        const filteredCourses = sectors.map((selectedSector: OptionType) => {
            const sectorExisting = sectorResponse.data.find(
                (sector: Sector) => sector.id === selectedSector.value
            )
            if (sectorExisting && sectorExisting?.courses?.length) {
                return sectorExisting.courses
            }
        })

        const newCourseOptions: OptionType[] = []
        filteredCourses.map((courseList: any) => {
            if (courseList && courseList.length) {
                return courseList.map((course: any) =>
                    newCourseOptions.push({
                        label: course.title,
                        value: course.id,
                        item: course,
                    })
                )
            }
        })

        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
    }
    const sectorOptions =
        sectorResponse.data && sectorResponse.data?.length > 0
            ? sectorResponse.data?.map((sector: any) => ({
                  label: sector.name,
                  value: sector.id,
              }))
            : []
    useEffect(() => {
        if (initialValues) {
            setDefaultValue(
                jobType?.find(
                    (type) => type.value === initialValues.employmentType
                )
            )
        }
    }, [initialValues])

    const validationSchema = yup.object({
        // Job Validation
        title: yup.string().required('Must provide a meaningful job title'),
        employmentType: yup
            .string()
            .required('Employment Type is A Reuired field'),
        vacancies: yup
            .number()
            .typeError('Vacancies must be a number')
            .min(1, 'Vacancies must be greater than 0')
            .positive("Vacancies can't be negative")
            .required('Please provide vacancies for your job'),
        salaryFrom: yup
            .number()
            .min(1, 'Salary from range must be greater than 0')
            .positive("Salary from can't be negative")
            .required('Please provide salary for your job')
            .typeError('Salary from must be a number'),
        salaryTo: yup
            .number()
            .typeError('Salary to must be a number')
            .min(1, 'Salary to range must be greater than 0')
            .positive("Salary to can't be negative")
            .required('Please provide salary for your job'),
        sectors: yup.array().min(1, 'Must select at least 1 sector'),

        // Contact Validation
        phone: yup.string().required('Phone is required field!'),
        email: yup.string().email('Invalid Email').required('Required!'),
        website: yup.string().required('website is required field!'),

        // Address Validation
        addressLine1: yup
            .string()
            .required('Address Line 1 is required field!'),
        zipCode: yup.string().required('ZipCode is required field!'),
        suburb: yup.string().required('Suburb is required field!'),
        state: yup.string().required('State is required field!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
        mode: 'all',
    })

    const onHandleSubmit = (values: any) => {
        if (!onSuburbClicked) {
            notification.error({
                title: 'You must select on Suburb Dropdown',
                description: 'You must select on Suburb Dropdown',
            })
        } else if (onSuburbClicked) {
            onSubmit(values)
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onHandleSubmit)}
            >
                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'gray'}>
                            Job Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <TextInput
                            label={'Job Title'}
                            name={'title'}
                            placeholder={'Your Job Title...'}
                            validationIcons
                        />

                        <Select
                            label={'Employment Type'}
                            name={'employmentType'}
                            {...(defaultValue
                                ? {
                                      defaultValue: defaultValue,
                                  }
                                : {})}
                            options={jobType}
                            onlyValue
                        />
                        <Select
                            label={'Sector'}
                            // {...(storedData
                            //     ? {
                            //           defaultValue: storedData.sectors,
                            //       }
                            //     : {})}
                            name={'sectors'}
                            options={sectorOptions}
                            placeholder={'Select Sectors...'}
                            multi
                            loading={sectorResponse.isLoading}
                            onChange={onSectorChanged}
                            validationIcons
                            onlyValue
                        />

                        <TextInput
                            label={'Vacancies'}
                            name={'vacancies'}
                            type={'number'}
                            placeholder={'Vacancies...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Salary From'}
                            name={'salaryFrom'}
                            type={'number'}
                            placeholder={'Salary From...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Salary To'}
                            name={'salaryTo'}
                            type={'number'}
                            placeholder={'Salary To...'}
                            validationIcons
                        />

                        <TextArea
                            label={'Job Description'}
                            name={'description'}
                            placeholder={'Job Description'}
                            validationIcons
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'gray'}>
                            Contact Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <TextInput
                            label={'Phone'}
                            name={'phone'}
                            placeholder={'Phone...'}
                            validationIcons
                        />
                        <TextInput
                            label={'Email'}
                            name={'email'}
                            type={'email'}
                            placeholder={'Email...'}
                            validationIcons
                        />

                        <TextInput
                            label={'Website'}
                            name={'website'}
                            type={'url'}
                            placeholder={'Website...'}
                            validationIcons
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'gray'}>
                            Address Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        <div className="col-span-2">
                            <TextInput
                                label={'Address 1'}
                                name={'addressLine1'}
                                placeholder={'Address Line 1...'}
                                validationIcons
                                placesSuggetions
                            />
                        </div>

                        <TextInput
                            label={'Suburb'}
                            name={'suburb'}
                            placeholder={'Suburb...'}
                            validationIcons
                            placesSuggetions
                            onChange={() => {
                                setOnSuburbClicked(false)
                            }}
                            onPlaceSuggetions={{
                                placesSuggetions: onSuburbClicked,
                                setIsPlaceSelected: setOnSuburbClicked,
                            }}
                        />
                        <TextInput
                            label={'Zip Code'}
                            name={'zipCode'}
                            placeholder={'Zip Code...'}
                            validationIcons
                        />
                        <TextInput
                            label={'State'}
                            name={'state'}
                            placeholder={'State...'}
                            validationIcons
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <div className="mb-3 pb-2 border-b">
                        <Typography variant={'muted'} color={'gray'}>
                            Employer Detail
                        </Typography>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 mt-2 mb-6">
                        <TextInput
                            label={'Contact Person'}
                            name={'contactPerson'}
                            placeholder={'Contact Person...'}
                            validationIcons
                        />
                    </div>
                </div>

                <Button
                    submit
                    text={`${edit ? 'Update' : 'Save'} Job`}
                    variant={edit ? 'secondary' : 'primary'}
                />
            </form>
        </FormProvider>
    )
}
