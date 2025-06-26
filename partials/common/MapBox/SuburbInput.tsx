import { TextInput } from '@components'
import React from 'react'

export const SuburbInput = () => {
    return (
        <div>
            <TextInput
                label={'Suburb'}
                name={'suburb'}
                placeholder={'Suburb...'}
                validationIcons
                required
                placesSuggetions
                // onChange={(e: any) => {
                //     if (e?.target?.value > 4) {
                //         fromAddress(e?.target?.value)
                //             .then(({ results }) => {
                //                 const { lat, lng } =
                //                     results[0].geometry.location
                //                 console.log({
                //                     map,
                //                     lat,
                //                     lng,
                //                     outer: true,
                //                 })
                //                 if (map) {
                //
                //                     map.setCenter({ lat, lng })
                //                     map.setZoom(8)
                //                 }
                //             })
                //             .catch(console.error)
                //     }
                // }}
                // onPlaceSuggetions={{
                //     placesSuggetions: onSuburbClicked,
                //     setIsPlaceSelected: setOnSuburbClicked,
                // }}
            />
        </div>
    )
}
