import { getAddressData, getLatLng, getPostalCode, getSuburb } from '@utils'
import { useFormContext } from 'react-hook-form'

export const useAddressToPostCode = () => {
    const formContext = useFormContext()
    const onAddressToPostcodeClicked = async (value: string) => {
        if (value?.length > 4) {
            try {
                const latLng = await getLatLng(value)
                const postalCode = await getPostalCode(latLng)

                const suburb = await getSuburb(value)
                const { state } = await getAddressData(value)

                if (postalCode) {
                    formContext.setValue('zipCode', postalCode)
                }

                if (suburb) {
                    formContext.setValue('suburb', suburb)
                }

                if (state) {
                    formContext.setValue('state', state)
                }
            } catch (error) {
                console.error('Error fetching postal code:', error)
            }
        }
    }
    return { onAddressToPostcodeClicked }
}
