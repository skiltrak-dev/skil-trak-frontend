import { useRouter } from 'next/router'

import { RtoSignUpForm } from '@partials/rto/forms'
import { RtoFormData } from '@types'
import { SignUpUtils } from '@utils'

export const StepAccountInfo = () => {
    const router = useRouter()

    const onSubmit = (values: RtoFormData) => {
        SignUpUtils.setValuesToStorage<RtoFormData>({
            ...values,
        })

        router.push({ query: { step: 'notification-method' } })
    }

    return (
        <div>
            <div>
                <div className="w-full mt-4 pb-10">
                    <RtoSignUpForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
