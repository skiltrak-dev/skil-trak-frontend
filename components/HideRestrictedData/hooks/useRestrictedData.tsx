import { RestrictedDataTypes } from '../types'
import { useRestricted } from './useRestricted'

export const useRestrictedData = (data: any, type: RestrictedDataTypes) => {
    const canAccess = useRestricted(type)
    return canAccess ? data : '---'
}
