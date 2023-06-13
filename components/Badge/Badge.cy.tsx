import React from 'react'
import { Badge } from './Badge'

import '../../styles/globals.css'

describe('<Badge />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Badge text="Saad" variant="info" shape="pill" size="lg" />)
    })
})
