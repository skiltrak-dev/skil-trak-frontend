import { RestrictedDataTypes } from '../types'
import { useRestricted } from './useRestricted'

export const useIsRestricted = (type: RestrictedDataTypes) =>
    useRestricted(type)
