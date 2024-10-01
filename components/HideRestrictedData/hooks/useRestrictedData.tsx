import { RestrictedDataTypes } from '../types'
import { useRestricted } from './useRestricted'

export const useRestrictedData = (
    data: any,
    type: RestrictedDataTypes,
    isAdmin: boolean = true
) => {
    const canAccess = useRestricted(type, isAdmin)
    return canAccess ? data : '---'
}
