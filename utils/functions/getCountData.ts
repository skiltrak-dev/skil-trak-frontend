export const getCountData = <CountType extends {}>(
    countNumber: CountType[]
) => {
    let counts: { [key: string]: number } = {}
    countNumber?.forEach((count: CountType) =>
        Object.entries(count).map(([key, value]) => {
            counts[key] = value as number
        })
    )
    return counts as CountType
}
