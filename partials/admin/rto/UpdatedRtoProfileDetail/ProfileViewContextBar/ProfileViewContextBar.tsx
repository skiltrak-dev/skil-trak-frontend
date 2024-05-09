import React from 'react'
import { Rto } from '@types'
import { ContactPersons, ContextBarDropdown, Subadmins } from '../components'

export const ProfileViewContextBar = ({ rto }: { rto: Rto }) => {
    return (
        <div>
            <ContactPersons userId={rto?.user?.id} />
            <Subadmins userId={rto?.user?.id} />
        </div>
    )
}
