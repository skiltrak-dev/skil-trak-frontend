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
