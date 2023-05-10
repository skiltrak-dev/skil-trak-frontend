import { Result } from '@constants'

export const getCourseResult = (results: any, message?: string) => {
    return results?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            result: message || Result.NotSubmitted,
        }
    )
}
