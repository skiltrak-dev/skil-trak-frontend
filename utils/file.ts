const formatAndJoin = (prefix: string, types: string[]) => {
    const formats = types.map((format) => `${prefix}/${format}`)
    return formats.join(',')
}

// Supported Video Formats
const VideoFormats = [
    '*',
    'x-msvideo',
    'mp4',
    'mpeg',
    'quicktime',
    'ogg',
    'webm',
    '3gpp',
]
export const SupportedVideoFormats = formatAndJoin('video', VideoFormats)

// Supported Image Formats
const ImageFormats = ['*', 'jpeg', 'jpg', 'png', 'svg+xml', 'webp']
export const SupportedImageFormats = formatAndJoin('image', ImageFormats)

// Supported Document Formats
export const DocumentFormats = [
    '*',
    'msword',
    'vnd.openxmlformats-officedocument.wordprocessingml.document',
    'vnd.ms-excel',
    'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'pdf',
    'xlsx',
    'numbers',
    'csv',
]

export const TextFormats = ['csv']

export const SupportedDocumentFormats = `${formatAndJoin(
    'application',
    DocumentFormats
)},${formatAndJoin('text', TextFormats)}`

export const FileFormat = {
    isPdf: (file: any, ext?: any) => {
        const extension = ext ? ext : file.name.split('.').reverse()[0]
        return file.type === 'application/pdf' || extension === 'pdf'
    },
}

/**
 * Returns mime type for given type like png, pdf, mp4, doc etc.
 * You can get generic mime types by passing following
 * in an array:

 * document - gives `application/*,text/*`

 * video - gives `video/*`
 
 * image - gives `image/*`
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Utils}.
 *
 * @param types - Array of Format or Extensions without dot(.)
 * @returns Mime Type(s) for a file
 *
 * @example
 * Returns "video/mp4" for `mp4`:
 * ```ts
 * const mimeTypes = getMimeTypes(['mp4','pdf','png']);
 * console.log(mimeTypes) // 'video/mp4,application/pdf,image/png';
 * ```
 */
export const getMimeTypes = (types: string[]) => {
    const mimeTypes = types.map((t) => {
        if (t === 'image') {
            return 'image/*'
        }

        if (t === 'video') {
            return 'video/*'
        }

        if (t === 'document') {
            return 'application/*,text/*'
        }

        const isDocument = DocumentFormats.some((d) => d === t)
        const isVideo = VideoFormats.some((v) => v === t)
        const isImage = ImageFormats.some((i) => i === t)
        const isText = TextFormats.some((txt) => txt === t)

        if (isDocument) return `application/${t}`
        if (isVideo) return `video/${t}`
        if (isImage) return `image/${t}`
        if (isText) return `text/${t}`

        return `.${t}`
    })

    return mimeTypes.join(',')
}

/**
 * Returns the extension of given file.
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Utils}.
 *
 * @param types - File Object read by File Browser or DnD Package
 * @returns extension of file
 *
 * @example
 * Returns "pdf" for `dummy.pdf`:
 * ```ts
 * const extension = getFileExtensions(file) // File is a `dummy.pdf`;
 * console.log(extension) // pdf;
 * ```
 */
export const getFileExtension = (file: File) => {
    return file.name.split('.').reverse()[0]
}
