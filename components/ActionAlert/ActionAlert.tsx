import { useRouter } from 'next/router'

import { Animations } from '@animations'
import { LottieAnimation, Typography, Button } from '@components'

export const ActionAlertType = {
    success: 'primary',
    info: 'info',
    error: 'error',
}

type SubAction = {
    text: string
    onClick: () => void
    loading?: boolean
}

const VariantOptions = ['primary', 'info', 'error'] as const

interface ActionAlertProps {
    title: string
    description: string
    primaryAction?: SubAction
    secondaryAction?: SubAction
    redirect?: boolean
    variant?: (typeof VariantOptions)[number]
}

const AlertAnimations = {
    [ActionAlertType.success]: Animations.Common.Actions.Success,
    [ActionAlertType.info]: Animations.Common.Actions.Info,
    [ActionAlertType.error]: Animations.Common.Actions.Error,
}
export const ActionAlert = ({
    title,
    description,
    primaryAction,
    secondaryAction,
    redirect,
    variant = VariantOptions[0],
}: ActionAlertProps) => {
    const router = useRouter()

    return (
        <div className="w-full px-0 md:px-20 py-7 flex flex-col items-center gap-y-7">
            <LottieAnimation
                loop={false}
                animation={AlertAnimations[variant]}
            />

            <div>
                <Typography variant={'h4'} center>
                    {title}
                </Typography>
                <Typography center>{description}</Typography>
            </div>
            <div className="flex items-center gap-x-4">
                {!redirect && !primaryAction && (
                    <Button
                        text={'Go Back'}
                        outline
                        onClick={() => {
                            router.back()
                        }}
                    />
                )}

                {!redirect && primaryAction && (
                    <Button
                        variant={'primary'}
                        onClick={() => primaryAction.onClick()}
                        text={primaryAction.text}
                        outline
                    />
                )}

                {!redirect && secondaryAction && (
                    <Button
                        variant={variant}
                        onClick={() => secondaryAction.onClick()}
                        text={secondaryAction.text}
                    />
                )}
            </div>
        </div>
    )
}
