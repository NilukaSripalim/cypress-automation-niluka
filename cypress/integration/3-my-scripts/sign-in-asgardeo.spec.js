/*
 *   Copyright (c) 2022 WSO2 Inc. (http://www.wso2.org)
 *   All rights reserved.
 *   
 *   This software is the property of WSO2 Inc. and its suppliers, if any.
 *   Dissemination of any information or reproduction of any material contained
 *   herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 *   You may not alter or remove any copyright or other notice from copies of this content.
 */
describe('Successfully Sign-in to Asgardeo ', () => {

    before(() => {

        cy.window().then((win) => {
            win.onbeforeunload = null;
        });
        // Visit Asgardeo console
        cy.visit("https://dev.console.asgardeo.io/", {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
            }
        });
    });

    it("User try to successfully Sign-in", () => {

        //Provide username & press Enter.
        cy.get("#usernameUserInput").type("<username>{enter}", { log: false });

        //Provide Password & Press Enter
        cy.get("[data-testid=\"login-page-password-input\"]").type("<password>{enter}", { log: false });

        // Validate whether user able to successfully sign-in.
        cy.get("[data-testid=\"welcome-greeting-header\"]").should("contain", "Welcome")
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