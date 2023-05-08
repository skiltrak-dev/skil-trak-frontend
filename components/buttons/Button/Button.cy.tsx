import React from 'react'
import { Button } from './Button'
import { BsEye } from 'react-icons/bs'
import '@styles/globals.css'

// import 'tailwindcss/dist/tailwindcss.min.css'

describe('<Button />', () => {
    it('uses custom text for the button label', () => {
        cy.mount(<Button variant="dark">Click me!</Button>)
        cy.get('button').should('contains.text', 'Click me!')
    })
})
