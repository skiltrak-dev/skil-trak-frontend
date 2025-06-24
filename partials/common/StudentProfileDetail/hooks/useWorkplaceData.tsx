import { useState } from 'react'

export const useWorkplaceData = () => {
    const [workplaceLength, setWorkplaceLength] = useState<number>(0)

    const getWorkplaceLength = (length: number) => {
        if (length) {
            setWorkplaceLength(length)
        }
    }

    return {
        workplaceLength,
        getWorkplaceLength,
    }
}
