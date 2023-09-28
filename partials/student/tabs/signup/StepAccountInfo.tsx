import { useRouter } from 'next/router'

import { UserRoles } from '@constants'
import { StudentSignUpForm } from '@partials/student/forms'
import { SignUpUtils } from '@utils'
import { StudentFormType } from '@types'

export const StepAccountInfo = () => {
    const router = useRouter()

    const onSubmit = (values: StudentFormType) => {
        SignUpUtils.setValuesToStorage({
            ...values,
        })

        router.push({ query: { step: 'notification-method' } })
    }

    return (
        <div className="w-full mt-4 pb-10">
            <StudentSignUpForm onSubmit={onSubmit} />
        </div>
    )
}
