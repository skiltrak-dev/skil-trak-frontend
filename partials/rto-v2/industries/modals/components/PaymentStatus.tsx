import React, { useEffect } from 'react'
import { Animations } from '@animations'
import { LottieAnimation, Button, ShowErrorNotifications } from '@components'
import { CheckCircle2, XCircle, Info, ArrowLeft } from 'lucide-react'
import { RtoV2Api } from '@redux'
import { useNotification } from '@hooks'

type StatusType = 'success' | 'error' | 'processing'

interface PaymentStatusProps {
    status: StatusType
    title: string
    description: string
    action?: {
        onClick: () => void
        text: string
        variant?: 'primaryNew' | 'secondary' | 'dark'
    }
}

export const PaymentStatus = ({
    status,
    title,
    description,
    action,
}: PaymentStatusProps) => {
    const [changeRtoNetwork, changeRtoNetworkResult] =
        RtoV2Api.RtoCredits.changeRtoNetwork()
    const { notification } = useNotification()

    const onSuccess = async () => {
        const res: any = await changeRtoNetwork({ network: 'shareable' })
        if (res?.data) {
            notification.success({
                title: 'Network Changed',
                description: 'Network Changed Successfully',
            })
        }
    }

    useEffect(() => {
        onSuccess()
    }, [])

    const getAnimation = () => {
        switch (status) {
            case 'success':
                return Animations.Common.Success
            case 'error':
                return Animations.Common.Actions.Error
            case 'processing':
                return Animations.Common.Loading
            default:
                return Animations.Common.Loading
        }
    }

    const getIcon = () => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="h-5 w-5 text-success" />
            case 'error':
                return <XCircle className="h-5 w-5 text-error" />
            case 'processing':
                return <Info className="h-5 w-5 text-primaryNew" />
        }
    }

    return (
        <>
            <ShowErrorNotifications result={changeRtoNetworkResult} />
            <div className="flex flex-col items-center justify-center py-10 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primaryNew/5 rounded-full blur-3xl scale-150"></div>
                    <LottieAnimation
                        animation={getAnimation()}
                        height={200}
                        width={200}
                        loop={status === 'processing'}
                    />
                </div>

                <div className="space-y-2 max-w-sm relative z-10">
                    <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center justify-center gap-2">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {action && (
                    <div className="mt-8 w-full max-w-xs animate-in slide-in-from-bottom-4 duration-700 delay-300">
                        <Button
                            variant={action.variant || 'primaryNew'}
                            className="w-full h-11 font-bold shadow-premium transition-all hover:scale-[1.02]"
                            onClick={action.onClick}
                        >
                            {action.text}
                        </Button>
                    </div>
                )}

                {!action && status === 'success' && (
                    <div className="mt-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                        Auto-closing in a few seconds...
                    </div>
                )}
            </div>
        </>
    )
}
