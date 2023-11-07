import { useEffect, useState } from 'react'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi, CommonApi } from '@queries'
import { SignUpUtils, isEmailValid } from '@utils'

import {
    Button,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { IndustryStatus, Sector } from '@types'
import { FormProvider, useForm } from 'react-hook-form'

const FormKeys = {
    BusinessName: 'businessName',
    Email: 'email',
    Sector: 'sector',
    Phone: 'phone',
    Address: 'address',
    Website: 'website',
    Status: 'status',
}

export const AddIndustry = ({
    industryData,
    onSetIndustryData,
}: {
    industryData: any
    onSetIndustryData: () => void
}) => {
    const { notification } = useNotification()

    const sectorResponse = AuthApi.useSectors({})
    const [addIndustry, addIndustryResult] =
        CommonApi.FindWorkplace.useAddIndustry()
    const [update, updateResult] = CommonApi.FindWorkplace.useUpdateIndustry()

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const [sectorOptions, setSectorOptions] = useState<any>([])

    const [lastEnteredEmail, setLastEnteredEmail] = useState('')
    const [selectedSector, setSelectedSector] = useState<number[] | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<number[] | null>(null)

    const onEmailChange = (e: any) => {
        _debounce(() => {
            // Regex for email, only valid mail should be sent
            const email = e.target.value
            if (isEmailValid(email)) {
                checkEmailExists({ email })
                setLastEnteredEmail(email)
            }
        }, 300)()
    }
    const validationSchema = yup.object({
        // Profile Information
        businessName: yup.string().required('Must provide your name'),
        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        phone: yup.string().required('Must provide phone number'),
        sector: yup
            .array()
            .of(yup.number()) // Specify that the array should contain numbers
            .required('This field is required') // Make the array field required
            .min(1, 'At least one number is required'),
        address: yup.string().required('Must provide address'),
    })
    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (industryData) {
            const keys = [
                'businessName',
                'email',
                'sector',
                'phone',
                'address',
                'website',
            ]

            let obj: any = {}
            keys.forEach((key: string) => {
                obj[key as keyof typeof obj] =
                    key === 'sector'
                        ? industryData[key as keyof typeof industryData]?.map(
                              (sector: Sector) => sector?.id
                          )
                        : industryData[key as keyof typeof industryData]
            })

            Object.entries(obj)?.forEach(([key, value]: any) => {
                formMethods.setValue(key, value)
            })
            setSelectedSector(
                industryData?.sector?.map((sector: Sector) => sector?.id)
            )
        }
    }, [industryData])

    const resetFormValues = () => {
        let obj: any = {}
        Object.values(FormKeys).forEach((val: string, i: number) => {
            val !== FormKeys.Sector &&
                val !== FormKeys.Status &&
                (obj[val] = '')
        })
        obj[FormKeys.Sector] = formMethods.getValues(FormKeys.Sector)
        obj[FormKeys.Status] = formMethods.getValues(FormKeys.Status)

        formMethods.reset(obj)
    }

    useEffect(() => {
        if (addIndustryResult?.isSuccess) {
            notification.success({
                title: 'Industry Added',
                description: `Industry  has been added successfully.`,
            })
            resetFormValues()
        }
    }, [addIndustryResult])

    useEffect(() => {
        if (updateResult?.isSuccess) {
            notification.warning({
                title: 'Industry Updated',
                description: `Industry  has been Updated successfully.`,
            })
            resetFormValues()
            onSetIndustryData()
        }
    }, [updateResult])

    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse?.data])

    // useEffect For Email
    useEffect(() => {
        if (emailCheckResult.isError) {
            notification.error({
                title: 'Email Exist',
                description: `'${lastEnteredEmail}' is already being used.`,
            })
        }
    }, [emailCheckResult])

    const statusOptions = [
        {
            label: 'Default',
            value: IndustryStatus.DEFAULT,
        },
        {
            label: 'FAVOURITE',
            value: IndustryStatus.FAVOURITE,
        },
        {
            label: 'DO NOT DISTURB',
            value: IndustryStatus.DO_NOT_DISTURB,
        },
    ]

    const onSubmit = (values: any) => {
        SignUpUtils.setValuesToStorage(values)
        if (industryData) {
            update({ ...values, id: industryData?.id })
        } else {
            addIndustry(values)
        }
    }

    return (
        <>
            <ShowErrorNotifications result={updateResult} />
            <ShowErrorNotifications result={addIndustryResult} />
            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col"
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <div className="">
                            <div className="grid grid-cols-1  gap-y-2">
                                <TextInput
                                    label={'Name'}
                                    name={FormKeys.BusinessName}
                                    placeholder={'Industry Name...'}
                                    validationIcons
                                    required
                                />

                                <TextInput
                                    label={'Email'}
                                    name={FormKeys.Email}
                                    type={'email'}
                                    placeholder={'Your Email...'}
                                    validationIcons
                                    required
                                    onBlur={onEmailChange}
                                    loading={emailCheckResult.isLoading}
                                />
                                <Select
                                    label={'Sector'}
                                    name={FormKeys.Sector}
                                    options={sectorOptions}
                                    placeholder={'Select Sectors...'}
                                    loading={sectorResponse.isLoading}
                                    value={sectorOptions?.filter(
                                        (sector: any) =>
                                            selectedSector?.includes(
                                                sector?.value
                                            )
                                    )}
                                    validationIcons
                                    onChange={(e: any) => {
                                        setSelectedSector(e)
                                    }}
                                    onlyValue
                                    multi
                                />
                                <Select
                                    label={'Status'}
                                    name={FormKeys.Status}
                                    options={statusOptions}
                                    placeholder={'Select Status...'}
                                    value={statusOptions?.find(
                                        (sector: any) =>
                                            sector?.value === selectedStatus
                                    )}
                                    validationIcons
                                    onChange={(e: any) => {
                                        setSelectedStatus(e)
                                    }}
                                    onlyValue
                                />

                                <TextInput
                                    label={'Phone Number'}
                                    name={FormKeys.Phone}
                                    placeholder={'Your phone number...'}
                                    validationIcons
                                    required
                                />

                                <TextInput
                                    label={'Address'}
                                    name={FormKeys.Address}
                                    placeholder={'Your Address Line 1...'}
                                    validationIcons
                                    placesSuggetions
                                />
                                <TextInput
                                    label={'Website (Optional)'}
                                    name={FormKeys.Website}
                                    placeholder={'Website Url...'}
                                    validationIcons
                                />

                                <TextArea
                                    name={'note'}
                                    label={'Add Note'}
                                    placeholder={'Add Note here'}
                                    rows={6}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 flex justify-start">
                        <Button
                            text={
                                industryData
                                    ? 'Update Industry'
                                    : 'Add Industry'
                            }
                            submit
                            {...(industryData ? { outline: true } : {})}
                            disabled={
                                addIndustryResult?.isLoading ||
                                updateResult.isLoading
                            }
                            loading={
                                addIndustryResult?.isLoading ||
                                updateResult.isLoading
                            }
                        />
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
