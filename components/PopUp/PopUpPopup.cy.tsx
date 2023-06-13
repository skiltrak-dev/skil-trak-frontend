import React from 'react'
import { Popup } from './PopUp'

import '../../styles/globals.css'

describe('<Popup />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <Popup title={'Saad'} subtitle={'Saad Khan'} variant={'error'} />
        )
        cy.get('[data-cy=title]').should('have.text', 'Saad')
    })
})
