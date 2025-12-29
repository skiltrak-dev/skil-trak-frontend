import { Button } from '@components'
import { UserPlus } from 'lucide-react'
import React from 'react'

export const TeamsHeader = ({ setAddMemberOpen }: any) => {
    const addMember = () => {
        setAddMemberOpen(true)
    }
    return (
        <>
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl mb-2 text-primaryNew">
                            Team Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your team members, roles, and permissions in
                            one place
                        </p>
                    </div>
                    {/* <Button
                        className=""
                        onClick={addMember}
                        variant="primaryNew"
                        Icon={UserPlus}
                        text={'Add Team Member'}
                    /> */}
                </div>
            </div>
        </>
    )
}
