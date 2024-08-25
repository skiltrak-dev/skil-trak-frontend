import { UserRoles } from '@constants'
import { ReactNode } from 'react'
import { useRestrictedData } from './hooks'

export const HideRestrictedData = ({
    children,
    type,
}: {
    type: UserRoles
    children: ReactNode
}) => {
    return useRestrictedData(children, type)
}
