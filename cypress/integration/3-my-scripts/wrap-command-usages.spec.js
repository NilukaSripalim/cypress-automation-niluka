
describe('Cypress Cy.wrap() usages', () => {
    
    it('Find an element and Wrap previously yielded jQuery Objects', 
        {baseUrl: 'https://console.asgardeo.io'}, () => {
        
        cy.visit('/');
        cy.get('#usernameUserInput').then($username => {
             // jQuery to set Value
            // $username.val("niluka@gmail.com")

            // Using Cypress command
            cy.wrap($username).type('niluka@gmail.com');
        } )
    });

    it('Cypress Wrap with synchronized Javascript code', () => {
        
        //validate the variable is equal to the expected value
        const header = "WSO2 Asgardeo";
        cy.wrap(header).should('contains', 'WSO2 Asgardeo');

        // Check Object has a certain Property and Value
        const pageHeader = { header: "Sign In" }
        cy.wrap(pageHeader).should("have.property", "header", "Sign In")

        // Check Array contains an Item
        const wso2Products = ["WSO2 Enterprise Integratort", "WSO2 API Manager", "WSO2 Identity Server", "Choreo", "Asgardeo", "Ballerinas"]
        cy.wrap(wso2Products).should("contains", "Asgardeo")
    });

    const product = (pname, ms) => {
        console.log('Promise begin...')
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Promise finished...Product '+pname+' is returned...')
                resolve({ name: pname })
            }, ms)
        })
    }

    it('Cypress Wrap command - JavaScript Promise', {baseUrl: 'https://console.asgardeo.io'}, () => {

        // Test Case Completes immediately
        // TC doesn't wait for the promise to complete
        // Also, couldn't test if the promise has returned the product Object
        //const productExpected = product("Asgardeo", 2000)
        // Solution :) - WRAP
        //cy.wrap(productExpected)
        
        // With Assertions
        //cy.wrap(productExpected).should("have.property", "name", "Asgardeo")

        // resolved promises are returned immediately 
        // cy.wrap(productExpected)
        // Promise still starts immediately...and Cypress commands are chained
        // So if we want this promise to execute after any CYPRESS command, we run promise inside THEN Block
        cy.visit('/').then(() => {
            const productExpected = product("Asgardeo", 2000)
            cy.wrap(productExpected)
        })

    });
});

/**
 * returning false here prevents Cypress from failing the test
 * expect(err.message).to.include('Ignoring error for now');
 */
 Cypress.on("uncaught:exception", (err, runnable) => {

    console.log("Cypress detected uncaught exception", err);
    return false;
}); 