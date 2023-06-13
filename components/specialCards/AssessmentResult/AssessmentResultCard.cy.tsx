import React from 'react'
import { AssessmentResultCard } from './AssessmentResultCard'

import '../../../styles/globals.css'

describe('<AssessmentResultCard />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<AssessmentResultCard assessedBy="Saad" status="approved" />)
        cy.get('AssessmentResultCard').should('contains.assessedBy', 'Saad')
    })
})
