import { StatusType } from '@types'
import { Animations } from '@animations'
import { LottieAnimation, Typography, Button } from '@components'
import { AuthUtils } from '@utils'
import { useRouter } from 'next/router'

interface AccountStatusProps {
    status: StatusType
}

const getStatusComponent = ({
    animation,
    title,
    description,
    action,
}: {
    animation: any
    title: string
    description: string
    action?: { onClick: Function; text: string }
}) => {
    return (
        <div className="h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-y-8">
                <div>
                    <LottieAnimation
                        height={250}
                        width={250}
                        animation={animation}
                    />
                </div>

                <div className="w-5/6 text-center">
                    <p className="text-lg font-semibold">{title}</p>
                    <p className="text-sm text-gray-400">{description}</p>
                </div>

                {action && (
                    <Button
                        text={action.text || 'Action'}
                        outline
                        onClick={() => {
                            action.onClick()
                        }}
                    />
                )}
            </div>
        </div>
    )
}
export const AccountStatus = ({ status }: AccountStatusProps) => {
    const router = useRouter()
    const role = AuthUtils.getUserCredentials().role

    switch (status) {
        case 'pending':
            return getStatusComponent({
                animation: Animations.Auth.SignUp.Waiting,
                title: `Your Account Request Is Under Review`,
                description: `You will be redirected to page, once your
                request got approved by one of our Admin.`,
                action: {
                    text: 'My Account',
                    onClick: () => {
                        switch (role) {
                            case 'admin':
                                router.push('/portals/admin')
                                break
                            case 'industry':
                                router.push('/portals/industry')
                                break
                            case 'rto':
                                router.push('/portals/rto')
                                break
                            case 'student':
                                router.push('/portals/student')
                                break
                            case 'subadmin':
                                router.push('/portals/sub-admin')
                                break
                        }
                    },
                },
            })

        case 'archived':
            return getStatusComponent({
                animation: Animations.Auth.SignUp.Waiting,
                title: `Your Account Is Archived`,
                description: `Contact our support team, if you want to un-archive`,
            })

        case 'blocked':
            return getStatusComponent({
                animation: Animations.Auth.SignUp.Rejected,
                title: `Your Account Is Blocked`,
                description: `Contact our support team, if you want to un-block`,
            })

        case 'rejected':
            return getStatusComponent({
                animation: Animations.Auth.SignUp.Rejected,
                title: `Your Account Is Rejected`,
                description: `Please contact regarding authority to re-open`,
                action: {
                    text: 'Request To Re-Open',
                    onClick: () => {},
                },
            })

        default:
            return <></>
    }
}
