import { getUserCredentials } from '@utils'
import React, { ReactNode } from 'react'

export const UserCardRole = ({
    roles,
    children,
}: {
    roles: string[]
    children: ReactNode
}) => {
    const role = getUserCredentials()?.role
    return roles.includes(role) ? children : null
}
