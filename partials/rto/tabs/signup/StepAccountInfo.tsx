import { useRouter } from 'next/router'

import { UserRoles } from '@constants'
import { RtoSignUpForm } from '@partials/rto/forms'
import { SignUpUtils } from '@utils'
import { RtoFormData } from '@types'

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
