import {
    fromAddress,
    geocode,
    GeocodeOptions,
    RequestType,
    setKey,
} from 'react-geocode'

setKey(process.env.NEXT_PUBLIC_MAP_KEY as string)

export const getLatLng = async (value: string) => {
    const { results } = await fromAddress(value)
    const { lat, lng } = results[0].geometry.location
    return { lat, lng }
}

export const getPostalCode = async ({
    lat,
    lng,
}: {
    lat: number
    lng: number
}) => {
    const response = await geocode(RequestType.LATLNG, `${lat},${lng}`)
    const addressComponents = response.results[0].address_components

    for (let component of addressComponents) {
        if (component.types.includes('postal_code')) {
            return component?.long_name
        }
    }
}

// fromAddress(e?.target?.value)
//     .then(({ results }: any) => {
//         const { lat, lng } = results[0].geometry.location
//         geocode('latlng', `${lat},${lng}`, {
//             key: process.env.NEXT_PUBLIC_MAP_KEY,
//         } as GeocodeOptions)
//             .then((response) => {
//                 const addressComponents = response.results[0].address_components

//                 for (let component of addressComponents) {
//                     if (component.types.includes('postal_code')) {
//                         formMethods.setValue('zip', component.long_name)

//                         break
//                     }
//                 }
//             })
//             .catch((error) => {
//                 console.error({
//                     error,
//                 })
//             })
//     })
//     .catch(console.error)
