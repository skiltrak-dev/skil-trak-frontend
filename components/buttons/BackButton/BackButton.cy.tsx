import React from 'react'
import { BackButton } from './BackButton'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import '../../../styles/globals.css'

const createRouter = () => {
    return {
        pathname: '/',
        route: '/',
        query: {},
        asPath: '/',
        components: {},
        isFallback: false,
        basePath: '',
        events: {
            emit: cy.spy().as('emit'),
            off: cy.spy().as('off'),
            on: cy.spy().as('on'),
        },
        push: cy.spy().as('push'),
        replace: cy.spy().as('replace'),
        reload: cy.spy().as('reload'),
        back: cy.spy().as('back'),
        prefetch: cy.stub().as('prefetch').resolves(),
        beforePopState: cy.spy().as('beforePopState'),
    }
}

describe('<BackButton />', () => {
    it('Product card click redirects to PDP', () => {
        const router: any = createRouter()
        cy.mount(
            <RouterContext.Provider value={router}>
                <BackButton />
            </RouterContext.Provider>
        )
        cy.contains('Back To Previous')
            .click()
            .then(() => {
                expect(router.back())
            })
    })
})

describe('<BackButton />', () => {
    it('Product card click redirects to PDP', () => {
        const router: any = createRouter()
        cy.mount(
            <RouterContext.Provider value={router}>
                <BackButton text={'Back To Students'} />
            </RouterContext.Provider>
        )
        cy.contains('Back To Students')
            .click()
            .then(() => {
                expect(router.back())
            })
    })
})

describe('<BackButton />', () => {
    it('Product card click redirects to PDP', () => {
        const router: any = createRouter()
        const component = cy.mount(
            <RouterContext.Provider value={router}>
                <BackButton text={'Back To List'} link={'/students'} />
            </RouterContext.Provider>
        )
        component
            .get('a')
            .should('have.prop', 'href', 'http://localhost:8080/students')

        component.get('a').contains('Back To List')
        component
            .get('a')
            .should(
                'have.class',
                'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark rounded-lg cursor-pointer'
            )

        // component.contains('Back To List')
        // component.url().should('eq', 'http://localhost:8080/students')
        // component.url().click().contains('/students')

        // expect(component.get('a').click())
        //     .to.have.prop('href')
        //     .to.equal('/students')
    })
})
