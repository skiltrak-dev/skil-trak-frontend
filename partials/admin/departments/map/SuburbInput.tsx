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
            />
        </div>
    )
}
