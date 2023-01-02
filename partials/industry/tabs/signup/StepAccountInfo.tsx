import { useRouter } from 'next/router'

import { UserRoles } from '@constants'
import { IndustrySignUpForm } from '@partials/industry/forms'
import { SignUpUtils } from '@utils'

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
