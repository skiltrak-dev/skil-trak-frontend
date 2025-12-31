import { Badge } from '@components'
import { Edit3 } from 'lucide-react'
import { useState } from 'react'
import { EditProfileModal } from '../modals'

export function EditProfileButton() {
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)

    return (
        <>
            <Badge
                onClick={() => setShowEditProfileModal(true)}
                Icon={Edit3}
                variant={"primaryNew"}
                title="Edit Profile"
            >
                Edit Profile
            </Badge>

            <EditProfileModal
                isOpen={showEditProfileModal}
                onClose={() => setShowEditProfileModal(false)}
            />
        </>
    )
}
