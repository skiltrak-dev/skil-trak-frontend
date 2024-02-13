import { ShowErrorNotifications, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@components/buttons/Button'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import { Card } from '@components'

type FindWorkplaceProps = {
    onSubmit: any
    result: any
}
export const FindWorkplaceForm = ({ onSubmit, result }: FindWorkplaceProps) => {
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
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <h2 className="font-semibold">
                            Look up for your industry
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            You have chosen that you already have an industry.
                            You can look up for your industry in our system by
                            providing <b>ABN</b> of industry you already have.
                        </p>

                        <p className="text-xs text-orange-300 my-4">
                            <em>Note:</em> Your required industry may or may not
                            exists in our system. The information will be shown
                            to you if we have specific industry, otherwise you
                            will have to add your own
                        </p>
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
