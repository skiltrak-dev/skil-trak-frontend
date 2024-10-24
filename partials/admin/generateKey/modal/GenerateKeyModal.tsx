import {
    Button,
    GlobalModal,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi, CommonApi } from '@queries'
import { OptionType, Rto } from '@types'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { LiaTimesSolid } from 'react-icons/lia'
import * as Yup from 'yup'

export const GenerateKeyModal = ({ onCancel }: { onCancel: () => void }) => {
    const getRtos = CommonApi.Filter.useRtos()
    const [generateKey, generateKeyResult] = AdminApi.GenerateKey.generateKey()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        rtoId: Yup.string().required('RTO is required!'),
        expiry: Yup.string().required('Expiry is required!'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const rtoOptions = getRtos?.data?.map((rto: Rto) => ({
        value: rto?.user?.id,
        label: rto?.user?.name,
    }))

    const onSubmit = async (values: any) => {
        const res: any = await generateKey(values)
        if (res?.data) {
            notification?.success({
                title: 'Key Generated',
                description: 'Key Generated Successfully',
            })
            onCancel()
        }
    }

    return (
        <GlobalModal>
            <ShowErrorNotifications result={generateKeyResult} />
            <div className="rounded-lg overflow-hidden max-w-2xl min-w-[600px]">
                <div className="grid grid-cols-3 py-3 px-4 border-b border-[#E6E6E6]">
                    <div className="col-start-2">
                        <Typography center semibold>
                            Generate Key
                        </Typography>
                    </div>
                    <LiaTimesSolid
                        size={20}
                        onClick={onCancel}
                        className="ml-auto transition-all duration-500 text-gray-700 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                {/*  */}
                <div className="px-4 py-2.5">
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div className="">
                                <Select
                                    required
                                    onlyValue
                                    name={'rtoId'}
                                    options={rtoOptions}
                                    label={'Search By Rto'}
                                    loading={getRtos.isLoading}
                                    disabled={getRtos.isLoading}
                                    placeholder={'Select Search By Rto...'}
                                />

                                <TextInput
                                    label={'Expiray Range'}
                                    name={'expiry'}
                                    type={'date'}
                                    placeholder={'Expiray Range...'}
                                    validationIcons
                                    required
                                />
                            </div>

                            <div className="flex justify-center">
                                <Button
                                    submit
                                    loading={generateKeyResult?.isLoading}
                                    disabled={generateKeyResult?.isLoading}
                                >
                                    Generate
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </GlobalModal>
    )
}
