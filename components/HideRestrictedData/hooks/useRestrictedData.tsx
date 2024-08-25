import { useRestricted } from './useRestricted'

export const useRestrictedData = (data: any, type: string) => {
    const canAccess = useRestricted(type)
    return canAccess ? data : '---'
}
