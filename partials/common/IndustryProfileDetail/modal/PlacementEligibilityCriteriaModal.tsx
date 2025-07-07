import {
    LoadingAnimation,
    Modal,
    NoData,
    Select,
    ShowErrorNotifications,
    Switch,
} from '@components'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum Transport {
    OWN_TRANSPORT = 'own_transport',
    PUBLIC_TRANSPORT = 'public_transport',
}
export const PlacementEligibilityCriteriaModal = ({
    industry,
    onCancel,
}: any) => {
    const router = useRouter()
    const indId = router?.query?.id
    const { notification } = useNotification()
    const { data, isLoading, isError } =
        CommonApi.Industries.useIndustryEligibilityCriteria(indId, {
            skip: !indId,
        })
    const [updateEligibilityCriteria, resultUpdateEligibilityCriteria] =
        CommonApi.Industries.useUpdateIndustryEligibilityCriteria()

    useEffect(() => {
        if (resultUpdateEligibilityCriteria.isSuccess) {
            notification.success({
                title: 'Eligibility Criteria',
                description: 'Updated Successfully',
            })
        }
    }, [resultUpdateEligibilityCriteria.isSuccess])

    const genderOptions = [
        { label: 'Male', value: Gender.MALE },
        { label: 'Female', value: Gender.FEMALE },
        { label: 'Other', value: Gender.OTHER },
    ]
    const transportOptions = [
        {
            label: 'Own',
            value: Transport.OWN_TRANSPORT,
        },
        {
            label: 'Public Transport',
            value: Transport.PUBLIC_TRANSPORT,
        },
    ]
    const findOptionByValue = (options: any[], value: any) => {
        return options.find((option) => option.value === value) || null
    }
    const existingCriteria = data || {}
    const methods = useForm({
        mode: 'all',
        defaultValues: {
            // Set default values for pre-population
            gender: existingCriteria.gender || '',
            transport: existingCriteria.transport || '',
            NDIS: existingCriteria.NDIS || false,
        },
    })
    const onSubmit = async (values: any) => {
        console.log(values)
        updateEligibilityCriteria({ id: data?.id, body: values })
    }
    return (
        <>
            <ShowErrorNotifications result={resultUpdateEligibilityCriteria} />
            <Modal
                title="Placement Eligibility Criteria"
                onCancelClick={onCancel}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                subtitle=""
            >
                {isLoading ? (
                    <LoadingAnimation />
                ) : isError ? (
                    <NoData isError text="Error while loading data" />
                ) : (
                    <>
                        <FormProvider {...methods}>
                            <form className="mt-2 w-full">
                                <div className="flex flex-col gap-x-4 w-full">
                                    <Select
                                        options={genderOptions}
                                        label="Gender"
                                        name="gender"
                                        onlyValue
                                        defaultValue={findOptionByValue(
                                            genderOptions,
                                            existingCriteria.gender
                                        )}
                                    />
                                    <Select
                                        options={transportOptions}
                                        label="Transport"
                                        name="transport"
                                        onlyValue
                                        defaultValue={findOptionByValue(
                                            transportOptions,
                                            existingCriteria?.transport
                                        )}
                                    />
                                </div>
                                <Switch
                                    name="NDIS"
                                    label="NDIS check required"
                                    customStyleClass="profileSwitch"
                                />
                            </form>
                        </FormProvider>
                    </>
                )}
            </Modal>
        </>
    )
}
