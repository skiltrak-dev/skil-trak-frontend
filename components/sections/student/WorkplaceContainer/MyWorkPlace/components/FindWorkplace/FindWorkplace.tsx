import {
    ShowErrorNotifications,
    TextInput
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@components/buttons/Button'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import { Card, Typography } from '@components'

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
