import React, { useState } from 'react'
import { MemberPermissionModal } from '../modals'

export const AllTeamMembersTab = () => {
    const [editMemberOpen, setEditMemberOpen] = useState(false)
    return (
        <div>
            List Members here
            <div className="" onClick={() => setEditMemberOpen(true)}>
                Open permissions
            </div>
            <MemberPermissionModal
                setEditMemberOpen={setEditMemberOpen}
                editMemberOpen={editMemberOpen}
            />
        </div>
    )
}
