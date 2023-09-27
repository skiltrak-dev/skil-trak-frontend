import { Result } from '@constants'

export const getBlockedByStudent = (
    statusChangeHistory: any,
    message?: string
) => {
    return statusChangeHistory?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            result: message || '----',
        }
    )
}
