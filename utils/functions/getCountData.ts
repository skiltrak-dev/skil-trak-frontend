export const getCountData = (count: any) => {
    let counts: any = {}
    count?.forEach((count: any) =>
        Object.entries(count).map(([key, value]) => {
            counts[key] = value
        })
    )
    return counts
}
