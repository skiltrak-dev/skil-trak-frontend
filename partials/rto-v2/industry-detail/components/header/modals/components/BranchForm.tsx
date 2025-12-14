import * as Yup from 'yup'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { IndustryBranchesAddressType } from '@types'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, ShowErrorNotifications, TextInput } from '@components'

interface BranchFormProps {
    onSuccess: () => void
    defaultValues?: Partial<IndustryBranchesAddressType>
    onCancel: () => void
    isEdit?: boolean
    industryId?: number
}

export const BranchForm = ({
    onSuccess,
    defaultValues,
    onCancel,
    isEdit,
    industryId,
}: BranchFormProps) => {
    const { notification } = useNotification()

    // Api Mutations
    const [addBranch, { isLoading: isAdding, ...addResult }] =
        CommonApi.Industries.addBranchesAddress()
    const [updateBranch, { isLoading: isUpdating, ...updateResult }] =
        CommonApi.Industries.useUpdateIndustryBranch()

    const validationSchema = Yup.object({
        contactPerson: Yup.string().required('Name is required!'),
        contactPersonPhone: Yup.string().required('Phone is required!'),
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is required!'),
        address: Yup.string().required('Address is required!'),
        suburb: Yup.string().required('Suburb is required!'),
        studentCapacity: Yup.number()
            .transform((value) => (Number.isNaN(value) ? undefined : value))
            .required('Capacity is required')
            .min(1, 'Capacity must be at least 1'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
        defaultValues: {
            ...defaultValues,
            // ensure email maps correctly if the type differs slightly, but typically it aligns
            email: defaultValues?.contactPersonEmail,
        },
    })

    const onSubmit = (values: any) => {
        if (isEdit) {
            updateBranch({
                id: defaultValues?.id,
                industry: industryId,
                ...values,
                contactPersonEmail: values.email,
            })?.then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Branch Updated',
                        description: 'Branch location updated successfully',
                    })
                    onSuccess()
                }
            })
        } else {
            addBranch({
                ...values,
                contactPersonEmail: values.email,
                industry: industryId,
            })?.then((res: any) => {
                if (res?.data) {
                    notification.success({
                        title: 'Branch Added',
                        description: 'New branch location added successfully',
                    })
                    onSuccess()
                }
            })
        }
    }

    const isLoading = isAdding || isUpdating

    return (
        <FormProvider {...methods}>
            <ShowErrorNotifications result={addResult} />
            <ShowErrorNotifications result={updateResult} />
            <form
                className="w-full space-y-4"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="grid grid-cols-1 gap-4">
                    <TextInput
                        label={'Contact Person Name'}
                        name={'contactPerson'}
                        placeholder={'Enter Name'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Contact Person Phone'}
                        name={'contactPersonPhone'}
                        placeholder={'Enter Phone'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Contact Person Email'}
                        name={'email'}
                        type="email"
                        placeholder={'Enter Email'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Address'}
                        name={'address'}
                        placeholder={'Enter Address'}
                        validationIcons
                        placesSuggetions
                        required
                    />
                    <TextInput
                        label={'Suburb'}
                        name={'suburb'}
                        placeholder={'Enter Suburb'}
                        validationIcons
                        required
                    />
                    <TextInput
                        label={'Student Capacity'}
                        name={'studentCapacity'}
                        type={'number'}
                        placeholder={'Enter Capacity'}
                        validationIcons
                        required
                    />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="h-auto py-2.5 px-4 rounded-xl"
                    >
                        Cancel
                    </Button>
                    <Button
                        submit
                        className="bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white rounded-xl h-auto py-2.5 px-6 font-medium shadow-lg hover:shadow-xl active:scale-95 transition-all"
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {isEdit ? 'Update Branch' : 'Create Branch'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
