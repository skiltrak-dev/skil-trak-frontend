export const htmltotext = (value: string) => {
    return value?.replace(/<([A-z]+)([^>^/]*)>\s*<\/\1>/gim, '')
}
