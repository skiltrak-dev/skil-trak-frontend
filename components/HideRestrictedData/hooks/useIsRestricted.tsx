import { RestrictedDataTypes } from '../types'
import { useRestricted } from './useRestricted'

export const useIsRestricted = (
    type: RestrictedDataTypes,
    isAdmin: boolean = true
) => useRestricted(type, isAdmin)
