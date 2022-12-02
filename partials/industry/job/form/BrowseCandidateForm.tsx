import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

import { Select, Button } from '@components'

export const BrowseCandidateForm = ({ onSubmit }: any) => {
    
    const validationSchema = yup.object({
        // businessName: yup.string().required("Some error occured!"),
        // abn: yup.string().required("Some error occured!"),
        // businessPhoneNumber: yup.string().required("Some error occured!"),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-3 gap-x-4 my-4">
                        <Select
                            label={'Sector'}
                            name={'placementCoordinator'}
                            options={[
                                { value: 'apple', label: 'Apple' },
                                {
                                    value: 'banana',
                                    label: 'Banana',
                                },
                                { value: 'melon', label: 'Melon' },
                            ]}
                            onlyValue
                        />

                        <Select
                            label={'Course'}
                            name={'appointmentType'}
                            options={[
                                { value: 'apple', label: 'Apple' },
                                {
                                    value: 'banana',
                                    label: 'Banana',
                                },
                                { value: 'melon', label: 'Melon' },
                            ]}
                            onlyValue
                        />

                        <Select
                            label={'City'}
                            name={'appointmentDate'}
                            options={[
                                { value: 'apple', label: 'Apple' },
                                {
                                    value: 'banana',
                                    label: 'Banana',
                                },
                                { value: 'melon', label: 'Melon' },
                            ]}
                            onlyValue
                        />
                    </div>

                    <Button submit text={'Apply Criteria'} />
                </form>
            </FormProvider>
        </div>
    )
}
