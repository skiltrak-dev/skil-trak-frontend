import React from 'react'
import { Typography } from './Typography'
import '../../styles/globals.css'

describe('<Typography />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <Typography variant="h1" uppercase htmlFor="testingID">
                Saad
            </Typography>
        )

        cy.contains('Saad')

        cy.should('have.html', 'Saad')

        cy.should('have.class', 'uppercase')
    })
})
