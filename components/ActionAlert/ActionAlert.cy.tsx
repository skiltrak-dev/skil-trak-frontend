import React from 'react'
import { ActionAlert } from './ActionAlert'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import '../../styles/globals.css'

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

describe('<ActionAlert />', () => {
    it('renders', () => {
        const router: any = createRouter()
        // see: https://on.cypress.io/mounting-react
        const component = cy.mount(
            <RouterContext.Provider value={router}>
                <ActionAlert
                    title="Saad"
                    description="Khan"
                    primaryAction={{
                        text: 'Hello',
                        onClick: () => {},
                    }}
                />
            </RouterContext.Provider>
        )

        component.get('h4').contains('Saad')
        component.get('p').contains('Khan')
        component.get('button').contains('Hello')

        component.get('button').click()
        // component.get('button').should('contain', 'Hello')
    })
})
