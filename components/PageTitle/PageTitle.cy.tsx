import React from 'react'
import { PageTitle } from './PageTitle'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('<PageTitle />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<PageTitle title="Saad Khan" />)
        cy.contains('Saad Khan')
    })
})
