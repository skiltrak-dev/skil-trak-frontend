import { ReactNode } from 'react'
import { useRestrictedData } from './hooks'
import { RestrictedDataTypes } from './types'
export const HideRestrictedData = ({
    children,
    type,
}: {
    type: RestrictedDataTypes
    children: ReactNode
}) => useRestrictedData(children, type)
