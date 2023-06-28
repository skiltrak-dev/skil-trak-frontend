import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { Button } from 'components/buttons/Button'
import {
    Select,
    TextInput,
    RadioButton,
    RadioGroup,
    ShowErrorNotifications,
} from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

// components
import { Card, Typography } from 'components'

import { useUpdateFindAbnMutation } from '@queries'
import { SignUpUtils } from '@utils'
import { ApiCallResult } from '@types'
type FindWorkplaceProps = {
    onSubmit: any
    result: any
}
export const FindWorkplace = ({ onSubmit, result }: FindWorkplaceProps) => {
    // const [updateFindAbn, result] = useUpdateFindAbnMutation()

    const validationSchema = yup.object({
        abn: yup.string().required('Must provide ABN'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    return (
        <div>
            <ShowErrorNotifications result={result} />
            <Typography variant={'label'} capitalize>
                Please provide following information
            </Typography>
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <TextInput
                            name="abn"
                            label="ABN"
                            placeholder="ABN Code"
                            validationIcons
                        />
                        <Button
                            submit
                            text={'Find'}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
