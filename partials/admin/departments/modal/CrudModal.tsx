import React, { useRef, useEffect, useState } from 'react'
import { useModal } from '../hooks'
import { Button } from '@components'

export const ActionModalType: any = {
    primary: 'text-orange-500',
    secondary: 'text-slate-500',
    info: 'text-indigo-500',
    error: 'text-red-500',
    action: 'action',
    dark: 'text-slate-700',
    success: 'text-green-500',
}

export const CrudModal = () => {
    const { modalConfig, closeModal } = useModal()
    const [isLoading, setIsloading] = useState<boolean>(false)
    const dialogRef = useRef<any>(null)

    useEffect(() => {
        if (modalConfig) {
            dialogRef?.current?.showModal()
        } else {
            dialogRef?.current?.close()
        }
    }, [modalConfig])

    if (!modalConfig) return null

    const {
        title,
        content,
        icon: Icon,
        confirmText,
        variant,
        cancelText,
        onConfirm,
        loading,
    } = modalConfig

    const handleConfirm = async () => {
        setIsloading(true)
        const res = await onConfirm()
        setIsloading(false)
        if (res?.data) {
            closeModal()
        }
    }

    return (
        <dialog
            ref={dialogRef}
            className="px-16 py-8 rounded-lg shadow-xl max-w-md w-full modal-animation sm:w-auto sm:min-w-[450px]"
        >
            {Icon && (
                <div
                    className={`flex justify-center mb-3 ${ActionModalType[variant]}`}
                >
                    <Icon size={48} />
                </div>
            )}
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-lg font-semibold">{title}</p>

                <p
                    className="text-gray-500 max-w-[400px] text-center mb-4"
                    dangerouslySetInnerHTML={{ __html: content }}
                >
                    {/* {content} */}
                </p>
            </div>
            <div className="flex justify-center gap-x-4">
                <Button onClick={closeModal} variant={'secondary'}>
                    {cancelText || 'Cancel'}
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant={variant || 'info'}
                    loading={loading || isLoading}
                    disabled={loading || isLoading}
                >
                    {confirmText || 'Confirm'}
                </Button>
            </div>
        </dialog>
    )
}
