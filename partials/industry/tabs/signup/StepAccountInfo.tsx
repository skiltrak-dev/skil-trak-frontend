import { useRouter } from 'next/router'

import { SignUpUtils } from '@utils'
import { IndustrySignUpForm } from '@partials/industry/forms'

export const StepAccountInfo = () => {
    const router = useRouter()

    const onSubmit = (values: any) => {
        SignUpUtils.setValuesToStorage({
            ...values,
        })
        router.push({ query: { step: 'notification-method' } })
    }

    return (
        <div>
            <div>
                <div className="w-full mt-4 pb-10">
                    <IndustrySignUpForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
