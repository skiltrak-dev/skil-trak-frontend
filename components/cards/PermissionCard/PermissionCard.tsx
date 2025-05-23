import React from 'react'
import { Switch } from '@components/inputs'
import { Typography } from '@components/Typography'
import { ActionButton } from '@components/buttons'

export const PermissionCard = ({
    permission,
    onCancel,
}: {
    permission: any
    onCancel?: () => void
}) => {
    return (
        <div className="flex items-center justify-between px-3  rounded-md border-b border-[#6B728060]">
            <Typography variant="xs" medium>
                {permission?.text}
            </Typography>
            {permission?.isButton ? (
                <ActionButton
                    variant="info"
                    onClick={() => permission?.onClick()}
                >
                    Change
                </ActionButton>
            ) : (
                <div className="flex items-center gap-x-3.5">
                    <Switch
                        name="priority"
                        customStyleClass={'profileSwitch'}
                        onChange={async () => {
                            const res: any = await permission?.onClick()
                            if (res?.data && onCancel) {
                                onCancel()
                            }
                        }}
                        defaultChecked={permission?.toggle}
                        value={permission?.toggle}
                        loading={permission?.isLoading}
                        disabled={permission?.isLoading}
                    />
                </div>
            )}
        </div>
    )
}
