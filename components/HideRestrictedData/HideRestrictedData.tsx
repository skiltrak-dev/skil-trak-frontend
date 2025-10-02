import { ReactNode } from 'react'
import { useRestrictedData } from './hooks'
import { RestrictedDataTypes } from './types'
export const HideRestrictedData = ({
    children,
    type,
    isAdmin,
}: {
    type: RestrictedDataTypes
    children: ReactNode
    isAdmin?: boolean
}) => useRestrictedData(children, type, isAdmin)
