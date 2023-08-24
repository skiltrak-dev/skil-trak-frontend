// In your Cypress "integration" folder (usually located at "cypress/integration")

// Import the React component
import React from 'react';
import { AssessmentResultCard } from './AssessmentResultCard';
import '../../../styles/globals.css'
// Test case
describe('<AssessmentResultCard />', () => {
    it('renders', () => {
      const assessedBy = 'Faraz';
      const status = 'approved';

      // Mount the component with the specified props
      cy.mount(<AssessmentResultCard assessedBy={assessedBy} status={status} />);

      // Use Cypress commands to assert the presence of the elements with specific texts
      cy.get('.font-medium.text-sm.leading-5:contains("Assessment Result")').should('be.visible');
      cy.get('.font-semibold.text-lg.leading-7:contains("' + status + '")').should('be.visible');
      cy.get('.font-medium.text-sm.leading-5').should('have.css', 'color', '#480B70');
      cy.get('.font-medium.text-sm.leading-5').should('contain.text', assessedBy);
    });
  });
  
  

