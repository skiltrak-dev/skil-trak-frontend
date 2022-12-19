export const ellipsisText = (text: string, length: number) => {
    if (text && text.length > length) return `${text.substring(0, length)} ...`
    return text
}
