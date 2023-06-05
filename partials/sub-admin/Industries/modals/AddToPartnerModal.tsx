import { Modal, ShowErrorNotifications, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const AddToPartnerModal = ({
    onCancel,
    industry,
}: {
    industry: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [addToPartner, addToPartnerResult] =
        SubAdminApi.Industry.useAddToPartner()
    useEffect(() => {
        if (addToPartnerResult.isSuccess) {
            notification.success({
                title: 'Added To Partner',
                description: 'Added To Partner',
            })
            onCancel()
        }
    }, [addToPartnerResult])

    const validationSchema = Yup.object({
        studentCapacity: Yup.string().required('StudentCapacity is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        addToPartner({
            ...values,
            industry,
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={addToPartnerResult} />
            <Modal
                title={'Add To Partner'}
                subtitle={'Add to Partner Industry'}
                onCancelClick={onCancel}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                loading={addToPartnerResult.isLoading}
                disabled={addToPartnerResult.isLoading}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <TextInput
                            label={'Student Capacity'}
                            name={'studentCapacity'}
                            placeholder={'Your Student Capacity Here...'}
                            validationIcons
                            required
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
