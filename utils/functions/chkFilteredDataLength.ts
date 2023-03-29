export const checkFilteredDataLength = (filter: any) => {
    return Object.keys(filter).length > 0
}

export const removeEmptyValues = (data: any) => {
    for (var key in data) {
        if (data[key] === '' || !data[key] || data[key] === 0) {
            delete data[key]
        }
    }
    return data
}
