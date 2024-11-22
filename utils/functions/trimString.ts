export const trimString = (data: any) => {
    // data must be in object
    const values: { [key: string]: string | number } = {}
    Object.keys(data).map((key) => {
        if (typeof data[key] === 'string') {
            values[key] = data[key].replace(/\s\s+/g, ' ').trim()
        } else {
            values[key] = data[key]
        }
        return null
    })
    return values
}

export const trimText = (text: string) => text?.replace(/\\t|\s+/g, '')?.trim()

export const removeEmptySpaces = (formMethods: any, abn: string) => {
    formMethods.setValue('abn', abn?.replace(/\s/g, ''))
}
