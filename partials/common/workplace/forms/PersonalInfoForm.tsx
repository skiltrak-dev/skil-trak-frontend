import { RadioGroup, Select, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/buttons/Button'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import { Card, Typography } from 'components'

type PersonalInfoProps = {
    onSubmit: any
    courses: any
}

const placesLibrary = ['places'] as any

export const PersonalInfoForm = ({ onSubmit, courses }: PersonalInfoProps) => {
    const [work, setWork] = useState<string>('')
    const [qualification, setQualification] = useState<string>('')
    const coursesOptions = courses?.data?.map((course: any) => ({
        label: course.title,
        value: course.id,
    }))

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: '',
    //     libraries: placesLibrary,
    // })

    // function getCurrentWeek() {
    //     var currentDate = moment()

    //     var weekStart = currentDate.clone().startOf('week')
    //     var weekEnd = currentDate.clone().endOf('week')

    //     var days = []

    //     for (var i = 0; i <= 6; i++) {
    //         days.push(moment(weekStart).add(i, 'days').format('DD'))
    //     }
    //     return days
    // }

    // const date = [...Array(7)].map((_, i) => ({
    //     date: getCurrentWeek()[i],
    //     day: moment.weekdaysShort()[i],
    // }))

    const validationSchema = yup.object({
        courses: yup.string().required('Must provide course'),
        qualification: yup
            .string()
            .nullable(true)
            .required('Must provide currentQualification'),
        work: yup.string().nullable(true).required('Must provide currentWork'),
        haveTransport: yup
            .string()
            .nullable(true)
            .required('Must provide Transport Option'),
        haveDrivingLicense: yup
            .string()
            .nullable(true)
            .required('Must provide Driving License Option'),
        preferableLocation: yup
            .string()
            .required('Must provide preferableLocation'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onPlaceChanged = () => {}
    return (
        <div>
            <Typography variant={'label'} capitalize>
                Please provide following information
            </Typography>
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div>
                            <Select
                                id="courses"
                                placeholder="Select Your Choice"
                                name="courses"
                                label="Course"
                                options={coursesOptions}
                                loading={courses.isLoading}
                                disabled={courses.isLoading}
                                onlyValue
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 mt-4">
                            {/*
                             */}
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    // value={'yes'}
                                    name="qualification"
                                    label="Have you completed any qualification?"
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                    onChange={(e: any) => {
                                        setQualification(e?.target?.value)
                                    }}
                                />
                                {qualification === 'yes' && (
                                    <TextInput
                                        name="currentQualification"
                                        // label="Current Qualification"
                                        placeholder="Provide detail"
                                    />
                                )}
                            </div>
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="work"
                                    label="Are you currently working?"
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                    onChange={(e: any) => {
                                        setWork(e?.target?.value)
                                    }}
                                />
                                {work === 'yes' && (
                                    <TextInput
                                        name="currentWork"
                                        // label="Current Work"
                                        placeholder="Provide Detail"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-3 mb-5">
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                name="haveTransport"
                                label="Do you have your own transport?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                // value={'yes'}
                                name="haveDrivingLicense"
                                label="Do you have Australian driving license?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                        </div>
                        <div>
                            <TextInput
                                name="preferableLocation"
                                label="Where would you want to locate your self? (Suburb)"
                                placeholder="Where would you want to locate your self? (Suburb)"
                            />
                            {/* {isLoaded
                                ? isBrowser() && (
                                      <Autocomplete
                                      // onPlaceChanged={(place) =>
                                      //     onPlaceChanged(place)
                                      // }
                                      // onLoad={onLoad}
                                      >
                                          <TextInput
                                              name="preferableLocation"
                                              label="Where would you want to locate your self? (Suburb)"
                                              placeholder="Where would you want to locate your self? (Suburb)"
                                          />
                                      </Autocomplete>
                                  )
                                : null} */}
                        </div>
                        <Button text={'Continue'} submit />
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
