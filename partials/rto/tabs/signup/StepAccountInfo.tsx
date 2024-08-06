import { useRouter } from 'next/router'

import { RtoSignUpForm } from '@partials/rto/forms'
import { RtoFormData } from '@types'
import { SignUpUtils } from '@utils'

export const StepAccountInfo = () => {
    const router = useRouter()

    const onSubmit = (values: RtoFormData) => {
        console.log('values', values)
        SignUpUtils.setValuesToStorage<RtoFormData>({
            ...values,
        })

        router.push({ query: { step: 'package-selection' } })
    }

    return (
        <div>
            <div>
                <div className="w-full mt-4 pb-10 md:px-0 px-4">
                    <RtoSignUpForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
