import React from 'react'
import { Tooltip } from './Tooltip'
import '../../styles/globals.css'

describe('<Tooltip />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Tooltip>Tooltip</Tooltip>)
        cy.get('div').contains('Tooltip')
        cy.get('div').should(
            'have.class',
            'absolute whitespace-nowrap right-0 z-50'
        )
    })
})
