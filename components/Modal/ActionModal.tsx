import { Button } from '@components/buttons'
import { TextInput } from '@components/inputs'
import { useState } from 'react'
import { FaBan } from 'react-icons/fa'

export const ActionModalType = {
    primary: 'text-orange-500',
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
    'error',
    'action',
    'dark',
    'success',
] as const

interface ActionModalProps {
    variant?: typeof VariantOptions[number]
    title: string
    description: string
    input?: boolean
    inputKey?: string
    onCancel?: Function
    onConfirm: Function
    confirmText?: string
    Icon?: any
    actionObject: any
    loading?: boolean
}

export const ActionModal = ({
    variant = 'primary',
    title,
    description,
    input,
    inputKey,
    onCancel,
    onConfirm,
    confirmText,
    Icon,
    actionObject,
    loading,
}: ActionModalProps) => {
    const [keyMatched, setKeyMatched] = useState(false)

    return (
        <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
            <div className="bg-white rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] px-16 py-4">
                {Icon && (
                    <div className={`${ActionModalType[variant]}`}>
                        <Icon size={48} />
                    </div>
                )}

                <div className="flex flex-col items-center gap-y-2">
                    <p className="text-lg font-semibold">{title}</p>
                    <p
                        className="text-gray-500 max-w-[400px] text-center"
                        dangerouslySetInnerHTML={{ __html: description }}
                    >
                        {/* {description} */}
                    </p>
                </div>

                {/* {input && (
                    <div className="w-full">
                        <TextInput
                            name="question"
                            label={`Enter "${inputKey}" To Confirm`}
                            placeholder={inputKey}
                            onChange={(e: any) => {
                                if (e.target.value === inputKey)
                                    setKeyMatched(true)
                                else if (keyMatched) setKeyMatched(false)
                            }}
                        />
                    </div>
                )} */}
                <div className="flex gap-x-4 items-center">
                    <Button
                        text="Cancel"
                        variant="secondary"
                        onClick={() => {
                            onCancel && onCancel()
                        }}
                    />
                    <Button
                        text={confirmText || 'Confirm'}
                        variant={variant}
                        // disabled={(input && !keyMatched) || loading}
                        onClick={() => {
                            onConfirm && onConfirm(actionObject)
                        }}
                        loading={loading}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    )
}
