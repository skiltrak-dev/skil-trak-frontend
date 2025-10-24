import { Button } from '@components'
import { Send } from 'lucide-react'
import React from 'react'

export const ServiceFormActions = ({
    onCancel,
    variant,
    loading,
}: {
    loading?: boolean
    variant: any
    onCancel: () => void
}) => {
    return (
        <div className="flex justify-between items-center gap-2">
            <Button text={'Cancel'} onClick={onCancel} variant="secondary" />
            <Button
                text={'Request Consultation'}
                variant={variant}
                submit
                Icon={() => <Send size={12} />}
                loading={loading}
                disabled={loading}
            />
        </div>
    )
}
