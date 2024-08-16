import { Switch } from '@components/inputs'
import { Typography } from '@components/Typography'
import React from 'react'

export const PermissionCard = ({ permission }: { permission: any }) => {
    return (
        <div className="flex items-center justify-between px-3 py-2 rounded-md border border-[#6B728060]">
            <Typography variant="xs" medium>
                {permission?.text}
            </Typography>
            <div className="flex items-center gap-x-3.5">
                <Typography variant="small" normal>
                    OFF
                </Typography>

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

                <Typography variant="small" normal>
                    ON
                </Typography>
            </div>
        </div>
    )
}
