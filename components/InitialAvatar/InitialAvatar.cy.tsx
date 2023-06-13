import React from 'react'
import { InitialAvatar } from './InitialAvatar'

describe('<InitialAvatar />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<InitialAvatar name={'SaadS'} />)
        cy.contains('SaadS')
    })
})
