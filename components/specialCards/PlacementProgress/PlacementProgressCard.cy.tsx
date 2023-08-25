import React from 'react'
import { PlacementProgressCard } from './PlacementProgressCard'
import { NoData } from '@components/ActionAnimations'
import { LoadingAnimation } from '@components/LoadingAnimation'
import '../../../styles/globals.css'
describe('PlacementProgressCard', () => {
    it('displays loading animation when placementProgress is loading', () => {
      const placementProgress = { isLoading: true }
      cy.mount(<PlacementProgressCard placementProgress={placementProgress} />)
      cy.get('.loading-animation').should('exist')
      cy.get('.no-data').should('not.exist')
    })
  
    it('displays placement progress when placementProgress is available', () => {
      const placementProgress = {
        isLoading: false,
        requestStatus: 'In Progress',
        description: 'Some description',
      }
      cy.mount(<PlacementProgressCard placementProgress={placementProgress} />)
      cy.get('.loading-animation').should('not.exist')
      cy.get('.no-data').should('not.exist')
      cy.get('.text-white').should('contain', 'Placement Progress')
      cy.get('.text-white').should('contain', 'In Progress')
      cy.get('.text-[#480B70]').should('contain', 'Some description')
    })
  
    it('displays "No data found" when placementProgress is empty', () => {
      const placementProgress = null
      cy.mount(<PlacementProgressCard placementProgress={placementProgress} />)
      cy.get('.loading-animation').should('not.exist')
      cy.get('.no-data').should('exist')
      cy.get('.no-data').should('contain', 'No Data')
    })
  })
