import React from 'react'
import { ApprovedStudent } from './ApprovedStudent'

describe('<ApprovedStudent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ApprovedStudent />)
  })
})