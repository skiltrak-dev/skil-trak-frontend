import React from 'react'
import { Switch } from '@components/inputs'
import { Typography } from '@components/Typography'

export const PermissionCard = ({ permission }: { permission: any }) => {
    return (
        <div className="flex items-center justify-between px-3  rounded-md border-b border-[#6B728060]">
            <Typography variant="xs" medium>
                {permission?.text}
            </Typography>
            <div className="flex items-center gap-x-3.5">
                <Switch
                    name="priority"
                    customStyleClass={'profileSwitch'}
                    onChange={() => {
                        permission?.onClick()
                    }}
                    defaultChecked={permission?.toggle}
                    value={permission?.toggle}
                    loading={permission?.isLoading}
                    disabled={permission?.isLoading}
                />
            </div>
        </div>
    )
}
