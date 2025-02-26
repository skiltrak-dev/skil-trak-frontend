export const maskText = (key: string, len = 4) => {
    // Convert to string in case it's a number
    const keyStr = key?.toString()
    // Get the last 4 digits
    const lastFour = keyStr?.slice(-len)
    // Create asterisks for the rest of the length
    const mask = '*'.repeat(keyStr?.length - len)
    return mask + lastFour
}
