export const checkFileSize = (file: any, size:any) => {
    if (file && file.size && file.size > size * 1024 * 1024) {
        return 'Image size must be less than 2MB'
    }
    return true
}