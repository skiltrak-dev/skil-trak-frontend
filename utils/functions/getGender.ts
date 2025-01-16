export const getGender = (gender?: string): string | undefined => {
    if (!gender) return undefined

    switch (gender.toLowerCase()) {
        case 'f':
        case 'female':
            return 'Female'
        case 'm':
        case 'male':
            return 'Male'
        default:
            return undefined
    }
}
