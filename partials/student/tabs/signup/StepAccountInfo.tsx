import { useRouter } from 'next/router'

import { UserRoles } from '@constants'
import { StudentSignUpForm } from '@partials/student/forms'
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
                    <StudentSignUpForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}
