import { ReactNode } from 'react'
import { useRestrictedData } from './hooks'
import { RestrictedDataTypes } from './types'
export const HideRestrictedData = ({
    children,
    type,
}: {
    type: RestrictedDataTypes
    children: ReactNode
}) => {
    return useRestrictedData(children, type)
}
