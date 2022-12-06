import { StatusType } from '@types'
import { Animations } from '@animations'
import { LottieAnimation, Typography, Button } from '@components'

interface AccountStatusProps {
    status: StatusType
}
export const AccountStatus = ({ status }: AccountStatusProps) => {
    const getStatusComponent = ({
        animation,
        title,
        description,
        action,
    }: {
        animation: any
        title: string
        description: string
        action: { onClick: Function; text: string }
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

                    <div className="w-5/6">
                        <Typography variant={'title'} center>
                            {title}
                        </Typography>
                        <Typography
                            variant={'small'}
                            color={'text-gray-200'}
                            center
                        >
                            {description}
                        </Typography>
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
    switch (status) {
        case 'pending':
            return getStatusComponent({
                animation: Animations.Auth.SignUp.Waiting,
                title: `Your Account Request Is Under Review`,
                description: `You will be redirected to page, once your
                request got approved by one of our Admin.`,
                action: {
                    text: 'My Account',
                    onClick: () => {},
                },
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
