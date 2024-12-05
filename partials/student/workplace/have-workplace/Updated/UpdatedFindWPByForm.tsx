import React, { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput, Typography } from '@components'

export enum FindWPType {
    name = 'Name',
    abn = 'ABN',
}

export const UpdatedFindWPByForm = ({
    submitValue,
    onSubmit,
    type,
    onSubmitValue,
}: {
    onSubmit: any
    submitValue: {
        type: 'name' | 'abn'
        value: string
    }
    type: 'name' | 'abn'
    onSubmitValue: ({
        type,
        value,
    }: {
        type: 'name' | 'abn'
        value: string
    }) => void
}) => {
    const validationSchema = Yup.object({
        [type]: Yup.string().required(`${FindWPType[type]} is required`),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    useEffect(() => {
        if (submitValue?.type !== type) {
            methods.setValue(type, '')
        }
    }, [submitValue])

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit((values) => {
                        onSubmit({
                            type,
                            value: values[type],
                        })
                    })}
                >
                    <div className="flex flex-col gap-y-6">
                        <div className="flex flex-col gap-y-2.5">
                            <Typography variant="h4" color="text-[#170F49]">
                                Find By {FindWPType[type]}
                            </Typography>
                            <Typography color="!text-[#6F6C90]">
                                You can look up for your industry in our system
                                by providing{' '}
                                <span className="font-bold">
                                    {FindWPType[type]}
                                </span>{' '}
                                of industry you already have.
                            </Typography>
                        </div>
                        <TextInput
                            label={FindWPType[type]}
                            name={type}
                            placeholder={`Your ${FindWPType[type]} Here...`}
                            validationIcons
                            required
                            onChange={(e: any) => {
                                onSubmitValue({
                                    type,
                                    value: e.target.value,
                                })
                            }}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
