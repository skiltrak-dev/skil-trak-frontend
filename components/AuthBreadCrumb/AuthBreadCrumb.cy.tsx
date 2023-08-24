import React from 'react'
import { AuthBreadCrumb } from './AuthBreadCrumb'

describe('AuthBreadCrumb', () => {
  it('renders the breadcrumbs correctly', () => {
    const breadcrumbs = [
      { text: 'Home', link: '/home', active: false },
      { text: 'Login', link: '/login', active: true },
    ]
    cy.mount(<AuthBreadCrumb breadcrumbs={breadcrumbs} />)
    cy.get('.flex.items-center.gap-x-2.remove-scrollbar.overflow-x-scroll').should('exist')
    cy.get('.flex.items-center.gap-x-2').should('have.length', 2)
    cy.get('a').should('have.length', 2)
    cy.get('a').first().should('have.attr', 'href', '/home')
    cy.get('a').last().should('have.attr', 'href', '/login')
    cy.get('.text-primary').should('contain', 'Login')
    cy.get('.text-muted').should('contain', 'Home')
    cy.get('svg').should('have.length', 1)
  })

  it('navigates to the correct link when a breadcrumb is clicked', () => {
    const breadcrumbs = [
      { text: 'Home', link: '/home', active: false },
      { text: 'Login', link: '/login', active: true },
    ]
    cy.mount(<AuthBreadCrumb breadcrumbs={breadcrumbs} />)
    cy.get('a').first().click()
    cy.url().should('include', '/home')
    cy.get('a').last().click()
    cy.url().should('include', '/login')
  })
})
