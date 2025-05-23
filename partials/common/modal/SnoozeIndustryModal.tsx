import {
    Modal,
    ShowErrorNotifications,
    TextArea,
    TextInput,
    useAuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification, useSubadminProfile } from '@hooks'
import { CommonApi } from '@queries'
import { Industry } from '@types'
import { getDate } from '@utils'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MdSnooze } from 'react-icons/md'
import * as Yup from 'yup'

export const SnoozeIndustryModal = ({
    onCancel,
    industry,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    const [snoozeIndustry, snoozeIndustryResult] =
        CommonApi.Industries.useSnoozeIndustry()

    const { notification } = useNotification()

    const subadmin = useSubadminProfile()

    const hasPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
    })

    const validationSchema = Yup.object({
        comment: Yup.string().required('Note is required!'),
        date: Yup.string().required('Date is required!'),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (values: any) => {
        const res: any = await snoozeIndustry({
            id: industry?.id,
            ...values,
        })

        if (res?.data) {
            notification[hasPermission ? 'success' : 'warning']({
                title: `Industry Snoozed ${
                    !hasPermission ? 'Request sent' : ''
                }!`,
                description: `Industry Snoozed ${
                    !hasPermission ? 'Request sent to manager' : ''
                } Successfully!`,
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={snoozeIndustryResult} />
            <Modal
                titleIcon={MdSnooze}
                title="Snooze Industry"
                onCancelClick={onCancel}
                subtitle="Snooze Industry"
                loading={snoozeIndustryResult?.isLoading}
                onConfirmClick={methods.handleSubmit(onSubmit)}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <div className="flex w-full items-center gap-x-2">
                            <div className="w-full">
                                <TextInput
                                    label={'Enter Snoozing Date'}
                                    name={'date'}
                                    placeholder="Enter Snoozing End Date"
                                    type={'date'}
                                    min={getDate()}
                                />
                                <TextArea
                                    label={'Note'}
                                    name={'comment'}
                                    placeholder={'Enter Note Here...'}
                                    validationIcons
                                    required
                                    rows={6}
                                />
                                {/* <Button
                                    // Icon={AiFillCheckCircle}
                                    text={'Snooze'}
                                    onClick={() => {
                                        onSubmit()
                                    }}
                                    variant="info"
                                    loading={snoozeIndustryResult.isLoading}
                                    disabled={
                                        snoozeIndustryResult.isLoading ||
                                        !selectedDate
                                    }
                                /> */}
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}
