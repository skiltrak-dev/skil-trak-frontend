import { Button, Modal, Select } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Rto } from '@types'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { AdminApi } from '@queries'
import * as yup from 'yup'

export const AssociatedWithRTOModal = ({
    rtos,
    subadminId,
    onCancel,
}: {
    rtos: Rto[]
    subadminId: number
    onCancel: () => void
}) => {
    const [associatedWithRto, associatedWithRtoResult] =
        AdminApi.SubAdmins.useAssociatedWithRto()

    const validationSchema = yup.object({
        rto: yup.number().required('Must select RTO!'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const rtoOptions = rtos?.map((rto: Rto) => ({
        label: rto?.user?.name,
        value: rto?.id,
    }))

    const onSubmit = (values: any) => {
        associatedWithRto({
            id: subadminId,
            rtoId: values?.rto,
        }).then((res: any) => {
            if (res?.data) {
                onCancel()
            }
        })
    }
    return (
        <div>
            <Modal
                title="Associate with rto"
                subtitle="Associate with rto"
                onCancelClick={() => {
                    onCancel()
                }}
                loading={associatedWithRtoResult.isLoading}
                onConfirmClick={formMethods.handleSubmit(onSubmit)}
            >
                <FormProvider {...formMethods}>
                    <form className="flex flex-col gap-y-4">
                        <Select
                            label={'Select Rto'}
                            name={'rto'}
                            options={rtoOptions}
                            validationIcons
                            onlyValue
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
