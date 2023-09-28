import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi, CommonApi, commonApi } from '@queries'
import { SignUpUtils, isEmailValid } from '@utils'

import { Button, Select, ShowErrorNotifications, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { OptionType } from '@types'
export const AddIndustry = ({ industryData }: { industryData: any }) => {
    const router = useRouter()

    const { notification } = useNotification()

    const sectorResponse = AuthApi.useSectors({})
    const [addIndustry, addIndustryResult] =
        CommonApi.FindWorkplace.useAddIndustry()

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const [sectorOptions, setSectorOptions] = useState<any>([])

    const [lastEnteredEmail, setLastEnteredEmail] = useState('')
    const [selectedSector, setSelectedSector] = useState<number | null>(null)

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
    console.log({ addIndustryResult })
    const validationSchema = yup.object({
        // Profile Information
        businessName: yup
            .string()
            .required('Must provide your name'),
        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        phone: yup.string().required('Must provide phone number'),
        sector: yup.object().nullable(true).required(),
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
                    industryData[key as keyof typeof industryData]
            })

            Object.entries(obj)?.forEach(([key, value]: any) => {
                formMethods.setValue(key, value)
            })
            setSelectedSector(industryData?.sector?.id)
        }
    }, [industryData])

    console.log({ industryData })

    useEffect(() => {
        if (addIndustryResult?.isSuccess) {
            notification.success({
                title: 'Industry Added',
                description: `Industry  has been added successfully.`,
            })
            formMethods.reset()
        }
    }, [addIndustryResult])

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

    const onSubmit = (values: any) => {
        const data = {
            ...values,
            sector: values.sector.value,
        }
        SignUpUtils.setValuesToStorage(values)
        addIndustry(data)
    }
    return (
        <>
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
                                    name={'businessName'}
                                    placeholder={'Industry Name...'}
                                    validationIcons
                                    required
                                />

                                <TextInput
                                    label={'Email'}
                                    name={'email'}
                                    type={'email'}
                                    placeholder={'Your Email...'}
                                    validationIcons
                                    required
                                    onBlur={onEmailChange}
                                    loading={emailCheckResult.isLoading}
                                />
                                <Select
                                    label={'Sector'}
                                    name={'sector'}
                                    options={sectorOptions}
                                    placeholder={'Select Sectors...'}
                                    loading={sectorResponse.isLoading}
                                    value={sectorOptions?.find(
                                        (sector: any) =>
                                            sector?.value === selectedSector
                                    )}
                                    validationIcons
                                    onChange={(e: any) => {
                                        setSelectedSector(e?.value)
                                    }}
                                />

                                <TextInput
                                    label={'Phone Number'}
                                    name={'phone'}
                                    placeholder={'Your phone number...'}
                                    validationIcons
                                    required
                                />

                                <TextInput
                                    label={'Address'}
                                    name={'address'}
                                    placeholder={'Your Address Line 1...'}
                                    validationIcons
                                    placesSuggetions
                                />
                                <TextInput
                                    label={'Website (Optional)'}
                                    name={'website'}
                                    placeholder={'Website Url...'}
                                    validationIcons
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 flex justify-start">
                        <Button
                            text={'Add Industry'}
                            submit
                            disabled={addIndustryResult?.isLoading}
                            loading={addIndustryResult?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
