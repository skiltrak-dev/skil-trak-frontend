import * as Yup from 'yup'
import { SubAdminApi } from '@queries'
import { useNotification, useSubadminProfile } from '@hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import {
    Modal,
    ShowErrorNotifications,
    TextArea,
    useAuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'

export const RemoveAddToPartnerModal = ({
    onCancel,
    industry,
}: {
    industry: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [addToPartner, addToPartnerResult] =
        SubAdminApi.Industry.useAddToPartner()

    const subadmin = useSubadminProfile()

    const hasPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
    })

    const validationSchema = Yup.object({
        comment: Yup.string().required('Note is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const res: any = await addToPartner({
            industry,
            studentCapacity: 0,
            ...values,
        })

        if (res?.data) {
            notification?.[hasPermission ? 'success' : 'warning']({
                title: `Request Sent`,
                description: `Remove from Partner ${
                    !hasPermission ? 'Request sent to Manager' : ''
                } Successfully!`,
            })
        }
    }
    return (
        <div>
            <ShowErrorNotifications result={addToPartnerResult} />
            <Modal
                title={'Remove From Partner'}
                subtitle={'Remove From Partner Industry'}
                onCancelClick={onCancel}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                loading={addToPartnerResult.isLoading}
                disabled={addToPartnerResult.isLoading}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <TextArea
                            label={'Note'}
                            name={'comment'}
                            placeholder={'Enter Note Here...'}
                            validationIcons
                            required
                            rows={6}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
