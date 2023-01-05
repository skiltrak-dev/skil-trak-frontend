export const getGender = (gender?: string) => {
    if (gender) {
        switch (gender.toLowerCase()) {
            case 'f' || 'female':
                return 'Female'
            case 'm' || 'male':
                return 'Male'
        }
    }
}
