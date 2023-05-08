import React from 'react'
import { FileUpload } from './FileUpload'

describe('<FileUpload />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<FileUpload name={'file'} />)
    })
})
