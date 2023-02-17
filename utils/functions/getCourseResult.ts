export const getCourseResult = (results: any, message?: string) => {
    return results?.reduce(
        (a: any, b: any) => (a.totalSubmission > b.totalSubmission ? a : b),
        {
            result: message || 'Not Submitted',
        }
    )
}
