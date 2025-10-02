export const maskText = (key: string, len = 4) => {
    // Convert to string in case it's a number

    const datalength =
        key && key?.length && key?.length >= len
            ? len
            : key && key?.length > 3
            ? 4
            : key && key?.length > 0
            ? key?.length
            : 0
    const keyStr = key?.toString()
    // Get the last 4 digits
    const lastFour = keyStr?.slice(-datalength)
    // Create asterisks for the rest of the length

    const staricLength = keyStr?.length - datalength
    const mask = '*'.repeat(staricLength > 5 ? 5 : staricLength)
    return mask + lastFour
}
