export const countWords = (value: string = ''): number => {
    if (!value) return 0

    // Remove HTML tags if any
    const text = value.replace(/<[^>]+>/g, ' ').trim()

    return text ? text.split(/\s+/).filter(Boolean).length : 0
}
