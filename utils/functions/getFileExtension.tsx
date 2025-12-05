export const getFileExtensionByUrl = (url: string) => {
    try {
        // Remove query parameters and hash fragments
        const cleanUrl = url.split('?')[0].split('#')[0]

        // Get the pathname from the URL
        const pathname = new URL(cleanUrl).pathname

        // Extract the filename from the path
        const filename = pathname.split('/').pop()

        // Get the extension (everything after the last dot)
        const extension =
            filename && filename?.includes('.')
                ? filename?.split('.').pop()?.toLowerCase()
                : undefined

        return extension
    } catch (error) {
        // If URL is invalid, try simple string parsing
        const cleanUrl = url.split('?')[0].split('#')[0]
        const parts = cleanUrl?.split('/').pop()?.split('.')
        return parts && parts?.length > 1
            ? parts?.pop()?.toLowerCase()
            : undefined
    }
}
