import { useRestricted } from './useRestricted'

export const useIsRestricted = (type: string) => {
    const canAccess = useRestricted(type)

    return canAccess
}
