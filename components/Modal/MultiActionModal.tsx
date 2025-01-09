import { Typography, Button } from '@components'
import React from 'react'

const ActionModalType = {
    primary: 'text-primary',
    secondary: 'text-slate-500',
    info: 'text-indigo-500',
    error: 'text-red-500',
    action: 'action',
    dark: 'text-slate-700',
    success: 'text-green-500',
}

const VariantOptions = [
    'primary',
    'secondary',
    'info',
    'action',
    'dark',
    'error',
    'success',
] as const

export const MultiActionModal = ({
    variant = VariantOptions[0],
    Icon,
    title,
    description,
    onCancel,
    onConfirm,
    loading,
    confirmText,
}: {
    variant?: (typeof VariantOptions)[number]
    Icon: any
    title?: string
    description?: string
    onCancel: () => void
    onConfirm: Function
    loading?: boolean
    confirmText?: string
}) => {
    return (
        <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
            <div className="bg-white modal-animation rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] max-w-lg px-16 py-4">
                <div className="flex flex-col gap-y-2 justify-center items-center">
                    {Icon && (
                        <Icon
                            size={48}
                            className={`${(ActionModalType as any)[variant]}`}
                        />
                    )}
                    <Typography variant={'title'} center>
                        {title || 'Are You Sure'}
                    </Typography>
                    <Typography variant={'label'} center>
                        {description || 'Are You Sure'}
                    </Typography>
                </div>

                <div className="flex gap-x-4 items-center">
                    <Button
                        text="Cancel"
                        variant="secondary"
                        outline
                        onClick={() => {
                            onCancel && onCancel()
                        }}
                    />
                    <Button
                        text={confirmText || 'Confirm'}
                        variant={variant}
                        disabled={loading}
                        onClick={() => {
                            onConfirm ? onConfirm() : onCancel()
                        }}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}
