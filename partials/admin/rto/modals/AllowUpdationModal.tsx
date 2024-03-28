import {
    ActionModal,
    Modal,
    ShowErrorNotifications,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { HiCheckBadge } from 'react-icons/hi2'
import * as Yup from 'yup'

export const AllowUpdationModal = ({
    rto,
    onCancel,
}: {
    rto: Rto | undefined | null
    onCancel: Function
}) => {
    const password = process.env.NEXT_PUBLIC_UPDATE_DATE
    const [enteredPassword, setEnteredPassword] = useState<boolean>(false)

    const { notification } = useNotification()
    const [allowUpdation, allowUpdationResult] =
        AdminApi.Rtos.useAllowUpdation()

    const onConfirmUClicked = async (rto: Rto) => {
        allowUpdation(rto?.id).then((res: any) => {
            if (res?.data) {
                rto?.allowUpdate
                    ? notification.message({
                          title: `Revoked`,
                          description: `Revoked permission to update the timestamp.`,
                      })
                    : notification.success({
                          title: 'Granted',
                          description:
                              'Granted permission to update the timestamp.',
                      })
                onCancel()
            }
        })
    }

    const onEnterPassword = (values: any) => {
        if (values?.password === password) {
            setEnteredPassword(true)
        } else {
            notification.error({
                title: 'Some thing is not right',
                description: 'Internal Server Error',
            })
        }
    }

    const validationSchema = Yup.object().shape({
        startDate: Yup.date().when('enteredPassword', {
            is: enteredPassword,
            then: Yup.date()
                .typeError('Start Date must be a valid date')
                .required('Start Date is required'),
            otherwise: Yup.date().nullable(),
        }),
        endDate: Yup.date().when('enteredPassword', {
            is: enteredPassword,
            then: Yup.date()
                .typeError('End Date must be a valid date')
                .required('End Date is required'),
            otherwise: Yup.date().nullable(),
        }),
    })

    const methods = useForm<{ startDate: Date; endDate: Date }>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    return (
        <>
            <ShowErrorNotifications result={allowUpdationResult} />
            {!enteredPassword ? (
                <Modal
                    title="Password"
                    subtitle="Password"
                    showActions={false}
                    onCancelClick={onCancel}
                >
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onEnterPassword)}
                        >
                            <TextInput
                                name={'password'}
                                validationIcons
                                required
                            />
                        </form>
                    </FormProvider>
                </Modal>
            ) : (
                <ActionModal
                    Icon={HiCheckBadge}
                    variant="success"
                    title="Are you sure!"
                    description={`By confirming this, you will grant permission for this RTO to modify students' dates and timing stamps.`}
                    onConfirm={onConfirmUClicked}
                    onCancel={onCancel}
                    input
                    inputKey={rto?.user?.email}
                    actionObject={rto}
                    loading={allowUpdationResult.isLoading}
                />
            )}
        </>
    )
}
