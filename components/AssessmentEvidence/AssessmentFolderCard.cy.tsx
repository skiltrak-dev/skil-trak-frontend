import React from 'react'
import { AssessmentFolderCard } from './AssessmentFolderCard'

describe('<AssessmentFolderCard />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<AssessmentFolderCard />)
    })
})
