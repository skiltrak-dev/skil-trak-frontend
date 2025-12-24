import { AddNoteButton } from './AddNoteButton'
import { BlockedStatusButton } from './BlockedStatusButton'
import { BranchLocationsButton } from './BranchLocationsButton'
import { ContactBioButton } from './ContactBioButton'
import { EditProfileButton } from './EditProfileButton'
import { MoreMenuButton } from './MoreMenuButton'
import { VerifyEmail } from './VerifyEmail'

export function ActionButtons() {
    return (
        <div className="flex items-center gap-1">
            <VerifyEmail />
            <EditProfileButton />
            <ContactBioButton />
            <BranchLocationsButton />
            <BlockedStatusButton />
            <AddNoteButton />
            <MoreMenuButton />
        </div>
    )
}
