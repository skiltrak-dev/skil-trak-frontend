import { getLatLng, getPostalCode } from '@utils'
import { useFormContext } from 'react-hook-form'

export const useAddressToPostCode = () => {
    const formContext = useFormContext()
    const onAddressToPostcodeClicked = async (value: string) => {
        if (value?.length > 4) {
            try {
                const latLng = await getLatLng(value)
                const postalCode = await getPostalCode(latLng)

                if (postalCode) {
                    formContext.setValue('zipCode', postalCode)
                }
            } catch (error) {
                console.error('Error fetching postal code:', error)
            }
        }
    }
    return { onAddressToPostcodeClicked }
}
